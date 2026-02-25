import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "Free",
      features: ["Send/receive money", "Basic wallet management", "Mobile access"],
      highlighted: false,
    },
    {
      id: 2,
      name: "Pro",
      price: "$9/mo",
      features: ["All Starter features", "Advanced analytics", "Priority support", "Card management"],
      highlighted: true,
    },
    {
      id: 3,
      name: "Business",
      price: "$29/mo",
      features: ["All Pro features", "Team management", "Custom reporting", "API access"],
      highlighted: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-blue-900">
        Pricing Plans
      </h2>
      <p className="text-center text-gray-600 mt-2 mb-12 max-w-xl mx-auto">
        Choose the plan that fits your needs. Upgrade anytime as your business or personal requirements grow.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.2 }}
            className={`bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 ${
              plan.highlighted ? "border-2 border-blue-600 bg-blue-50" : ""
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4">{plan.price}</div>
            <ul className="text-gray-700 mb-6 space-y-2">
              {plan.features.map((feat, idx) => (
                <li key={idx}>• {feat}</li>
              ))}
            </ul>
            <Button asChild size="lg" className={`${plan.highlighted ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
              <a href="/signup">{plan.highlighted ? "Get Pro" : "Select Plan"}</a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
