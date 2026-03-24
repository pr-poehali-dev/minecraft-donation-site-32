import { useState } from "react";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const RANKS = [
  {
    id: "hero",
    name: "Hero",
    price: 10,
    color: "#2ECC40",
    neon: "neon-green",
    box: "box-neon-green",
    borderColor: "#2ECC40",
    icon: "Shield",
    perks: ["Префикс [Hero] в чате", "Доступ к /fly на 1 час/день", "Цветной ник"],
  },
  {
    id: "god",
    name: "God",
    price: 20,
    color: "#48d1e0",
    neon: "neon-diamond",
    box: "box-neon-diamond",
    borderColor: "#48d1e0",
    icon: "Sparkles",
    perks: ["Всё из Hero", "Набор стартовых ресурсов", "/heal раз в 10 мин"],
  },
  {
    id: "imperator",
    name: "Imperator",
    price: 80,
    color: "#FFD700",
    neon: "neon-gold",
    box: "box-neon-gold",
    borderColor: "#FFD700",
    icon: "Crown",
    perks: ["Всё из God", "Полёт без ограничений", "Доступ к /invsee"],
  },
  {
    id: "dragon",
    name: "Dragon",
    price: 130,
    color: "#e74c3c",
    neon: "",
    box: "box-neon-red",
    borderColor: "#e74c3c",
    icon: "Flame",
    perks: ["Всё из Imperator", "Кастомный скин дракона", "+2 слота в /enderchest"],
    popular: true,
  },
  {
    id: "helper",
    name: "Helper",
    price: 200,
    color: "#9b59b6",
    neon: "neon-purple",
    box: "box-neon-purple",
    borderColor: "#9b59b6",
    icon: "Handshake",
    perks: ["Всё из Dragon", "Право на /ban chat", "Значок помощника"],
  },
  {
    id: "moder",
    name: "Moder",
    price: 399,
    color: "#FFD700",
    neon: "neon-gold",
    box: "box-neon-gold",
    borderColor: "#FFD700",
    icon: "Gavel",
    perks: ["Всё из Helper", "/mute, /kick, /warn", "Доступ к логам чата"],
  },
  {
    id: "dadmin",
    name: "D.Admin",
    price: 580,
    color: "#e74c3c",
    neon: "",
    box: "box-neon-red",
    borderColor: "#e74c3c",
    icon: "ShieldCheck",
    perks: ["Всё из Moder", "Расширенные права сервера", "Частный Discord-канал"],
  },
];

const PAYMENT_URL = "https://www.tinkoff.ru/rm/"; // замените на свою ссылку оплаты

const DonatePage = () => {
  const [nick, setNick] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [nickError, setNickError] = useState(false);

  const handleBuy = (rankId: string) => {
    if (!nick.trim()) {
      setNickError(true);
      return;
    }
    setNickError(false);
    const rank = RANKS.find((r) => r.id === rankId);
    if (!rank) return;
    // Сохраняем покупку в историю
    const history = JSON.parse(localStorage.getItem("donate_history") || "[]");
    history.unshift({
      nick: nick.trim(),
      rank: rank.name,
      price: rank.price,
      date: new Date().toISOString(),
    });
    localStorage.setItem("donate_history", JSON.stringify(history.slice(0, 50)));
    // Переход на сайт оплаты
    window.open(`${PAYMENT_URL}?amount=${rank.price}&description=${rank.name}+для+${nick}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-mc-bg grid-bg pt-20 pb-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-mc text-4xl md:text-5xl text-mc-green neon-green mb-3 tracking-widest">
            Донат-магазин
          </h1>
          <p className="text-mc-green/50 font-mc text-sm tracking-widest">
            Выберите ранг и введите ник для покупки
          </p>
        </div>

        {/* Nick input */}
        <div className="max-w-md mx-auto mb-12">
          <label className="block font-mc text-mc-green/70 text-xs tracking-widest mb-2">
            ВАШ НИК В MINECRAFT
          </label>
          <div className="relative">
            <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mc-green/40" />
            <input
              type="text"
              value={nick}
              onChange={(e) => { setNick(e.target.value); setNickError(false); }}
              placeholder="Введите ник..."
              className={`w-full bg-mc-card border ${nickError ? "border-mc-red" : "border-mc-border"} text-mc-green font-mc pl-9 pr-4 py-3 text-sm tracking-wider outline-none focus:border-mc-green transition-colors`}
            />
          </div>
          {nickError && (
            <p className="text-mc-red text-xs font-mc mt-1 tracking-wider">Введите ник перед покупкой</p>
          )}
        </div>

        {/* Ranks grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {RANKS.map((rank, idx) => (
            <div
              key={rank.id}
              className={`mc-card ${rank.box} relative cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in-up ${selected === rank.id ? "ring-2 ring-mc-gold" : ""}`}
              style={{ animationDelay: `${idx * 0.08}s`, borderColor: rank.borderColor }}
              onClick={() => setSelected(rank.id === selected ? null : rank.id)}
            >
              {rank.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mc-red text-white font-mc text-xs px-3 py-0.5 tracking-widest">
                  POPULAR
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon name={rank.icon} fallback="Star" size={24} style={{ color: rank.color }} />
                  <span className="font-mc text-xs tracking-widest" style={{ color: rank.color }}>
                    #{idx + 1}
                  </span>
                </div>

                <h3
                  className={`font-mc text-xl tracking-widest mb-1 ${rank.neon}`}
                  style={{ color: rank.color }}
                >
                  {rank.name}
                </h3>

                <div className="font-mc text-2xl text-white mb-4">
                  {rank.price} <span className="text-mc-green/60 text-sm">₽</span>
                </div>

                <ul className="space-y-1 mb-5">
                  {rank.perks.map((p) => (
                    <li key={p} className="text-mc-green/60 text-xs font-mc flex items-start gap-1.5">
                      <span style={{ color: rank.color }} className="mt-0.5">▸</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => { e.stopPropagation(); handleBuy(rank.id); }}
                  className="mc-btn w-full py-2.5 text-xs font-mc tracking-widest transition-all duration-200"
                  style={{
                    backgroundColor: rank.color,
                    color: "#0a0e14",
                    borderColor: rank.color,
                  }}
                >
                  <Icon name="ShoppingCart" size={13} className="inline mr-1.5" />
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-mc-green/30 font-mc text-xs tracking-widest mt-10">
          После оплаты ранг выдаётся автоматически в течение 5 минут
        </p>
      </div>
    </div>
  );
};

export default DonatePage;
