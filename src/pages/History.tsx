import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

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
};

const HistoryPage = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("donate_history") || "[]");
    setItems(data);
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-mc-bg grid-bg pt-20 pb-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="font-mc text-4xl text-mc-green neon-green mb-3 tracking-widest">
            История покупок
          </h1>
          <p className="text-mc-green/50 font-mc text-xs tracking-widest">
            Последние донаты на сервере
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mc-card p-12 text-center box-neon-green">
            <Icon name="Clock" size={40} className="text-mc-green/30 mx-auto mb-4" />
            <p className="font-mc text-mc-green/40 tracking-widest text-sm">Покупок пока нет</p>
            <p className="font-mc text-mc-green/20 tracking-widest text-xs mt-1">История появится после первого доната</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="mc-card p-4 flex items-center justify-between gap-4 animate-fade-in-up box-neon-green hover:box-neon-gold transition-all"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-8"
                    style={{ backgroundColor: RANK_COLORS[item.rank] || "#2ECC40" }}
                  />
                  <div>
                    <div className="font-mc text-white text-sm tracking-wider">{item.nick}</div>
                    <div
                      className="font-mc text-xs tracking-widest"
                      style={{ color: RANK_COLORS[item.rank] || "#2ECC40" }}
                    >
                      [{item.rank}]
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mc text-mc-gold text-sm">{item.price} ₽</div>
                  <div className="font-mc text-mc-green/30 text-xs mt-0.5">{formatDate(item.date)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
