import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface PricingCard {
  emoji: string
  name: string
  price: string
  period: string
  features: string[]
  badge?: string
  whatsappMessage: string
}

export function PricingSection() {
  const pricingCards: PricingCard[] = [
    {
      emoji: '🤖',
      name: 'AI Agents',
      price: '₹20,000',
      period: '/year',
      features: ['Calling agents', 'Other AI agents', 'Custom automation'],
      badge: '🔥 Most Popular',
      whatsappMessage: 'Hi%2C%20I%20want%20a%20quote%20for%20AI%20Agents'
    },
    {
      emoji: '💬',
      name: 'AI Chatbot',
      price: '₹15,000',
      period: '/year',
      features: ['Website chatbot', 'Instagram chatbot', 'Social media bots'],
      whatsappMessage: 'Hi%2C%20I%20want%20a%20quote%20for%20AI%20Chatbot'
    },
    {
      emoji: '⚙️',
      name: 'Workflow & Gmail',
      price: '₹20,000',
      period: '/year',
      features: ['Workflow automation', 'Gmail integration', 'Email automation'],
      whatsappMessage: 'Hi%2C%20I%20want%20a%20quote%20for%20Workflow%20Automation'
    },
    {
      emoji: '🌐',
      name: 'Website Development',
      price: '₹20,000',
      period: 'one-time',
      features: ['2-year free .com/.in domain', 'UI/UX design', 'Responsive design'],
      whatsappMessage: 'Hi%2C%20I%20want%20a%20quote%20for%20Website%20Development'
    },
    {
      emoji: '📱',
      name: 'App Development',
      price: '₹25,000',
      period: 'one-time',
      features: ['Full mobile app', 'iOS & Android', 'Maintenance support'],
      whatsappMessage: 'Hi%2C%20I%20want%20a%20quote%20for%20App%20Development'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="pricing" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mr-3">💰</span>
            Our Pricing Plans
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Choose the plan that fits your business
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {pricingCards.map((card, index) => (
            <motion.div
              key={card.name}
              variants={cardVariants}
              className="relative group"
            >
              {/* Card Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative h-full bg-[#0a0f1c] border border-[#0066ff]/30 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 hover:border-[#0066ff]/60">
                {/* Badge */}
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {card.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="text-5xl mb-4">{card.emoji}</div>

                {/* Plan Name */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {card.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-[#0066ff]">
                      {card.price}
                    </span>
                    <span className="text-white/60 text-sm">
                      {card.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#0066ff] mt-1">✓</span>
                      <span className="text-white/80 text-sm md:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Get Quote Button */}
                <motion.a
                  href={`https://wa.me/919960751076?text=${card.whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-full px-6 py-3 md:py-4 text-sm md:text-base font-bold text-white bg-gradient-to-r from-[#0066ff] to-[#0099ff] rounded-xl hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300 group/btn"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <p className="text-xs md:text-sm text-white/50 italic">
            *Prices exclude applicable GST. Contact for custom requirements.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
