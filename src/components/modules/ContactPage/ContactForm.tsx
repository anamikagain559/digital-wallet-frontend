import React from "react";

export default function ContactForm() {
  const [state, setState] = React.useState({name:"", email:"", message:""});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    // Simulate network
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("Ваше сообщение получено. Мы скоро ответим.");
      setState({name:"", email:"", message:""});
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      <label className="block mb-2 text-sm">Name</label>
      <input value={state.name} onChange={(e)=>setState({...state, name:e.target.value})} className="border p-3 rounded w-full mb-3" required />
      <label className="block mb-2 text-sm">Email</label>
      <input value={state.email} onChange={(e)=>setState({...state, email:e.target.value})} type="email" className="border p-3 rounded w-full mb-3" required />
      <label className="block mb-2 text-sm">Message</label>
      <textarea value={state.message} onChange={(e)=>setState({...state, message:e.target.value})} className="border p-3 rounded w-full mb-3" rows={5} required />
      <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-5 py-2 rounded">
        {submitting ? "Sending..." : "Send message"}
      </button>
      {success && <div className="mt-3 text-green-600">{success}</div>}
    </form>
  );
}
