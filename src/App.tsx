import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ChefHat, 
  LayoutDashboard, 
  Smartphone, 
  BarChart3, 
  CreditCard, 
  Calendar, 
  Users, 
  Bell, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Lock,
  Utensils,
  Hotel,
  Wine,
  Coffee,
  Truck,
  Ticket,
  Sparkles,
  Eye,
  Shield,
  Languages,
  DollarSign,
  UserCheck,
  Database,
  X,
  Send
} from 'lucide-react';
import { ChatBot } from './components/ChatBot';

import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';

const LeadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    restaurantName: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', phone: '', email: '', state: '', city: '', restaurantName: '', message: '' });
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-cream rounded-[32px] shadow-2xl overflow-hidden border border-gold/20"
          >
            <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep">Get <span className="text-saffron italic">Started</span></h2>
                <button onClick={onClose} className="p-2 hover:bg-gold/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-sage/20 text-sage rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-deep mb-2">Lead Captured!</h3>
                  <p className="text-sm text-muted">A representative will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                      required
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="State" 
                      className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="City" 
                      className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Restaurant/Business Name" 
                    className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors"
                    value={formData.restaurantName}
                    onChange={e => setFormData({...formData, restaurantName: e.target.value})}
                  />
                  <textarea 
                    placeholder="Your Queries / Message" 
                    rows={3}
                    className="w-full bg-white border border-gold/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron transition-colors resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-saffron text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-deep transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : (
                      <>Submit Lead <Send size={16} /></>
                    )}
                  </button>
                  {status === 'error' && <p className="text-center text-xs text-red-500">Something went wrong. Please try again.</p>}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-gold/10 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-serif text-xl font-black tracking-tighter text-deep">
          Atithi<span className="text-saffron">Setu</span>
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-6">
        {['Features', 'For Whom', 'Benefits', 'ROI', 'How it Works', 'Pricing'].map((item) => {
          const href = `#${item.toLowerCase().replace(/\s+/g, '-')}`;
          return isHome ? (
            <a 
              key={item} 
              href={href} 
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-saffron transition-colors"
            >
              {item}
            </a>
          ) : (
            <Link 
              key={item} 
              to={`/${href}`}
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-saffron transition-colors"
            >
              {item}
            </Link>
          );
        })}
      </div>
      <button 
        onClick={onOpenModal}
        className="bg-deep text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-saffron transition-all shadow-lg"
      >
        Get Started
      </button>
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="relative pt-24 pb-12 px-6 bg-grid-pattern">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-saffron/10 rounded-full mb-6">
          <Zap size={12} className="text-saffron" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-saffron font-bold">
            The Future of Hospitality Operations
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] sm:leading-[0.85] tracking-tighter text-deep mb-6 break-words">
          Hospitality<br />meets<br /><span className="text-gradient italic">Intelligence.</span>
        </h1>
        <p className="text-base text-muted max-w-md mb-8 leading-relaxed">
          Moving your menu and management systems online isn't just about "going paperless"; it’s about harvesting data, increasing table turnover, and keeping your staff from burning out.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <button 
            onClick={onOpenModal}
            className="bg-saffron text-white px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-deep transition-all shadow-2xl shadow-saffron/20"
          >
            Start Free Trial
          </button>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-deep hover:gap-4 transition-all">
            Watch Demo <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      <div className="lg:col-span-5 relative h-[400px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-0 right-0 w-full h-full"
        >
          <div className="glass p-6 rounded-3xl absolute top-0 right-0 w-72 z-20 animate-float">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Live Revenue</span>
              <div className="w-2 h-2 bg-sage rounded-full animate-pulse" />
            </div>
            <div className="font-serif text-3xl font-bold">₹ 48,230</div>
            <div className="text-[10px] text-sage font-bold mt-1">+14.2% vs yesterday</div>
          </div>
          
          <div className="glass p-5 rounded-3xl absolute bottom-10 left-0 w-64 z-10 animate-float-delayed">
            <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Live Orders</div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between text-[11px] border-b border-gold/5 pb-2 last:border-0">
                  <span className="font-medium">Table {i*2} — Order #{100+i}</span>
                  <span className="text-saffron font-bold">Prep</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-saffron/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 px-6 bg-cream">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-saffron font-bold">Getting Started</span>
        <h2 className="font-serif text-5xl font-bold text-deep mt-4 tracking-tight">Up and running in <span className="italic text-saffron">hours.</span></h2>
      </div>

      <div className="space-y-12">
        {[
          {
            num: '01',
            title: 'Register Your Restaurant',
            desc: 'Sign up and receive your unique Business ID. Our Super Admin team reviews and activates your account, setting up your isolated database environment in PostgreSQL or SQLite depending on your scale.'
          },
          {
            num: '02',
            title: 'Build Your Menu',
            desc: 'Add your dishes with photos, pricing tiers, dietary tags, and categories. Mark daily specials. Set item availability. Your digital menu is live and ready to scan in minutes.'
          },
          {
            num: '03',
            title: 'Set Up Tables & QR Codes',
            desc: 'Create your digital floor plan and generate unique QR codes for each table. Print and place them—customers can now scan to order directly from their phones.'
          },
          {
            num: '04',
            title: 'Onboard Your Team',
            desc: 'Add your chefs, waiters, and admin staff. Each gets a role-specific dashboard—KDS for kitchen, mobile order entry for waiters, and full analytics for you.'
          },
          {
            num: '05',
            title: 'Go Live & Grow',
            desc: 'Open your doors. Orders flow in real-time via WebSockets. Track sales, monitor reservations, manage attendance—all from one powerful dashboard. Scale to more branches whenever you\'re ready.'
          }
        ].map((step) => (
          <div key={step.num} className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center border-b border-gold/10 pb-12 last:border-0">
            <div className="font-serif text-4xl sm:text-6xl font-bold text-saffron/20 md:w-32 flex-shrink-0">
              {step.num}
            </div>
            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl font-bold text-deep mb-4">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ForWhom = () => (
  <section id="for-whom" className="py-20 px-6 bg-deep">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-saffron font-bold">Who Can Revolutionize?</span>
        <h2 className="font-serif text-5xl font-bold text-cream mt-4 tracking-tight">Tailored for every <span className="italic text-saffron">sector.</span></h2>
        <p className="text-sm text-white/50 max-w-xl mt-4">From high-traffic bistros to luxury staycations, digital tools are the secret sauce to operational excellence.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            icon: Utensils, 
            title: 'Restaurants & Fine Dining', 
            desc: 'In the world of dining, timing is everything. Digital menus allow for real-time updates—meaning if you run out of a dish, you can remove it instantly.',
            bullets: ['QR Scanners: Reduce "waiter-hunting" fatigue.', 'Staff Management: Optimize floor schedules based on peak hours.']
          },
          { 
            icon: Hotel, 
            title: 'Hotels & Resorts', 
            desc: 'Transform the guest experience by putting the concierge in their pocket.',
            bullets: ['Room Service: Scan QR on bedside table to order without a phone call.', 'Housekeeping Sync: Ensure rooms are turned over faster.']
          },
          { 
            icon: Wine, 
            title: 'Bars, Pubs, & Nightclubs', 
            desc: 'Low lighting and loud music make traditional menus and verbal orders a nightmare.',
            bullets: ['QR Ordering: Patrons order another round without fighting to the bar.', 'Efficiency: Staff focus on crafting drinks, not navigating noisy crowds.']
          },
          { 
            icon: Coffee, 
            title: 'Cafes & Bakeries', 
            desc: 'Morning rushes and long lines can drive customers away. Digital pre-ordering keeps the line moving.',
            bullets: ['Pre-order & Pick-up: Faster throughput during peak hours.', 'Loyalty Integration: Reward regulars automatically.']
          },
          { 
            icon: Truck, 
            title: 'Food Trucks', 
            desc: 'Limited physical space means every inch counts. A digital menu removes the need for bulky boards.',
            bullets: ['Space Saving: No physical menu boards needed.', 'Dynamic Updates: Change location and menu on the fly.']
          },
          { 
            icon: Ticket, 
            title: 'Event Venues', 
            desc: 'High-volume, short windows require extreme efficiency. Mobile ordering from seats is the game changer.',
            bullets: ['In-Seat Ordering: Reduce concourse congestion.', 'Bulk Processing: Handle hundreds of orders simultaneously.']
          },
        ].map((item) => (
          <div key={item.title} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-saffron/10 hover:border-saffron/30 transition-all group">
            <div className="w-12 h-12 bg-saffron/20 rounded-2xl flex items-center justify-center text-saffron mb-6">
              <item.icon size={24} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream mb-4">{item.title}</h3>
            <p className="text-sm text-white/50 mb-6 leading-relaxed">{item.desc}</p>
            <ul className="space-y-3">
              {item.bullets.map(b => (
                <li key={b} className="text-xs text-white/70 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-saffron mt-0.5 flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ROITable = () => (
  <section id="roi" className="py-20 px-6 bg-cream">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-saffron font-bold">Industry-Specific Benefits</span>
        <h2 className="font-serif text-5xl font-bold text-deep mt-4 tracking-tight">ROI Impact at a <span className="italic text-saffron">Glance.</span></h2>
      </div>
      
      <div className="overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-hide">
        <div className="min-w-[800px] lg:min-w-full">
          <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-xl border border-gold/10">
            <thead>
              <tr className="bg-deep text-cream font-mono text-[10px] uppercase tracking-widest text-left">
                <th className="p-6">Business Category</th>
                <th className="p-6">Primary Pain Point</th>
                <th className="p-6">Digital Solution</th>
                <th className="p-6">ROI Impact</th>
              </tr>
            </thead>
            <tbody className="text-sm text-muted">
              {[
                { cat: 'Restaurants & Fine Dining', pain: 'Waiter fatigue & timing errors', sol: 'QR Scanners & Staff Mgmt', roi: '15% higher table turnover' },
                { cat: 'Hotels & Resorts', pain: 'Slow room service response', sol: 'Bedside QR & Housekeeping Sync', roi: '30% faster room turnover' },
                { cat: 'Bars, Pubs, & Nightclubs', pain: 'Order errors in noisy crowds', sol: 'Direct QR Ordering', roi: '20% increase in drink volume' },
                { cat: 'Cafes & Bakeries', pain: 'Morning rushes & long lines', sol: 'QR Pre-order & Pick-up', roi: '25% faster throughput' },
                { cat: 'Food Trucks', pain: 'Limited physical space', sol: 'Digital Menu (No clutter)', roi: 'Lower printing costs' },
                { cat: 'Event Venues', pain: 'High-volume, short windows', sol: 'Mobile ordering for seats', roi: 'Reduced congestion' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gold/5 hover:bg-cream/30 transition-colors">
                  <td className="p-6 font-serif font-bold text-deep">{row.cat}</td>
                  <td className="p-6">{row.pain}</td>
                  <td className="p-6">{row.sol}</td>
                  <td className="p-6 text-saffron font-bold">{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:hidden mt-4 flex items-center justify-center gap-2 text-[10px] text-muted font-bold uppercase tracking-widest">
        <ArrowRight size={12} className="animate-pulse" /> Scroll to see more
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="benefits" className="py-20 px-6 bg-grid-pattern">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-saffron font-bold">For Your Customers</span>
          <h2 className="font-serif text-4xl font-bold text-deep mt-4 mb-8">Elevate the <span className="italic text-saffron">Guest Experience.</span></h2>
          <div className="space-y-8">
            {[
              { icon: Eye, title: 'Visual Appeal', desc: 'High-resolution photos of dishes increase "crave-ability" and average check size.' },
              { icon: Shield, title: 'Safety & Hygiene', desc: 'A contactless experience remains a top priority for health-conscious diners.' },
              { icon: Languages, title: 'Language Accessibility', desc: 'Instantly translate your menu for international tourists with one click.' },
            ].map((adv) => (
              <div key={adv.title} className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-saffron flex-shrink-0">
                  <adv.icon size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-deep mb-2">{adv.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-bold">For Your Business</span>
          <h2 className="font-serif text-4xl font-bold text-deep mt-4 mb-8">Optimize Your <span className="italic text-gold">Bottom Line.</span></h2>
          <div className="space-y-8">
            {[
              { icon: DollarSign, title: 'Dynamic Pricing', desc: 'Adjust prices for "Happy Hour" or weekend surges automatically.' },
              { icon: UserCheck, title: 'Staff Retention', desc: 'Simplified tools reduce administrative "grunt work," allowing your team to focus on hospitality.' },
              { icon: Database, title: 'Data Insights', desc: 'Learn exactly what your most popular items are and what time of day they sell best.' },
            ].map((adv) => (
              <div key={adv.title} className="flex gap-6">
                <div className="w-12 h-12 bg-deep rounded-2xl shadow-lg flex items-center justify-center text-gold flex-shrink-0">
                  <adv.icon size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-deep mb-2">{adv.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section className="py-24 px-6 bg-deep text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(232,114,28,0.1)_0%,transparent_70%)]" />
    <div className="max-w-4xl mx-auto relative z-10">
      <span className="text-saffron text-6xl font-serif">"</span>
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-cream leading-tight italic mb-8">
        The transition to digital menus isn't just an IT upgrade; it's a hospitality upgrade. It frees your staff to be hosts, not just order-takers.
      </h2>
      <div className="h-[1px] w-24 bg-saffron mx-auto mb-4" />
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">AtithiSetu Philosophy</p>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-20 px-6 bg-cream">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-saffron font-bold">The Ecosystem</span>
          <h2 className="font-serif text-5xl font-bold text-deep mt-2 tracking-tight">Everything you need to <span className="italic text-saffron">dominate.</span></h2>
        </div>
        <p className="text-sm text-muted max-w-xs mb-2">We've bundled every operational tool into one cohesive, high-performance system.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Utensils, title: 'Digital Menu', desc: 'High-resolution photos, dynamic pricing tiers, and instant availability updates.' },
          { icon: Smartphone, title: 'QR Ordering', desc: 'Contactless ordering directly from the table, reducing waiter workload.' },
          { icon: LayoutDashboard, title: 'Smart Dashboards', desc: 'Role-specific views for owners, chefs, and waiters.' },
          { icon: BarChart3, title: 'Deep Analytics', desc: 'Peak hour analysis and payment method breakdowns.' },
          { icon: CreditCard, title: 'GST Billing', desc: 'Automatic calculation and clean digital receipts.' },
          { icon: Calendar, title: 'Reservations', desc: 'Optimize seating and reduce walk-in wait times.' },
          { icon: Users, title: 'Staff Attendance', desc: 'Log shifts and roles in one centralized place.' },
          { icon: Bell, title: 'Instant Alerts', desc: 'Automated notifications via WhatsApp and SMS.' },
          { icon: ShieldCheck, title: 'Security', desc: 'Isolated database environments for every business.' },
        ].map((f) => (
          <div key={f.title} className="group p-8 rounded-3xl bg-white border border-gold/10 hover:border-saffron/30 transition-all hover:shadow-2xl hover:shadow-saffron/5">
            <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-saffron mb-6 group-hover:bg-saffron group-hover:text-white transition-colors">
              <f.icon size={20} />
            </div>
            <h3 className="font-serif text-lg font-bold text-deep mb-2">{f.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section id="pricing" className="py-20 px-6 bg-grid-pattern">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="font-serif text-5xl font-bold text-deep tracking-tight">Simple, <span className="italic text-saffron">Transparent</span> Pricing.</h2>
      </div>

      <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-6">
        <div className="bg-deep p-10 rounded-[40px] border border-saffron shadow-2xl relative overflow-hidden">
          <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-4">Growth Plan</div>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="font-serif text-6xl font-bold text-cream">₹ 1999</span>
            <span className="text-white/40 text-sm">/ month</span>
          </div>
          <ul className="space-y-4 mb-10">
            {['Smart Menu', 'Unlimited Tables', 'Live KDS', 'Reservations', 'Staff Attendance', 'Alerts', 'etc'].map(item => (
              <li key={item} className="flex items-center gap-3 text-xs text-white/70">
                <CheckCircle2 size={14} className="text-saffron" /> {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={onOpenModal}
            className="w-full bg-saffron text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-deep transition-all"
          >
            Get Started
          </button>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-gold/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="font-mono text-[9px] text-muted uppercase tracking-widest mb-4">Enterprise</div>
            <div className="font-serif text-5xl font-bold text-deep mb-8">Custom</div>
            <ul className="space-y-4 mb-10">
              {['Multi-Branch', 'Super Admin Dashboard', 'On-Premise Option', 'Custom Integrations'].map(item => (
                <li key={item} className="flex items-center gap-3 text-xs text-deep/60">
                  <CheckCircle2 size={14} className="text-sage" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <button 
            onClick={onOpenModal}
            className="w-full bg-deep text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-saffron transition-all"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-deep text-white/30 py-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <Link to="/" className="font-serif text-2xl font-black tracking-tighter text-cream">
        Atithi<span className="text-saffron">Setu</span>
      </Link>
      <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
        <Link to="/privacy" className="hover:text-saffron transition-colors">Privacy</Link>
        <Link to="/terms" className="hover:text-saffron transition-colors">Terms</Link>
        <Link to="/contact" className="hover:text-saffron transition-colors">Contact</Link>
      </div>
      <div className="text-[9px] uppercase tracking-[0.2em]">
        © 2026 AtithiSetu ERP · Built for Hospitality
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

const HomePage = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <>
    <Hero onOpenModal={onOpenModal} />
    <Quote />
    <Features />
    <ForWhom />
    <Benefits />
    <ROITable />
    <HowItWorks />
    <Pricing onOpenModal={onOpenModal} />
    <section className="bg-saffron py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8">
          Ready to transform your <span className="text-deep/40 italic">kitchen?</span>
        </h2>
        <button 
          onClick={onOpenModal}
          className="bg-deep text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-deep transition-all shadow-2xl"
        >
          Start Your Free Trial
        </button>
      </div>
    </section>
  </>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-cream selection:bg-saffron/30 overflow-x-hidden">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <Routes>
          <Route path="/" element={<HomePage onOpenModal={() => setIsModalOpen(true)} />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
        <ChatBot />
        <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Router>
  );
}
