import HeroSection from "@/components/modules/HomePage/HeroSection"
import { motion } from "framer-motion";


function Homepage() {
  return (
    <div>
        <HeroSection />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
<section className="text-center p-16 bg-blue-50">
<h2 className="text-4xl font-bold mb-4">Welcome to MyService</h2>
<p className="text-lg mb-6">A modern platform designed for your needs</p>
<button className="bg-blue-600 text-white px-6 py-3 rounded-xl mr-4">Get Started</button>
<button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl">Learn More</button>
</section>
</motion.div>
    </div>
  )
}

export default Homepage