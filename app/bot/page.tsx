
'use client';

import { useState } from 'react';
import Link from 'next/link';

type ImportedBot = {
  name: string;
  type: string;
  size: string;
  content: string;
};

const strategies = [
  {
    name: 'Over / Under AI',
    description: 'Digit-based Over and Under strategy.',
    icon: '🎯',
  },
  {
    name: 'Matches / Differs AI',
    description: 'Analyses last-digit matching patterns.',
    icon: '🔍',
  },
  {
    name: 'Even / Odd AI',
    description: 'Analyses even and odd digit patterns.',
    icon: '📊',
  },
  {
    name: 'Multi-Strategy AI',
    description: 'Combines multiple strategy conditions.',
    icon: '🧠',
  },
];

export default function BotPage() {
  const [tab, setTab] = useState('ai');
  const [market, setMarket] = useState('R_100');
  const [account, setAccount] = useState('demo');
  const [strategy, setStrategy] = useState('Over / Under AI');
  const [stake, setStake] = useState('1');
  const [duration, setDuration] = useState('5');
  const [stopLoss, setStopLoss] = useState('10');
  const [takeProfit, setTakeProfit] = useState('20');
  const [maxTrades, setMaxTrades] = useState('10');
  const [bot, setBot] = useState<ImportedBot | null>(null);
  const [message, setMessage] = useState('');

  async function importBot(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!['json', 'xml', 'js', 'txt'].includes(extension || '')) {
      setMessage('Unsupported file. Select JSON, XML, JS or TXT.');
      return;
    }

    if (file.size > 1024 * 1024) {
      setMessage('File is too large. Maximum size is 1 MB.');
      return;
    }

    try {
      const content = await file.text();

      if (extension === 'json') {
        JSON.parse(content);
      }

      if (extension === 'xml') {
        const parsed = new DOMParser().parseFromString(
          content,
          'application/xml'
        );
        if (parsed.querySelector('parsererror')) {
          throw new Error('Invalid XML file.');
        }
      }

      setBot({
        name: file.name,
        type: extension || '',
        size: (file.size / 1024).toFixed(1) + ' KB',
        content,
      });

      setMessage(
        extension === 'js'
          ? 'JavaScript file imported for review. It will not be executed.'
          : 'File imported and basic validation passed.'
      );
    } catch {
      setMessage('File validation failed. Check your bot file.');
      setBot(null);
    }

    event.target.value = '';
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-5xl">

        <Link href="/dashboard" className="text-green-400">
          ← Customer Dashboard
        </Link>

        <header className="mb-7 mt-5">
          <p className="font-bold tracking-widest text-green-400">
            KASHTRADE.COM
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            AUTOMATED BOT CENTRE
          </h1>
          <p className="mt-2 text-slate-400">
            Manage built-in strategies and import your own trading bots.
          </p>
        </header>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setTab('ai')}
            className={`rounded-xl p-4 font-bold ${
              tab === 'ai'
                ? 'bg-green-600'
                : 'border border-slate-700 bg-slate-900'
            }`}
          >
            🧠 AI BOTS
          </button>

          <button
            onClick={() => setTab('import')}
            className={`rounded-xl p-4 font-bold ${
              tab === 'import'
                ? 'bg-green-600'
                : 'border border-slate-700 bg-slate-900'
            }`}
          >
            📁 IMPORT MY BOT
          </button>
        </div>

        {tab === 'ai' && (
          <section className="space-y-5">

            <div className="grid gap-3 sm:grid-cols-2">
              {strategies.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setStrategy(item.name)}
                  className={`rounded-xl border p-5 text-left ${
                    strategy === item.name
                      ? 'border-green-500 bg-green-950/40'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <h2 className="mt-3 font-bold">{item.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {item.description}
                  </p>
                  {strategy === item.name && (
                    <p className="mt-3 text-sm text-green-400">
                      Selected
                    </p>
                  )}
                </button>
              ))}
            </div>

            <BotSettings
              market={market}
              setMarket={setMarket}
              account={account}
              setAccount={setAccount}
              stake={stake}
              setStake={setStake}
              duration={duration}
              setDuration={setDuration}
              stopLoss={stopLoss}
              setStopLoss={setStopLoss}
              takeProfit={takeProfit}
              setTakeProfit={setTakeProfit}
              maxTrades={maxTrades}
              setMaxTrades={setMaxTrades}
            />

            <div className="rounded-xl border border-yellow-600/40 bg-yellow-950/20 p-4 text-sm text-yellow-300">
              Built-in strategy selection is available. Live market
              analysis and automatic execution still need connection
              to the Deriv trading engine.
            </div>

            <button
              onClick={() =>
                setMessage(
                  'Settings saved for this session. Automatic execution is not connected yet.'
                )
              }
              className="w-full rounded-xl bg-green-600 p-4 font-bold"
            >
              SAVE BOT CONFIGURATION
            </button>

          </section>
        )}

        {tab === 'import' && (
          <section className="space-y-5">

            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">
              <div className="text-5xl">☁️</div>
              <h2 className="mt-4 text-xl font-bold">
                IMPORT YOUR OWN BOT
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Select a trading bot file from your phone or computer.
              </p>

              <label className="mt-6 inline-block cursor-pointer rounded-xl bg-green-600 px-7 py-4 font-bold">
                CHOOSE BOT FILE
                <input
                  type="file"
                  accept=".json,.xml,.js,.txt"
                  onChange={importBot}
                  className="hidden"
                />
              </label>

              <p className="mt-4 text-xs text-slate-500">
                Supported formats: JSON, XML, JavaScript and TXT.
                Maximum file size: 1 MB.
              </p>
            </div>

            {bot && (
              <div className="rounded-xl border border-green-700 bg-slate-900 p-5">
                <h3 className="font-bold text-green-400">
                  IMPORTED BOT
                </h3>
                <p className="mt-3 break-all">{bot.name}</p>
                <p className="mt-2 text-sm text-slate-400">
                  Format: {bot.type.toUpperCase()}
                </p>
                <p className="text-sm text-slate-400">
                  Size: {bot.size}
                </p>

                <div className="mt-4 rounded-lg bg-slate-800 p-3 text-sm">
                  File imported for inspection. Execution is not enabled.
                </div>

                <button
                  onClick={() => {
                    setBot(null);
                    setMessage('Imported file removed.');
                  }}
                  className="mt-4 rounded-lg bg-red-700 px-5 py-3 font-bold"
                >
                  REMOVE FILE
                </button>
              </div>
            )}

            <div className="rounded-xl border border-yellow-600/40 bg-yellow-950/20 p-4 text-sm text-yellow-300">
              Imported files are not automatically executed.
              DBot XML, JavaScript and other bot formats need
              compatible execution adapters and security checks
              before they can trade.
            </div>

          </section>
        )}

        {message && (
          <div className="mt-5 rounded-xl bg-slate-800 p-4 text-sm text-green-300">
            {message}
          </div>
        )}

      </div>
    </main>
  );
}

function BotSettings(props: any) {
  const fields = [
    ['Stake (USD)', props.stake, props.setStake],
    ['Duration (ticks)', props.duration, props.setDuration],
    ['Maximum loss (USD)', props.stopLoss, props.setStopLoss],
    ['Profit target (USD)', props.takeProfit, props.setTakeProfit],
    ['Maximum trades', props.maxTrades, props.setMaxTrades],
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="mb-5 text-xl font-bold">BOT SETTINGS</h2>

      <label className="mb-2 block text-sm">Market</label>
      <select
        value={props.market}
        onChange={(e) => props.setMarket(e.target.value)}
        className="mb-5 w-full rounded-lg bg-slate-800 p-3"
      >
        <option value="R_100">Volatility 100</option>
        <option value="R_75">Volatility 75</option>
        <option value="R_50">Volatility 50</option>
        <option value="R_25">Volatility 25</option>
        <option value="1HZ100V">Volatility 100 (1s)</option>
      </select>

      <label className="mb-2 block text-sm">Account</label>
      <select
        value={props.account}
        onChange={(e) => props.setAccount(e.target.value)}
        className="mb-5 w-full rounded-lg bg-slate-800 p-3"
      >
        <option value="demo">Demo account</option>
        <option value="real">Real account</option>
      </select>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([label, value, setter]: any) => (
          <div key={label}>
            <label className="mb-2 block text-sm">{label}</label>
            <input
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full rounded-lg bg-slate-800 p-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
  }
                    
