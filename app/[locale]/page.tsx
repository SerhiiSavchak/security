import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Services dict={dict} />
      <WhyUs dict={dict} />
      <Process dict={dict} />
      <Testimonials dict={dict} />
      <CTA dict={dict} />
    </>
  );
}
