import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { ResponseTimeline } from "@/components/sections/response-timeline";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <ResponseTimeline />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
