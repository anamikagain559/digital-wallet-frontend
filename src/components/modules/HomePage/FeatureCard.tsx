import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode; }) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all duration-500 overflow-hidden"
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-200 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          {icon}
        </div>
        <h4 className="text-xl font-bold mb-3 text-blue-950 group-hover:text-blue-700 transition-colors duration-300">{title}</h4>
        <p className="text-gray-600 leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  );
}
