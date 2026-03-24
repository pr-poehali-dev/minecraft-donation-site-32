import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const ADMIN_CODE = "01022015";

interface HistoryItem {
  nick: string;
  rank: string;
  price: number;
  date: string;
}

const RANK_COLORS: Record<string, string> = {
  Hero: "#2ECC40",
  God: "#48d1e0",
  Imperator: "#FFD700",
  Dragon: "#e74c3c",
  Helper: "#9b59b6",
  Moder: "#FFD700",
  "D.Admin": "#e74c3c",
  "Разбан": "#2ECC40",
  "Размут": "#48d1e0",
};

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [wallet, setWallet] = useState(
    localStorage.getItem("admin_yoomoney_wallet") || "4100119499721423"
  );
  const [walletSaved, setWalletSaved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (authed) {
      const data = JSON.parse(localStorage.getItem("donate_history") || "[]");
      setHistory(data);
    }
  }, [authed]);

  const handleLogin = () => {
    if (blocked) return;
    if (code === ADMIN_CODE) {
      setAuthed(true);
      setError(false);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError(true);
      setCode("");
      if (next >= 5) setBlocked(true);
    }
  };

  const handleSaveWallet = () => {
    localStorage.setItem("admin_yoomoney_wallet", wallet);
    setWalletSaved(true);
    setTimeout(() => setWalletSaved(false), 2000);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("donate_history");
    setHistory([]);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const totalRevenue = history.reduce((sum, i) => sum + i.price, 0);

  if (!authed) {
    return (
      <div className="min-h-screen bg-mc-bg grid-bg flex items-center justify-center px-4">
        <Navbar />
        <div className="mc-card p-8 w-full max-w-sm box-neon-gold animate-fade-in-up text-center">
          <Icon name="Shield" size={40} className="text-mc-gold mx-auto mb-4 neon-gold" />
          <h1 className="font-mc text-2xl text-mc-gold neon-gold tracking-widest mb-2">
            ADMIN PANEL
          </h1>
          <p className="font-mc text-mc-green/40 text-xs tracking-widest mb-8">
            Введите код доступа
          </p>

          {blocked ? (
            <div className="mc-card p-4 box-neon-red text-mc-red font-mc text-sm tracking-widest">
              ⛔ Доступ заблокирован
            </div>
          ) : (
            <>
              <input
                type="password"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                maxLength={20}
                className={`w-full bg-mc-bg border ${error ? "border-mc-red" : "border-mc-border"} text-mc-green font-mc text-center py-3 px-4 text-lg tracking-[0.5em] outline-none focus:border-mc-gold transition-colors mb-3`}
              />
              {error && (
                <p className="text-mc-red font-mc text-xs tracking-widest mb-3">
                  Неверный код ({5 - attempts} попыток осталось)
                </p>
              )}
              <button
                onClick={handleLogin}
                className="mc-btn w-full py-3 font-mc text-sm tracking-widest bg-mc-gold text-mc-bg border-mc-gold hover:bg-mc-gold/90 box-neon-gold"
              >
                <Icon name="LogIn" size={14} className="inline mr-2" />
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mc-bg grid-bg pt-20 pb-16">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="font-mc text-3xl text-mc-gold neon-gold tracking-widest">Admin Panel</h1>
            <p className="font-mc text-mc-green/40 text-xs tracking-widest mt-1">multiWORLD</p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="mc-btn px-4 py-2 font-mc text-xs text-mc-red border-mc-red tracking-widest hover:bg-mc-red/10"
          >
            <Icon name="LogOut" size={13} className="inline mr-1" />
            Выйти
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: "ShoppingCart", label: "Всего покупок", value: history.length },
            { icon: "TrendingUp", label: "Общая выручка", value: `${totalRevenue} ₽` },
            { icon: "Users", label: "Уникальных игроков", value: [...new Set(history.map((h) => h.nick))].length },
          ].map((s) => (
            <div key={s.label} className="mc-card p-4 box-neon-gold text-center">
              <Icon name={s.icon} fallback="Star" size={20} className="text-mc-gold mx-auto mb-2" />
              <div className="font-mc text-xl text-mc-gold">{s.value}</div>
              <div className="font-mc text-mc-green/40 text-xs tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Telegram notifications */}
        <div className="mc-card p-6 box-neon-purple mb-8">
          <h2 className="font-mc text-mc-purple text-sm tracking-widest mb-1 flex items-center gap-2" style={{ color: "#9b59b6" }}>
            <Icon name="Bell" size={16} />
            Telegram-уведомления о покупках
          </h2>
          <p className="text-mc-green/40 font-mc text-xs tracking-wider mb-3">
            При каждой покупке тебе придёт сообщение в Telegram на @RIKO_MASTER_OFFICIAL
          </p>
          <div className="space-y-2 p-3 bg-mc-bg/60 border border-mc-border">
            <p className="font-mc text-mc-gold/80 text-xs tracking-wider">Для активации уведомлений:</p>
            <p className="font-mc text-mc-green/60 text-xs">1. Напиши боту <span className="text-white">@BotFather</span> → /newbot → получи токен</p>
            <p className="font-mc text-mc-green/60 text-xs">2. Вставь токен в поле <span className="text-white">TELEGRAM_BOT_TOKEN</span> (Ядро → Секреты)</p>
            <p className="font-mc text-mc-green/60 text-xs">3. Напиши боту <span className="text-white">@userinfobot</span> → получи свой ID</p>
            <p className="font-mc text-mc-green/60 text-xs">4. Вставь ID в поле <span className="text-white">TELEGRAM_CHAT_ID</span> (Ядро → Секреты)</p>
            <p className="font-mc text-mc-green/60 text-xs">5. Напиши своему боту любое сообщение чтобы активировать его</p>
          </div>
        </div>

        {/* YooMoney wallet */}
        <div className="mc-card p-6 box-neon-green mb-8">
          <h2 className="font-mc text-mc-green text-sm tracking-widest mb-1 flex items-center gap-2">
            <Icon name="Wallet" size={16} />
            Кошелёк ЮMoney для приёма платежей
          </h2>
          <p className="text-mc-green/40 font-mc text-xs tracking-wider mb-4">
            Все платежи с магазина приходят на этот кошелёк ЮMoney. Привяжите к нему карту Сбер в настройках ЮMoney — деньги будут автоматически переводиться на карту.
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon name="CreditCard" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mc-green/40" />
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value.replace(/\D/g, ""))}
                placeholder="4100..."
                maxLength={20}
                className="w-full bg-mc-bg border border-mc-border text-mc-green font-mc py-2.5 pl-8 pr-3 text-sm tracking-widest outline-none focus:border-mc-green transition-colors"
              />
            </div>
            <button
              onClick={handleSaveWallet}
              className={`mc-btn px-5 py-2.5 font-mc text-xs tracking-widest transition-colors ${walletSaved ? "bg-mc-green text-mc-bg border-mc-green" : "border-mc-green text-mc-green hover:bg-mc-green/10"}`}
            >
              {walletSaved ? "✓ Сохранено" : "Сохранить"}
            </button>
          </div>
          <div className="mt-3 p-3 bg-mc-bg/60 border border-mc-border">
            <p className="font-mc text-mc-gold/70 text-xs tracking-wider">
              Как вывести деньги на Сбер: yoomoney.ru → Вывод средств → Карта банка
            </p>
          </div>
        </div>

        {/* History */}
        <div className="mc-card p-6 box-neon-green">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mc text-mc-green text-sm tracking-widest flex items-center gap-2">
              <Icon name="Clock" size={16} />
              История донатов
            </h2>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="mc-btn px-3 py-1.5 font-mc text-xs text-mc-red border-mc-red tracking-widest hover:bg-mc-red/10"
              >
                Очистить
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-mc-green/30 font-mc text-xs tracking-widest text-center py-8">
              Нет записей
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-mc-bg/50 p-3 border border-mc-border">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6" style={{ backgroundColor: RANK_COLORS[item.rank] || "#2ECC40" }} />
                    <div>
                      <span className="font-mc text-white text-sm">{item.nick}</span>
                      <span className="font-mc text-xs ml-2" style={{ color: RANK_COLORS[item.rank] || "#2ECC40" }}>
                        [{item.rank}]
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mc text-mc-gold text-sm">{item.price} ₽</div>
                    <div className="font-mc text-mc-green/30 text-xs">{formatDate(item.date)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;