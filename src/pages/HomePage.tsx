import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ChevronRight, Armchair, PartyPopper, Map as MapIcon, Bell } from 'lucide-react';
import { currentShow } from '@/data/mockSeats';
import Header from '@/components/common/Header';
import BottomNav from '@/components/common/BottomNav';

const QUICK_LINKS = [
  { icon: Armchair, label: '选座购票', desc: '亲子座位推荐', to: '/seats', color: 'text-brand-500', bg: 'bg-brand-50' },
  { icon: MapIcon, label: '入场引导', desc: '路线集合地点', to: '/guide', color: 'text-mint-500', bg: 'bg-mint-50' },
  { icon: PartyPopper, label: '演前互动', desc: '角色贴纸任务', to: '/interaction', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Bell, label: '家长提醒', desc: '退改规则须知', to: '/reminders', color: 'text-sky2-500', bg: 'bg-sky2-50' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="彩虹森林奇遇记" subtitle="大型亲子互动音乐剧" showBack={false} />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 space-y-5 pb-6 overflow-y-auto no-scrollbar">
        <section className="relative rounded-3xl2 overflow-hidden shadow-card animate-fadeIn">
          <div className="aspect-[16/10] relative">
            <img
              src={currentShow.coverImage}
              alt={currentShow.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-brand-500 text-[11px] font-bold shadow-md">
                  🔥 热门场次
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-medium">
                  {currentShow.ageLimit}
                </span>
              </div>
              <h2 className="font-display text-2xl mb-1 drop-shadow-md">{currentShow.title}</h2>
              <p className="text-sm text-white/80">{currentShow.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="card p-4 animate-fadeIn" style={{ animationDelay: '60ms' }}>
          <div className="space-y-2.5">
            <InfoRow icon={<Calendar size={16} className="text-brand-500" />} label="演出日期" value={currentShow.date} />
            <InfoRow icon={<Clock size={16} className="text-mint-500" />} label="演出时间" value={currentShow.time} />
            <InfoRow icon={<MapPin size={16} className="text-sky2-500" />} label="演出地点" value={currentShow.venue} />
            <InfoRow icon={<Users size={16} className="text-purple-500" />} label="演出时长" value={currentShow.duration} />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500">票价</p>
                <p className="font-display text-2xl text-gradient-brand leading-none">
                  ¥180 <span className="text-sm text-gray-400 font-normal">起</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
                剩余座位充足
              </div>
            </div>
            <button
              onClick={() => navigate('/seats')}
              className="btn-primary w-full"
            >
              立即选座购票
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <section animate-fadeIn style={{ animationDelay: '120ms' }}>
          <h3 className="font-display text-lg text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-xl">✨</span> 快捷入口
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map((item, i) => (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className="card p-4 text-left hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${150 + i * 40}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl2 ${item.bg} flex items-center justify-center mb-2 shadow-sm`}>
                  <item.icon size={22} className={item.color} strokeWidth={2} />
                </div>
                <p className="font-semibold text-sm text-gray-900">{item.label}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="card p-5 animate-fadeIn relative overflow-hidden" style={{ animationDelay: '280ms' }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-mint-100 to-sky2-100 rounded-full -translate-y-1/3 translate-x-1/3 opacity-70" />
          <div className="relative">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-4xl animate-floatY">💡</span>
              <div>
                <h3 className="font-display text-lg text-gray-900">亲子观演小贴士</h3>
                <p className="text-xs text-gray-500 mt-0.5">让全家的观演体验更美好</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                '建议提前30分钟到达剧场，完成检票和互动任务',
                '前排亲子专区相邻座位多，最适合带小龄儿童',
                '身高100cm以下幼儿建议选择带增高垫的座位',
                '如担心孩子哭闹，可选择安静观景区靠近出口',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
