import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  Cpu,
  CircuitBoard,
  Code2,
  Server,
  Network,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/supabase/client";
import { clubInfo } from "@/data/content";

// Floating element
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

// Tech Background Component (unchanged)
const TechBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-64 h-64 border border-blue-500/20 rounded-lg transform rotate-45 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 border border-purple-500/20 rounded-lg transform -rotate-12 animate-pulse delay-700"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-green-500/20 rounded-lg transform rotate-90 animate-pulse delay-300"></div>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ UPDATED: Submits to Supabase Database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }
    ]);

    if (error) {
      console.error("Submission Error:", error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden">
      <TechBackground />

      <div className="container mx-auto max-w-6xl">
        <FloatingElement delay={0.1}>
          <h2 className="text-center text-6xl font-extrabold mb-12">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
        </FloatingElement>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FloatingElement delay={0.3}>
            <motion.div className="glass-effect p-8 rounded-3xl border border-white/20 backdrop-blur-sm">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-neutral-300 mt-2">We will reply soon.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm text-neutral-300 mb-2 block">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="bg-neutral-900/50 text-white border-white/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-neutral-300 mb-2 block">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-neutral-900/50 text-white border-white/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-neutral-300 mb-2 block">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Write your message..."
                      className="bg-neutral-900/50 text-white border-white/20"
                    />
                  </div>

                  <Button disabled={isSubmitting} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>
          </FloatingElement>

          {/* Contact Information */}
          <FloatingElement delay={0.4}>
            <div className="space-y-8 text-neutral-300 text-lg">
              <p><Mail className="inline mr-3" /> {clubInfo.contact.email}</p>
              <p><MapPin className="inline mr-3" /> {clubInfo.contact.address}</p>
              <p><Phone className="inline mr-3" /> {clubInfo.contact.phone}</p>
            </div>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
};

export default Contact;
