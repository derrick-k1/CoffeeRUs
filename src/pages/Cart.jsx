import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Your Cart
              </h1>
              <p className="mt-2 text-slate-500">
                {cart.length > 0
                  ? `${cart.length} item${cart.length === 1 ? '' : 's'} ready for checkout.`
                  : 'Your cart is empty. Add some coffee to get started.'}
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
            >
              Back to Shop
            </Link>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-xl">
            <p className="text-xl font-semibold text-slate-700">No items in cart yet.</p>
            <p className="mt-3 text-slate-500">
              Browse the shop to add your favorite coffee blends.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">

            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">{item.name}</h2>
                      <p className="mt-1 text-sm uppercase tracking-[0.24em] text-slate-400">
                        {item.origin}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-black text-slate-900">${Number(item.price || 0).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Estimated total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="mt-8 w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-slate-800"
                disabled
              >
                Checkout (coming soon)
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
