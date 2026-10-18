# Tenant Screening v2 (Ontario)

Static single-page app plus one small serverless function. No database. Applicant data stays in the visitor's browser.

## Deploy (Vercel Hobby, free)
1. Push this folder (index.html, vercel.json, api/, README.md) to a GitHub repo.
2. Vercel > Add New > Project > import it. Framework: Other. No build command. Deploy.
   CLI alternative: `npx vercel --prod` inside this folder.

## Optional: employer web search (preliminary employment check)
The preliminary employment check searches the public web for the EMPLOYER NAME only (never the applicant).
Without a search service the app falls back to free open data (Wikidata, OpenStreetMap), which rarely finds small
employers, so the app then sends the user to the email step. To turn on real web search, add ONE of these in
Vercel > Project > Settings > Environment Variables, then redeploy:
- `BRAVE_API_KEY` (Brave Search API), or
- `GOOGLE_CSE_KEY` and `GOOGLE_CSE_CX` (Google Programmable Search)
The function limits each IP to 20 searches an hour and only answers requests from your own site. Search APIs have
their own quotas and prices: check your plan.

## Third-party loads (no applicant data in any of them)
cdnjs (jsPDF, pdf.js), jsDelivr (tesseract.js OCR, loaded only when a photo or scan is added), Google Fonts,
Ontario Open Data (public LTB catalogue).

## Notes
- Vercel's Hobby plan is for non-commercial use.
- Rent Roll link removed in this copy. "Download result file" still works.
