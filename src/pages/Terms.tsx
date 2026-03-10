import React from 'react';
import { motion } from 'motion/react';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export const Terms = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <h1 className="font-serif text-5xl font-bold text-deep mb-8">Terms of <span className="text-saffron italic">Service</span></h1>
      
      <div className="space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <Scale className="text-saffron" size={20} /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using AtithiSetu, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-saffron" size={20} /> 2. Use License
          </h2>
          <p>
            We grant you a limited, non-exclusive license to use our platform for your business operations. This license is subject to your compliance with our payment terms and acceptable use policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <AlertCircle className="text-saffron" size={20} /> 3. Service Availability
          </h2>
          <p>
            While we strive for 99.9% uptime, we do not guarantee uninterrupted access to our services. Maintenance and updates may occasionally cause temporary downtime.
          </p>
        </section>

        <section>
          <p className="text-sm italic">
            Last updated: March 2026. For inquiries, contact <span className="text-saffron font-bold">contact@atithi-setu.com</span>.
          </p>
        </section>
      </div>
    </motion.div>
  );
};
