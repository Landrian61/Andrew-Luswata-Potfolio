"use client";

import { isValidEmail } from "@/utils/check-email";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from "react-toastify";
import Magnetic from "../site/magnetic";

function ContactForm() {
  const [input, setInput] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: false, required: false });
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.name || !input.email || !input.message) {
      setErrors({ ...errors, required: true });
      return;
    }
    if (!isValidEmail(input.email)) {
      setErrors({ ...errors, email: true });
      return;
    }
    setErrors({ email: false, required: false });
    setSending(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    let delivered = false;

    try {
      if (serviceID && templateID && publicKey) {
        const res = await emailjs.send(serviceID, templateID, input, { publicKey });
        if (res.status === 200) delivered = true;
      }
    } catch {
      // fall through to the API channel
    }

    try {
      const res = await axios.post("/api/contact", input);
      if (res.data?.success) delivered = true;
    } catch {
      // both channels can fail independently
    }

    setSending(false);

    if (delivered) {
      toast.success("Message sent — I'll get back to you soon.");
      setInput({ name: "", email: "", message: "" });
    } else {
      toast.error("Couldn't send right now — opening your mail app instead.");
      window.location.href = `mailto:luswataandrew190@gmail.com?subject=Hello from ${encodeURIComponent(
        input.name
      )}&body=${encodeURIComponent(input.message)}`;
    }
  };

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-6">
      <div>
        <label htmlFor="cf-name" className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Your name
        </label>
        <input
          id="cf-name"
          className="field font-sans text-lg"
          type="text"
          maxLength={100}
          placeholder="Ada Lovelace"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="cf-email" className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Your email
        </label>
        <input
          id="cf-email"
          className="field font-sans text-lg"
          type="email"
          maxLength={100}
          placeholder="you@example.com"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          onBlur={() => setErrors({ ...errors, email: input.email !== "" && !isValidEmail(input.email) })}
        />
        {errors.email && (
          <p className="mt-2 font-mono text-xs text-red-400">Please provide a valid email.</p>
        )}
      </div>

      <div>
        <label htmlFor="cf-message" className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Your message
        </label>
        <textarea
          id="cf-message"
          className="field font-sans text-lg resize-none"
          maxLength={500}
          rows={4}
          placeholder="Let's build something impossible…"
          value={input.message}
          onChange={(e) => setInput({ ...input, message: e.target.value })}
        />
      </div>

      {errors.required && (
        <p className="font-mono text-xs text-red-400">All three fields are required.</p>
      )}

      <Magnetic className="self-start">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-full bg-accent text-ink font-mono text-xs uppercase tracking-[0.18em] px-8 py-4 hover:bg-paper transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait"
        >
          {sending ? "Sending…" : "Send message"} <FiArrowUpRight size={16} />
        </button>
      </Magnetic>
    </form>
  );
}

export default ContactForm;
