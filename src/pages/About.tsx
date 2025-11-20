export default function About() {
  return (
    <>
  <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold">Our Story</h2>
      <p className="mt-4 text-gray-600">Short mission, values, and team description...</p>
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Team cards */}
        <div className="bg-white p-6 rounded-xl shadow">Team member</div>
        <div className="bg-white p-6 rounded-xl shadow">Team member</div>
        <div className="bg-white p-6 rounded-xl shadow">Team member</div>
      </div>
    </div>
    </>
  );
}
