# Tenant Screening (Ontario)

Static single-page app. No backend, no database, no build step.
All applicant data stays in the visitor's own browser (localStorage / IndexedDB).

## Deploy (free Hobby plan)
1. Push this folder to a GitHub repo (index.html, vercel.json, README.md).
2. vercel.com > Add New > Project > import the repo.
3. Framework Preset: Other. Build command: empty. Output directory: empty (or `.`). Deploy.

CLI alternative: `npm i -g vercel`, then `vercel --prod` inside this folder.

## Notes
- Vercel's free Hobby plan is for non-commercial use. A public tool used by others for business may need Pro.
- Rent Roll link removed in this copy (it would 404). "Download result file" still works.
