import { FaPiggyBank, FaCreditCard, FaBolt, FaMobileAlt, FaShieldAlt, FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  const items = [
    { id: 1, title: "Easy Transfers", desc: "Send money instantly to anyone, anywhere.", icon: <FaBolt className="text-yellow-500 size-6" /> },
    { id: 2, title: "Secure Login", desc: "2FA, biometrics & top-notch security.", icon: <FaShieldAlt className="text-blue-600 size-6" /> },
    { id: 3, title: "Auto-Saving", desc: "Save automatically with round-ups & smart goals.", icon: <FaPiggyBank className="text-teal-500 size-6" /> },
    { id: 4, title: "Mobile Payments", desc: "Pay bills, top-ups & shop directly from your phone.", icon: <FaMobileAlt className="text-green-500 size-6" /> },
    { id: 5, title: "Smart Analytics", desc: "Track expenses and manage budgets with charts.", icon: <FaChartPie className="text-purple-500 size-6" /> },
    { id: 6, title: "Card Management", desc: "Add & manage multiple debit/credit cards easily.", icon: <FaCreditCard className="text-pink-500 size-6" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-blue-900">
        PocketBD Features
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((it, index) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{it.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
            <p className="text-gray-600">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
