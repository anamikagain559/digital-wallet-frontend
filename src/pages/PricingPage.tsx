

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold">Pricing</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Starter</h3>
          <div className="text-2xl font-bold mt-4">Free</div>
          <p className="mt-2 text-gray-600">Basic account features</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-2 border-blue-600">
          <h3 className="font-semibold">Pro</h3>
          <div className="text-2xl font-bold mt-4">$9/mo</div>
          <p className="mt-2 text-gray-600">Added benefits</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Business</h3>
          <div className="text-2xl font-bold mt-4">$29/mo</div>
          <p className="mt-2 text-gray-600">For companies</p>
        </div>
      </div>
    </div>
  );
}
