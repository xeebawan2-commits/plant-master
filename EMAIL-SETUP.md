# One-time automatic email setup

The PWA first calls the Supabase Edge Function `send-maintenance-report`. If it has not been deployed, the app opens a complete Gmail compose window and asks the user to confirm after pressing Send.

To enable direct server-side delivery:

```bash
supabase functions deploy send-maintenance-report --project-ref hbagiydystgdtjekbauh
supabase secrets set RESEND_API_KEY=YOUR_RESEND_KEY --project-ref hbagiydystgdtjekbauh
supabase secrets set REPORT_FROM_EMAIL="PlantMaster Pro <reports@your-verified-domain.com>" --project-ref hbagiydystgdtjekbauh
```

`REPORT_FROM_EMAIL` must use a sender/domain verified by Resend. Never place the Resend secret inside `index.html`.
