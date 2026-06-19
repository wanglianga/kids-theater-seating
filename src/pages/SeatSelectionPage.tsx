import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Trash2, ShoppingCart } from 'lucide-react';
import Header from '@/components/common/Header';
import BottomNav from '@/components/common/BottomNav';
import SeatMap from '@/components/seats/SeatMap';
import SeatDetailCard from '@/components/seats/SeatDetailCard';
import FilterDrawer from '@/components/seats/FilterDrawer';
import { useSeatStore } from '@/store/seatStore';
import type { Seat } from '@/types';
import { formatPrice } from '@/utils/seatUtils';
import { currentShow } from '@/data/mockSeats';

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSeat, setActiveSeat] = useState<Seat | null>(null);

  const { seats, selectedSeatIds, clearSelection } = useSeatStore();

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handleSeatTap = (seat: Seat) => {
    if (!seat.isAisle && seat.status !== 'sold' && seat.status !== 'locked') {
      setActiveSeat(seat);
    }
  };

  const handleConfirmSeat = () => {
    if (selectedSeatIds.length > 0) {
      setActiveSeat(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="亲子选座" subtitle={`${currentShow.date} · ${currentShow.venue}`} />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 space-y-4 pb-36 overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-2 animate-fadeIn">
          <div className="flex-1 card-pressed p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-xl2 bg-brand-50 flex items-center justify-center shrink-0">
                <span className="text-lg">👶</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 leading-tight">儿童身高</p>
                <p className="text-sm font-semibold text-gray-900 leading-tight truncate">
                  {useSeatStore.getState().filters.childHeight} cm
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="card-pressed p-3 flex items-center gap-1.5 text-gray-700 hover:shadow-soft transition-all"
          >
            <SlidersHorizontal size={18} />
            <span className="text-sm font-medium">筛选</span>
          </button>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <SeatMap onSeatTap={handleSeatTap} />
        </div>

        {selectedSeats.length > 0 && (
          <div className="card p-4 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-1.5">
                <ShoppingCart size={16} className="text-brand-500" />
                已选座位 <span className="text-brand-500">({selectedSeats.length})</span>
              </h4>
              <button
                onClick={clearSelection}
                className="text-xs text-gray-400 hover:text-brand-500 flex items-center gap-1 transition-colors"
              >
                <Trash2 size={12} />
                清空
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium border border-brand-100"
                >
                  {seat.row}排{seat.number}座
                  <span className="text-xs text-brand-500 ml-0.5">
                    {formatPrice(seat.price)}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">合计</p>
                <p className="font-display text-2xl text-gradient-brand leading-none">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <button
                onClick={() => navigate('/guide')}
                className="btn-primary"
              >
                确认购票
              </button>
            </div>
          </div>
        )}

        <div className="card p-4 animate-fadeIn">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
            <span>🎯</span> 区域说明
          </h4>
          <div className="grid grid-cols-1 gap-2.5 text-sm">
            <ZoneDesc
              color="from-amber-300 to-amber-400"
              title="VIP 贵宾区"
              desc="前2排中央，离舞台最近，互动机会最多，建议身高≥110cm"
              price="¥380"
            />
            <ZoneDesc
              color="from-brand-200 to-brand-300"
              title="亲子专区"
              desc="3-5排中央，相邻座位多且空间宽敞，最推荐带娃家庭选择"
              price="¥280"
            />
            <ZoneDesc
              color="from-mint-200 to-mint-300"
              title="安静观景区"
              desc="后排两侧，人少安静靠近出口，适合敏感宝宝或可能需要中途离场的家庭"
              price="¥220"
            />
            <ZoneDesc
              color="from-sky2-200 to-sky2-300"
              title="普通观演区"
              desc="标准座位，视野均衡，性价比之选，建议7岁以上大童"
              price="¥180"
            />
          </div>
        </div>
      </main>

      {selectedSeats.length > 0 && (
        <div className="sticky bottom-[64px] z-30 px-4 py-3 bg-gradient-to-t from-cream-50 via-cream-50/95 to-transparent safe-padding-bottom">
          <div className="max-w-lg mx-auto card p-3 flex items-center justify-between gap-3 shadow-float animate-fadeIn">
            <div>
              <p className="text-xs text-gray-500">{selectedSeats.length} 张票</p>
              <p className="font-display text-xl text-gradient-brand leading-none">
                {formatPrice(totalPrice)}
              </p>
            </div>
            <button onClick={() => navigate('/guide')} className="btn-primary px-8">
              确认购买
            </button>
          </div>
        </div>
      )}

      <BottomNav />

      <SeatDetailCard seat={activeSeat} onClose={() => setActiveSeat(null)} onConfirm={handleConfirmSeat} />
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}

function ZoneDesc({ color, title, desc, price }: { color: string; title: string; desc: string; price: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl2 bg-gray-50">
      <div className={`w-9 h-9 rounded-xl2 bg-gradient-to-br ${color} shrink-0 shadow-sm`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-gray-900">{title}</p>
          <span className="text-sm font-bold text-gray-700">{price}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
