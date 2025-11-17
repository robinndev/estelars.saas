import { sitesService } from "@/services/sites.service";
import { stripeService } from "@/services/stripe.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const site = await sitesService.createDraft({
      couple_name: body.couple_name,
      start_date: new Date(body.start_date),
      start_hour: body.start_hour,
      message: body.message,
      color: body.color,
      music: body.music ?? undefined,
      plan: body.plan,
      plan_price: body.plan_price,
      email_address: body.email_address,
      is_recurring: body.is_recurring,
      billing_cycle: body.billing_cycle,
      images: body.images,
    });

    const checkoutSession = await stripeService.createCheckoutSession({
      siteId: site.id,
      payment_methods: ["card"],
      plan_type: body.plan_type,
    });

    return Response.json({
      checkout_url: checkoutSession.url,
      site_id: site.id,
    });
  } catch (error: any) {
    console.error("Erro na rota POST /api/sites:", error);
    return Response.json(
      { error: error.message || "Erro ao criar site" },
      { status: 500 }
    );
  }
}
