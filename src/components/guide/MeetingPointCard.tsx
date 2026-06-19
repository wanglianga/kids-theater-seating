import { MapPin, Clock, AlertCircle, Baby, Users } from 'lucide-react';
import { entryInfo } from '@/data/mockGuide';

export default function MeetingPointCard() {
  return (
    <div className="space-y-4">
      <div className="card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display text-xl text-gray-900 flex items-center gap-2">
                <MapPin size={20} className="text-purple-500" />
                散场集合地点
              </h3>
              <p className="text-xs text-gray-500 mt-1">请提前与孩子约定，走散时在此等待</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl shadow-md animate-floatY">
              🌈
            </div>
          </div>

          <div className="card-pressed p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">🐻</span>
              <div>
                <p className="font-bold text-gray-900 text-lg">{entryInfo.meetingPoint.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} />
                  {entryInfo.meetingPoint.landmark}
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-xl2 bg-purple-50 border border-purple-100">
              <p className="text-xs text-purple-800 flex items-start gap-1.5">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>
                  <strong>重要：</strong>如与孩子走散，请<strong>不要慌张</strong>，
                  先到此处等待，或联系就近工作人员。我们会在第一时间广播寻人。
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display text-lg text-gray-900 mb-4 flex items-center gap-2">
          <Users size={18} className="text-sky2-500" />
          设施位置一览
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {entryInfo.facilities.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl2 bg-gray-50 hover:bg-gray-100/70 transition-colors"
            >
              <div className={`w-11 h-11 rounded-xl2 flex items-center justify-center text-xl shrink-0
                ${f.type === 'wc' ? 'bg-blue-50' :
                  f.type === 'nursing' ? 'bg-pink-50' :
                  'bg-amber-50'}`}
              >
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800">
                  {f.type === 'wc' && '卫生间'}
                  {f.type === 'nursing' && '母婴哺乳室'}
                  {f.type === 'snack' && '点心小卖部'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{f.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 relative overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-white">
        <div className="absolute -top-4 -right-4 text-7xl opacity-10">⏰</div>
        <div className="relative">
          <h3 className="font-display text-lg text-gray-900 mb-3 flex items-center gap-2">
            <Clock size={18} className="text-amber-500" />
            迟到入场安排
          </h3>
          <div className="space-y-2.5">
            <InfoRow label="允许入场时间" value={entryInfo.lateEntry.window} highlight />
            <InfoRow label="临时就座" value={entryInfo.lateEntry.seat} />
            <InfoRow label="正式入座" value="中场休息或合适幕间" />
          </div>
          <div className="mt-3 p-3 rounded-xl2 bg-white border border-amber-200">
            <p className="text-xs text-amber-800 leading-relaxed flex items-start gap-1.5">
              <Baby size={14} className="shrink-0 mt-0.5" />
              <span>{entryInfo.lateEntry.note}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500 shrink-0">{label}</span>
      <span className={`text-sm font-medium text-right ${highlight ? 'text-brand-600' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
