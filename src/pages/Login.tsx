import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Connect login API
    console.log({
      rememberMe,
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-4xl bg-white shadow-[0_25px_80px_-20px_rgba(15,23,42,0.18)]">

        <section className="relative hidden w-[52%] overflow-hidden bg-[#111827] lg:block">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.25),transparent_35%)]" />

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -left-40 h-120 w-120 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg">
                <ImageIcon className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  DAM
                </h2>

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Digital Asset Management
                </p>
              </div>

            </div>

            <div className="relative max-w-xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 backdrop-blur-sm">

                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />

                <span className="text-xs font-medium text-slate-300">
                  Everything your team needs
                </span>

              </div>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">
                Your digital
                <br />

                <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  assets. Organized.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-slate-400 xl:text-lg">
                Store, organize, manage and share your digital assets
                from one beautifully simple workspace built for modern teams.
              </p>

              <div className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/6 p-4 shadow-2xl backdrop-blur-xl">

                <div className="mb-4 flex items-center justify-between">

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Recent assets
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Marketing Campaign
                    </p>
                  </div>

                  <div className="rounded-lg bg-indigo-500/20 px-2.5 py-1 text-[10px] font-semibold text-indigo-300">
                    128 assets
                  </div>

                </div>

                <div className="grid grid-cols-4 gap-2">

                  <div className="aspect-square rounded-lg bg-linear-to-br from-indigo-400/70 to-purple-500/70" />

                  <div className="aspect-square rounded-lg bg-linear-to-br from-orange-300/60 to-pink-500/60" />

                  <div className="aspect-square rounded-lg bg-linear-to-br from-cyan-300/60 to-blue-500/60" />

                  <div className="aspect-square rounded-lg bg-linear-to-br from-emerald-300/60 to-teal-500/60" />

                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">

              <p className="text-xs text-slate-500">
                © 2026 DAM
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                All systems operational

              </div>

            </div>

          </div>
        </section>

        <section className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

          <div className="w-full max-w-md">

            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  DAM
                </h2>

                <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                  Digital Asset Management
                </p>
              </div>

            </div>

            <div className="mb-8">

              <p className="mb-3 text-sm font-semibold text-indigo-600">
                Welcome back
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Sign in to your
                <br />
                workspace
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your credentials to access your assets,
                projects and team workspace.
              </p>

            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="group relative">

                  <Mail className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

              </div>

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    Forgot password?
                  </a>

                </div>

                <div className="group relative">

                  <Lock className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>

                </div>

              </div>

              <label className="flex cursor-pointer items-center gap-2.5">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                />

                <span className="text-sm text-slate-500">
                  Keep me signed in
                </span>

              </label>

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 active:scale-[0.99]"
              >
                <span>
                  Sign in to workspace
                </span>

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Create your account
              </a>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                <Lock className="h-3 w-3" />
              </div>

              <span>
                Secure authentication · 256-bit encryption
              </span>

            </div>

          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;