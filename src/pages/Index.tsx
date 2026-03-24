import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const PARTICLES = Array.from({ length: 18 }, (_, i) => i);

const features = [
  { icon: "Crown", title: "Особые привилегии", desc: "Уникальные команды, полёт, увеличенный инвентарь и многое другое" },
  { icon: "Sword", title: "Эксклюзивные предметы", desc: "Стартовые наборы, декоративные блоки и редкие ресурсы" },
  { icon: "Star", title: "Статус и уважение", desc: "Цветной ник, префикс в чате и выделение среди игроков" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-mc-bg grid-bg relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((i) => (
          <div
            key={i}
            className="absolute bg-mc-green/30 blockchain-pulse"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              width: i % 3 === 0 ? "3px" : "1px",
              height: i % 3 === 0 ? "3px" : "1px",
            }}
          />
        ))}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-mc-green/30 to-transparent animate-scan" style={{ top: 0 }} />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        <div className="animate-fade-in-up">
          <div className="mb-4 inline-block px-4 py-1 border border-mc-green/40 text-mc-green/70 font-mc text-xs tracking-widest">
            ▶ СЕРВЕР ОНЛАЙН
          </div>
          <h1 className="font-mc text-6xl md:text-8xl mb-4 leading-none">
            <span className="neon-green text-mc-green animate-flicker">multi</span>
            <span className="neon-gold text-mc-gold">WORLD</span>
          </h1>
          <p className="text-mc-green/60 text-lg md:text-xl mb-2 font-mc tracking-widest">
            Minecraft сервер нового поколения
          </p>
          <div className="mb-10" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="mc-btn bg-mc-green text-mc-bg px-8 py-3 text-sm font-mc hover:bg-mc-green/90 box-neon-green"
            >
              <Icon name="Zap" size={16} className="inline mr-2" />
              Получить донат
            </Link>
            <Link
              to="/about"
              className="mc-btn border-mc-green/50 text-mc-green px-8 py-3 text-sm font-mc hover:border-mc-green hover:bg-mc-green/10"
            >
              О сервере
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16">
          {[
            { label: "Игроков онлайн", value: "247" },
            { label: "Донат-рангов", value: "7" },
            { label: "Дней работы", value: "380+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mc text-3xl md:text-4xl text-mc-green neon-green">{s.value}</div>
              <div className="font-mc text-xs text-mc-green/50 tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24">
        <h2 className="font-mc text-2xl text-center text-mc-green neon-green mb-10 tracking-widest">
          Преимущества донат-ранга
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="mc-card p-6 box-neon-green hover:box-neon-gold transition-all duration-300">
              <Icon name={f.icon} fallback="Star" size={28} className="text-mc-gold mb-3" />
              <h3 className="font-mc text-mc-green text-sm tracking-wider mb-2">{f.title}</h3>
              <p className="text-mc-green/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;