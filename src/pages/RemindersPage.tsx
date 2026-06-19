import Header from '@/components/common/Header';
import BottomNav from '@/components/common/BottomNav';
import RuleAccordion from '@/components/reminders/RuleAccordion';
import IntermissionCard from '@/components/reminders/IntermissionCard';
import { reminderRules } from '@/data/mockGuide';
import { Phone, MessageCircle } from 'lucide-react';

export default function RemindersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="家长提醒中心" subtitle="观演前请仔细阅读" />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 space-y-5 pb-6 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-2 gap-3 animate-fadeIn">
          <SummaryCard icon="⏸️" title="中场休息" value="15 分钟" color="bg-sky2-500" sub="15:20-15:35" />
          <SummaryCard icon="↩️" title="退票截止" value="48 小时前" color="bg-amber-500" sub="可全额退款" />
          <SummaryCard icon="🛡️" title="安全出口" value="4 个" color="bg-brand-500" sub="剧场四角" />
          <SummaryCard icon="📞" title="客服热线" value="400-888" color="bg-mint-500" sub="9:00-21:00" />
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: '60ms' }}>
          <IntermissionCard />
        </div>

        <div animate-fadeIn style={{ animationDelay: '100ms' }}>
          <h3 className="font-display text-lg text-gray-900 mb-3 flex items-center gap-2">
            <span>📋</span> 重要规则须知
          </h3>
          <div className="space-y-3.5">
            {reminderRules.map((rule, i) => (
              <RuleAccordion key={rule.id} rule={rule} index={i} defaultOpen={i === 0} />
            ))}
          </div>
        </div>

        <div className="card p-5 animate-fadeIn" style={{ animationDelay: '260ms' }}>
          <h3 className="font-display text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>📞</span> 紧急联系方式
          </h3>
          <div className="space-y-3">
            <ContactRow
              icon={<Phone size={18} className="text-brand-500" />}
              label="剧场客服热线"
              value="400-888-1234"
              hint="9:00 - 21:00（演出日22:00）"
              buttonLabel="拨打"
            />
            <ContactRow
              icon={<MessageCircle size={18} className="text-mint-500" />}
              label="在线客服"
              value="微信小程序客服"
              hint="平均响应时间 3 分钟"
              buttonLabel="咨询"
            />
            <ContactRow
              icon={<span className="text-xl">🚨</span>}
              label="现场紧急求助"
              value="联系就近工作人员"
              hint="或拨打内部电话 8888"
              buttonLabel="查看位置"
              warn
            />
          </div>
        </div>

        <div className="card p-5 border-brand-200 animate-fadeIn relative overflow-hidden" style={{ animationDelay: '300ms' }}>
          <div className="absolute top-0 right-0 text-8xl opacity-10 translate-x-2 -translate-y-2">
            🤗
          </div>
          <div className="relative">
            <h3 className="font-display text-lg text-brand-600 mb-3 flex items-center gap-2">
              <span>💝</span> 温馨提示
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              每一个孩子都是独特的天使，如果您的孩子在观演过程中有任何不适或特殊需求，
              请<strong>不要犹豫</strong>，立即联系我们的工作人员。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              我们备有：儿童耳塞、降噪耳机、遮光眼罩、应急毛毯、冷热外敷袋、常用儿童药品等物资，
              免费为有需要的家庭提供。祝您和孩子度过一段美好的亲子时光！
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function SummaryCard({
  icon, title, value, color, sub,
}: { icon: string; title: string; value: string; color: string; sub: string }) {
  return (
    <div className="card-pressed p-4 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-16 h-16 ${color} rounded-bl-[2rem] opacity-10`} />
      <span className="text-2xl mb-1.5 block">{icon}</span>
      <p className="text-xs text-gray-500">{title}</p>
      <p className={`font-display text-xl leading-none mt-0.5 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent`}>
        {value}
      </p>
      <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function ContactRow({
  icon, label, value, hint, buttonLabel, warn = false,
}: {
  icon: React.ReactNode; label: string; value: string; hint: string; buttonLabel: string; warn?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl2 ${warn ? 'bg-brand-50 border border-brand-100' : 'bg-gray-50'}`}>
      <div className={`w-11 h-11 rounded-xl2 flex items-center justify-center shrink-0
        ${warn ? 'bg-brand-100' : 'bg-white shadow-sm'}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${warn ? 'text-brand-700' : 'text-gray-800'}`}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{value}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>
      </div>
      <button className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
        ${warn
          ? 'bg-brand-500 text-white hover:bg-brand-600 active:scale-95'
          : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 active:scale-95'
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
