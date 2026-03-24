import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const MODES = [
  { icon: "Swords", name: "Survival", desc: "Классическое выживание с экономикой и кланами" },
  { icon: "Skull", name: "Hardcore", desc: "Один шанс на выживание — настоящий вызов" },
];

const RULES = [
  "Запрещено использование читов и модов с преимуществом",
  "Запрещён мат и оскорбления в чате",
  "Запрещён гриферинг в защищённых зонах",
  "Уважайте других игроков и администрацию",
  "Жалобы подавать только через /report",
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-mc-bg grid-bg pt-20 pb-16">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-14 animate-fade-in-up">
          <h1 className="font-mc text-4xl md:text-5xl text-mc-green neon-green mb-3 tracking-widest">
            О сервере
          </h1>
          <p className="text-mc-green/50 font-mc text-sm tracking-widest max-w-xl mx-auto">
            multiWORLD — Minecraft сервер с богатой историей и активным комьюнити
          </p>
        </div>

        {/* Modes */}
        <h2 className="font-mc text-xl text-mc-gold neon-gold mb-5 tracking-widest">
          Игровые режимы
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {MODES.map((m) => (
            <div key={m.name} className="mc-card p-5 flex gap-4 items-start box-neon-green hover:box-neon-gold transition-all duration-300">
              <Icon name={m.icon} fallback="Star" size={24} className="text-mc-gold mt-0.5 shrink-0" />
              <div>
                <div className="font-mc text-mc-green text-sm tracking-wider mb-1">{m.name}</div>
                <div className="text-mc-green/50 text-xs">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <h2 className="font-mc text-xl text-mc-gold neon-gold mb-5 tracking-widest">
          Правила сервера
        </h2>
        <div className="mc-card p-6 box-neon-green mb-10">
          <ul className="space-y-3">
            {RULES.map((rule, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="font-mc text-mc-red text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                <span className="text-mc-green/70 text-sm font-mc tracking-wide">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <h2 className="font-mc text-xl text-mc-gold neon-gold mb-5 tracking-widest">
          Контакты
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: "MessageCircle", label: "Discord", value: "discord.gg/multiworld" },
            { icon: "Send", label: "Telegram", value: "@multiworldRU" },
          ].map((c) => (
            <div key={c.label} className="mc-card p-4 text-center box-neon-green">
              <Icon name={c.icon} fallback="Globe" size={20} className="text-mc-gold mx-auto mb-2" />
              <div className="font-mc text-mc-green/50 text-xs tracking-widest mb-1">{c.label}</div>
              <div className="font-mc text-mc-green text-xs">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;