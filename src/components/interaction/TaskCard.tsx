import { Check, Users, Clock, Gift } from 'lucide-react';
import type { InteractionTask } from '@/types';

const TYPE_LABEL: Record<InteractionTask['type'], { label: string; emoji: string; color: string }> = {
  sticker: { label: '贴纸任务', emoji: '🌟', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  quiz: { label: '知识问答', emoji: '❓', color: 'bg-sky2-100 text-sky2-700 border-sky2-200' },
  photo: { label: '合影任务', emoji: '📷', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  rally: { label: '探索任务', emoji: '🗺️', color: 'bg-mint-100 text-mint-700 border-mint-200' },
};

interface TaskCardProps {
  task: InteractionTask;
  onToggle?: (id: string) => void;
  compact?: boolean;
}

export default function TaskCard({ task, onToggle, compact = false }: TaskCardProps) {
  const type = TYPE_LABEL[task.type];

  if (compact) {
    return (
      <div
        onClick={() => onToggle?.(task.id)}
        className={`cursor-pointer relative card-pressed p-3 transition-all duration-200 hover:shadow-soft ${
          task.completed ? 'ring-2 ring-mint-300' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-xl2 flex items-center justify-center text-xl shrink-0 ${type.color}`}>
            {type.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className={`font-semibold text-sm truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {task.title}
              </p>
              {task.completed && (
                <div className="w-5 h-5 rounded-full bg-mint-400 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                <Clock size={10} />
                {task.deadline}
              </span>
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                <Users size={10} />
                {task.participants}人参与
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  task.completed ? 'bg-mint-400' : 'bg-gradient-to-r from-brand-400 to-sky2-400'
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${task.completed ? 'opacity-80' : ''}`}>
      <div className={`h-2 ${task.completed ? 'bg-mint-400' : 'bg-gradient-to-r from-brand-400 via-purple-400 to-sky2-400'}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`w-14 h-14 rounded-2xl2 flex items-center justify-center text-2xl shrink-0 shadow-sm ${type.color}`}>
              {type.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`chip text-[10px] ${type.color} border`}>
                  {type.label}
                </span>
                {task.completed && (
                  <span className="chip text-[10px] bg-mint-100 text-mint-700 border-mint-200">
                    <Check size={10} /> 已完成
                  </span>
                )}
              </div>
              <h4 className={`font-display text-lg mt-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {task.title}
              </h4>
            </div>
          </div>

          <button
            onClick={() => onToggle?.(task.id)}
            className={`w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-mint-400 border-mint-400 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-300 hover:border-brand-300 hover:text-brand-400'
            }`}
            aria-label={task.completed ? '标记为未完成' : '标记为完成'}
          >
            <Check size={20} strokeWidth={3} />
          </button>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">{task.description}</p>

        {task.reward && (
          <div className="flex items-center gap-2 p-3 rounded-xl2 bg-amber-50 border border-amber-100 mb-4">
            <Gift size={16} className="text-amber-500 shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="text-base">{task.rewardEmoji}</span>
              <span className="text-sm font-medium text-amber-800">完成奖励：{task.reward}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={14} className="text-brand-400" />
              <span>截止：{task.deadline}</span>
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Users size={14} className="text-sky2-400" />
              <span>{task.participants}人参与</span>
            </span>
          </div>
          <span className="text-xs font-semibold text-brand-500">{task.progress}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              task.completed
                ? 'bg-gradient-to-r from-mint-400 to-mint-300'
                : 'bg-gradient-to-r from-brand-400 via-purple-400 to-sky2-400 animate-shimmer bg-[length:200%_100%]'
            }`}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
