import Header from '@/components/common/Header';
import BottomNav from '@/components/common/BottomNav';
import RouteMap from '@/components/guide/RouteMap';
import MeetingPointCard from '@/components/guide/MeetingPointCard';

export default function EntryGuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="入场引导" subtitle="请提前30分钟到达剧场" />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 space-y-5 pb-6 overflow-y-auto no-scrollbar">
        <div className="card p-5 bg-gradient-to-br from-brand-400 via-purple-500 to-sky2-500 text-white overflow-hidden relative animate-fadeIn">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-white/70 mb-1">您的电子票信息</p>
                <h3 className="font-display text-2xl leading-none">星光剧场 · 主厅</h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl animate-bounceSoft">
                🎫
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TicketInfo label="检票口" value="2 号" big />
              <TicketInfo label="楼层" value="2 楼" big />
              <TicketInfo label="座位区域" value="C 区" />
              <TicketInfo label="座位排数" value="8 排" />
            </div>
          </div>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '80ms' }}>
          <RouteMap />
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '120ms' }}>
          <MeetingPointCard />
        </div>

        <div className="card p-5 animate-fadeIn" style={{ animationDelay: '160ms' }}>
          <h3 className="font-display text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span> 入场准备清单
          </h3>
          <div className="space-y-2.5">
            {[
              { item: '电子购票二维码（建议提前截图）', done: true },
              { item: '儿童身高如超过100cm请携带儿童票', done: true },
              { item: '水杯、小零食（剧场提供寄存处）', done: false },
              { item: '湿巾、纸巾、备用衣物', done: false },
              { item: '安抚玩具（如有需要）', done: false },
            ].map((row, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl2 transition-colors ${row.done ? 'bg-mint-50' : 'bg-gray-50'}`}>
                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold
                  ${row.done ? 'bg-mint-400 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  {row.done ? '✓' : i + 1}
                </div>
                <p className={`text-sm ${row.done ? 'text-mint-700 line-through' : 'text-gray-700'}`}>
                  {row.item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 border-brand-200 animate-fadeIn relative overflow-hidden" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-0 right-0 text-8xl opacity-5 -rotate-12 translate-x-4 -translate-y-4">
            🚨
          </div>
          <div className="relative">
            <h3 className="font-display text-lg text-brand-600 mb-3 flex items-center gap-2">
              <span>⚠️</span> 特别注意事项
            </h3>
            <ul className="space-y-2">
              {[
                '入场需配合工作人员测量体温，体温异常谢绝入场',
                '剧场内禁止携带食品、有色饮料，可在寄存处存放',
                '演出进行中拍照请关闭闪光灯，禁止录像',
                '演前互动任务请在14:15前完成，逾期无法领取奖励',
                '散场时请照看好孩子，按照工作人员指引有序离场',
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-brand-100 text-brand-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <span className="flex-1">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function TicketInfo({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div>
      <p className="text-xs text-white/70 mb-0.5">{label}</p>
      <p className={`font-display leading-none ${big ? 'text-3xl' : 'text-xl'}`}>{value}</p>
    </div>
  );
}
