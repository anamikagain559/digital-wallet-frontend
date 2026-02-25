import { motion } from "framer-motion";
import { FaShieldAlt, FaRocket, FaUsers, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Anamika Gain",
    role: "Co-Founder & CEO",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    linkedin: "#",
  },
  {
    name: "Debabrota Gain",
    role: "CTO",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    linkedin: "#",
  },
  {
    name: "Tanvir Ahmed",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/men/56.jpg",
    linkedin: "#",
  },
];

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Our Story */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-900">
          Our Story
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
          PocketBD was founded with a mission to make digital transactions 
          simple, fast, and secure for everyone in Bangladesh. We value trust, 
          transparency, and innovation in building financial solutions that empower our users.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-blue-900 mb-10">
          Our Mission & Values
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <FaShieldAlt className="text-blue-600 size-8 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Security First</h4>
            <p className="text-gray-600">We protect your money and data with top-notch security measures.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <FaRocket className="text-green-500 size-8 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Innovation</h4>
            <p className="text-gray-600">We continuously improve and innovate for a seamless digital experience.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <FaUsers className="text-purple-500 size-8 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Customer-Centric</h4>
            <p className="text-gray-600">Our users’ satisfaction and trust are at the heart of everything we do.</p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-blue-900 mb-12">
          Meet Our Team
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="font-semibold text-lg">{member.name}</h4>
              <p className="text-gray-600 mb-3">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-2"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
