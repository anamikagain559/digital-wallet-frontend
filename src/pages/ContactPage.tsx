
import ContactForm from "@/components/modules/ContactPage/ContactForm";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-900">
          Contact Us
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Have questions or need support? Send us your inquiry and our team will get back to you promptly.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-blue-600 size-6 mt-1" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">support@pocketbd.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-green-500 size-6 mt-1" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600">+880 123 456 789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-red-500 size-6 mt-1" />
              <div>
                <h4 className="font-semibold">Office</h4>
                <p className="text-gray-600">Dhaka, Bangladesh</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
