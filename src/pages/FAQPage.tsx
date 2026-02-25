import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQPage() {
  const qna = [
    { q: "How do I open an account?", a: "You can sign up using our Get Started flow." },
    { q: "Is my money safe?", a: "Yes — we use industry-standard encryption." },
    { q: "Can I send money internationally?", a: "Currently, PocketBD supports domestic transfers only." },
    { q: "How do I reset my password?", a: "Use the Forgot Password link on the login page to reset it." },
    { q: "Is there a mobile app?", a: "Yes, PocketBD is available on both Android and iOS." },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-blue-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2 text-center max-w-xl mx-auto">
          Have questions? Here are some answers to common queries about PocketBD.
        </p>

        <div className="mt-10 grid gap-4">
          {qna.map((item, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <summary className="flex items-center gap-3 font-medium cursor-pointer text-blue-900">
                <FaQuestionCircle className="text-blue-600 size-5" />
                {item.q}
              </summary>
              <p className="mt-3 text-gray-600">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </div>
  );
}
