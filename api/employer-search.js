// Vercel serverless function: web search for an EMPLOYER NAME only (never an applicant).
// Needs one environment variable in the Vercel project settings:
//   BRAVE_API_KEY            (Brave Search API), or
//   GOOGLE_CSE_KEY + GOOGLE_CSE_CX  (Google Programmable Search)
// Without a key it answers 501 and the app falls back to the email step.
const hits = new Map(); // per-instance, best-effort rate limit: 20 searches per IP per hour
function limited(ip) {
  const now = Date.now(), h = (hits.get(ip) || []).filter(t => now - t < 3600e3);
  if (h.length >= 20) { hits.set(ip, h); return true; }
  h.push(now); hits.set(ip, h); return false;
}
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const origin = req.headers.origin || '', host = req.headers.host || '';
  if (origin && !origin.endsWith('//' + host)) return res.status(403).json({ error: 'origin' });
  const ip = String((req.headers['x-forwarded-for'] || '').split(',')[0] || 'x');
  if (limited(ip)) return res.status(429).json({ error: 'rate_limited' });
  let q = '';
  try { q = String((typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}).q || '').trim(); } catch (e) {}
  if (q.length < 3 || q.length > 120) return res.status(400).json({ error: 'bad_query' });
  try {
    if (process.env.BRAVE_API_KEY) {
      const r = await fetch('https://api.search.brave.com/res/v1/web/search?count=8&country=ca&q=' + encodeURIComponent(q),
        { headers: { Accept: 'application/json', 'X-Subscription-Token': process.env.BRAVE_API_KEY } });
      if (!r.ok) return res.status(502).json({ error: 'upstream', status: r.status });
      const j = await r.json();
      return res.status(200).json({ provider: 'Brave Search', results: ((j.web && j.web.results) || []).slice(0, 8).map(x => ({ title: x.title, url: x.url, snippet: x.description || '' })) });
    }
    if (process.env.GOOGLE_CSE_KEY && process.env.GOOGLE_CSE_CX) {
      const r = await fetch('https://www.googleapis.com/customsearch/v1?num=8&gl=ca&key=' + process.env.GOOGLE_CSE_KEY + '&cx=' + process.env.GOOGLE_CSE_CX + '&q=' + encodeURIComponent(q));
      if (!r.ok) return res.status(502).json({ error: 'upstream', status: r.status });
      const j = await r.json();
      return res.status(200).json({ provider: 'Google Programmable Search', results: (j.items || []).slice(0, 8).map(x => ({ title: x.title, url: x.link, snippet: x.snippet || '' })) });
    }
    return res.status(501).json({ error: 'not_configured' });
  } catch (e) { return res.status(502).json({ error: 'upstream' }); }
};
