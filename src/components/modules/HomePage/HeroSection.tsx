import { Link } from "react-router";
import { motion } from "framer-motion";
const HeroSection = () => {
  return (
     <section className="bg-gradient-to-br from-blue-600 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-20 md:flex md:items-center md:justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Simplify your financial journey</h1>
          <p className="mt-4 text-blue-100">Secure accounts, easy transfers, and personalized advice — all in one place.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold">Get started</Link>
            <Link to="/features" className="border border-white/60 px-5 py-3 rounded">Learn more</Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mt-8 md:mt-0">
          <div className="w-72 h-72 bg-white/10 rounded-xl flex items-center justify-center">
            {/* you can replace next block with an illustration */}
            <img src="/bank-illustration.png" alt="bank" className="w-56" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection