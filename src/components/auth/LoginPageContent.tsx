"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MaterialSymbols } from "@/components/ui/MaterialSymbols";

export function LoginPageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scanFast, setScanFast] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#05080F] p-4">
      <MaterialSymbols />
      <div className="premier-grain" />

      <div className="pointer-events-none fixed inset-0 flex flex-col justify-between p-4 opacity-40 sm:p-8">
        <div className="flex justify-between">
          <div>
            <span className="label-caps text-accent">STATUS: ОЖИДАНИЕ АВТОРИЗАЦИИ</span>
            <p className="font-data-sm mt-1 text-surface-muted">LOC: BIOPOLE_CENTER_DELTA_4</p>
          </div>
          <div className="text-right">
            <span className="label-caps text-accent">PROTOCOL: AES-512-V2</span>
            <p className="font-data-sm mt-1 text-surface-muted">SECURE LINK: ACTIVE</p>
          </div>
        </div>
        <div className="flex justify-between font-data-sm text-surface-muted">
          <span>© 2026 BIOPOLAR AGROPULSE SYSTEMS</span>
          <span className="text-accent">V4.0.2 TERMINAL</span>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-900/5 blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-[480px]">
        <div className="relative overflow-hidden border border-white/10 bg-surface-elevated/20 p-6 shadow-panel backdrop-blur-xl sm:p-10">
          <div className="absolute left-0 top-0 h-8 w-1 bg-accent" />

          <header className="mb-8 sm:mb-10">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[32px]">
              BIOPOLAR AGROPULSE
            </h1>
            <p className="label-caps mt-2 text-accent tracking-[0.2em]">
              ТЕРМИНАЛ ОПЕРАТОРА V2
            </p>
          </header>

          <div className="relative mx-auto mb-8 flex aspect-square w-28 items-center justify-center sm:mb-10 sm:w-32">
            <div className="absolute inset-0 animate-pulse rounded-full border border-accent/20" />
            <div
              className="absolute inset-2 rounded-full border-t-2 border-accent animate-spin"
              style={{ animationDuration: "4s" }}
            />
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-surface-hover/50">
              <span
                className="material-symbols-outlined text-4xl text-accent"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fingerprint
              </span>
              <div
                className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-accent to-transparent shadow-glow"
                style={{
                  animation: `premierAuthScan ${scanFast ? "1.5s" : "3s"} ease-in-out infinite`,
                }}
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="label-caps text-accent opacity-70">ОЖИДАНИЕ БИОМЕТРИИ</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="label-caps block text-surface-muted">ID Оператора</label>
              <div className="relative">
                <input
                  className="w-full border-b border-white/20 bg-transparent py-2 font-data-lg text-accent outline-none placeholder:text-white/20 focus:border-accent focus:ring-0"
                  placeholder="OP_ID_0000"
                  type="text"
                  onFocus={() => setScanFast(true)}
                  onBlur={() => setScanFast(false)}
                />
                <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-sm text-surface-muted">
                  shield
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-caps block text-surface-muted">Ключ шифрования</label>
              <div className="relative">
                <input
                  className="w-full border-b border-white/20 bg-transparent py-2 font-data-lg text-accent outline-none placeholder:text-white/20 focus:border-accent focus:ring-0"
                  placeholder="••••••••••••"
                  type="password"
                  onFocus={() => setScanFast(true)}
                  onBlur={() => setScanFast(false)}
                />
                <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-sm text-surface-muted">
                  key
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-6 flex h-14 w-full items-center justify-center gap-3 overflow-hidden border border-accent/30 bg-accent/10 transition hover:bg-accent/20 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-accent">refresh</span>
                  <span className="label-caps text-accent">ПРОВЕРКА ДАННЫХ...</span>
                </>
              ) : (
                <>
                  <span className="label-caps font-bold tracking-[0.3em] text-accent">
                    УСТАНОВИТЬ СОЕДИНЕНИЕ
                  </span>
                  <span className="material-symbols-outlined text-accent">arrow_forward</span>
                </>
              )}
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-accent/50" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-accent/50" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="label-caps text-surface-muted">ЗАЩИЩЕННЫЙ КАНАЛ</span>
            </div>
            <Link
              href="/register"
              className="label-caps text-surface-muted transition hover:text-accent"
            >
              РЕГИСТРАЦИЯ
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded border border-red-500/20 bg-red-500/10 px-4 py-2">
          <span className="material-symbols-outlined text-base text-red-400">warning</span>
          <span className="font-data-sm uppercase text-red-400/80">
            Только для авторизованного персонала
          </span>
        </div>
      </main>
    </div>
  );
}
