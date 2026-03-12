import HeroSection from "@/components/modules/HomePage/HeroSection";
import { motion, useScroll, useTransform } from "framer-motion";
import FeatureCard from "@/components/modules/HomePage/FeatureCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fakeFetchFeatures } from "@/utils/fakeApi";
import { FaPiggyBank, FaCreditCard, FaChartLine, FaUmbrella, FaWallet, FaShieldAlt, FaBolt, FaMobileAlt, FaChartPie, FaUserFriends, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from "react";

interface Feature {
  id: number;
  title: string;
  desc: string;
}

function Homepage() {
  const [loading, setLoading] = React.useState(true);
  const [features, setFeatures] = React.useState<Feature[]>([]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  React.useEffect(() => {
    fakeFetchFeatures().then((res) => {
      setFeatures(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#fcfdfe] overflow-hidden">

      {/* Hero Section */}
      <motion.div style={{ scale }}>
        <HeroSection />
      </motion.div>

      {/* Features Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-blue-100/30 blur-[100px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-teal-50/20 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-4">
              Everything You Need in Your Pocket
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Powerful features designed to make your financial life effortless, secure, and fast.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[280px] lg:min-w-[320px] shrink-0 snap-center">
                  <SkeletonCard />
                </div>
              ))
            ) : (
              features.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[280px] lg:min-w-[320px] shrink-0 snap-center"
                >
                  <FeatureCard
                    title={f.title}
                    desc={f.desc}
                    icon={
                      f.id === 1
                        ? <FaPiggyBank />
                        : f.id === 2
                        ? <FaCreditCard />
                        : f.id === 3
                        ? <FaChartLine />
                        : f.id === 4
                        ? <FaUmbrella />
                        : f.id === 5
                        ? <FaWallet />
                        : <FaUserFriends />
                    }
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Welcome Section / About */}
      <section className="py-24 px-4 bg-[#f0f9ff]/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white border border-[#00aeef]/10 p-8 md:p-20 rounded-[3rem] shadow-[0_20px_60px_rgba(0,174,239,0.05)] overflow-hidden"
          >
            {/* Abstract Background Design Elements */}
            <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#00aeef]/5 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-400/5 blur-[80px] rounded-full" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-black text-[#1e293b] leading-tight">
                  Welcome to the <br /> Future of <span className="text-[#00aeef]">Money</span>
                </h3>
                <p className="mt-8 text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                  PocketBD is Bangladesh’s fastest and most secure digital wallet. 
                  Send money, pay bills, top up mobile, and track your transactions—all in one elegant app. 
                  Designed for simplicity, speed, and safety.
                </p>
                <div className="mt-10">
                  <Button asChild size="lg" className="h-14 px-8 bg-[#00aeef] hover:bg-[#009bd4] text-white hover:scale-105 active:scale-95 transition-all duration-300 font-bold rounded-[14px] shadow-[0_8px_20px_rgba(0,174,239,0.3)]">
                    <a href="/login">Explore All Features <FaArrowRight className="ml-2 size-4" /></a>
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { icon: FaShieldAlt, title: "Secure", color: "text-[#00aeef]", bg: "bg-[#00aeef]/10", desc: "Advanced encryption" },
                  { icon: FaBolt, title: "Instant", color: "text-amber-500", bg: "bg-amber-500/10", desc: "No delays, no wait" },
                  { icon: FaMobileAlt, title: "Mobile", color: "text-teal-500", bg: "bg-teal-500/10", desc: "Effortless on go" },
                  { icon: FaChartPie, title: "Insights", color: "text-indigo-500", bg: "bg-indigo-500/10", desc: "Smart spending" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-[24px] border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-[#00aeef]/30 hover:shadow-[0_15px_40px_rgba(0,174,239,0.08)] transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-[14px] ${item.bg} flex items-center justify-center mb-5`}>
                      <item.icon className={`size-6 ${item.color}`} />
                    </div>
                    <h4 className="font-extrabold text-lg text-[#1e293b] mb-1">{item.title}</h4>
                    <p className="text-zinc-500 text-sm font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00aeef]/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[#1e293b] mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-zinc-500 text-lg font-medium">
              Three simple steps to join the digital revolution.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            {/* Connector Line (Desktop) */}
            <div className="absolute top-[4.5rem] left-[16%] w-[68%] h-0.5 bg-gradient-to-r from-transparent via-[#00aeef]/30 to-transparent hidden md:block" />

            {[
              { icon: FaWallet, title: "Create Wallet", desc: "Sign up and set up your PocketBD wallet in minutes.", color: "bg-[#00aeef]" },
              { icon: FaCreditCard, title: "Add Money", desc: "Top up via bank transfer, card, or agent cash-in.", color: "bg-[#00aeef]" },
              { icon: FaBolt, title: "Pay & Transfer", desc: "Send money or pay bills instantly with zero hassle.", color: "bg-[#00aeef]" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center p-8 bg-[#f8fafc] rounded-[2.5rem] border border-zinc-100 shadow-sm"
              >
                <div className={`w-20 h-20 ${step.color} flex items-center justify-center text-white text-3xl rounded-3xl shadow-xl shadow-[#00aeef]/20 mb-8 relative group`}>
                  <step.icon className="transition-transform group-hover:scale-110" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-zinc-100 rounded-full flex items-center justify-center text-[#1e293b] font-black text-sm shadow-sm opacity-100">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-black text-[#1e293b] mb-4">{step.title}</h4>
                <p className="text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-[#f8fafc]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[#1e293b] mb-4">
              What Our Community Says
            </h2>
            <p className="text-zinc-500 text-lg font-medium">
              Join millions of users who trust PocketBD for their daily needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Aisha Rahman",
                role: "Online Business Owner",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                review: "PocketBD has made accepting customer payments effortless. Payments arrive instantly — highly recommended!"
              },
              {
                name: "Farhan Ahmed",
                role: "Freelance Developer",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                review: "I use PocketBD every day to transfer money to clients and family. Fast, secure, and very user-friendly."
              },
              {
                name: "Nusrat Jahan",
                role: "University Student",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                review: "Saving money and paying friends has become so simple. PocketBD is my go-to wallet app!"
              }
            ].map((user, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 hover:border-[#00aeef]/30 hover:shadow-xl hover:shadow-[#00aeef]/5 transition-all duration-500 relative"
              >
                <FaQuoteLeft className="text-zinc-100 absolute top-8 right-8 size-12 pointer-events-none group-hover:text-[#00aeef]/10 transition-colors" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-zinc-100" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00aeef] rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                    </div>
                    <div>
                      <span className="font-black text-lg text-[#1e293b] block">{user.name}</span>
                      <span className="text-sm font-semibold text-zinc-500">{user.role}</span>
                    </div>
                  </div>

                  <p className="text-zinc-600 leading-relaxed font-medium text-lg">
                    "{user.review}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#00aeef] to-[#009bd4] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,174,239,0.3)]"
          >
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-black/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                Ready to Simplify Your Money?
              </h2>
              <p className="text-white/90 text-xl font-medium mb-12">
                Join thousands of PocketBD users and start managing your finances the smart way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="h-16 px-10 text-lg font-black rounded-[14px] bg-white text-[#00aeef] hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                  <a href="/login">Create Free Wallet</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg font-black rounded-[14px] border-white/30 text-white hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm">
                  <a href="/about">Learn More</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default Homepage;
