import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import showcaseImg from "./../../../../public/mockup.png";
export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Background decoration - subtle radial gradients as seen in reference */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f0f9ff] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f5faff] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 -z-10" />

      <div className="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e1f5fe] text-[#00aeef] rounded-full text-[11px] font-black tracking-[0.05em] mb-10 uppercase">
            New: Crypto Integration Now Live
          </div>

          {/* Headline - "The smarter way to manage your money" */}
          <h1 className="text-[64px] lg:text-[76px] font-black text-[#1e293b] leading-[1.05] mb-10 tracking-tight">
            The smarter way <br />
            to <span className="text-[#00aeef]">manage</span> your money
          </h1>

          {/* Subheading */}
          <p className="text-xl text-[#64748b] leading-relaxed mb-12 pr-6">
            Experience the future of digital banking with PocketBD. Secure, fast, and built for your modern lifestyle. Join over 2 million users worldwide.
          </p>

          {/* Call to Actions */}
          <div className="flex items-center gap-5">
            <Button className="h-[60px] px-10 bg-[#00aeef] hover:bg-[#009bd4] text-white rounded-[14px] shadow-[0_12px_24px_rgba(0,174,239,0.25)] transition-all font-black text-base">
              Get Started Now
            </Button>
            <Button variant="ghost" className="group h-[60px] px-8 bg-[#f8fafc] border border-zinc-100 rounded-[14px] font-bold text-[#1e293b] hover:bg-zinc-50 transition-all flex items-center">
              <PlayCircle className="size-6 mr-3 text-zinc-400 group-hover:text-[#00aeef] transition-colors" />
              See how it works
            </Button>
          </div>
        </motion.div>

        {/* Right Content Column - Showcase Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Rounded decorative container */}
          <div className="relative aspect-[16/11] rounded-[60px] bg-[#5a8a8a] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.12)] border-[12px] border-white">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />

            {/* Phone Mockup Image Component */}
            <div className="relative h-full w-full flex justify-center items-center p-8">
              {/* Using the generated image path as source */}
              <img
                src={showcaseImg}
                alt="PocketBD App Interface"
                className="h-[120%] w-auto max-w-none transform translate-y-12 drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Decorative Floating Element */}
          <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-[#00aeef]/10 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
