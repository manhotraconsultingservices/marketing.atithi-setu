import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const Privacy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <h1 className="font-serif text-5xl font-bold text-deep mb-8">Privacy <span className="text-saffron italic">Policy</span></h1>
      
      <div className="space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <Shield className="text-saffron" size={20} /> 1. Information We Collect
          </h2>
          <p>
            At AtithiSetu, we collect information necessary to provide our hospitality management services. This includes business details, staff information, and customer order data processed through our digital menus.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <Lock className="text-saffron" size={20} /> 2. How We Use Your Data
          </h2>
          <p>
            Your data is used to facilitate restaurant operations, generate analytics, and improve our services. We implement strict data isolation policies, ensuring your business data is never shared with other clients.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <Eye className="text-saffron" size={20} /> 3. Data Protection
          </h2>
          <p>
            We employ industry-standard encryption and security measures to protect your sensitive information. Our infrastructure is designed to prevent unauthorized access and ensure data integrity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-deep mb-4 flex items-center gap-2">
            <FileText className="text-saffron" size={20} /> 4. Contact Us
          </h2>
          <p>
            If you have any questions about our Privacy Policy, please contact us at <span className="text-saffron font-bold">contact@atithi-setu.com</span>.
          </p>
        </section>
      </div>
    </motion.div>
  );
};
