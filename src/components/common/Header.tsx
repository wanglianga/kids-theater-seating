import { ArrowLeft, Share2, MonitorPlay } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showScreenLink?: boolean;
}

export default function Header({ title, subtitle, showBack = true, showScreenLink = true }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const pageMap: Record<string, string> = {
    '/': '首页',
    '/seats': '亲子选座',
    '/guide': '入场引导',
    '/interaction': '演前互动',
    '/reminders': '家长提醒',
    '/screen': '大屏模式',
  };
  const displayTitle = title || pageMap[location.pathname] || '儿童剧场';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="shrink-0 w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
              aria-label="返回"
            >
              <ArrowLeft size={20} strokeWidth={2.2} />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="font-display text-lg text-gray-900 truncate leading-tight">{displayTitle}</h1>
            {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {showScreenLink && location.pathname !== '/screen' && (
            <button
              onClick={() => navigate('/screen')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-mint-500 hover:bg-mint-50 active:scale-95 transition-all"
              aria-label="切换大屏模式"
              title="现场大屏模式"
            >
              <MonitorPlay size={20} strokeWidth={2} />
            </button>
          )}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="分享"
          >
            <Share2 size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
