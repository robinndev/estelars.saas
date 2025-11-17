import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

type PaymentMethodType = Stripe.Checkout.SessionCreateParams.PaymentMethodType;

export const stripeService = {
  async createCheckoutSession({
    siteId,
    payment_methods,
    plan_type,
  }: {
    siteId: string;
    payment_methods?: PaymentMethodType[];
    plan_type: "normal" | "premium";
  }) {
    return await stripe.checkout.sessions.create({
      mode: plan_type === "normal" ? "subscription" : "payment",
      payment_method_types: payment_methods || ["card"],
      line_items: [
        {
          price:
            plan_type === "normal"
              ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID!
              : process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success/${siteId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel/${siteId}`,
      metadata: { siteId },
    });
  },
};
