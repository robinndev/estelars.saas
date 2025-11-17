import { stripe } from "@/services/stripe.service";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = req.headers.get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      throw new Error("Missing signature or secret");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed":
        if (event.data.object.payment_status === "paid") {
          const siteId = event.data.object.metadata?.siteId;
          console.log("Payment succeeded for site:", siteId);
        }
        // Usuário completou a compra - assinatura ou pagamento único
        console.log("Checkout session completed");
        break;
      case "checkout.session.async_payment_succeeded":
        // Usuário completou o boleto
        break;
      case "customer.subscription.deleted":
        // Usuário cancelou a assinatura
        break;
    }

    return new Response(JSON.stringify({ received: true }));
  } catch (err) {
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }
}
