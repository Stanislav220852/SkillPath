import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Calendar,
  Users,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import * as API from "../../api";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
  lang: "EN" | "RU";
}

type Mode = "login" | "register";

const authInput =
  "w-full h-12 md:h-[54px] rounded-2xl bg-white/[0.055] border border-white/10 text-white placeholder:text-white/38 outline-none transition-all focus:border-violet-400/70 focus:bg-white/[0.075] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.12)]";

const fieldLabel = "mb-2 block text-sm md:text-[15px] font-semibold text-white/72";

const FieldShell = ({
  label,
  icon,
  children,
  className = "",
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <label className={`block ${className}`}>
    <span className={fieldLabel}>{label}</span>
    <div className="relative">
      {icon && <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/38">{icon}</div>}
      {children}
    </div>
  </label>
);

export const AuthModal = ({ onClose, onSuccess, lang }: AuthModalProps) => {
  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = {
    loginTab: lang === "RU" ? "Вход" : "Login",
    registerTab: lang === "RU" ? "Регистрация" : "Registration",
    loginTitle: lang === "RU" ? "Вход в аккаунт" : "Welcome back",
    registerTitle: lang === "RU" ? "Создать аккаунт" : "Create account",
    subtitle:
      lang === "RU"
        ? "Продолжите обучение и откройте свой прогресс"
        : "Continue learning and unlock your progress",
    email: "Email",
    password: lang === "RU" ? "Пароль" : "Password",
    confirm: lang === "RU" ? "Подтверждение" : "Confirm",
    firstName: lang === "RU" ? "Имя" : "First name",
    lastName: lang === "RU" ? "Фамилия" : "Last name",
    patronymic: lang === "RU" ? "Отчество" : "Middle name",
    birthDate: lang === "RU" ? "Дата рождения" : "Date of birth",
    gender: lang === "RU" ? "Пол" : "Gender",
    choose: lang === "RU" ? "Выберите" : "Select",
    male: lang === "RU" ? "Мужской" : "Male",
    female: lang === "RU" ? "Женский" : "Female",
    other: lang === "RU" ? "Не указывать" : "Prefer not to say",
    forgot: lang === "RU" ? "Забыли пароль?" : "Forgot password?",
    loginBtn: lang === "RU" ? "Войти" : "Sign in",
    registerBtn: lang === "RU" ? "Создать аккаунт" : "Create account",
    errorInvalid: lang === "RU" ? "Неверный email или пароль" : "Invalid email or password",
    errorExists: lang === "RU" ? "Email уже зарегистрирован" : "Email already registered",
    errorGeneral: lang === "RU" ? "Что-то пошло не так" : "Something went wrong",
    errorPasswordMatch: lang === "RU" ? "Пароли не совпадают" : "Passwords do not match",
    errorNameRequired: lang === "RU" ? "Укажите имя и фамилию" : "Enter first and last name",
  };

  const fullName = useMemo(
    () => [lastName, firstName, patronymic].map((v) => v.trim()).filter(Boolean).join(" "),
    [lastName, firstName, patronymic]
  );

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!firstName.trim() || !lastName.trim()) {
        setError(t.errorNameRequired);
        return;
      }
      if (password !== confirmPassword) {
        setError(t.errorPasswordMatch);
        return;
      }
    }

    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await API.login(email.trim(), password)
          : await API.register(email.trim(), password, fullName, lang);

      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      if (err?.status === 401) setError(t.errorInvalid);
      else if (err?.status === 409) setError(t.errorExists);
      else setError(err?.detail || t.errorGeneral);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#050611]/82 p-4 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* glow background like on screenshots */}
        <div className="pointer-events-none absolute left-[6%] top-[7%] h-32 w-32 rounded-full bg-violet-500/25 blur-[70px]" />
        <div className="pointer-events-none absolute right-[16%] top-[39%] h-28 w-28 rounded-full bg-blue-500/20 blur-[75px]" />
        <div className="pointer-events-none absolute bottom-[9%] right-[12%] h-44 w-44 rounded-full bg-fuchsia-500/16 blur-[95px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:92px_92px]" />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative my-8 w-full ${mode === "register" ? "max-w-[760px]" : "max-w-[420px]"}`}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute -right-2 -top-12 z-20 rounded-full border border-white/10 bg-white/8 p-2.5 text-white/70 backdrop-blur-md transition-all hover:bg-white/14 hover:text-white md:right-0"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10111f]/88 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="absolute inset-x-3 top-0 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 shadow-[0_0_28px_rgba(168,85,247,0.85)]" />
            <div className="pointer-events-none absolute -top-28 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-white/10 blur-[65px]" />
            <div className="pointer-events-none absolute -right-20 bottom-8 h-48 w-48 rounded-full bg-violet-500/10 blur-[70px]" />

            <form onSubmit={handleSubmit} className="relative z-10 p-6 md:p-10">
              <div className="mx-auto mb-8 flex max-w-[580px] rounded-2xl border border-white/[0.045] bg-white/[0.055] p-1.5 shadow-inner shadow-black/20">
                {(["login", "register"] as Mode[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => switchMode(item)}
                    className={`relative flex-1 rounded-xl px-4 py-3 text-sm font-black transition-all md:text-base ${
                      mode === item ? "text-white" : "text-white/48 hover:text-white/75"
                    }`}
                  >
                    {mode === item && (
                      <motion.span
                        layoutId="auth-active-tab"
                        className="absolute inset-0 rounded-xl bg-white/[0.075] shadow-[0_0_22px_rgba(255,255,255,0.05)] ring-1 ring-white/5"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item === "login" ? t.loginTab : t.registerTab}</span>
                  </button>
                ))}
              </div>

              <div className="mb-7 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                  {mode === "login" ? t.loginTitle : t.registerTitle}
                </h2>
                <p className="mt-2 text-sm text-white/45">{t.subtitle}</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {mode === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-5"
                  >
                    <FieldShell label={t.email} icon={<Mail className="h-5 w-5" />}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        autoComplete="email"
                        required
                        className={`${authInput} pl-12 pr-4`}
                      />
                    </FieldShell>

                    <FieldShell label={t.password} icon={<Lock className="h-5 w-5" />}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        minLength={4}
                        className={`${authInput} pl-12 pr-12 tracking-[0.18em] placeholder:tracking-normal`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-white/80"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </FieldShell>

                    <button
                      type="button"
                      className="ml-auto block text-sm font-semibold text-violet-300/85 transition-colors hover:text-violet-200"
                    >
                      {t.forgot}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    className="grid gap-5 md:grid-cols-2"
                  >
                    <FieldShell label={t.lastName} icon={<User className="h-5 w-5" />} className="md:col-span-2">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={lang === "RU" ? "Иванов" : "Ivanov"}
                        autoComplete="family-name"
                        required
                        className={`${authInput} pl-12 pr-4`}
                      />
                    </FieldShell>

                    <FieldShell label={t.firstName}>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={lang === "RU" ? "Иван" : "Ivan"}
                        autoComplete="given-name"
                        required
                        className={`${authInput} px-4`}
                      />
                    </FieldShell>

                    <FieldShell label={t.patronymic}>
                      <input
                        type="text"
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        placeholder={lang === "RU" ? "Иванович" : "Optional"}
                        autoComplete="additional-name"
                        className={`${authInput} px-4`}
                      />
                    </FieldShell>

                    <FieldShell label={t.birthDate} icon={<Calendar className="h-5 w-5" />}>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className={`${authInput} pl-12 pr-4 [color-scheme:dark]`}
                      />
                    </FieldShell>

                    <FieldShell label={t.gender} icon={<Users className="h-5 w-5" />}>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={`${authInput} appearance-none pl-12 pr-11 ${gender ? "text-white" : "text-white/38"}`}
                      >
                        <option value="" className="bg-[#171827] text-white/70">
                          {t.choose}
                        </option>
                        <option value="male" className="bg-[#171827] text-white">
                          {t.male}
                        </option>
                        <option value="female" className="bg-[#171827] text-white">
                          {t.female}
                        </option>
                        <option value="other" className="bg-[#171827] text-white">
                          {t.other}
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
                    </FieldShell>

                    <FieldShell label={t.email} icon={<Mail className="h-5 w-5" />} className="md:col-span-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        autoComplete="email"
                        required
                        className={`${authInput} pl-12 pr-4`}
                      />
                    </FieldShell>

                    <FieldShell label={t.password} icon={<Lock className="h-5 w-5" />}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        autoComplete="new-password"
                        required
                        minLength={4}
                        className={`${authInput} pl-12 pr-12 tracking-[0.18em] placeholder:tracking-normal`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-white/80"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </FieldShell>

                    <FieldShell label={t.confirm} icon={<Lock className="h-5 w-5" />}>
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
                        autoComplete="new-password"
                        required
                        minLength={4}
                        className={`${authInput} pl-12 pr-12 tracking-[0.18em] placeholder:tracking-normal`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-white/80"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </FieldShell>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                disabled={loading}
                className="mt-7 flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-base font-black text-white shadow-[0_14px_34px_rgba(124,58,237,0.36)] transition-all hover:shadow-[0_18px_42px_rgba(124,58,237,0.52)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "login" ? t.loginBtn : t.registerBtn}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
