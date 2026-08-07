"use client";

import { useActionState } from "react";
import Image from "next/image";
import { loginAction, type LoginState } from "../actions";

const LOGO_URL =
  "https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6125,x_908,y_1653/HATCH_LOGO_GOLD-02_1_arrhel.png";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "#00251f" }}>
      <div className="absolute inset-0 pointer-events-none luxe-grain" />
      <div className="relative w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <div className="relative w-48 h-14">
            <Image src={LOGO_URL} alt="Hatch Group" fill unoptimized priority className="object-contain" />
          </div>
        </div>

        <form action={formAction} className="bg-white rounded-2xl shadow-2xl shadow-black/40 p-8">
          <h1 className="text-[11px] tracking-[0.3em] uppercase font-medium text-[#1C2420]/60 mb-1">
            Admin Access
          </h1>
          <p className="text-lg font-medium text-[#1C2420] mb-6">Sign in to manage projects</p>

          <label className="block text-[11px] tracking-[0.15em] uppercase font-medium text-slate-500 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoFocus
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#A98C5F]/40 focus:border-[#A98C5F] transition-colors"
            placeholder="••••••••"
          />

          {state?.error && (
            <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full rounded-lg bg-[#00251f] text-white text-[11px] tracking-[0.2em] uppercase font-medium py-3.5 hover:bg-[#00251f]/90 transition-colors disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs mt-6">Hatch Group — Content Management</p>
      </div>
    </main>
  );
}
