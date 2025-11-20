import React from "react";

export default function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon?: React.ReactNode; }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="text-blue-600 text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
