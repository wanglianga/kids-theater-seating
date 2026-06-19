import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, AlertCircle, Users } from 'lucide-react';
import BigScreenTasks from '@/components/interaction/BigScreenTasks';
import { useScreenStore } from '@/store/screenStore';

const CHARACTERS = [
  { emoji: '🐻', name: '彩虹小熊', cue: '当听到\"彩虹之歌\"时请挥手', next: true },
  { emoji: '🦌', name: '机灵小鹿', cue: '森林第2幕出场，带领大家寻找魔法果实', next: false },
  { emoji: '🐰', name: '森林小兔', cue: '中场休息后会出现在观众席两侧', next: false },
  { emoji: '🦉', name: '智慧猫头鹰', cue: '第3幕谜题环节，请准备好答案！', next: false },
];

export default function BigScreenPage() {
  const navigate = useNavigate();
  const { tasks, countdownSeconds, toggleTask, incrementParticipant, setCountdown, showAlert, alertMessage, triggerAlert, dismissAlert } = useScreenStore();

  const [tab, setTab] = useState<'tasks' | 'characters' | 'late'>('tasks');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(Math.max(0, useScreenStore.getState().countdownSeconds - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [setCountdown]);

  useEffect(() => {
    const t = setTimeout(() => {
      triggerAlert('📢 请迟到的观众在工作人员引导下，从后区临时席安静就座，中场休息时再回到您的座位');
    }, 3000);
    return () => clearTimeout(t);
  }, [triggerAlert]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {tab === 'tasks' && (
        <BigScreenTasks
          tasks={tasks}
          countdown={countdownSeconds}
          onToggle={toggleTask}
          onIncrement={incrementParticipant}
        />
      )}

      {tab === 'characters' && (
        <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="particle absolute rounded-full animate-floatY"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${4 + Math.random() * 10}px`,
                  height: `${4 + Math.random() * 10}px`,
                  background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 h-full flex flex-col p-8 lg:p-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="font-display text-5xl lg:text-7xl text-gradient-rainbow mb-3">🎭 角色提示</h1>
                <p className="text-2xl text-white/70">出场顺序 · 互动信号 · 观演指南</p>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-sm text-white/60 mb-1">当前出场</p>
                  <div className="flex items-center gap-3 p-4 rounded-[1.5rem] bg-gradient-to-br from-yellow-400/30 to-orange-400/30 border-2 border-yellow-400/50 backdrop-blur-sm">
                    <span className="text-6xl animate-bounceSoft">{CHARACTERS[0].emoji}</span>
                    <div>
                      <p className="font-display text-3xl">{CHARACTERS[0].name}</p>
                      <p className="text-sm text-yellow-200">演出中</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              {CHARACTERS.map((ch, i) => (
                <div key={ch.name} className={`relative p-8 rounded-[2rem] backdrop-blur-sm overflow-hidden transition-all duration-500
                  ${i === 0
                    ? 'bg-gradient-to-br from-yellow-400/30 to-orange-400/30 border-2 border-yellow-400/50 scale-105'
                    : 'bg-white/10 border-2 border-white/20'
                  }`}
                >
                  <div className="text-center mb-6">
                    <div className={`inline-block text-7xl lg:text-8xl mb-4 ${i === 0 ? 'animate-bounceSoft' : ''}`}>
                      {ch.emoji}
                    </div>
                    <h3 className="font-display text-3xl lg:text-4xl mb-1">{ch.name}</h3>
                    {ch.next && (
                      <span className="inline-block px-3 py-1 rounded-full bg-mint-400/30 text-mint-200 text-sm font-medium border border-mint-400/30">
                        即将出场
                      </span>
                    )}
                  </div>
                  <div className="p-4 rounded-[1.25rem] bg-black/20 backdrop-blur-sm">
                    <p className="text-sm text-white/60 mb-1.5 flex items-center gap-1">
                      <Volume2 size={14} />
                      互动提示
                    </p>
                    <p className="text-base lg:text-lg text-white/90 leading-relaxed">{ch.cue}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 lg:p-8 rounded-[2rem] bg-white/10 backdrop-blur-sm border-2 border-white/20">
              <p className="text-center font-display text-3xl lg:text-4xl">
                💡 <span className="text-gradient-rainbow">小提示：</span>
                当角色走下舞台时，请在座位上挥手或大声说出角色名字，有机会获得惊喜贴纸哦！
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'late' && (
        <div className="relative w-full h-full bg-gradient-to-br from-red-900 via-amber-900 to-orange-900 text-white overflow-hidden flex items-center justify-center">
          <div className="relative z-10 text-center max-w-5xl px-12">
            <AlertCircle size={120} className="mx-auto mb-8 text-yellow-300 animate-pulse" strokeWidth={1.5} />
            <h1 className="font-display text-6xl lg:text-8xl text-yellow-300 drop-shadow-2xl mb-6">
              迟到观众入场提示
            </h1>
            <div className="space-y-4 mb-12">
              <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed">
                为不影响其他观众的观演体验
              </p>
              <p className="text-3xl lg:text-5xl font-bold text-white leading-relaxed">
                请先在 <span className="px-6 py-2 rounded-full bg-yellow-400/30 border-2 border-yellow-400/60">后区临时席 L1-L5</span> 就座
              </p>
              <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed">
                待 <span className="text-mint-300 font-bold">中场休息</span> 或合适幕间，再回到您的正式座位
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="p-6 rounded-[1.5rem] bg-white/10 backdrop-blur-sm border-2 border-white/20">
                <Users size={40} className="mx-auto mb-3 text-sky2-300" />
                <p className="font-display text-2xl mb-1">请举手</p>
                <p className="text-sm text-white/70">示意工作人员</p>
              </div>
              <div className="p-6 rounded-[1.5rem] bg-white/10 backdrop-blur-sm border-2 border-white/20">
                <span className="text-4xl block mb-3">🚶</span>
                <p className="font-display text-2xl mb-1">弯腰轻声</p>
                <p className="text-sm text-white/70">避免遮挡他人</p>
              </div>
              <div className="p-6 rounded-[1.5rem] bg-white/10 backdrop-blur-sm border-2 border-white/20">
                <span className="text-4xl block mb-3">💺</span>
                <p className="font-display text-2xl mb-1">听从指引</p>
                <p className="text-sm text-white/70">就近先入座</p>
              </div>
            </div>
            <p className="text-xl lg:text-2xl text-white/70">
              如有任何疑问，身着 <span className="bg-brand-500 px-3 py-1 rounded-lg mx-1">彩虹马甲</span> 的工作人员随时为您服务
            </p>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white transition-all active:scale-95"
        >
          <ArrowLeft size={22} />
          <span className="font-medium">返回</span>
        </button>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <div className="flex items-center gap-2 p-1 rounded-full bg-white/15 backdrop-blur-sm">
          {[
            { id: 'tasks', label: '🎯 任务墙', },
            { id: 'characters', label: '🎭 角色提示' },
            { id: 'late', label: '⏰ 迟到入场' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 font-medium
                ${tab === t.id
                  ? 'bg-white text-gray-900 shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {showAlert && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-full px-8 animate-slideUp">
          <div className="p-6 rounded-[2rem] bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-amber-900 shadow-float flex items-start gap-4 border-4 border-yellow-200">
            <div className="w-14 h-14 rounded-2xl bg-white/40 flex items-center justify-center shrink-0">
              <span className="text-4xl">📢</span>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold leading-relaxed">{alertMessage}</p>
            </div>
            <button
              onClick={dismissAlert}
              className="shrink-0 w-12 h-12 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center transition-all active:scale-95"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 right-6 z-40 text-white/50 text-sm">
        星光剧场 · 儿童互动大屏 v1.0 · 现场如有问题请联系控制室
      </div>
    </div>
  );
}
