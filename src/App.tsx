import React, { useState, useEffect, useRef } from 'react';
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
  Send,
  Star,
  TrendingUp,
  Clock,
  Menu,
  PhoneCall,
  ChevronRight,
  Award,
  Cpu,
  QrCode,
  Receipt,
  MapPin,
} from 'lucide-react';
import { ChatBot } from './components/ChatBot';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';

/* ─────────────────────────────────────────────────────────────────
   SHARED ANIMATION VARIANTS
───────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ─────────────────────────────────────────────────────────────────
   LEAD MODAL
───────────────────────────────────────────────────────────────── */
const LeadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', state: '', city: '', restaurantName: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', phone: '', email: '', state: '', city: '', restaurantName: '', message: '' });
        }, 2500);
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const field = (
    placeholder: string,
    type: string,
    key: keyof typeof formData,
    required = true,
    className = ''
  ) => (
    <input
      required={required}
      type={type}
      placeholder={placeholder}
      className={`w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/10 transition-all placeholder:text-muted/50 ${className}`}
      value={formData[key]}
      onChange={e => setFormData({ ...formData, [key]: e.target.value })}
    />
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Get Started">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-deep/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="relative w-full max-w-lg bg-ivory rounded-[36px] shadow-2xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-saffron via-gold to-saffron" />

            <div className="p-7 sm:p-9 max-h-[92vh] overflow-y-auto scrollbar-thin">
              {/* Header */}
              <div className="flex justify-between items-start mb-7">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep leading-tight">
                    Start Your <span className="text-gradient italic">Free Trial</span>
                  </h2>
                  <p className="text-xs text-muted mt-1">No credit card · Setup in 2 hours · Cancel anytime</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-cream rounded-xl transition-colors ml-4 flex-shrink-0" aria-label="Close">
                  <X size={18} className="text-muted" />
                </button>
              </div>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-14 text-center">
                  <div className="w-20 h-20 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} className="text-sage" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-deep mb-2">You're on the list!</h3>
                  <p className="text-sm text-muted max-w-xs mx-auto">Our onboarding team will reach out within 24 hours to get you live.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {field('Full Name', 'text', 'name')}
                    {field('Phone Number', 'tel', 'phone')}
                  </div>
                  {field('Work Email Address', 'email', 'email')}
                  <div className="grid grid-cols-2 gap-3">
                    {field('State', 'text', 'state')}
                    {field('City', 'text', 'city')}
                  </div>
                  {field('Restaurant / Hotel / Business Name', 'text', 'restaurantName', false)}
                  <textarea
                    placeholder="What's your biggest operational challenge? (optional)"
                    rows={3}
                    className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/10 transition-all resize-none placeholder:text-muted/50"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-saffron text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-saffron-dk transition-all shadow-lg shadow-saffron/20 flex items-center justify-center gap-2 disabled:opacity-60 animate-pulse-glow"
                  >
                    {status === 'loading'
                      ? <><span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing…</>
                      : <><Send size={14} /> Get Started Free</>
                    }
                  </button>
                  {status === 'error' && (
                    <p className="text-center text-xs text-red-500 bg-red-50 py-2 rounded-lg">Something went wrong — please try again or email us directly.</p>
                  )}
                  <p className="text-center text-[10px] text-muted/70 pt-1">
                    By submitting you agree to our <Link to="/privacy" onClick={onClose} className="underline hover:text-saffron">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────────
   NAVBAR — with mobile hamburger
───────────────────────────────────────────────────────────────── */
const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  const navItems = ['Features', 'For Whom', 'Benefits', 'ROI', 'How It Works'];

  const NavLink = ({ item }: { item: string }) => {
    const href = `#${item.toLowerCase().replace(/\s+/g, '-')}`;
    const cls = "text-[11px] font-bold uppercase tracking-widest text-muted hover:text-saffron transition-colors";
    return isHome
      ? <a href={href} className={cls} onClick={() => setMobileOpen(false)}>{item}</a>
      : <Link to={`/${href}`} className={cls} onClick={() => setMobileOpen(false)}>{item}</Link>;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ivory/90 backdrop-blur-2xl shadow-sm border-b border-border' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="AtithiSetu — Home">
            <div className="w-8 h-8 bg-saffron rounded-xl flex items-center justify-center shadow-lg shadow-saffron/20 group-hover:scale-110 transition-transform">
              <ChefHat size={18} className="text-white" />
            </div>
            <span className="font-serif text-xl font-black tracking-tighter text-deep">
              Atithi<span className="text-saffron">Setu</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => <NavLink key={item} item={item} />)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="text-[11px] font-bold uppercase tracking-widest text-muted hover:text-saffron transition-colors">Contact</Link>
            <button
              onClick={onOpenModal}
              className="bg-saffron text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-saffron-dk transition-all shadow-lg shadow-saffron/20"
            >
              Free Trial
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-cream transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} className="text-deep" /> : <Menu size={22} className="text-deep" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-ivory border-t border-border shadow-xl"
            >
              <div className="px-6 py-6 space-y-4">
                {navItems.map(item => (
                  <div key={item} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <NavLink item={item} />
                  </div>
                ))}
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="block text-[11px] font-bold uppercase tracking-widest text-muted hover:text-saffron transition-colors">Contact</Link>
                <button
                  onClick={() => { setMobileOpen(false); onOpenModal(); }}
                  className="w-full bg-saffron text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-saffron-dk transition-all shadow-lg shadow-saffron/20 mt-2"
                >
                  Start Free Trial — No Credit Card
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile sticky bottom CTA bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory border-t border-border px-4 py-3 flex gap-3">
        <button
          onClick={onOpenModal}
          className="flex-1 bg-saffron text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-saffron/20"
        >
          Start Free Trial
        </button>
        <a
          href="tel:+917011189371"
          className="flex items-center justify-center gap-2 bg-deep text-white px-4 py-3 rounded-xl font-bold text-xs"
          aria-label="Call us"
        >
          <PhoneCall size={16} />
        </a>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────
   HERO — Full keyword-optimized redesign
