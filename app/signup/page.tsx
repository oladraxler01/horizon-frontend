"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!username || !email || !phone || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        {
          username,
          email,
          password,
          phone_number: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        setMessage("Signup successful. You may now log in.");
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setMessage("Signup succeeded but unexpected response.");
      }
    } catch (error: any) {
      console.log("Full Backend Error:", error.response?.data);
      let errorMessage = "Unable to sign up. Please try again.";
      if (error.response?.status === 400 && error.response?.data) {
        const fieldErrors = Object.entries(error.response.data)
          .map(
            ([field, messages]) =>
              `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`,
          )
          .join("; ");
        errorMessage = `Validation errors: ${fieldErrors}`;
      } else if (error.response?.data) {
        errorMessage = JSON.stringify(error.response.data);
      } else {
        errorMessage = error.message;
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EEE8] text-slate-900 dark:bg-[#020617] dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="flex flex-1 flex-col justify-center bg-[#D1E8D1] px-8 py-12 text-[#14321F] dark:bg-[#111827] dark:text-slate-100 lg:px-16 lg:py-20">
          <div className="mx-auto flex w-full max-w-xl flex-col gap-10">
            <div className="rounded-[2rem] bg-white/85 p-8 shadow-[0_40px_90px_rgba(18,59,26,0.15)] backdrop-blur-xl dark:bg-slate-900/90 dark:shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[#5B7A55]">
                Horizon Inclusion
              </p>
              <h1 className="mt-6 text-6xl font-semibold leading-tight tracking-[-0.05em] text-[#10331C]">
                Start your journey.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#2A4532]">
                Create an account with kindness and security in mind. Horizon
                Inclusion is designed to make your financial path feel calm,
                clear, and supported.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-[0_20px_50px_rgba(18,59,26,0.12)] dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <p className="text-sm uppercase tracking-[0.35em] text-[#4A6B51]">
                  Welcome environment
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-[#EFF5ED] p-5">
                    <p className="text-sm text-[#4F7150]">Privacy first</p>
                    <p className="mt-3 text-3xl font-semibold text-[#13311F]">
                      Always
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-[#EFF5ED] p-5">
                    <p className="text-sm text-[#4F7150]">Community-led</p>
                    <p className="mt-3 text-3xl font-semibold text-[#13311F]">
                      Trusted
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-dashed border-white/50 bg-[#F5FBF5] p-10 shadow-[0_25px_60px_rgba(18,59,26,0.08)] dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                <div className="flex h-full flex-col items-center justify-center gap-5 rounded-[1.75rem] bg-white/70 p-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C6E2C6] text-2xl font-bold text-[#285B2C]">
                    +
                  </div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#5D7A5D]">
                    Design placeholder
                  </p>
                  <p className="max-w-xs text-sm leading-6 text-[#566F5A]">
                    A refined onboarding concept area to make the brand feel
                    polished and modern.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 items-center justify-center px-6 py-10 lg:px-14 lg:py-16">
          <div className="w-full max-w-[34rem] rounded-[2.5rem] bg-white p-10 shadow-[0_35px_70px_rgba(15,23,22,0.08)] dark:bg-slate-900 dark:shadow-[0_35px_70px_rgba(0,0,0,0.45)]">
            <div className="mb-10 flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8F7B6C]">
                Welcome Home
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                Let&apos;s begin your journey
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                Fill in the details below to set up your account and start
                managing your finances with care.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-[#FAFAF6] px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-[#963D1D] focus:ring-2 focus:ring-[#E8B0A0]/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Tell us how you’d like to be called"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-[#FAFAF6] px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-[#963D1D] focus:ring-2 focus:ring-[#E8B0A0]/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-[#FAFAF6] px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-[#963D1D] focus:ring-2 focus:ring-[#E8B0A0]/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-[#FAFAF6] px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-[#963D1D] focus:ring-2 focus:ring-[#E8B0A0]/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Create a secure password"
                />
              </div>

              {message ? (
                <div className="rounded-[1.75rem] border border-[#E9D7CF] bg-[#FFF4EF] px-4 py-3 text-sm text-[#7B3A2C]">
                  {message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-full bg-[#963D1D] px-6 text-base font-semibold text-white transition hover:bg-[#7A2F1B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Continue to Security"}
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>Already a member?</p>
              <a
                href="/"
                className="font-semibold text-[#963D1D] transition hover:text-[#7A2F1B]"
              >
                Log in here
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
