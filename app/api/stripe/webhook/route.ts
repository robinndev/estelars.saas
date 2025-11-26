import { emailTemplatePaid } from "@/lib/email/templates/paid";
import { sitesService } from "@/services/sites.service";
import { stripe } from "@/services/stripe.service";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Stripe Webhook Invoked");
    const body = await req.text();

    const signature = req.headers.get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      throw new Error("Missing signature or secret");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session completed event received");
        // Usuário completou a compra - assinatura ou pagamento único
        if (event.data.object.payment_status === "paid") {
          const siteId = event.data.object.metadata?.siteId!;

          const emailTemplate = emailTemplatePaid(
            event.data.object.metadata?.coupleName || "Casal Estelar",
            siteId || ""
          );

          try {
            await sitesService.sendEmailWithCredentials({
              siteId: siteId,
              emailTemplate,
            });
          } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
          }

          try {
            await sitesService.updatePaymentState(siteId, "paid");
          } catch (error) {
            console.error("Erro ao atualizar estado de pagamento:", error);
          }
        }
        break;
      case "checkout.session.async_payment_succeeded":
        // Usuário completou o boleto
        break;
      case "customer.subscription.deleted":
        console.log("Customer subscription deleted event received");
        // Usuário cancelou a assinatura
        break;
      case "checkout.session.async_payment_failed":
        // Usuário não completou o pagamento
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }));
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }
}