───────────────────────────────────────────────────────────────── */
const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const stats = [
    { value: '500+', label: 'Businesses Live', icon: Award },
    { value: '18',   label: 'States Covered', icon: MapPin },
    { value: '₹50Cr+', label: 'GMV Processed', icon: TrendingUp },
    { value: '4.9★', label: 'Customer Rating', icon: Star },
  ];

  return (
    <section className="relative pt-28 sm:pt-32 pb-0 overflow-hidden bg-cream" aria-label="Hero">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-to-bl from-saffron/8 via-gold/5 to-transparent pointer-events-none rounded-bl-[200px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-7rem)]">

          {/* Left column — content */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5 pb-12 lg:pb-24"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 border border-saffron/25 rounded-full mb-7">
              <span className="w-2 h-2 bg-saffron rounded-full animate-pulse flex-shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-saffron font-bold">
                India's #1 Hotel & Restaurant Software
              </span>
            </motion.div>

            {/* H1 — keyword optimized */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-[2.8rem] sm:text-6xl lg:text-[4.2rem] xl:text-7xl font-black leading-[0.88] tracking-tighter text-deep mb-6"
            >
              Hotel &amp;<br />Restaurant<br />
              <span className="text-gradient italic">Software</span><br />
              <span className="text-deep text-[0.75em]">That Runs Itself.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted max-w-[480px] mb-8 leading-relaxed">
              India's most complete hospitality management platform — QR ordering, live kitchen displays, GST billing, staff management, and deep analytics. All in one elegant system.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-7">
              <button
                onClick={onOpenModal}
                className="group bg-saffron text-white px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider hover:bg-saffron-dk transition-all shadow-xl shadow-saffron/25 flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 text-sm font-bold text-deep hover:text-saffron transition-colors border border-border rounded-2xl px-6 py-4 hover:border-saffron/40 bg-white/60 backdrop-blur-sm"
              >
                <span className="w-8 h-8 bg-deep/5 rounded-lg flex items-center justify-center">
                  <ChevronRight size={16} />
                </span>
                How It Works
              </a>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-5">
              {[
                'No credit card required',
                'Live in under 2 hours',
                'Cancel anytime',
              ].map(text => (
                <span key={text} className="flex items-center gap-1.5 text-xs font-medium text-muted">
                  <CheckCircle2 size={13} className="text-sage flex-shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — dashboard visual */}
          <div className="lg:col-span-6 xl:col-span-7 relative h-[480px] sm:h-[560px] hidden lg:flex items-center justify-center">

            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass rounded-3xl p-6 w-[340px] absolute top-8 right-0 z-20 animate-float"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted">Today's Revenue</p>
                  <p className="font-serif text-3xl font-bold text-deep mt-0.5">₹ 1,24,860</p>
                  <p className="text-[11px] font-bold text-sage mt-1 flex items-center gap-1">
                    <TrendingUp size={12} /> +22.4% vs yesterday
                  </p>
                </div>
                <div className="w-10 h-10 bg-saffron/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 size={20} className="text-saffron" />
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1.5 h-16 mt-3">
                {[40, 65, 55, 80, 70, 95, 85, 100, 75, 88, 92, 78].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t-md transition-all ${i === 8 ? 'bg-saffron' : 'bg-saffron/20'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[8px] text-muted">9 AM</span>
                <span className="font-mono text-[8px] text-muted">9 PM</span>
              </div>
            </motion.div>

            {/* Live orders card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="glass rounded-3xl p-5 w-[260px] absolute bottom-20 left-0 z-10 animate-float-delayed"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Live Orders</span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-sage">
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" /> Live
                </span>
              </div>
              {[
                { table: 'Table 4', item: 'Dal Makhani × 2', status: 'Prep', color: 'text-gold' },
                { table: 'Table 7', item: 'Paneer Tikka', status: 'Ready', color: 'text-sage' },
                { table: 'Room 302', item: 'Club Sandwich', status: 'New', color: 'text-saffron' },
              ].map((o, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-0">
                  <div>
                    <p className="text-[11px] font-bold text-deep">{o.table}</p>
                    <p className="text-[10px] text-muted">{o.item}</p>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${o.color}`}>{o.status}</span>
                </div>
              ))}
            </motion.div>

            {/* Notification card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="glass rounded-2xl p-4 w-[230px] absolute top-6 left-12 z-30 animate-float-slow"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-saffron rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-deep">New Reservation</p>
                  <p className="text-[10px] text-muted">Table 12 · 8:30 PM · 4 guests</p>
                </div>
              </div>
            </motion.div>

            {/* Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-saffron/15 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gold/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-t border-border/60 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={16} className="text-saffron mb-1" />
              <span className="font-serif text-2xl sm:text-3xl font-bold text-deep">{value}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   TRUST BAR — scrolling business type ticker
───────────────────────────────────────────────────────────────── */
const TrustBar = () => {
  const items = [
    { icon: Utensils, label: 'Fine Dining Restaurants' },
    { icon: Hotel, label: 'Boutique Hotels' },
    { icon: Wine, label: 'Bars & Nightclubs' },
    { icon: Coffee, label: 'Café Chains' },
    { icon: Truck, label: 'Food Trucks' },
    { icon: Ticket, label: 'Event Venues' },
    { icon: ChefHat, label: 'Cloud Kitchens' },
    { icon: Globe, label: 'Resort Properties' },
  ];
  const doubled = [...items, ...items];

  return (
    <section className="bg-deep py-5 overflow-hidden" aria-label="Trusted by all hospitality types">
      <div className="flex items-center gap-12 animate-ticker whitespace-nowrap">
        {doubled.map(({ icon: Icon, label }, i) => (
          <div key={i} className="inline-flex items-center gap-3 flex-shrink-0">
            <Icon size={16} className="text-saffron" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 font-bold">{label}</span>
            <span className="text-gold/30 ml-3">·</span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   FEATURES — 9-card grid, premium card design
───────────────────────────────────────────────────────────────── */
const Features = () => {
  const features = [
    { icon: QrCode, title: 'QR Ordering System', desc: 'Contactless menus with high-res photos. Customers order directly from their phone — no app download needed.', badge: 'Most Used' },
    { icon: LayoutDashboard, title: 'Smart Dashboards', desc: 'Role-specific views for owners, managers, chefs, and waiters. Everyone sees exactly what they need.', badge: null },
    { icon: Cpu, title: 'Kitchen Display (KDS)', desc: 'Real-time order streaming to kitchen screens via WebSockets. Zero missed tickets, zero paper.', badge: 'AI-Powered' },
    { icon: BarChart3, title: 'Deep Analytics', desc: 'Peak hour heatmaps, best-selling item analysis, staff performance, and revenue forecasting.', badge: null },
    { icon: Receipt, title: 'GST Billing', desc: 'Automatic tax calculation with clean digital receipts. Fully compliant with Indian GST regulations.', badge: null },
    { icon: Calendar, title: 'Reservations', desc: 'Smart table management with waitlist, walk-in optimization, and automated confirmation messages.', badge: null },
    { icon: Users, title: 'Staff Management', desc: 'Attendance, shift scheduling, role-based access, and performance tracking — all centralized.', badge: null },
    { icon: Bell, title: 'Instant Alerts', desc: 'Automated WhatsApp and SMS notifications for order updates, reservations, and low inventory.', badge: null },
    { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Isolated database per tenant, HTTPS everywhere, daily backups, and role-based permissions.', badge: null },
  ];

  return (
    <section id="features" className="py-24 px-5 sm:px-8 bg-ivory" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger} className="mb-14"
        >
          <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron font-bold">
            The Complete Ecosystem
          </motion.span>
          <motion.h2 id="features-heading" variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-deep mt-3 tracking-tight max-w-2xl">
            Everything your hotel &amp; restaurant<br />
            <span className="italic text-saffron">needs to dominate.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm text-muted mt-4 max-w-xl leading-relaxed">
            Stop stitching together 6 different tools. AtithiSetu is the single platform that runs your entire hospitality operation.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative p-7 rounded-3xl bg-white border border-border hover:border-saffron/40 hover:shadow-xl hover:shadow-saffron/6 transition-all duration-300"
            >
              {f.badge && (
                <span className="absolute top-5 right-5 text-[9px] font-bold uppercase tracking-widest text-saffron bg-saffron/10 px-2.5 py-1 rounded-full border border-saffron/20">
                  {f.badge}
                </span>
              )}
              <div className="w-11 h-11 bg-cream rounded-2xl flex items-center justify-center text-saffron mb-5 group-hover:bg-saffron group-hover:text-white transition-all duration-300 shadow-sm">
                <f.icon size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-deep mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   FOR WHOM — sector cards on dark background
───────────────────────────────────────────────────────────────── */
const ForWhom = () => {
  const sectors = [
    {
      icon: Utensils,
      title: 'Restaurants & Fine Dining',
      desc: 'Eliminate "waiter-hunting" and order errors. Real-time menu updates mean you can remove the Wagyu ribeye the moment it sells out.',
      bullets: ['QR scanners cut table-to-kitchen time by 40%', 'Live availability prevents ordering unavailable items'],
    },
    {
      icon: Hotel,
      title: 'Hotels & Resorts',
      desc: 'Put the concierge in your guest\'s pocket. From room service to housekeeping sync — fully integrated.',
      bullets: ['Bedside QR ordering with zero phone calls', 'Housekeeping sync reduces room turnover time by 30%'],
    },
    {
      icon: Wine,
      title: 'Bars, Pubs & Nightclubs',
      desc: 'Loud music and crowds make verbal orders a nightmare. Let your patrons order another round without fighting for the bar.',
      bullets: ['Booth QR ordering increases drink volume by 20%', 'Staff focus on crafting — not navigating crowds'],
    },
    {
      icon: Coffee,
      title: 'Cafés & Bakeries',
      desc: 'Solve the morning rush. Pre-ordering and digital pick-up queues keep your line moving and your regulars happy.',
      bullets: ['QR pre-order & pick-up for 25% faster throughput', 'Loyalty integration — reward regulars automatically'],
    },
    {
      icon: Truck,
      title: 'Food Trucks',
      desc: 'Every inch of space counts. Digital menus replace bulky boards. Update your location and menu on the fly.',
      bullets: ['Zero printing costs — update menu in seconds', 'GPS-linked menu shows real-time truck location'],
    },
    {
      icon: Ticket,
      title: 'Event Venues',
      desc: 'Handle hundreds of concurrent orders during high-volume events without congestion or errors.',
      bullets: ['In-seat mobile ordering reduces concourse queues', 'Bulk processing handles 500+ orders simultaneously'],
    },
  ];

  return (
    <section id="for-whom" className="py-24 px-5 sm:px-8 bg-deep" aria-labelledby="forwhom-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger} className="mb-14"
        >
          <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron font-bold">Who We Serve</motion.span>
          <motion.h2 id="forwhom-heading" variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-cream mt-3 tracking-tight">
            Tailored for every<br /><span className="italic text-saffron">hospitality sector.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm text-white/45 max-w-lg mt-4 leading-relaxed">
            From high-traffic bistros to luxury resorts — our hotel and restaurant software adapts to your specific operation.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-saffron/8 hover:border-saffron/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-saffron/20 rounded-2xl flex items-center justify-center text-saffron mb-6 group-hover:bg-saffron group-hover:text-white transition-all duration-300">
                <s.icon size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-cream mb-3">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2.5">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-xs text-white/65">
                    <CheckCircle2 size={13} className="text-saffron mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   BENEFITS — split two-column
───────────────────────────────────────────────────────────────── */
const Benefits = () => {
  const customerBenefits = [
    { icon: Eye, title: 'Visual Appeal', desc: 'High-resolution dish photos increase average check size. Guests see what they\'re ordering — craveability drives upsell.' },
    { icon: Shield, title: 'Safety & Hygiene', desc: 'Contactless ordering remains a top priority for health-conscious diners. No shared menus, no contact points.' },
    { icon: Languages, title: 'Language Accessibility', desc: 'One-click menu translation for international tourists. Welcome every guest in their own language.' },
  ];

  const businessBenefits = [
    { icon: DollarSign, title: 'Dynamic Pricing', desc: 'Set Happy Hour pricing, weekend surges, or event-day markups — automatically applied without reprinting menus.' },
    { icon: UserCheck, title: 'Staff Retention', desc: 'Simplified digital tools reduce administrative grunt work. Your team stays focused on hospitality, not paperwork.' },
    { icon: Database, title: 'Data Insights', desc: 'Discover your most profitable dishes, busiest hours, and top-spending tables. Make decisions backed by real data.' },
  ];

  return (
    <section id="benefits" className="py-24 px-5 sm:px-8 bg-cream bg-grid-pattern" aria-labelledby="benefits-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Customer side */}
          <div>
            <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron font-bold">For Your Guests</motion.span>
            <motion.h2 id="benefits-heading" variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-deep mt-3 mb-10 tracking-tight">
              Elevate the<br /><span className="italic text-saffron">guest experience.</span>
            </motion.h2>
            <div className="space-y-8">
              {customerBenefits.map((b, i) => (
                <motion.div key={b.title} variants={fadeUp} custom={i} className="flex gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-saffron flex-shrink-0 border border-border">
                    <b.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-deep mb-1.5">{b.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Business side */}
          <div>
            <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">For Your Business</motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-bold text-deep mt-3 mb-10 tracking-tight">
              Optimize your<br /><span className="italic text-gold">bottom line.</span>
            </motion.h2>
            <div className="space-y-8">
              {businessBenefits.map((b, i) => (
                <motion.div key={b.title} variants={fadeUp} custom={i} className="flex gap-5">
                  <div className="w-12 h-12 bg-deep rounded-2xl shadow-md flex items-center justify-center text-gold flex-shrink-0">
                    <b.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-deep mb-1.5">{b.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   TESTIMONIALS — 3 customer reviews
───────────────────────────────────────────────────────────────── */
const Testimonials = () => {
  const reviews = [
    {
      stars: 5,
      quote: 'Our table turnover improved by 18% in the first month. The kitchen display system eliminated missed orders entirely. AtithiSetu paid for itself in 6 weeks.',
      name: 'Priya Kapoor',
      role: 'Owner',
      business: 'The Spice Route Restaurant',
      city: 'Mumbai',
      tag: 'Fine Dining',
    },
    {
      stars: 5,
      quote: 'As a resort GM, I needed one platform for dining, room service, and housekeeping coordination. AtithiSetu nailed it. Guest satisfaction scores went up 12 points.',
      name: 'Amit Sharma',
      role: 'General Manager',
      business: 'Rajmahal Resort',
      city: 'Jaipur',
      tag: 'Resort',
    },
    {
      stars: 5,
      quote: 'We run 4 café locations. The centralized dashboard, loyalty tracking, and GST billing used to require 3 different tools. Now it\'s just one. The team loves it.',
      name: 'Sneha Patel',
      role: 'Operations Head',
      business: 'Brew & Bite Café Chain',
      city: 'Bengaluru',
      tag: 'Café Chain',
    },
  ];

  return (
    <section className="py-24 px-5 sm:px-8 bg-ivory" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger} className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron font-bold">What Our Customers Say</motion.span>
          <motion.h2 id="testimonials-heading" variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-deep mt-3 tracking-tight">
            Trusted by hospitality<br /><span className="italic text-saffron">professionals across India.</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-white border border-border rounded-3xl p-8 flex flex-col hover:shadow-xl hover:shadow-saffron/5 hover:border-saffron/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-base italic text-deep leading-relaxed mb-6 flex-1">
                "{r.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-border">
                <div className="w-11 h-11 bg-saffron/10 rounded-full flex items-center justify-center text-saffron font-bold font-serif text-lg flex-shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-deep text-sm">{r.name}</p>
                  <p className="text-xs text-muted truncate">{r.role} · {r.business}</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-saffron mt-0.5">{r.city} · {r.tag}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Aggregate rating for SEO reinforcement */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-10 flex items-center justify-center gap-3"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-gold fill-gold" />)}
          </div>
          <span className="font-bold text-deep text-sm">4.9 / 5</span>
          <span className="text-muted text-sm">from 134+ verified reviews</span>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ROI TABLE
───────────────────────────────────────────────────────────────── */
const ROITable = () => {
  const rows = [
    { cat: 'Restaurants & Fine Dining', pain: 'Waiter fatigue & order timing errors', sol: 'QR ordering + live KDS', roi: '+15% table turnover' },
    { cat: 'Hotels & Resorts',           pain: 'Slow room service, manual coordination', sol: 'Bedside QR + housekeeping sync', roi: '+30% room turnaround' },
    { cat: 'Bars, Pubs & Nightclubs',    pain: 'Order errors in loud, crowded venues', sol: 'Direct QR ordering by table', roi: '+20% drink volume' },
    { cat: 'Cafés & Bakeries',           pain: 'Morning rush queues drive away customers', sol: 'QR pre-order & pick-up flow', roi: '+25% peak throughput' },
    { cat: 'Food Trucks',               pain: 'Bulky physical menus, frequent changes', sol: 'Dynamic digital menu', roi: 'Zero printing costs' },
    { cat: 'Event Venues',              pain: 'High-volume, short service windows', sol: 'In-seat mobile ordering', roi: '80% less congestion' },
  ];

  return (
    <section id="roi" className="py-24 px-5 sm:px-8 bg-cream" aria-labelledby="roi-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger} className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron font-bold">
            ROI by Industry
          </motion.span>
          <motion.h2 id="roi-heading" variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-deep mt-3 tracking-tight">
            Real results from real<br /><span className="italic text-saffron">hospitality businesses.</span>
          </motion.h2>
        </motion.div>

        <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
          <div className="min-w-[720px]">
            <table className="w-full border-collapse rounded-3xl overflow-hidden shadow-xl border border-border">
              <thead>
                <tr className="bg-deep">
                  {['Business Type', 'Pain Point', 'Our Solution', 'Measured ROI'].map(h => (
                    <th key={h} className="p-5 text-left font-mono text-[9px] uppercase tracking-widest text-white/50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="border-b border-border bg-white hover:bg-cream/60 transition-colors"
                  >
                    <td className="p-5 font-serif font-bold text-deep text-sm">{r.cat}</td>
                    <td className="p-5 text-sm text-muted">{r.pain}</td>
                    <td className="p-5 text-sm text-muted">{r.sol}</td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-saffron">
                        <TrendingUp size={14} className="flex-shrink-0" /> {r.roi}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-[11px] text-muted mt-4 md:hidden font-mono uppercase tracking-widest">
          ← Scroll to see full table →
        </p>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   HOW IT WORKS — numbered step list
───────────────────────────────────────────────────────────────── */
const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Register Your Business',
      desc: 'Sign up and receive your unique Business ID. Our onboarding team activates your account and provisions your isolated data environment within hours.',
      duration: '< 30 minutes',
    },
    {
      num: '02',
      title: 'Build Your Digital Menu',
      desc: 'Add dishes with high-res photos, pricing tiers, dietary tags, allergens, and categories. Mark daily specials. Your QR menu is live immediately.',
      duration: '< 45 minutes',
    },
    {
      num: '03',
      title: 'Configure Tables & QR Codes',
      desc: 'Create your digital floor plan and generate unique QR codes per table. Print them — guests can now scan and order from their phone without an app.',
      duration: '< 20 minutes',
    },
    {
      num: '04',
      title: 'Onboard Your Team',
      desc: 'Add chefs, servers, and managers. Each gets a role-specific interface — KDS for kitchen, mobile order entry for servers, full analytics for owners.',
      duration: '< 30 minutes',
    },
    {
      num: '05',
      title: 'Go Live & Scale',
      desc: 'Open your doors. Orders stream in real-time. Monitor revenue, reservations, and staff performance live. Add more branches anytime with one click.',
      duration: 'Immediate',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-5 sm:px-8 bg-ivory" aria-labelledby="howitworks-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger} className="mb-16"
        >
          <motion.span variants={fadeUp} className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron font-bold">Setup Process</motion.span>
          <motion.h2 id="howitworks-heading" variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-deep mt-3 tracking-tight">
            Up and running<br /><span className="italic text-saffron">in under 2 hours.</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-start border-b border-border py-10 last:border-0"
            >
              {/* Step number */}
              <div className="flex items-center sm:items-start gap-4 sm:w-40 flex-shrink-0">
                <span className="font-serif text-5xl sm:text-7xl font-bold text-saffron/20 group-hover:text-saffron/40 transition-colors leading-none">
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-deep">{step.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-sage font-mono uppercase tracking-widest bg-sage/10 px-3 py-1 rounded-full flex-shrink-0">
                    <Clock size={10} /> {step.duration}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mt-3 max-w-2xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   QUOTE / PHILOSOPHY SECTION
───────────────────────────────────────────────────────────────── */
const Quote = () => (
  <section className="py-28 px-5 sm:px-8 bg-deep text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(232_114_28/0.12)_0%,transparent_65%)] pointer-events-none" />
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-saffron/40 font-serif text-8xl leading-none block mb-4 select-none">"</span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-cream leading-snug italic mb-8 -mt-8">
          The transition to digital isn't just an IT upgrade — it's a hospitality upgrade. It frees your staff to be hosts, not just order-takers.
        </h2>
        <div className="h-px w-16 bg-saffron mx-auto mb-5" />
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">The AtithiSetu Philosophy · Atithi Devo Bhava</p>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA — high-conversion
───────────────────────────────────────────────────────────────── */
const FinalCTA = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="py-24 px-5 sm:px-8 bg-saffron relative overflow-hidden" aria-label="Call to action">
    {/* Background texture */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0.08)_0%,transparent_60%)] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

    <div className="max-w-5xl mx-auto text-center relative z-10">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-4 py-2 rounded-full mb-6">
          <Sparkles size={12} className="text-white" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white font-bold">Join 500+ Growing Businesses</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-5">
          Ready to transform your<br />hospitality business?
        </motion.h2>

        <motion.p variants={fadeUp} className="text-white/75 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Start your free trial today. No credit card needed. Our team will have your hotel or restaurant software live in under 2 hours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOpenModal}
            className="group bg-deep text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-deep transition-all shadow-2xl flex items-center justify-center gap-2"
          >
            Start Free Trial
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="tel:+917011189371"
            className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-8 py-5 rounded-2xl font-bold text-sm hover:bg-white/25 transition-all"
          >
            <PhoneCall size={16} /> +91 70111 89371
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-6">
          {['No credit card required', 'Free onboarding support', 'Cancel anytime'].map(t => (
            <span key={t} className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
              <CheckCircle2 size={13} className="text-white/80" /> {t}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────── */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep text-white/40 pt-16 pb-28 md:pb-16 px-5 sm:px-8 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-saffron rounded-xl flex items-center justify-center">
                <ChefHat size={17} className="text-white" />
              </div>
              <span className="font-serif text-xl font-black tracking-tighter text-cream">
                Atithi<span className="text-saffron">Setu</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-5">
              India's leading hotel and restaurant software. Built for modern hospitality — from QR ordering to enterprise analytics.
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <a href="mailto:contact@atithi-setu.com" className="hover:text-saffron transition-colors">contact@atithi-setu.com</a>
              <a href="tel:+917011189371" className="hover:text-saffron transition-colors">+91 70111 89371</a>
              <span className="flex items-center gap-1"><MapPin size={11} /> Gurgaon, Haryana, India</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/70 font-bold mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm">
              {['Features', 'For Whom', 'ROI Calculator', 'How It Works', 'Security'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-saffron transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/70 font-bold mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="hover:text-saffron transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-saffron transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-saffron transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-mono uppercase tracking-widest">
            © {currentYear} AtithiSetu · Hotel & Restaurant Software · India
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
            <span className="text-sage/80 font-mono uppercase tracking-widest">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────────────────────────── */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); }
    else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
};

/* ─────────────────────────────────────────────────────────────────
   HOME PAGE — section assembly
───────────────────────────────────────────────────────────────── */
const HomePage = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <main>
    <Hero onOpenModal={onOpenModal} />
    <TrustBar />
    <Features />
    <ForWhom />
    <Testimonials />
    <Benefits />
    <ROITable />
    <HowItWorks />
    <Quote />
    <FinalCTA onOpenModal={onOpenModal} />
  </main>
);

/* ─────────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────────── */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-cream overflow-x-hidden">
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
