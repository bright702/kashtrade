
'use client';

import Link from 'next/link';

const features = [
  { name: 'Automated Trading Bot', description: 'Configure and manage your trading bot', href: '/bot', icon: '🤖' },
  { name: 'Risk Management', description: 'Control your trading risks and limits', href: '/risk-management', icon: '🛡️' },
  { name: 'Trading History', description: 'Review your previous trades', href: '/history', icon: '📊' },
  { name: 'Referral Dashboard', description: 'Manage your referrals and commissions', href: '/referrals', icon: '👥' },
  { name: 'Customer Support', description: 'Get help with Kashtrade', href: '/support', icon: '💬' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold tracking-widest text-green-400">KASHTRADE.COM</p>
            <h1 className="mt-2 text-3xl font-bold">Customer Dashboard</h1>
            <p className="mt-1 text-slate-400">Your trading control centre</p>
          </div>
          <Link href="/" className="rounded-lg bg-green-600 px-5 py-3 font-semibold">
            Open Trading
          </Link>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Deriv Account</p>
            <h2 className="mt-3 text-xl font-bold">Connection required</h2>
            <p className="mt-2 text-sm text-slate-400">Connect your Deriv account to view your balance.</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Trading Bot</p>
            <h2 className="mt-3 text-xl font-bold">Not running</h2>
            <p className="mt-2 text-sm text-slate-400">Bot controls will appear here.</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Trading Activity</p>
            <h2 className="mt-3 text-xl font-bold">No data loaded</h2>
            <p className="mt-2 text-sm text-slate-400">Trade statistics will load from your account.</p>
          </div>
        </section>

        <h2 className="mb-4 text-xl font-bold">Your Kashtrade Services</h2>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-green-500"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 font-bold">{feature.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
              <p className="mt-4 font-semibold text-green-400">Open service →</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
          }
