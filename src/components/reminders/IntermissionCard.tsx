import { Coffee, Clock, UtensilsCrossed, Bath, Baby, ChevronRight } from 'lucide-react';

const TIMELINE = [
  { time: '14:30', label: '演出开始', emoji: '🎭', active: true },
  { time: '15:20', label: '中场休息', emoji: '⏸️', current: true },
  { time: '15:35', label: '下半场开始', emoji: '🎬' },
  { time: '16:15', label: '演出结束', emoji: '👏' },
];

export default function IntermissionCard() {
  return (
    <div className="card overflow-hidden">
      <div className="relative p-5 bg-gradient-to-br from-sky2-400 via-purple-400 to-brand-400 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-display text-xl flex items-center gap-1.5">
                <Coffee size={20} />
                中场休息导览
              </h3>
              <p className="text-xs text-white/80 mt-0.5">15分钟 · 合理安排时间</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl animate-floatY">
              ☕
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-white/20" />
            <div className="space-y-2.5">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative flex items-center gap-3 pl-0">
                  <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm z-10 shadow-lg
                    ${item.current ? 'bg-white text-brand-500 scale-110' :
                      item.active ? 'bg-white/30 backdrop-blur-sm' :
                      'bg-white/10 backdrop-blur-sm opacity-70'}`}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <span className={`font-mono text-sm font-bold ${item.current ? 'text-yellow-200' : ''}`}>
                      {item.time}
                    </span>
                    <span className={`text-sm ${item.current ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                    {item.current && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-300 text-yellow-900 font-bold animate-pulse">
                        当前
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <FacilityRow
          icon={<UtensilsCrossed size={18} />}
          title="点心购买区"
          desc="2楼大厅彩虹小卖部 · 爆米花、饮料、冰淇淋"
          tag="推荐"
          tagColor="bg-amber-100 text-amber-700"
        />
        <FacilityRow
          icon={<Bath size={18} />}
          title="卫生间位置"
          desc="C区通道尽头左转最近 · 1楼正门旁也有"
          tag="最近"
          tagColor="bg-sky2-100 text-sky2-700"
        />
        <FacilityRow
          icon={<Baby size={18} />}
          title="母婴哺乳室"
          desc="2楼亲子服务区内 · 配有尿布台和温水"
          tagColor="bg-pink-100 text-pink-700"
        />
      </div>

      <div className="px-4 pb-4">
        <div className="p-3 rounded-xl2 bg-cream-50 border border-cream-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-brand-500" />
            <span className="text-xs text-gray-700 font-medium">请在 15:30 前返回座位</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function FacilityRow({
  icon,
  title,
  desc,
  tag,
  tagColor,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
  tagColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl2 hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 rounded-xl2 bg-gray-50 flex items-center justify-center text-gray-600 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-gray-800">{title}</p>
          {tag && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${tagColor}`}>{tag}</span>}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{desc}</p>
      </div>
    </div>
  );
}
