import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Connect registration API
    console.log("Register user");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <div
        className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_-20px_rgba(15,23,42,0.18)]">

        <section className="relative hidden w-[52%] overflow-hidden bg-[#111827] lg:block">

          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.25),transparent_35%)]" />

          {/* Decorative circles */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

          <div
            className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg">
                <ImageIcon className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  AssetFlow
                </h2>

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Digital Asset Management
                </p>
              </div>
            </div>

            {/* Main content */}
            <div className="relative max-w-xl">

              <div
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />

                <span className="text-xs font-medium text-slate-300">
                  Start managing smarter
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">
                Everything your team
                <br />

                <span
                  className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  creates, organized.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-slate-400 xl:text-lg">
                Create your workspace and bring your team's digital
                assets together in one powerful platform.
              </p>

              <div className="mt-10 space-y-4">

                <Benefit title="Centralized asset library"
                  description="Keep images, videos and documents in one place." />

                <Benefit title="Powerful search & organization"
                  description="Find the right asset when you need it." />

                <Benefit title="Built for modern teams"
                  description="Collaborate, share and manage assets effortlessly." />

              </div>

              <div
                className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
                    <ImageIcon className="h-5 w-5 text-indigo-400" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Your workspace
                    </p>

                    <p className="text-sm font-semibold text-white">
                      Ready when you are
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[10px] font-medium text-emerald-400">
                      Active
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                © 2026 AssetFlow
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="h-3 w-3" />
                Secure platform
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

          <div className="w-full max-w-[420px]">

            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  AssetFlow
                </h2>

                <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                  Digital Asset Management
                </p>
              </div>
            </div>

            <div className="mb-7">
              <p className="mb-3 text-sm font-semibold text-indigo-600">
                Get started
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Create your
                <br />
                workspace
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Set up your account and start managing your
                digital assets with your team.
              </p>
            </div>

            <button type="button"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.99]">
              <GoogleIcon />

              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[10px] font-semibold tracking-widest text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-700">
                    First name
                  </label>

                  <div className="group relative">
                    <User
                      className="absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                    <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="John"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-700">
                    Last name
                  </label>

                  <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Doe"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                  Work email
                </label>

                <div className="group relative">
                  <Mail
                    className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="group relative">
                  <Lock
                    className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                  <input id="password" name="password" type={showPassword ? "text" : "password"}
                    autoComplete="new-password" placeholder="Create a strong password" required minLength={8}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />

                  <button type="button" onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition
                        hover:bg-slate-100 hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Use at least 8 characters with a mix of letters and numbers.
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm password
                </label>

                <div className="group relative">
                  <Lock
                    className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />

                  <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text"
                    : "password"} autoComplete="new-password" placeholder="Confirm your password" required
                    minLength={8}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />

                  <button type="button" onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition
                        hover:bg-slate-100 hover:text-slate-600"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 pt-1">
                <input type="checkbox" checked={agreeToTerms} onChange={(event) =>
                  setAgreeToTerms(event.target.checked)
                }
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600
                    focus:ring-2 focus:ring-indigo-500/20"
                />

                <span className="text-xs leading-5 text-slate-500">
                  I agree to the{" "}
                  <a href="/terms" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button type="submit" disabled={!agreeToTerms}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none">
                <span>Create workspace</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                Sign in
              </a>
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                <Lock className="h-3 w-3" />
              </div>

              <span>
                Your information is securely encrypted
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

interface BenefitProps {
  title: string;
  description: string;
}

function Benefit({
  title,
  description,
}: BenefitProps) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/15">
        <Check className="h-3.5 w-3.5 text-indigo-400" />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-200">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}


function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.92-4.2 2.92-7.4Z" />

      <path fill="#34A853"
        d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.6Z" />

      <path fill="#FBBC05" d="M6.54 13.69a5.86 5.86 0 0 1 0-3.38V7.79H3.3a9.75 9.75 0 0 0 0 8.42l3.24-2.52Z" />

      <path fill="#EA4335"
        d="M12 6.28c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.39 14.62 2.4 12 2.4a9.74 9.74 0 0 0-8.7 5.39l3.24 2.52C7.31 8 9.46 6.28 12 6.28Z" />
    </svg>
  );
}

export default Register;