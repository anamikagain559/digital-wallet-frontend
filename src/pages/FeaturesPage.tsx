import React from "react";
import FeatureCard from "@/components/modules/HomePage/FeatureCard";

export default function FeaturesPage() {
  const items = [
    { id:1, title: "Easy Transfers", desc: "Send money instantly." },
    { id:2, title: "Secure Login", desc: "2FA & biometric support" },
    { id:3, title: "Auto-saving", desc: "Save with round-ups" },
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-6">Features</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(it => <FeatureCard key={it.id} title={it.title} desc={it.desc} />)}
      </div>
    </div>
  );
}
