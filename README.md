# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contactformulier → e-mail (Google Workspace)

De contactformulieren posten naar de Vercel serverless functie `api/contact.js`,
die de inzending via Google Workspace (SMTP) mailt naar `info@bluestardevelopment.nl`
en de bezoeker een bevestigingsmail stuurt. Er is geen externe formulierdienst meer.

### Eenmalige setup

1. Zet **2-stapsverificatie** aan op het Google Workspace-account.
2. Genereer een **App-wachtwoord** (Google-account → Beveiliging → App-wachtwoorden).
3. Voeg in Vercel (Project → Settings → Environment Variables) toe, voor zowel
   Production als Preview:
   - `SMTP_USER` = `info@bluestardevelopment.nl`
   - `SMTP_PASS` = het gegenereerde App-wachtwoord
   - `CONTACT_TO` = (optioneel) doel-inbox, standaard `info@bluestardevelopment.nl`
4. Deploy opnieuw.

### Lokaal testen

De gewone `vite`-devserver draait de serverless functie niet. Test het endpoint via:

- `vercel dev` (haalt de env-vars op uit Vercel, of uit een lokaal `.env.local`), of
- een Vercel **preview-deploy** en stuur één testbericht.
