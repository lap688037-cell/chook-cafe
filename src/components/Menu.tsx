import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MENU_DATA = {
  Coffee: [
    { name: "Omani Coffee", price: "OMR 1.500", desc: "Aromatic and warming with a beautiful amber color, served traditionally.", image: "/chook-coffee.webp" },
    { name: "Iced Americano", price: "OMR 1.800", desc: "Chilled espresso with water, perfect for a Muscat afternoon.", image: "/chook-coffee.webp" },
    { name: "Mocha", price: "OMR 2.200", desc: "Rich chocolate and espresso blend with steamed milk.", image: "/chook-coffee.webp" },
    { name: "Signature Latte", price: "OMR 2.000", desc: "Smooth espresso with creamy micro-foam.", image: "/chook-coffee.webp" },
  ],
  Breakfast: [
    { name: "Signature Shakshuka", price: "OMR 3.500", desc: "Delicious, rich and flavorful poached eggs in a spiced tomato sauce.", image: "/chook-meat.webp" },
    { name: "Classic Breakfast", price: "OMR 4.000", desc: "A hearty start to your day with local and international favorites.", image: "/chook-meat.webp" },
  ],
  Sandwiches: [
    { name: "Grilled Chicken Sandwich", price: "OMR 2.800", desc: "Tender grilled chicken with fresh greens and house sauce.", image: "/chook-chicken.webp" },
    { name: "Chook Burger", price: "OMR 3.200", desc: "Triple-layered classic with premium ingredients.", image: "/chook-burger.webp" },
  ],
  Desserts: [
    { name: "San Sebastian Cake", price: "OMR 3.000", desc: "Creamy, burnt-top cheesecake—a Chook Cafe favorite.", image: "/chook-cheesecake.webp" },
    { name: "Artisan Croissant", price: "OMR 1.500", desc: "Selection of freshly baked treats from our display.", image: "/chook-croissant.webp" },
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof MENU_DATA>("Coffee");

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-green mb-4">Artisan Menu</h2>
          <p className="text-deep-green/60 max-w-2xl mx-auto">
            Carefully crafted beverages and treats made with the finest seasonal ingredients.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {Object.keys(MENU_DATA).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof MENU_DATA)}
              className={`px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeCategory === category 
                ? "bg-deep-green text-cream shadow-lg" 
                : "bg-white text-deep-green/60 hover:bg-sage/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {MENU_DATA[activeCategory].map((item, index) => (
              <motion.div
                key={`${activeCategory}-${item.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-sage/10 group"
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-sage/10">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-deep-green group-hover:text-sage transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-lg font-semibold text-sage">{item.price}</span>
                    </div>
                    <p className="text-deep-green/60 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
