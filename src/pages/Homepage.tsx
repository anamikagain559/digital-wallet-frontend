import HeroSection from "@/components/modules/HomePage/HeroSection"
import { motion } from "framer-motion";
import FeatureCard from "@/components/modules/HomePage/FeatureCard";
import SkeletonCard from "@/components/SkeletonCard";
import { fakeFetchFeatures } from "@/utils/fakeApi";
import { FaPiggyBank, FaCreditCard, FaChartLine, FaUmbrella } from "react-icons/fa";
import React from "react";
function Homepage() {
    const [loading, setLoading] = React.useState(true);
  const [features, setFeatures] = React.useState<any[]>([]);

  React.useEffect(() => {
    fakeFetchFeatures().then((res) => {
      setFeatures(res);
      setLoading(false);
    });
  }, []);
  return (
    <div>
        <HeroSection />
         <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-4">
          {loading ? (
            [1,2,3,4].map(i => <SkeletonCard key={i} />)
          ) : (
            features.map((f) => (
              <FeatureCard key={f.id} title={f.title} desc={f.desc} icon={
                f.id===1 ? <FaPiggyBank /> : f.id===2 ? <FaCreditCard /> : f.id===3 ? <FaChartLine /> : <FaUmbrella />
              }/>
            ))
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-2xl font-semibold">Welcome to BankCo</h3>
          <p className="mt-3 text-gray-600">We offer a range of banking services to meet your needs...</p>
        </motion.div>
      </section>
    </div>
  )
}

export default Homepage