"use client";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("Error sending message. Please try again.");
    }
  };

  return (
    <main className="container mx-auto p-6 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left section */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-2">Coverage</h1>
          <p className="text-gray-600 mb-8">
            Handles customer inquiries and information management.
          </p>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-bold text-lg">Our Office Address</h3>
              <p className="text-sm">
                Building No. 199, Mao Tse Toung Bldv. (St.245), Sangkat Toul Svay Prey 2, Phnom Penh, Cambodia.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Call Us Anytime</h3>
              <p className="text-sm">+855 979007097</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Send An Email</h3>
              <p className="text-sm">info_customercare@metfone.com.kh / pr.vtz@metfone.com.kh</p>
            </div>
          </div>
        </div>

        {/* Right section: Form */}
        <div className="p-6 md:p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Fill Up The Form</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your email address will not be published. Required fields are marked *
          </p>

          {status && (
            <p className={`mb-4 font-semibold ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {status}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-gray-600">Your Name*</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-gray-600">Email Address*</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-gray-600">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Get In Touch
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
