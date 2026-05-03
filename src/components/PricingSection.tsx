import { motion } from 'framer-motion'
import { Bot, MessageSquare, Workflow, Globe, Smartphone, Check } from 'lucide-react'

const plans = [
  {
    name: 'AI Agents',
    price: '₹20,000',
    period: '/ year',
    icon: Bot,
    color: '#00E5FF',
    features: ['Calling agents', 'Other AI agents'],
    popular: false,
  },
  {
    name: 'AI Chatbot',
    price: '₹15,000',
    period: '/ year',
    icon: MessageSquare,
    color: '#7C3AED',
    features: ['Website chatbot', 'Instagram chatbot', 'Social media chatbots'],
    popular: true,
  },
  {
    name: 'Workflow & Gmail Automation',
    price: '₹20,000',
    period: '/ year',
    icon: Workflow,
    color: '#0EA5E9',
    features: ['Automated Gmail workflows', 'Business process automation'],
    popular: false,
  },
  {
    name: 'Website Development',
    price: '₹20,000',
    period: 'one-time',
    icon: Globe,
    color: '#10B981',
    features: ['2-year free .com or .in domain', 'Landing pages', 'Best UI/UX design'],
    popular: false,
  },
  {
    name: 'App Development',
    price: '₹25,000',
    period: 'one-time',
    icon: Smartphone,
    color: '#F59E0B',
    features: ['Custom mobile application', 'Modern UI/UX'],
    popular: false,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-[#00E5FF] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-3 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Simple,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0088ff]">
              Affordable
            </span>{' '}
            Plans
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to automate and grow your business. No hidden fees.
          </p>
        </motion.div>

        {/* Cards grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative flex flex-col rounded-2xl border bg-[rgba(5,10,30,0.7)] backdrop-blur-sm p-7 transition-shadow duration-300 ${
                  plan.popular
                    ? 'border-[#7C3AED]/60 shadow-[0_0_30px_rgba(124,58,237,0.25)] hover:shadow-[0_0_45px_rgba(124,58,237,0.4)]'
                    : 'border-white/10 hover:border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
                }`}
                style={plan.popular ? { borderColor: `${plan.color}60` } : undefined}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
                    style={{ background: `linear-gradient(135deg, ${plan.color}, #0088ff)` }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: plan.color }} />
                </div>

                {/* Name */}
                <h3 className="text-white font-bold text-lg leading-snug mb-1">{plan.name}</h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span
                    className="text-3xl sm:text-4xl font-black"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-neutral-500 text-sm">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: plan.color }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="mailto:zeeshan.automation06@gmail.com?subject=Get Quote - Automateze"
                  className="mt-auto w-full inline-flex items-center justify-center py-3 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 text-white border"
                  style={{
                    borderColor: `${plan.color}60`,
                    background: `${plan.color}12`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = `${plan.color}25`
                    el.style.borderColor = plan.color
                    el.style.boxShadow = `0 0 20px ${plan.color}30`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = `${plan.color}12`
                    el.style.borderColor = `${plan.color}60`
                    el.style.boxShadow = 'none'
                  }}
                >
                  Get Quote
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center text-neutral-500 text-sm"
        >
          Prices exclude applicable GST. Contact for custom requirements.
        </motion.p>

        {/* Contact info strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500"
        >
          <span className="text-neutral-400 font-semibold">Shaikh Zeeshan</span>
          <a href="tel:+919960751076" className="hover:text-[#00E5FF] transition-colors">+91 99607 51076</a>
          <a href="tel:+917666426388" className="hover:text-[#00E5FF] transition-colors">+91 76664 26388</a>
          <a href="mailto:zeeshan.automation06@gmail.com" className="hover:text-[#00E5FF] transition-colors">zeeshan.automation06@gmail.com</a>
          <a href="https://automateze.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">automateze.com</a>
        </motion.div>
      </div>
    </section>
  )
}
