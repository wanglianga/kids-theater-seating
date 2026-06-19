import { useEffect, useRef, useState } from 'react';
import { useSeatStore } from '@/store/seatStore';
import { getSeatZoneColor, isSeatRecommended } from '@/utils/seatUtils';
import type { Seat } from '@/types';
import { SEAT_ROWS, SEATS_PER_ROW_COUNT } from '@/data/mockSeats';
import SeatLegend from './SeatLegend';

interface SeatMapProps {
  onSeatTap?: (seat: Seat) => void;
}

export default function SeatMap({ onSeatTap }: SeatMapProps) {
  const { seats, filters, initSeats, toggleSeatSelection, setActiveSeat, selectedSeatIds } = useSeatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    initSeats();
  }, [initSeats]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isAisle || seat.status === 'sold' || seat.status === 'locked') return;
    toggleSeatSelection(seat.id);
    setActiveSeat(seat.id);
    onSeatTap?.(seat);
  };

  const getSeatsByRow = () => {
    const rows: Record<string, Seat[]> = {};
    for (const row of SEAT_ROWS) rows[row] = [];
    for (const seat of seats) {
      if (rows[seat.row]) rows[seat.row].push(seat);
    }
    return rows;
  };

  const rows = getSeatsByRow();

  return (
    <div className="space-y-4">
      <div
        ref={scrollRef}
        className="relative overflow-x-auto overflow-y-auto no-scrollbar rounded-2xl2 bg-gradient-to-b from-cream-50 to-white border border-cream-100"
        style={{ maxHeight: '480px', touchAction: 'pan-x pan-y pinch-zoom' }}
      >
        <div
          className="min-w-[360px] p-4 transition-transform duration-200"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
          <div className="relative mb-6">
            <div className="bg-stage-gradient h-16 rounded-[2rem] flex items-center justify-center shadow-lg mx-2">
              <span className="font-display text-white text-lg tracking-widest drop-shadow-md">✦ 舞 台 STAGE ✦</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-3 bg-stage-gradient/20 blur-md rounded-full" />
          </div>

          <div className="text-center text-xs text-gray-400 mb-3">
            前排 · 离舞台近
          </div>

          <div className="space-y-1.5">
            {SEAT_ROWS.map((rowLabel) => (
              <div key={rowLabel} className="flex items-center justify-center gap-1">
                <span className="w-5 text-center text-xs font-semibold text-gray-400 shrink-0">{rowLabel}</span>
                <div className="flex gap-1">
                  {rows[rowLabel]?.map((seat) => {
                    if (seat.isAisle) {
                      return (
                        <div
                          key={seat.id}
                          className="w-6 h-6 shrink-0 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30"
                          title="过道"
                        />
                      );
                    }

                    const recommended = isSeatRecommended(seat, filters);
                    const zoneColor = getSeatZoneColor(seat.zone, seat.status);
                    const clickable = seat.status !== 'sold' && seat.status !== 'locked';

                    return (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={!clickable}
                        className={`
                          w-6 h-6 shrink-0 rounded-lg border text-[9px] font-semibold
                          flex items-center justify-center transition-all duration-150
                          ${zoneColor}
                          ${clickable ? 'cursor-pointer hover:scale-110 hover:shadow-md active:scale-95' : 'cursor-not-allowed'}
                          ${recommended && seat.status === 'available' ? 'ring-1 ring-offset-1 ring-brand-300/50' : ''}
                          ${selectedSeatIds.includes(seat.id) ? 'scale-110 z-10 relative' : ''}
                        `}
                        title={`${seat.row}排${seat.number}座 · ¥${seat.price}`}
                      >
                        {seat.status === 'sold' ? (
                          <span className="text-[8px]">✕</span>
                        ) : seat.status === 'locked' ? (
                          <span className="text-[8px]">🔒</span>
                        ) : (
                          <span>{seat.number}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="w-5 text-center text-xs font-semibold text-gray-400 shrink-0">{rowLabel}</span>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-gray-400 mt-4">
            后排 · 视野宽
          </div>

          <div className="mt-3 flex justify-between px-2">
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="w-2 h-2 rounded-full bg-brand-300 animate-pulse" /> 推荐座位
            </div>
            <div className="text-[10px] text-gray-400">
              共 {seats.filter(s => !s.isAisle && s.status === 'available').length} 个可选
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex-1">
          <label className="text-xs text-gray-500">缩放</label>
          <input
            type="range"
            min={0.8}
            max={1.5}
            step={0.05}
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full mt-1"
          />
        </div>
      </div>

      <div className="card p-4">
        <SeatLegend />
      </div>
    </div>
  );
}
