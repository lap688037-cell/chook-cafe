import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  "/chook-burger.webp",
  "/chook-cheesecake.webp",
  "/chook-chicken.webp",
  "/chook-coffee.webp",
  "/chook-croissant.webp",
  "/chook-meat.webp"
];

export default function Gallery() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-green mb-4">Chook Vibe</h2>
          <p className="text-deep-green/60 max-w-2xl mx-auto">
            A glimpse into our modernized Omani cafe. Follow us on Instagram @chook_cafe for more daily inspiration.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-sage/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
