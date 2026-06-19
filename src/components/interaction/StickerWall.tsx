import { Lock, Sparkles } from 'lucide-react';
import type { CharacterSticker } from '@/types';

interface StickerWallProps {
  stickers: CharacterSticker[];
  onCollect?: (id: string) => void;
  large?: boolean;
}

export default function StickerWall({ stickers, onCollect, large = false }: StickerWallProps) {
  const collected = stickers.filter((s) => s.collected).length;
  const total = stickers.length;
  const progress = Math.round((collected / total) * 100);

  return (
    <div className="card overflow-hidden">
      <div className="p-4 pb-3 flex items-center justify-between bg-gradient-to-r from-purple-50 via-pink-50 to-brand-50">
        <div>
          <h4 className="font-display text-base text-gray-900 flex items-center gap-1.5">
            <Sparkles size={16} className="text-purple-500" />
            角色贴纸收集
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">完成任务解锁角色贴纸</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-gradient-brand leading-none">
            {collected}<span className="text-sm text-gray-400">/{total}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">{progress}%</p>
        </div>
      </div>

      <div className={`p-4 ${large ? 'grid grid-cols-3 gap-4' : 'grid grid-cols-5 gap-3'}`}>
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => !sticker.collected && onCollect?.(sticker.id)}
            disabled={sticker.collected}
            className={`group relative flex flex-col items-center gap-1.5 transition-all duration-300
              ${large ? 'p-3' : 'p-2'}
              ${sticker.collected
                ? 'opacity-100'
                : 'opacity-50 grayscale hover:opacity-70 hover:grayscale-0'
              }`}
          >
            <div
              className={`relative ${large ? 'w-16 h-16' : 'w-12 h-12'} rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all duration-300
                ${sticker.collected
                  ? `${sticker.color} ${large ? 'text-3xl' : 'text-2xl'} animate-bounceSoft`
                  : 'bg-gray-100 border-gray-200'
                }
                ${!sticker.collected && 'group-hover:scale-105'}
              `}
            >
              {sticker.collected ? (
                sticker.emoji
              ) : (
                <Lock size={large ? 20 : 16} className="text-gray-400" />
              )}
              {sticker.collected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-mint-400 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                  ✓
                </div>
              )}
            </div>
            <p className={`font-medium text-center leading-tight ${large ? 'text-sm' : 'text-[11px]'}
              ${sticker.collected ? 'text-gray-800' : 'text-gray-400'}`}
            >
              {sticker.name}
            </p>
            {!sticker.collected && !large && (
              <p className="text-[9px] text-gray-400 text-center leading-tight max-w-full truncate w-full">
                {sticker.description}
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-brand-400 transition-all duration-700 animate-shimmer bg-[length:200%_100%]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400">
          <span>集齐{total}个可兑换森林小礼包</span>
          <span>还需 {total - collected} 个</span>
        </div>
      </div>
    </div>
  );
}
