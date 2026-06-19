interface SeatLegendProps {
  className?: string;
}

const ZONE_ITEMS = [
  { name: 'VIP贵宾区', color: 'bg-gradient-to-br from-amber-300 to-amber-400', border: 'border-amber-300' },
  { name: '亲子专区', color: 'bg-brand-100', border: 'border-brand-200' },
  { name: '安静观景区', color: 'bg-mint-100', border: 'border-mint-200' },
  { name: '普通观演区', color: 'bg-sky2-50', border: 'border-sky2-100' },
];

const STATUS_ITEMS = [
  { name: '已售', color: 'bg-gray-200', border: 'border-gray-200' },
  { name: '锁定', color: 'bg-gray-100 border-dashed', border: 'border-gray-100' },
  { name: '已选', color: 'bg-brand-400 animate-pulseRing', border: 'border-brand-400' },
  { name: '过道', color: 'bg-transparent border-2 border-dashed', border: 'border-gray-300' },
];

export default function SeatLegend({ className = '' }: SeatLegendProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">区域类型</p>
        <div className="grid grid-cols-2 gap-2">
          {ZONE_ITEMS.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-lg border ${item.color} ${item.border} shrink-0`} />
              <span className="text-xs text-gray-700 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">座位状态</p>
        <div className="grid grid-cols-2 gap-2">
          {STATUS_ITEMS.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-lg border ${item.color} ${item.border} shrink-0`} />
              <span className="text-xs text-gray-700 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
