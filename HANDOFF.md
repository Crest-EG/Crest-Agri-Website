# Crest website handoff

## What is built

The site is a bilingual (`/en`, `/ar`) Next.js App Router website for Crest for Agricultural Development. It includes the landing page's seven-scene scroll journey, product listing and detail pages, About, Services, Certifications, Contact, a shared footer, privacy page, localized error pages, and quote forms. Arabic pages use RTL layout. The quote form prepares email and WhatsApp messages and sends lead and channel events to `/api/lead` without waiting for the webhook.

Some copy and image assets are provisional. Review [CONTENT_TODO.md](CONTENT_TODO.md) with the Crest team before treating those details as confirmed. Replace visual assets at their existing paths using the specifications in [ASSETS.md](ASSETS.md). The Stitch source exports are retained under `stitch/crest-export-website/`.

## Run and verify locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`. Run the quality gate before handing off code:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Google Sheets lead webhook setup

Lead capture requires a Google Sheet, a Google Apps Script web app and two server-side environment variables. Without either variable, the site still prepares the visitor's WhatsApp/email message and does not show an error, but the lead is not saved. Configure these before launch.

1. Create a Google Sheet for inquiries. Copy its spreadsheet ID from the URL (the portion between `/d/` and `/edit`).
2. In the Sheet, open **Extensions → Apps Script**. Paste the `doPost(e)` handler documented in [README.md](README.md#lead-capture-to-google-sheets). It validates the shared secret and appends lead and channel events to a `Leads` tab.
3. In Apps Script, open **Project Settings → Script Properties** and add:
   - `SHEET_ID`: the spreadsheet ID from step 1.
   - `LEADS_SECRET`: a long, randomly generated secret.
4. Select **Deploy → New deployment → Web app**. Set **Execute as** to your account and access to **Anyone**, then deploy. Copy the deployment URL ending in `/exec`. The script secret is the request check; never put either secret in browser code.
5. For local development, copy `.env.example` to `.env.local` and set:

   ```dotenv
   LEADS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   LEADS_SECRET=the-same-secret-configured-in-Apps-Script
   ```

   Restart the dev server after changing environment variables.
6. Submit a real, consented test inquiry and check the `Leads` sheet for a `lead` row. Use either follow-up link and check for a `channel` row with the same `leadId`. Remove the test rows afterward if they are not meant to remain.

The API validates and trims fields, caps lengths, rejects the hidden honeypot, and uses a simple in-memory per-IP rate limit. Vercel instances do not share this in-memory limit. Webhook failures are written to server logs; they never expose the URL or secret to the browser or delay the email/WhatsApp action.

## Deploy from GitHub to Vercel

1. Review and commit the finished repository locally. Create or select the GitHub repository owned by the project maintainer, then push the chosen branch from their machine. No remote repository is configured by this handoff.
2. In Vercel, choose **Add New → Project**, import the GitHub repository and keep the detected Next.js build settings.
3. In the Vercel project's **Settings → Environment Variables**, add `LEADS_WEBHOOK_URL` and `LEADS_SECRET`. Add both to **Preview** and **Production** (and **Development** if using Vercel CLI). Use the deployed Apps Script `/exec` URL and the same secret stored in Apps Script. These values must be server-side variables; do not use a `NEXT_PUBLIC_` prefix.
4. Deploy. After changing environment variables, trigger a fresh deployment so the build receives them.
5. On the Preview URL, check both locales, the quote form, and the resulting Sheet rows. Then run the same smoke check on the Production URL. Confirm the site still displays the prepared channel actions if webhook configuration is intentionally absent, and confirm the Sheet only receives events once the variables are configured.

## Owner review before launch

- Confirm the provisional claims and company/contact details listed in [CONTENT_TODO.md](CONTENT_TODO.md).
- Replace the provisional logo, missing brand fonts, product and service photography, and journey frames listed in [ASSETS.md](ASSETS.md).
- Keep the shared footer rendered once from the locale layout. Keep new visible copy in both locale message files.
- Re-run lint, TypeScript, and production build after content or asset changes.
