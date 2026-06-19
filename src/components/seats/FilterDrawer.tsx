import { X, Baby, Heart, VolumeX, Eye, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { useSeatStore } from '@/store/seatStore';
import type { SeatFilters } from '@/types';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  const { filters, updateFilters, resetFilters, seats } = useSeatStore();

  if (!open) return null;

  const countRecommended = (f: SeatFilters) => {
    return seats.filter((s) => {
      if (s.isAisle || s.status === 'sold' || s.status === 'locked') return false;
      if (s.price < f.priceRange[0] || s.price > f.priceRange[1]) return false;
      if (f.hideObstructionRisk && s.hasObstructionRisk) return false;
      if (s.distanceToAisle > f.maxAisleDistance) return false;
      if (f.preferFamilyZone && s.zone !== 'family') return false;
      if (f.preferQuietZone && s.zone !== 'quiet') return false;
      return true;
    }).length;
  };

  const recommendedCount = countRecommended(filters);

  return (
    <div className="fixed inset-0 z-50 animate-fadeIn">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-x-0 bottom-0 max-w-lg mx-auto bg-white rounded-t-[2rem] shadow-float animate-slideUp overflow-hidden">
        <div className="sticky top-0 bg-white px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-50 z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl2 bg-brand-50 flex items-center justify-center text-brand-500">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h3 className="font-display text-lg text-gray-900 leading-tight">筛选条件</h3>
              <p className="text-xs text-gray-500">为孩子找到最合适的座位</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[65vh] overflow-y-auto no-scrollbar pb-24">
          <FilterSection title="儿童身高" icon={<Baby size={16} className="text-brand-500" />} hint="系统将根据身高推荐无遮挡的座位">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">{filters.childHeight} cm</span>
              <span className="text-xs text-gray-400">90cm - 150cm</span>
            </div>
            <input
              type="range"
              min={90}
              max={150}
              step={5}
              value={filters.childHeight}
              onChange={(e) => updateFilters({ childHeight: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              {[90, 110, 130, 150].map((h) => (
                <span key={h} className={`text-[10px] ${filters.childHeight === h ? 'text-brand-500 font-semibold' : 'text-gray-300'}`}>
                  {h}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: '幼儿 3-4岁', h: 100 },
                { label: '小童 5-6岁', h: 115 },
                { label: '大童 7-10岁', h: 135 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => updateFilters({ childHeight: p.h })}
                  className={`chip text-xs transition-all ${Math.abs(filters.childHeight - p.h) <= 5 ? 'chip-active' : 'chip-inactive'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="区域偏好" icon={<Heart size={16} className="text-brand-500" />}>
            <div className="grid grid-cols-2 gap-2.5">
              <ToggleCard
                active={filters.preferFamilyZone}
                onClick={() => updateFilters({ preferFamilyZone: !filters.preferFamilyZone })}
                title="亲子专区"
                desc="前排相邻座位，空间宽敞适合带娃"
                emoji="👨‍👩‍👧"
              />
              <ToggleCard
                active={filters.preferQuietZone}
                onClick={() => updateFilters({ preferQuietZone: !filters.preferQuietZone })}
                title="安静观景区"
                desc="后排人少，适合敏感宝宝观影"
                emoji="🤫"
              />
            </div>
          </FilterSection>

          <FilterSection title="过道距离上限" icon={<Eye size={16} className="text-mint-500" />} hint="抱娃时越靠近过道越方便中途离场">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">{filters.maxAisleDistance} 步以内</span>
              <span className="text-xs text-gray-400">1步 = 约0.8米</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={filters.maxAisleDistance}
              onChange={(e) => updateFilters({ maxAisleDistance: parseInt(e.target.value) })}
              className="w-full"
            />
          </FilterSection>

          <FilterSection title="安全与视野" icon={<VolumeX size={16} className="text-sky2-500" />}>
            <div className="space-y-2.5">
              <ToggleRow
                active={filters.hideObstructionRisk}
                onClick={() => updateFilters({ hideObstructionRisk: !filters.hideObstructionRisk })}
                title="隐藏前排遮挡风险座位"
                desc="身高不足时前排座位可能被遮挡"
              />
            </div>
          </FilterSection>

          <FilterSection title="票价区间" icon={<span>💰</span>}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">
                ¥{filters.priceRange[0]} - ¥{filters.priceRange[1]}
              </span>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min={100}
                max={500}
                step={20}
                value={filters.priceRange[0]}
                onChange={(e) => updateFilters({ priceRange: [Math.min(parseInt(e.target.value), filters.priceRange[1]), filters.priceRange[1]] })}
                className="w-full"
              />
              <input
                type="range"
                min={100}
                max={500}
                step={20}
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], Math.max(parseInt(e.target.value), filters.priceRange[0])] })}
                className="w-full"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[[100, 200], [180, 280], [280, 380], [200, 500]].map(([min, max]) => (
                <button
                  key={`${min}-${max}`}
                  onClick={() => updateFilters({ priceRange: [min, max] })}
                  className={`chip text-xs ${filters.priceRange[0] === min && filters.priceRange[1] === max ? 'chip-active' : 'chip-inactive'}`}
                >
                  ¥{min}-¥{max}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 safe-padding-bottom">
          <div className="max-w-lg mx-auto">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                符合条件座位：<span className="font-bold text-brand-500 text-lg">{recommendedCount}</span> 个
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw size={14} />
                重置
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="btn-secondary flex-1">
                取消
              </button>
              <button onClick={onClose} className="btn-primary flex-1">
                <Check size={18} />
                应用筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, icon, hint, children }: { title: string; icon: React.ReactNode; hint?: string; children: React.ReactNode }) {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">{icon}</div>
        <div>
          <h4 className="text-sm font-semibold text-gray-800 leading-tight">{title}</h4>
          {hint && <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{hint}</p>}
        </div>
      </div>
      <div className="pl-9">{children}</div>
    </div>
  );
}

function ToggleCard({ active, onClick, title, desc, emoji }: { active: boolean; onClick: () => void; title: string; desc: string; emoji: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-3.5 rounded-2xl2 border-2 transition-all duration-200 ${
        active
          ? 'bg-brand-50 border-brand-300 shadow-soft'
          : 'bg-white border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl shrink-0">{emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className={`font-semibold text-sm ${active ? 'text-brand-600' : 'text-gray-800'}`}>{title}</p>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'bg-brand-400 border-brand-400' : 'border-gray-200'}`}>
              {active && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-1 leading-snug">{desc}</p>
        </div>
      </div>
    </button>
  );
}

function ToggleRow({ active, onClick, title, desc }: { active: boolean; onClick: () => void; title: string; desc?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start justify-between gap-3 p-3 rounded-xl2 border transition-all duration-200 ${
        active ? 'bg-mint-50 border-mint-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="text-left min-w-0">
        <p className={`text-sm font-medium ${active ? 'text-mint-700' : 'text-gray-800'}`}>{title}</p>
        {desc && <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>}
      </div>
      <div className={`w-11 h-6 rounded-full shrink-0 relative transition-all duration-300 ${active ? 'bg-mint-400' : 'bg-gray-300'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${active ? 'left-[22px]' : 'left-0.5'}`} />
      </div>
    </button>
  );
}
