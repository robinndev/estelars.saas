import { BlogCallout } from "@/src/components/organisms/blog";
import { Faq } from "@/src/components/organisms/faq";
import { Hero } from "@/src/components/organisms/hero";
import HowToMake from "@/src/components/organisms/how-make";
import { Price } from "@/src/components/organisms/price";
import { QrSection } from "@/src/components/organisms/qr";
import { Footer } from "react-day-picker";

export default async function EstelarsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Slug recebido:", slug);

  return (
    <>
      <Hero />
      <HowToMake />
      <Price />
      <Faq />
      <BlogCallout />
      <QrSection />
      <Footer />
    </>
  );
}
