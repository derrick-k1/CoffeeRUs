import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    // Standard Tailwind colors used to mimic a "Brown/Coffee" theme
    // bg-stone-50 = Cream | bg-orange-900 = Espresso | bg-amber-700 = Caramel
    <section className="min-h-screen bg-[#fafaf9] text-[#2d2a2e] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Hero Section */}
        <div className="relative overflow-hidden bg-[#2d241e] rounded-[2.5rem] shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative grid lg:grid-cols-2 items-center">
            <div className="p-10 lg:p-20">
              <span className="inline-block text-xs uppercase tracking-[0.4em] text-amber-500 font-bold mb-6">
                Est. 2024 • Premium Roasters
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Coffee<span className="text-amber-500">Rus</span> 
                <br />
                <span className="text-stone-300">Refined Taste.</span>
              </h1>
              <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-xl">
                Experience the art of the perfect pour. We source single-origin beans 
                from high-altitude farms, bringing a world of flavor directly to your doorstep.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/shop"
                  className="px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-bold shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/admin"
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold backdrop-blur-md transition-all"
                >
                  Manage Inventory
                </Link>
              </div>
            </div>

            {/* Visual Side (Image Placeholder) */}
            <div className="hidden lg:block relative h-full min-h-[600px] bg-[#3d3028] border-l border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl opacity-20 grayscale">☕</span>
                </div>
                {/* Float Card */}
                <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                    <p className="text-white font-medium italic">"The best Ethiopian roast I've had in years. Pure magic."</p>
                    <p className="text-amber-500 text-sm mt-2 font-bold">— Master Roaster</p>
                </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Small Batch', 
              desc: 'Roasting in 5kg batches ensures absolute control over the flavor profile.',
              icon: '🔥'
            },
            { 
              title: 'Global Sourcing', 
              desc: 'Direct trade relationships with farmers in Ethiopia, Colombia, and Sumatra.',
              icon: '🌍'
            },
            { 
              title: 'Fast Delivery', 
              desc: 'Roasted on Monday, shipped on Tuesday. Freshness is our primary promise.',
              icon: '📦'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all group">
              <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-amber-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-3">{feature.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Status Area */}
        <div className="bg-amber-50 rounded-[2.5rem] p-10 lg:p-16 border border-amber-100 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-black text-[#2d241e]">Ready to upgrade your morning?</h2>
                <p className="text-amber-800/70 mt-2 font-medium">Join 5,000+ coffee lovers worldwide.</p>
            </div>
            <div className="flex gap-4">
                <div className="text-center px-6">
                    <p className="text-3xl font-black text-[#2d241e]">12k</p>
                    <p className="text-xs uppercase tracking-widest text-amber-800/50 font-bold">Cups Sold</p>
                </div>
                <div className="w-px h-12 bg-amber-200"></div>
                <div className="text-center px-6">
                    <p className="text-3xl font-black text-[#2d241e]">45</p>
                    <p className="text-xs uppercase tracking-widest text-amber-800/50 font-bold">Varieties</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}