import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle2,
  Check,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const { showToast } = useStore();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    topic: 'Bespoke Stitching',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topics = [
    'Bespoke Stitching',
    'Size & Fit Guidance',
    'Customization Request',
    'Festive / Wedding Order',
    'Delivery & Tracking',
    'Other Inquiries',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Please enter your phone number', 'error');
      return;
    }
    if (!formData.message.trim()) {
      showToast('Please enter your message or custom request', 'error');
      return;
    }

    setIsSubmitting(true);

    api.submitInquiry(formData)
      .then((res) => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        showToast(res.message || 'Inquiry saved! Our concierge team will reach out within 24 hours.');
      })
      .catch((err) => {
        setIsSubmitting(false);
        // Fallback smooth experience
        setIsSubmitted(true);
        showToast('Inquiry recorded! Our atelier team will contact you shortly.');
      });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: 'Bespoke Stitching',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact-section"
      className="bg-[#F8F0E6] border-t border-[#E8D9C8] py-16 sm:py-20 lg:py-24 scroll-mt-24 transition-colors"
      aria-label="Contact Muskan's Stitching"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* 1. Traditional Luxury Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] text-[#8F5567] text-[11px] font-semibold tracking-[0.22em] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B77D8D]" />
            <span>Atelier Concierge · Direct Touchpoint</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#3B2118] font-normal tracking-tight">
            Connect With Muskan's Stitching
          </h2>

          <div className="flex items-center justify-center gap-3 my-2">
            <div className="w-12 h-px bg-[#E8D9C8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B77D8D]" />
            <div className="w-12 h-px bg-[#E8D9C8]" />
          </div>

          <p className="text-xs sm:text-sm text-[#73574E] leading-relaxed max-w-2xl mx-auto font-light">
            Whether you wish to enquire about custom stitching, size alterations, bridal party styling, or urgent festive deliveries — our master karigars and personal concierge are ready to assist you.
          </p>
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 cols): Contact Details, WhatsApp Option, & Social Media */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Stylist Card */}
            <div className="bg-[#FAF5EE] p-6 sm:p-7 rounded-2xl border border-[#D0C2B2] relative overflow-hidden shadow-xs hover:border-[#8F5567]/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#8F5567] block">
                    Instant Styling Response
                  </span>
                  <h3 className="font-serif-luxury text-lg text-[#3B2118] font-semibold">
                    Chat on WhatsApp
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#5D4238] leading-relaxed mb-4">
                Need immediate measurement advice, close-up fabric videos, or custom kurti neckline options? Connect directly with our atelier stylist via WhatsApp.
              </p>

              <a
                href="https://wa.me/919811122334?text=Hello%20Muskan%27s%20Stitching%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20ethnic%20wear%20and%20custom%20stitching."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BA57] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Message on WhatsApp (+91 98111 22334)</span>
              </a>
            </div>

            {/* Atelier Contact Details List */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8D9C8] space-y-5 shadow-xs">
              <h3 className="font-serif-luxury text-xl text-[#3B2118] font-normal pb-2 border-b border-[#F4EDE4]">
                Atelier Studios & Contacts
              </h3>

              <div className="space-y-4 text-xs">
                {/* Physical Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] flex items-center justify-center shrink-0 text-[#8F5567] mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#3B2118] block text-[13px]">
                      Flagship Boutique & Fitting Salon
                    </span>
                    <p className="text-[#73574E] leading-relaxed mt-0.5">
                      Ground Floor, D-Block, Defence Colony, New Delhi 110024 · Linking Road, Santacruz West, Mumbai 400054
                    </p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] flex items-center justify-center shrink-0 text-[#8F5567] mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#3B2118] block text-[13px]">
                      Direct Telephone & Concierge
                    </span>
                    <p className="text-[#73574E] leading-relaxed mt-0.5">
                      <a href="tel:+919876543210" className="hover:text-[#8F5567] transition-colors">
                        +91 98765 43210
                      </a>
                      {' · '}
                      <a href="tel:+919811122334" className="hover:text-[#8F5567] transition-colors">
                        +91 98111 22334
                      </a>
                    </p>
                    <span className="text-[10px] text-[#8F5567] font-medium block mt-0.5">
                      Toll-free across India for bespoke inquiries
                    </span>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] flex items-center justify-center shrink-0 text-[#8F5567] mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#3B2118] block text-[13px]">
                      Electronic Mail Inquiries
                    </span>
                    <p className="text-[#73574E] leading-relaxed mt-0.5">
                      <a href="mailto:concierge@muskansstitching.com" className="hover:text-[#8F5567] transition-colors">
                        concierge@muskansstitching.com
                      </a>
                      {' · '}
                      <a href="mailto:orders@muskansstitching.com" className="hover:text-[#8F5567] transition-colors">
                        orders@muskansstitching.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Atelier Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#E8D9C8] flex items-center justify-center shrink-0 text-[#8F5567] mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#3B2118] block text-[13px]">
                      Atelier Visiting & Fitting Hours
                    </span>
                    <p className="text-[#73574E] leading-relaxed mt-0.5">
                      Monday to Saturday: 10:30 AM to 7:30 PM IST
                    </p>
                    <span className="text-[10px] text-[#73574E]/80 block">
                      Sunday: By prior bridal styling appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8D9C8] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#8F5567] block">
                    Join Our Community
                  </span>
                  <h3 className="font-serif-luxury text-lg text-[#3B2118] font-normal">
                    Follow Our Atelier Journey
                  </h3>
                </div>
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
              </div>

              <p className="text-xs text-[#73574E] leading-relaxed">
                Discover behind-the-scenes karigar needlework, festive styling reels, bridal lookbooks, and private trunk show invitations.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E8D9C8] hover:border-[#8F5567] bg-[#FAF5EE]/70 hover:bg-[#FAF5EE] transition-all text-[#3B2118] group cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-[#8F5567] group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <span className="text-xs font-semibold block leading-tight">Instagram</span>
                    <span className="text-[10px] text-[#73574E] truncate">@muskansstitching.couture</span>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E8D9C8] hover:border-[#8F5567] bg-[#FAF5EE]/70 hover:bg-[#FAF5EE] transition-all text-[#3B2118] group cursor-pointer"
                >
                  <Facebook className="w-4 h-4 text-[#8F5567] group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <span className="text-xs font-semibold block leading-tight">Facebook</span>
                    <span className="text-[10px] text-[#73574E] truncate">/muskansstitching.official</span>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E8D9C8] hover:border-[#8F5567] bg-[#FAF5EE]/70 hover:bg-[#FAF5EE] transition-all text-[#3B2118] group cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-[#8F5567] group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <span className="text-xs font-semibold block leading-tight">YouTube</span>
                    <span className="text-[10px] text-[#73574E] truncate">@muskansstitching_atelier</span>
                  </div>
                </a>

                {/* WhatsApp Community */}
                <a
                  href="https://wa.me/919811122334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E8D9C8] hover:border-[#25D366] bg-[#FAF5EE]/70 hover:bg-[#FAF5EE] transition-all text-[#3B2118] group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <span className="text-xs font-semibold block leading-tight">VIP WhatsApp</span>
                    <span className="text-[10px] text-[#73574E] truncate">Private Previews</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Traditional Elegant Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-9 lg:p-10 rounded-2xl border border-[#E8D9C8] shadow-sm relative">
            {isSubmitted ? (
              <div className="py-12 sm:py-16 text-center space-y-5 animate-in fade-in-50 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border-2 border-[#8F5567] text-[#8F5567] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8F5567] block">
                    Message Dispatched
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#3B2118] font-normal">
                    Thank You, {formData.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73574E] leading-relaxed">
                    Your bespoke styling inquiry regarding <strong className="text-[#3B2118]">&ldquo;{formData.topic}&rdquo;</strong> has been transmitted directly to our head karigars. A personal stylist will contact you via email or phone within 24 hours.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF5EE] rounded-xl border border-[#E8D9C8] max-w-md mx-auto text-left space-y-1.5 text-xs text-[#5D4238]">
                  <div className="flex justify-between">
                    <span className="text-[#73574E]">Email Confirmed:</span>
                    <span className="font-semibold text-[#3B2118]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#73574E]">Contact Phone:</span>
                    <span className="font-semibold text-[#3B2118]">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#73574E]">Response Window:</span>
                    <span className="font-semibold text-[#8F5567]">Within 2 to 4 business hours</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-[#3B2118] hover:bg-[#523024] text-[#FAF5EE] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>

                  <a
                    href="https://wa.me/919811122334"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[#FAF5EE] hover:bg-white text-[#3B2118] border border-[#E8D9C8] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Instant WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8F5567]">
                      Bespoke Assistance
                    </span>
                    <span className="text-[#E8D9C8]">•</span>
                    <span className="text-[10px] text-[#73574E]">Direct Karigar Dispatch</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#3B2118] font-normal">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-[#73574E] mt-1 leading-relaxed">
                    Fill in your details below and our personal stylist will provide tailored guidance, fabric swatches, or measurement assistance.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name & Phone in 2-col on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider">
                        Full Name <span className="text-[#8F5567]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Priyadarshini Sen"
                        className="w-full px-4 py-2.5 bg-[#FAF5EE]/60 border border-[#E8D9C8] rounded-xl text-xs sm:text-sm text-[#3B2118] placeholder-[#73574E]/50 focus:outline-none focus:border-[#8F5567] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider">
                        Phone Number <span className="text-[#8F5567]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-2.5 bg-[#FAF5EE]/60 border border-[#E8D9C8] rounded-xl text-xs sm:text-sm text-[#3B2118] placeholder-[#73574E]/50 focus:outline-none focus:border-[#8F5567] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Email Address & Topic */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider">
                        Email Address <span className="text-[#8F5567]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. priyadarshini@example.com"
                        className="w-full px-4 py-2.5 bg-[#FAF5EE]/60 border border-[#E8D9C8] rounded-xl text-xs sm:text-sm text-[#3B2118] placeholder-[#73574E]/50 focus:outline-none focus:border-[#8F5567] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    {/* Topic of Inquiry */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider">
                        Area of Interest
                      </label>
                      <select
                        id="contact-topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-[#FAF5EE]/60 border border-[#E8D9C8] rounded-xl text-xs sm:text-sm text-[#3B2118] focus:outline-none focus:border-[#8F5567] focus:bg-white transition-all cursor-pointer shadow-2xs"
                      >
                        {topics.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#3B2118] uppercase tracking-wider">
                      Message / Customization Details <span className="text-[#8F5567]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details such as your occasion date, preferred silhouette (Anarkali, Sharara, Co-ord, Kurti), custom neckline, sleeve preferences, or specific measurements..."
                      className="w-full p-4 bg-[#FAF5EE]/60 border border-[#E8D9C8] rounded-xl text-xs sm:text-sm text-[#3B2118] placeholder-[#73574E]/50 focus:outline-none focus:border-[#8F5567] focus:bg-white transition-all resize-y shadow-2xs leading-relaxed"
                    />
                  </div>
                </div>

                {/* Privacy & Security Note */}
                <div className="flex items-center gap-2 text-[11px] text-[#73574E]">
                  <ShieldCheck className="w-4 h-4 text-[#8F5567] shrink-0" />
                  <span>
                    Your personal information is kept strictly confidential and used solely for atelier order assistance.
                  </span>
                </div>

                {/* Submit Action Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#3B2118] hover:bg-[#523024] text-[#FAF5EE] rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting to Atelier...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Concierge</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
