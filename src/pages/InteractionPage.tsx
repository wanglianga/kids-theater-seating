import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import BottomNav from '@/components/common/BottomNav';
import TaskCard from '@/components/interaction/TaskCard';
import StickerWall from '@/components/interaction/StickerWall';
import { useScreenStore } from '@/store/screenStore';
import { MonitorPlay } from 'lucide-react';

export default function InteractionPage() {
  const navigate = useNavigate();
  const { tasks, stickers, toggleTask, collectSticker } = useScreenStore();

  const completedTasks = tasks.filter((t) => t.completed).length;
  const collectedStickers = stickers.filter((s) => s.collected).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="演前互动" subtitle="完成任务赢取角色贴纸" />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 space-y-5 pb-6 overflow-y-auto no-scrollbar">
        <div className="card overflow-hidden animate-fadeIn">
          <div className="p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-brand-500 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-white/70 mb-1">今日互动进度</p>
                <h3 className="font-display text-2xl leading-none mb-0.5">
                  彩虹森林大冒险
                </h3>
                <p className="text-xs text-white/80">开演前 30 分钟开放 · 现场大屏可查看</p>
              </div>
              <button
                onClick={() => navigate('/screen')}
                className="flex flex-col items-center gap-1 p-2 rounded-xl2 bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all"
              >
                <MonitorPlay size={22} />
                <span className="text-[10px] font-medium">大屏模式</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <ProgressStat label="任务进度" value={`${completedTasks}/${tasks.length}`} />
              <ProgressStat label="贴纸收集" value={`${collectedStickers}/${stickers.length}`} />
              <ProgressStat label="参与人数" value={tasks.reduce((s, t) => s + t.participants, 0).toLocaleString()} />
            </div>
          </div>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '60ms' }}>
          <StickerWall stickers={stickers} onCollect={collectSticker} />
        </div>

        <div animate-fadeIn style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg text-gray-900 flex items-center gap-2">
              <span>🎯</span> 今日任务
            </h3>
            <span className="text-xs text-gray-400">
              完成 <span className="text-brand-500 font-semibold">{completedTasks}</span> / {tasks.length}
            </span>
          </div>
          <div className="space-y-3.5">
            {tasks.map((task, i) => (
              <div key={task.id} className="animate-fadeIn" style={{ animationDelay: `${140 + i * 60}ms` }}>
                <TaskCard task={task} onToggle={toggleTask} />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 animate-fadeIn" style={{ animationDelay: '380ms' }}>
          <h3 className="font-display text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>🎭</span> 今日出场角色
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {stickers.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md border-2 border-white
                  ${s.collected ? s.color : 'bg-gray-100 grayscale opacity-60'}`}
                >
                  {s.emoji}
                </div>
                <p className={`text-[10px] font-medium text-center leading-tight
                  ${s.collected ? 'text-gray-700' : 'text-gray-400'}`}
                >
                  {s.name}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            演出过程中找到对应角色，说出暗号即可解锁贴纸哦～
          </p>
        </div>

        <div className="card p-5 animate-fadeIn border-purple-200 relative overflow-hidden" style={{ animationDelay: '420ms' }}>
          <div className="absolute top-0 right-0 text-8xl opacity-10 -translate-y-2 translate-x-4">
            🎁
          </div>
          <div className="relative">
            <h3 className="font-display text-lg text-purple-700 mb-3 flex items-center gap-2">
              <span>🏆</span> 兑换说明
            </h3>
            <div className="space-y-2.5">
              {[
                '集满5个角色贴纸，可在服务台领取森林小礼包1份',
                '完成全部4个任务，可参与演出结束后的角色合影',
                '现场参与大屏互动，随机抽取5名幸运观众获得签名海报',
                '所有奖励请在演出结束后30分钟内领取，逾期无效',
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="flex-1">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function ProgressStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl2 bg-white/10 backdrop-blur-sm">
      <p className="text-[10px] text-white/70 mb-0.5">{label}</p>
      <p className="font-display text-xl leading-none">{value}</p>
    </div>
  );
}
