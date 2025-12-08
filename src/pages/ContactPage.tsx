
import ContactForm from "@/components/modules/ContactPage/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold">Contact Us</h2>
      <p className="text-gray-600 mt-2">Send us your inquiry — we’ll get back shortly.</p>
      <div className="mt-6 max-w-xl">
        <ContactForm />
      </div>
    </div>
  );
}
