import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
    >
      <h1 className="font-serif text-5xl font-bold text-deep mb-8">Contact <span className="text-saffron italic">Us</span></h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-muted leading-relaxed">
            Have questions about AtithiSetu? Our team is here to help you revolutionize your hospitality business.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-saffron/10 rounded-2xl flex items-center justify-center text-saffron">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Email Us</p>
                <p className="font-bold text-deep">contact@atithi-setu.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-saffron/10 rounded-2xl flex items-center justify-center text-saffron">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Call Us</p>
                <p className="font-bold text-deep">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-saffron/10 rounded-2xl flex items-center justify-center text-saffron">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted">Visit Us</p>
                <p className="font-bold text-deep">Hospitality Hub, Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gold/10 shadow-xl">
          <h3 className="font-serif text-2xl font-bold text-deep mb-6">Send a Message</h3>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-cream/50 border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-cream/50 border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
            />
            <textarea 
              placeholder="How can we help?" 
              rows={4}
              className="w-full bg-cream/50 border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors resize-none"
            />
            <button className="w-full bg-saffron text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-deep transition-all flex items-center justify-center gap-2">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
