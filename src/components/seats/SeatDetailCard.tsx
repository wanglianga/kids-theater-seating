import { X, Eye, Footprints, Ruler, Star, AlertTriangle, Baby, Banknote, ChevronRight } from 'lucide-react';
import { useSeatStore } from '@/store/seatStore';
import { getSeatZoneLabel, formatPrice, getConvenienceStars, getRiskLabel } from '@/utils/seatUtils';
import type { Seat } from '@/types';

interface SeatDetailCardProps {
  seat: Seat | null;
  onClose: () => void;
  onConfirm?: (seat: Seat) => void;
}

export default function SeatDetailCard({ seat, onClose, onConfirm }: SeatDetailCardProps) {
  const { selectedSeatIds } = useSeatStore();

  if (!seat) return null;

  const isSelected = selectedSeatIds.includes(seat.id);
  const riskLabel = getRiskLabel(seat);
  const viewBlockPercent = seat.hasObstructionRisk ? 25 : Math.min(15, (seat.row.charCodeAt(0) - 65) * 2);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
      <div className="absolute inset-0 bg-black/40 -z-10" onClick={onClose} />

      <div className="max-w-lg mx-auto bg-white rounded-t-[2rem] shadow-float overflow-hidden">
        <div className="sticky top-0 bg-white px-5 pt-4 pb-2 flex items-center justify-between border-b border-gray-50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl text-gray-900">
                {seat.row}排 {seat.number}座
              </h3>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium
                ${seat.zone === 'vip' ? 'bg-amber-100 text-amber-700' :
                  seat.zone === 'family' ? 'bg-brand-50 text-brand-600' :
                  seat.zone === 'quiet' ? 'bg-mint-50 text-mint-600' :
                  'bg-sky2-50 text-sky2-600'}`}
              >
                {getSeatZoneLabel(seat.zone)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">星光剧场 · 主厅</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[55vh] overflow-y-auto no-scrollbar pb-24">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold text-gradient-brand font-display">
                {formatPrice(seat.price)}
              </span>
              <span className="text-xs text-gray-400 ml-1">/ 张</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < seat.convenienceScore ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">离场便利</span>
            </div>
          </div>

          {riskLabel && (
            <div className="flex items-start gap-2 p-3 rounded-xl2 bg-amber-50 border border-amber-100">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">{riskLabel}</p>
            </div>
          )}

          <div className="relative card-pressed p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={16} className="text-sky2-500" />
              <span className="text-sm font-semibold text-gray-800">舞台视角模拟</span>
            </div>
            <div className="relative aspect-[4/3] rounded-xl2 overflow-hidden bg-gradient-to-b from-purple-200 via-sky2-200 to-mint-200">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-gradient-to-b from-purple-400/60 to-sky2-400/40 rounded-b-[3rem] shadow-inner" />
              <div
                className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-gray-700/60 via-gray-500/30 to-transparent"
                style={{ clipPath: `polygon(0 ${100 - viewBlockPercent}%, 100% ${100 - viewBlockPercent}%, 100% 100%, 0 100%)` }}
              />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex justify-between text-[10px] text-white/90 font-medium">
                  <span>👈 左侧视野</span>
                  <span>右侧视野 👉</span>
                </div>
                <div className="mt-1 text-center text-[10px] text-white/80">
                  可视舞台约 {100 - viewBlockPercent}% · 前排阴影为遮挡示意
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={<Ruler size={16} className="text-brand-500" />} label="离舞台" value={`${seat.distanceToStage} 米`} hint="越靠前互动性越强" />
            <InfoCard icon={<Footprints size={16} className="text-mint-500" />} label="过道距离" value={`${seat.distanceToAisle} 步`} hint={seat.distanceToAisle <= 1 ? '✨ 紧邻过道' : '越近抱娃越方便'} />
            <InfoCard icon={<Baby size={16} className="text-sky2-500" />} label="到出口" value={`${seat.stepsToExit} 步`} hint="紧急撤离参考" />
            <InfoCard icon={<Banknote size={16} className="text-amber-500" />} label="票价区间" value={formatPrice(seat.price)} hint={`${getSeatZoneLabel(seat.zone)}票价`} />
          </div>

          <div className="card-pressed p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>👨‍👩‍👧 亲子友好评估</span>
              </h4>
              <span className="text-xs text-brand-500 font-medium">综合评分</span>
            </div>
            <div className="space-y-2.5">
              <RatingRow label="抱娃离场便利度" score={seat.convenienceScore} />
              <RatingRow label="视野遮挡风险" score={seat.hasObstructionRisk ? 2 : 5} inverse />
              <RatingRow label="儿童身高适配" score={seat.childHeightMin && seat.childHeightMin > 110 ? 3 : 5} />
              <RatingRow label="活动空间充足" score={seat.zone === 'family' ? 5 : seat.zone === 'vip' ? 4 : 3} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 safe-padding-bottom">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              返回选座
            </button>
            <button
              onClick={() => onConfirm?.(seat)}
              disabled={seat.status === 'sold' || seat.status === 'locked'}
              className={`btn-primary flex-1 ${isSelected ? '' : ''}`}
            >
              {seat.status === 'sold' ? '已售出' :
                seat.status === 'locked' ? '锁定中' :
                isSelected ? '取消选择' : '确认选座'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className="card-pressed p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="text-[11px] text-gray-500">{label}</span>
      </div>
      <p className="text-base font-bold text-gray-900 leading-tight">{value}</p>
      {hint && <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{hint}</p>}
    </div>
  );
}

function RatingRow({ label, score, inverse = false }: { label: string; score: number; inverse?: boolean }) {
  const displayScore = inverse ? 6 - score : score;
  const color = displayScore >= 4 ? 'bg-mint-400' : displayScore >= 3 ? 'bg-amber-400' : 'bg-brand-400';
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${(displayScore / 5) * 100}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-6 text-right">{displayScore}</span>
    </div>
  );
}
