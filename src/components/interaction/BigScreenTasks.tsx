import { useEffect } from 'react';
import { Users, Clock, Check, Sparkles } from 'lucide-react';
import type { InteractionTask } from '@/types';

interface BigScreenTasksProps {
  tasks: InteractionTask[];
  countdown: number;
  onToggle: (id: string) => void;
  onIncrement: (id: string) => void;
}

export default function BigScreenTasks({ tasks, countdown, onToggle, onIncrement }: BigScreenTasksProps) {
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((p, i) => {
      (p as HTMLElement).style.animationDelay = `${i * 0.3}s`;
    });
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full animate-floatY"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex flex-col p-8 lg:p-12">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl lg:text-4xl animate-bounceSoft">
                🌈
              </div>
              <div>
                <h1 className="font-display text-4xl lg:text-6xl text-gradient-rainbow leading-none">
                  彩虹森林奇遇记
                </h1>
                <p className="text-base lg:text-xl text-white/70 mt-2">演前互动任务墙</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
              <Clock size={18} />
              <span>距离开演还有</span>
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="font-display text-5xl lg:text-7xl font-bold text-yellow-300 drop-shadow-lg">
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="text-5xl lg:text-7xl font-bold text-white/40">:</span>
              <span className="font-display text-5xl lg:text-7xl font-bold text-yellow-300 drop-shadow-lg">
                {String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 overflow-hidden">
          {tasks.map((task, i) => (
            <button
              key={task.id}
              onClick={() => onIncrement(task.id)}
              onContextMenu={(e) => { e.preventDefault(); onToggle(task.id); }}
              className={`group relative flex flex-col p-6 lg:p-8 rounded-[2rem] backdrop-blur-sm transition-all duration-500 text-left overflow-hidden
                ${task.completed
                  ? 'bg-gradient-to-br from-mint-500/30 to-emerald-600/30 border-2 border-mint-400/50'
                  : 'bg-white/10 border-2 border-white/20 hover:bg-white/15 hover:border-white/30'
                }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] flex items-center justify-center text-4xl lg:text-5xl shadow-xl
                    ${task.completed ? 'bg-mint-400/50' : 'bg-white/20 backdrop-blur-sm'}
                  `}>
                    {task.type === 'rally' && '🗺️'}
                    {task.type === 'quiz' && '❓'}
                    {task.type === 'photo' && '📷'}
                    {task.type === 'sticker' && '🌟'}
                  </div>
                  <div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm mb-2
                      ${task.completed ? 'bg-mint-400/30 text-mint-100' : 'bg-white/15 text-white/80'}`}
                    >
                      {task.completed && <Check size={14} strokeWidth={3} />}
                      <span className="font-medium">
                        {task.type === 'rally' && '探索任务'}
                        {task.type === 'quiz' && '知识问答'}
                        {task.type === 'photo' && '合影任务'}
                        {task.type === 'sticker' && '贴纸收集'}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl leading-tight">
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-white/60 justify-end mb-1">
                    <Users size={18} />
                    <span className="text-sm">参与人数</span>
                  </div>
                  <p className="font-display text-4xl lg:text-5xl font-bold">
                    {task.participants.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="relative z-10 text-base lg:text-lg text-white/80 mb-6 line-clamp-2 leading-relaxed">
                {task.description}
              </p>

              <div className="relative z-10 mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-white/60 flex items-center gap-1">
                      <Clock size={14} />
                      截止 {task.deadline}
                    </span>
                    {task.reward && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                        <Sparkles size={14} />
                        <span className="font-medium">{task.rewardEmoji} {task.reward}</span>
                      </span>
                    )}
                  </div>
                  <span className="font-display text-2xl font-bold text-white/80">{task.progress}%</span>
                </div>

                <div className="relative h-4 lg:h-5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700
                      ${task.completed
                        ? 'bg-gradient-to-r from-mint-400 to-emerald-400'
                        : 'bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-shimmer bg-[length:200%_100%]'
                      }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4 lg:gap-8">
          <StatCard label="今日到场观众" value="1,248" emoji="👨‍👩‍👧‍👦" />
          <StatCard label="正在参与互动" value={tasks.reduce((s, t) => s + t.participants, 0).toLocaleString()} emoji="🎮" highlight />
          <StatCard label="已完成任务数" value={tasks.filter(t => t.completed).length + '/' + tasks.length} emoji="✅" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, emoji, highlight = false }: { label: string; value: string; emoji: string; highlight?: boolean }) {
  return (
    <div className={`p-6 lg:p-8 rounded-[2rem] backdrop-blur-sm text-center
      ${highlight
        ? 'bg-gradient-to-br from-yellow-400/30 to-orange-400/30 border-2 border-yellow-400/50'
        : 'bg-white/10 border-2 border-white/15'
      }`}
    >
      <div className="text-4xl lg:text-5xl mb-2">{emoji}</div>
      <p className="font-display text-4xl lg:text-6xl font-bold leading-none mb-2">
        {value}
      </p>
      <p className="text-sm lg:text-base text-white/70">{label}</p>
    </div>
  );
}
