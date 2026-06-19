import { useState } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import type { ReminderRule } from '@/types';

const CATEGORY_STYLE: Record<ReminderRule['category'], { bg: string; border: string; text: string }> = {
  intermission: { bg: 'bg-sky2-50', border: 'border-sky2-200', text: 'text-sky2-600' },
  refund: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
  safety: { bg: 'bg-brand-50', border: 'border-brand-200', text: 'text-brand-600' },
  behavior: { bg: 'bg-mint-50', border: 'border-mint-200', text: 'text-mint-600' },
};

interface RuleAccordionProps {
  rule: ReminderRule;
  defaultOpen?: boolean;
  index?: number;
}

export default function RuleAccordion({ rule, defaultOpen = false, index = 0 }: RuleAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const style = CATEGORY_STYLE[rule.category];

  return (
    <div
      className={`card overflow-hidden border-t-4 ${style.border} transition-all duration-300 animate-fadeIn`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center text-2xl shrink-0`}>
          {rule.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={`font-semibold text-gray-900 ${style.text}`}>{rule.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">{rule.summary}</p>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pl-19 space-y-3" style={{ paddingLeft: '4.25rem' }}>
          {rule.highlight && (
            <div className="flex items-start gap-2 p-3 rounded-xl2 bg-brand-50 border border-brand-100">
              <AlertTriangle size={16} className="text-brand-500 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-brand-700 leading-relaxed">{rule.highlight}</p>
            </div>
          )}

          <ul className="space-y-2">
            {rule.details.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                <span className={`shrink-0 mt-1 w-5 h-5 rounded-full ${style.bg} flex items-center justify-center text-[10px] font-bold ${style.text}`}>
                  {i + 1}
                </span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
