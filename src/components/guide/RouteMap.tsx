import { useState } from 'react';
import { routePoints, entryInfo } from '@/data/mockGuide';
import type { RoutePoint } from '@/types';

const POINT_EMOJI: Record<RoutePoint['type'], string> = {
  gate: '🚪',
  checkin: '🎫',
  seat: '💺',
  wc: '🚻',
  nursing: '👶',
  snack: '🍿',
  exit: '🚨',
  meeting: '🌈',
};

const POINT_COLOR: Record<RoutePoint['type'], string> = {
  gate: 'bg-sky2-400',
  checkin: 'bg-mint-400',
  seat: 'bg-brand-400',
  wc: 'bg-blue-400',
  nursing: 'bg-pink-400',
  snack: 'bg-amber-400',
  exit: 'bg-red-400',
  meeting: 'bg-purple-400',
};

export default function RouteMap() {
  const [activePoint, setActivePoint] = useState<RoutePoint | null>(null);

  const mainRoute = routePoints.filter((p) =>
    ['gate', 'checkin', 'meeting', 'seat'].includes(p.type) && p.id !== 'r6' && p.id !== 'r7' && p.id !== 'r8' && p.id !== 'r9',
  );

  const facilities = routePoints.filter((p) => ['wc', 'nursing', 'snack', 'exit'].includes(p.type));

  const pathD = mainRoute
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <div className="space-y-4">
      <div className="relative card overflow-hidden">
        <div className="p-4 pb-2 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-gray-900 flex items-center gap-1.5">
              <span>🗺️</span> 入场路线图
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {entryInfo.floor}楼 · {entryInfo.gate}
            </p>
          </div>
          <span className="chip chip-active text-xs">
            预计步行 3 分钟
          </span>
        </div>

        <div className="relative aspect-square w-full bg-gradient-to-br from-cream-50 via-sky2-50/30 to-mint-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-gray-200/50" style={{ top: `${(i + 1) * 6.5}%` }} />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-gray-200/50" style={{ left: `${(i + 1) * 6.5}%` }} />
            ))}
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={pathD}
              stroke="url(#pathGradient)"
              strokeWidth={2.5}
              strokeDasharray="3 2"
              strokeLinecap="round"
              fill="none"
              className="animate-shimmer"
              style={{ strokeDashoffset: 0 }}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#45B7D1" />
                <stop offset="50%" stopColor="#4ECDC4" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
          </svg>

          <div
            className="absolute w-[1px] bg-gradient-to-b from-mint-300 to-transparent"
            style={{ left: '38%', top: '30%', height: '25%' }}
          />
          <div
            className="absolute h-[1px] bg-gradient-to-r from-sky2-300 to-transparent"
            style={{ top: '45%', left: '15%', width: '30%' }}
          />

          {mainRoute.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePoint(p)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className={`relative w-9 h-9 rounded-full ${POINT_COLOR[p.type]} flex items-center justify-center text-base shadow-md border-2 border-white transition-transform group-hover:scale-125 ${activePoint?.id === p.id ? 'scale-125 ring-4 ring-white/70' : ''}`}>
                {POINT_EMOJI[p.type]}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm">
                  {i + 1}
                </div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] font-medium text-gray-700 bg-white/80 px-1.5 py-0.5 rounded-full">
                {p.name}
              </div>
            </button>
          ))}

          {facilities.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePoint(p)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className={`relative w-7 h-7 rounded-full ${POINT_COLOR[p.type]}/80 flex items-center justify-center text-sm shadow-sm border border-white/70 transition-all group-hover:scale-125 ${activePoint?.id === p.id ? 'scale-125' : ''}`}>
                {POINT_EMOJI[p.type]}
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 whitespace-nowrap text-[9px] text-gray-500">
                {p.name}
              </div>
            </button>
          ))}
        </div>

        {activePoint && (
          <div className="mx-4 mb-4 mt-3 p-3 rounded-xl2 bg-cream-50 border border-cream-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-xl">{POINT_EMOJI[activePoint.type]}</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">{activePoint.name}</p>
                {activePoint.description && <p className="text-xs text-gray-600">{activePoint.description}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="px-4 pb-4 pt-2">
          <p className="text-xs font-medium text-gray-500 mb-2">图例说明</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {Object.entries(POINT_EMOJI).map(([type, emoji]) => (
              <div key={type} className="flex items-center gap-1 text-[11px] text-gray-600">
                <span className={`w-3.5 h-3.5 rounded-full ${POINT_COLOR[type as RoutePoint['type']]}`} />
                <span>{emoji}</span>
                <span>
                  {type === 'gate' && '入口'}
                  {type === 'checkin' && '检票/扶梯'}
                  {type === 'seat' && '座位区'}
                  {type === 'wc' && '卫生间'}
                  {type === 'nursing' && '母婴室'}
                  {type === 'snack' && '小卖部'}
                  {type === 'exit' && '安全出口'}
                  {type === 'meeting' && '集合点'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-display text-base text-gray-900 mb-3 flex items-center gap-1.5">
          <span>📝</span> 分步引导
        </h4>
        <ol className="space-y-3">
          {entryInfo.routeSteps.map((step, i) => (
            <li key={i} className="flex gap-3 animate-fadeIn" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex flex-col items-center shrink-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                {i < entryInfo.routeSteps.length - 1 && (
                  <div className="flex-1 w-0.5 bg-gray-100 my-1" />
                )}
              </div>
              <p className="text-sm text-gray-700 pt-1 leading-relaxed flex-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
