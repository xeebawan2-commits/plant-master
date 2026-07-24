import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const payload = await request.json();
    if (!payload.to || !payload.subject) throw new Error("Recipient and subject are required");

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("REPORT_FROM_EMAIL");
    if (!apiKey || !from) throw new Error("Email service secrets are not configured");

    const recipients = String(payload.to).split(",").map((value: string) => value.trim()).filter(Boolean);
    const text = `PLANTMASTER PRO — DAILY EXECUTIVE REPORT
Date: ${payload.date}
Verified by: ${payload.officer}
Sent at: ${payload.sentAt} PKT

EXECUTIVE SUMMARY:
${payload.note}

Plant status, alarms, shift logs and checklist history are maintained in PlantMaster Pro.`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: recipients, subject: payload.subject, text }),
    });

    const result = await response.text();
    if (!response.ok) throw new Error(result);
    return new Response(result, { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error?.message || error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
