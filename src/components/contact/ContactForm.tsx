'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate form submission
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        pointerEvents: 'none',
      });
    }

    if (successRef.current) {
      gsap.fromTo(
        successRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
        }
      );
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="max-w-2xl mx-auto text-center py-12 opacity-0"
      >
        <div className="bg-white/5 border border-white/10 rounded-lg p-12">
         <h3 className="text-3xl font-light text-white mb-4">{`Thank you for reaching out.`}</h3>
         <p className="text-white/60 mb-8">{`We've received your message and will get back to you within 48 hours.`}</p>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                projectType: '',
                budget: '',
                message: '',
              });
              if (formRef.current) {
                gsap.to(formRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  pointerEvents: 'auto',
                });
              }
              if (successRef.current) {
                gsap.to(successRef.current, {
                  opacity: 0,
                  y: 20,
                  duration: 0.4,
                });
              }
            }}
            className="inline-block px-8 py-3 border border-white/30 rounded-full text-white hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 opacity-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-white text-sm font-light mb-2">
            Name <span className="text-cyan-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-cyan-500/30'
            }`}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-400 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-white text-sm font-light mb-2">
            Email <span className="text-cyan-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-cyan-500/30'
            }`}
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-400 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-white text-sm font-light mb-2">
            Company / Studio <span className="text-white/40">(optional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
            placeholder="Your company"
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-white text-sm font-light mb-2">
            Project Type <span className="text-cyan-400">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.projectType ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-cyan-500/30'
            }`}
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? 'projectType-error' : undefined}
          >
            <option value="" className="bg-black">
              Select a type...
            </option>
            <option value="website" className="bg-black">
              Website / Web Experience
            </option>
            <option value="installation" className="bg-black">
              Installation / Physical
            </option>
            <option value="campaign" className="bg-black">
              Campaign / Marketing
            </option>
            <option value="tool" className="bg-black">
              Tool / Software
            </option>
            <option value="other" className="bg-black">
              Other
            </option>
          </select>
          {errors.projectType && (
            <p id="projectType-error" className="text-red-400 text-sm mt-1">
              {errors.projectType}
            </p>
          )}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-white text-sm font-light mb-2">
          Budget Range <span className="text-white/40">(optional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
        >
          <option value="" className="bg-black">
            Select budget range...
          </option>
          <option value="small" className="bg-black">
            Under $5K
          </option>
          <option value="medium" className="bg-black">
            $5K - $25K
          </option>
          <option value="large" className="bg-black">
            $25K - $100K
          </option>
          <option value="xlarge" className="bg-black">
            $100K+
          </option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-white text-sm font-light mb-2">
          Project Brief / Message <span className="text-cyan-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
            errors.message ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-cyan-500/30'
          }`}
          placeholder="Tell us about your project, timeline, and vision..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-red-400 text-sm mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="px-10 py-4 bg-white/10 border border-cyan-500/50 rounded-full text-white font-light hover:bg-cyan-500/20 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
