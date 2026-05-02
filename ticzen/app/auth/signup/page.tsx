"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left – dark branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-950 flex-col items-center justify-center text-white relative overflow-hidden">
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <p className="text-lg font-semibold text-white/70 mb-4">Welcome to</p>
          <div className="bg-white text-gray-900 font-black text-3xl tracking-tight px-6 py-3 rounded-xl mb-6">
            TIC<span className="bg-gray-900 text-white px-1 rounded">ZEN</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-10">
            TicZen is your all-in-one platform for discovering, booking, and managing event tickets. Sign up to access curated experiences or effortlessly create and host your own public or private events.
          </p>

          {/* Member avatars */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[5, 6, 7].map((n) => (
                <Image key={n} src={`https://i.pravatar.cc/32?img=${n}`} alt="" width={32} height={32} className="rounded-full border-2 border-gray-900" />
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-1">11k members</span>
          </div>
        </div>

        <p className="absolute bottom-6 text-xs text-gray-600">Copyright © 2026 Design by CODEZEN</p>
      </div>

      {/* Right – sign up form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Sign up</h1>
            <p className="text-sm text-gray-500">Sign up to enjoy the feature of TicZen</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 pr-10"
                placeholder="Password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Remember Password</span>
            </label>

            <p className="text-xs text-gray-400">
              By clicking &apos;Continue&apos; I agree to the{" "}
              <Link href="#" className="text-gray-700 underline">Terms and Conditions</Link>
              {" "}and{" "}
              <Link href="#" className="text-gray-700 underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors"
            >
              Sign up
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-gray-900 font-semibold underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
