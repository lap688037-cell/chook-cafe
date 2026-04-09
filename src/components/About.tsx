import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-24 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/chook-chicken.webp" 
                alt="Cafe Cuisine" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-sage rounded-3xl -z-10 hidden md:block" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-deep-green">
              Our Story: A Modern <span className="text-sage">Omani Legacy</span>
            </h2>
            <div className="space-y-6 text-lg text-deep-green/70">
              <p>
                Chook Cafe isn't just a coffee shop—it's a vibe. We are taking forward the legacy of the Omani coffee shops, creating a space where tradition meets modern elegance.
              </p>
              <p>
                Our modernized cafe allows you to indulge in the most popular Omani and International cuisines, whilst highlighting images of past Muscat and Muttrah. It's a sanctuary of calm energy, beautiful interiors, and exquisite desserts.
              </p>
              <p>
                Whether you're here for our signature Shakshuka or a warming Omani coffee, every moment at Chook is designed to be an experience. Save this spot for your next Muscat visit.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-sage mb-1">4.6</h4>
                <p className="text-sm font-medium text-deep-green/60 uppercase tracking-wider">Google Rating</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-sage mb-1">174+</h4>
                <p className="text-sm font-medium text-deep-green/60 uppercase tracking-wider">Happy Reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
