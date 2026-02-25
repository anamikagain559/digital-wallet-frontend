import HeroSection from "@/components/modules/HomePage/HeroSection";
import { motion } from "framer-motion";
import FeatureCard from "@/components/modules/HomePage/FeatureCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fakeFetchFeatures } from "@/utils/fakeApi";
import { FaPiggyBank, FaCreditCard, FaChartLine, FaUmbrella, FaWallet, FaShieldAlt, FaBolt, FaMobileAlt, FaChartPie, FaUserFriends } from "react-icons/fa";
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

  React.useEffect(() => {
    fakeFetchFeatures().then((res) => {
      setFeatures(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-900">
          Why Choose PocketBD
        </h2>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
          ) : (
            features.map((f) => (
              <FeatureCard
                key={f.id}
                title={f.title}
                desc={f.desc}
                icon={
                  f.id === 1
                    ? <FaPiggyBank className="text-blue-600 size-6" />
                    : f.id === 2
                    ? <FaCreditCard className="text-green-500 size-6" />
                    : f.id === 3
                    ? <FaChartLine className="text-purple-500 size-6" />
                    : f.id === 4
                    ? <FaUmbrella className="text-yellow-500 size-6" />
                    : f.id === 5
                    ? <FaWallet className="text-teal-500 size-6" />
                    : <FaUserFriends className="text-pink-500 size-6" />
                }
              />
            ))
          )}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-white p-8 md:p-12 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl md:text-4xl font-semibold text-blue-900">
            Welcome to PocketBD
          </h3>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            PocketBD is Bangladesh’s fastest and most secure digital wallet. 
            Send money, pay bills, top up mobile, and track your transactions—all in one app. 
            Designed for simplicity, speed, and safety, PocketBD puts your money in your pocket, anytime, anywhere.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-blue-600 size-5 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Secure Transactions</h4>
                <p className="text-gray-600">Your money and data are protected with advanced encryption.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaBolt className="text-yellow-500 size-5 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Instant Payments</h4>
                <p className="text-gray-600">Send or receive money in seconds without delays or hidden fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMobileAlt className="text-green-500 size-5 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Mobile-Friendly</h4>
                <p className="text-gray-600">Fully optimized for smartphones, making transactions effortless on the go.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaChartPie className="text-purple-500 size-5 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Expense Tracking</h4>
                <p className="text-gray-600">Visualize and manage your spending with smart insights and charts.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href="/login">Get Started</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12 text-blue-900">
          How PocketBD Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <FaWallet className="mx-auto text-teal-500 size-8 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Create Wallet</h4>
            <p className="text-gray-600">Sign up and set up your PocketBD wallet in minutes.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <FaCreditCard className="mx-auto text-green-500 size-8 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Add Money</h4>
            <p className="text-gray-600">Top up your wallet via bank transfer, card, or agent cash-in.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <FaBolt className="mx-auto text-yellow-500 size-8 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Pay & Transfer</h4>
            <p className="text-gray-600">Send money, pay bills, or transfer to friends instantly.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12 text-blue-900">
          What Our Users Say
        </h2>
     <div className="grid gap-8 md:grid-cols-3">
  {[
    {
      name: "Aisha Rahman",
      role: "Online Business Owner",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "PocketBD has made accepting customer payments effortless. Payments arrive instantly — highly recommended!",
    },
    {
      name: "Farhan Ahmed",
      role: "Freelance Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "I use PocketBD every day to transfer money to clients and family. Fast, secure, and very user-friendly.",
    },
    {
      name: "Nusrat Jahan",
      role: "University Student",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      review:
        "Saving money and paying friends has become so simple. PocketBD is my go-to wallet app!",
    },
  ].map((user, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 + i * 0.2 }}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <span className="font-semibold block">{user.name}</span>
          <span className="text-sm text-gray-500">{user.role}</span>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed">
        “{user.review}”
      </p>
    </motion.div>
  ))}
</div>

      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Ready to Simplify Your Money?
          </h2>
          <p className="text-white text-lg mb-8">
            Join thousands of PocketBD users and start managing your finances the smart way.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <a href="/login">Create Your Wallet</a>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Homepage;
