"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiMail, FiMapPin } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const inputClasses = (field: string) =>
    `w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 
     ring-1 transition-all duration-300
     ${
       errors[field]
         ? "ring-red-500/50 focus:ring-red-500"
         : focused === field
           ? "ring-indigo-500/50 bg-white/[0.05]"
           : "ring-white/[0.06] hover:ring-white/[0.12]"
     }
     focus:bg-white/[0.05] focus:ring-indigo-500/50 focus:outline-none`;

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have something in mind? I'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  Let&apos;s connect
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  I&apos;m currently looking for internship opportunities in
                  full-stack development and AI engineering. Whether you have a
                  question or just want to say hi, my inbox is always open.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="glass group flex items-center gap-4 rounded-xl p-4 transition-all hover:border-indigo-500/20 hover:bg-indigo-500/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Email</p>
                    <p className="text-sm text-slate-300">{personalInfo.email}</p>
                  </div>
                </a>

                <div className="glass flex items-center gap-4 rounded-xl p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Location</p>
                    <p className="text-sm text-slate-300">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                    >
                      <FiCheck size={28} />
                    </motion.div>
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      Message sent!
                    </h3>
                    <p className="text-sm text-slate-400">
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={inputClasses("name")}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={inputClasses("email")}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        placeholder="Your message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        className={`${inputClasses("message")} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                    >
                      <span className="relative z-10">Send Message</span>
                      <FiSend
                        size={16}
                        className="relative z-10 transition-transform group-hover:translate-x-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
