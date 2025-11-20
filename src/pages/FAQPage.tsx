import React from "react";

export default function FAQPage() {
  const qna = [
    {q:"How do I open an account?", a:"You can sign up using our Get Started flow."},
    {q:"Is my money safe?", a:"Yes — we use industry-standard encryption."},
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold">FAQ</h2>
      <div className="mt-6 grid gap-4">
        {qna.map((q, i) => (
          <details key={i} className="bg-white p-4 rounded-xl shadow">
            <summary className="font-medium cursor-pointer">{q.q}</summary>
            <p className="mt-2 text-gray-600">{q.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
