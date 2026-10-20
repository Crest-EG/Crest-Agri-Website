# Crest Agricultural Export Website

Marketing website for Crest for Agricultural Development, built with Next.js App Router, TypeScript, Tailwind CSS, GSAP and next-intl. The site supports English and Arabic, with localized routes under `/en` and `/ar`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Journey frames

The seven-scene scroll journey uses 120 WebP frames per scene. Regenerate the complete sequence in one command with local `ffmpeg` and Python Pillow installed:

```bash
npm run frames:generate
```

The generator reads the scene count, frame count, dimensions and output extension from `src/config/frames.ts`. It reuses the four supplied landing source photos under `stitch/crest-export-website/7b360f04e7c449b082622925db2e1a86/`, applies a subtle eased camera move per scene, and replaces the existing frame files.

## Lead capture to Google Sheets

Quote submissions and the visitor's selected follow-up channel are sent from the server to a Google Apps Script web app. The browser only calls `/api/lead`; the webhook URL and shared secret are server-side environment variables.

1. Create a Google Sheet and copy its spreadsheet ID from the URL.
2. In the sheet, open **Extensions → Apps Script** and paste this script:

   ```javascript
   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents || "{}");
       const properties = PropertiesService.getScriptProperties();
       if (!data.secret || data.secret !== properties.getProperty("LEADS_SECRET")) {
         return ContentService.createTextOutput(JSON.stringify({ ok: false }))
           .setMimeType(ContentService.MimeType.JSON);
       }

       const spreadsheet = SpreadsheetApp.openById(properties.getProperty("SHEET_ID"));
       const sheet = spreadsheet.getSheetByName("Leads") || spreadsheet.insertSheet("Leads");
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(["receivedAt", "event", "leadId", "locale", "type", "name", "company", "country", "contact", "product", "quantity", "message", "page", "channel"]);
       }
       sheet.appendRow([
         new Date(), data.event || "", data.leadId || "", data.locale || "", data.type || "",
         data.name || "", data.company || "", data.country || "", data.contact || "",
         data.product || "", data.quantity || "", data.message || "", data.page || "", data.channel || ""
       ]);
       return ContentService.createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       console.error("Could not append the lead event.", error);
       return ContentService.createTextOutput(JSON.stringify({ ok: false }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. In Apps Script **Project Settings → Script Properties**, add `SHEET_ID` and `LEADS_SECRET`. Use a long random secret and keep it private.
4. Select **Deploy → New deployment → Web app**. Execute as your account and allow access to anyone so the website can post without a Google login. Copy the deployed `/exec` URL.
5. Copy `.env.example` to `.env.local`, then set:

   ```dotenv
   LEADS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   LEADS_SECRET=the-same-long-random-secret
   ```

6. Restart the Next.js server after changing environment variables. Submit a test inquiry and confirm a `lead` row appears; choose WhatsApp or email and confirm a `channel` row with the same `leadId` appears.

The route validates and trims payloads, caps field lengths, rejects a filled honeypot, and applies a basic per-IP in-memory rate limit. Webhook failures are logged server-side and do not interrupt the visitor's email or WhatsApp action. The in-memory limit is per running application instance, so use platform-level request protection if the deployment later needs a distributed limit.

## Content and assets

Real product availability, specifications, market relationships, standards scope, office details and contact routing need confirmation from the Crest team. Mock content is marked in `CONTENT_TODO.md` with a replace instruction beside each item. Replaceable visual assets and their specifications are listed in `ASSETS.md`.
