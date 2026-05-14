import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="min-h-screen bg-[#fafaf9] text-[#2d2a2e] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Hero Section */}
        <div className="relative overflow-hidden bg-[#2d241e] rounded-[3rem] shadow-2xl">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/20 blur-[120px] rounded-full -mr-32 -mt-32"></div>
          
          <div className="relative grid lg:grid-cols-2 items-stretch">
            <div className="p-10 lg:p-24 flex flex-col justify-center">
              <span className="inline-block text-xs uppercase tracking-[0.5em] text-amber-500 font-black mb-6">
                Est. 2024 • Artisan Batch Roasters
              </span>
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                Coffee<span className="text-amber-500">Rus</span> 
                <br />
                <span className="text-stone-400 font-light italic text-5xl lg:text-6xl">Pure Essence.</span>
              </h1>
              <p className="mt-10 text-lg text-stone-400 leading-relaxed max-w-lg">
                More than just caffeine. We explore the world to find beans with 
                character, roasting them to reveal notes of citrus, cocoa, and spice.
              </p>

              <div className="mt-12 flex flex-wrap gap-6">
                <Link
                  to="/shop"
                  className="px-12 py-6 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-bold shadow-xl shadow-amber-900/40 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Shop the Roast
                </Link>
                <Link
                  to="/admin"
                  className="px-10 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-2xl font-bold backdrop-blur-md transition-all"
                >
                  Inventory
                </Link>
              </div>
            </div>

            {/* Visual Side (The Styled Image & Quote Card) */}
            <div className="relative min-h-[500px] lg:min-h-[700px] overflow-hidden">
                {/* Hero Image */}
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop" 
                  alt="Premium Coffee Beans" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d241e] via-transparent to-transparent opacity-60"></div>

                {/* Refined Quote Card (Glassmorphism Style) */}
                <div className="absolute bottom-10 left-6 right-6 lg:left-12 lg:right-12">
                    <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/20 shadow-2xl">
                        <div className="flex gap-1 mb-4">
                           {[...Array(5)].map((_, i) => (
                             <span key={i} className="text-amber-500 text-xs">★</span>
                           ))}
                        </div>
                        <p className="text-white text-xl lg:text-2xl font-medium leading-snug italic tracking-tight">
                          "The Ethiopian Yirgacheffe is a revelation. It's like drinking a garden of jasmine and peaches."
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <div className="h-px w-8 bg-amber-500"></div>
                            <p className="text-amber-500 text-sm font-black uppercase tracking-widest">Master Roaster Selection</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Feature Grid with better cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Small Batch', 
              desc: 'Roasting in 5kg micro-batches to ensure every bean reaches its peak potential.',
              icon: '☕',
              color: 'group-hover:text-amber-600'
            },
            { 
              title: 'Ethical Trade', 
              desc: 'We pay 25% above fair trade prices to ensure sustainability for our farmers.',
              icon: '🌿',
              color: 'group-hover:text-green-600'
            },
            { 
              title: 'Freshness Log', 
              desc: 'Every bag is stamped with its roast date. We never ship beans older than 48 hours.',
              icon: '📅',
              color: 'group-hover:text-blue-600'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-sm hover:shadow-2xl hover:border-amber-100 transition-all duration-500 group relative overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-4">{feature.title}</h3>
              <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Improved Bottom CTA */}
        <div className="bg-[#2d241e] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="https://www.transparenttextures.com/patterns/carbon-fibre.png" alt="texture" className="w-full h-full" />
             </div>
             <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Start your coffee journey.</h2>
                <p className="text-stone-400 mb-12 text-lg max-w-2xl mx-auto">
                    From light floral blends to dark smoky roasts, find the bag that matches your morning mood.
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-14 py-6 bg-white text-[#2d241e] hover:bg-amber-500 hover:text-white rounded-2xl font-bold transition-all shadow-xl active:scale-95"
                >
                  Explore the Full Collection
                </Link>
             </div>
        </div>
      </div>
    </section>
  );
}