import type { EntryInfo, ReminderRule, RoutePoint } from '@/types';

export const entryInfo: EntryInfo = {
  gate: '2号检票口',
  floor: 2,
  routeSteps: [
    '从剧场正门进入，乘扶梯上2楼',
    '在2楼大厅找到彩虹指示牌',
    '沿左侧通道前行约50米到达2号检票口',
    '检票后进入 C 区通道，第 8 排为您的座位区域',
  ],
  meetingPoint: {
    name: '彩虹小熊雕像旁',
    landmark: '2楼大厅中央、服务台正对面',
  },
  lateEntry: {
    allowed: true,
    window: '14:45 - 15:00 及 中场休息期间',
    seat: '后区临时等候席 L1-L5',
    note: '为不影响其他观众，迟到观众请由工作人员引导入场，在合适幕间安静就座。',
  },
  facilities: [
    { type: 'wc', location: '2楼 C区通道尽头 左转', icon: '🚻' },
    { type: 'wc', location: '1楼 正门入口 右侧', icon: '🚻' },
    { type: 'nursing', location: '2楼 亲子服务区内', icon: '👶' },
    { type: 'snack', location: '2楼 大厅 彩虹小卖部', icon: '🍿' },
  ],
};

export const routePoints: RoutePoint[] = [
  { id: 'r1', type: 'gate', name: '剧场正门', x: 8, y: 85, description: '起点' },
  { id: 'r2', type: 'checkin', name: '扶梯上2楼', x: 22, y: 70 },
  { id: 'r3', type: 'meeting', name: '彩虹集合点', x: 45, y: 55, description: '2楼大厅中央' },
  { id: 'r4', type: 'checkin', name: '2号检票口', x: 68, y: 40, description: '请在此检票' },
  { id: 'r5', type: 'seat', name: 'C区 8排', x: 85, y: 22, description: '您的座位区域' },
  { id: 'r6', type: 'wc', name: '卫生间', x: 78, y: 72, description: 'C区通道尽头' },
  { id: 'r7', type: 'nursing', name: '母婴室', x: 30, y: 42, description: '亲子服务区' },
  { id: 'r8', type: 'snack', name: '小卖部', x: 52, y: 70, description: '彩虹小卖部' },
  { id: 'r9', type: 'exit', name: '安全出口', x: 92, y: 88, description: '紧急疏散出口' },
];

export const reminderRules: ReminderRule[] = [
  {
    id: 'rule-001',
    category: 'intermission',
    title: '中场休息安排',
    icon: '⏸️',
    summary: '15分钟休息时间，点心区和卫生间开放',
    highlight: '请提前告知孩子集合地点，避免走散',
    details: [
      '休息时间：约 15:20 - 15:35（共15分钟）',
      '点心购买：2楼彩虹小卖部提供爆米花、饮料等',
      '卫生间：C区通道尽头左转（最近），1楼正门旁',
      '座位返回：请在休息结束前5分钟返回座位',
      '儿童安全：低龄儿童请由家长全程陪同',
    ],
  },
  {
    id: 'rule-002',
    category: 'refund',
    title: '退改规则说明',
    icon: '↩️',
    summary: '开演前48小时可申请免费退票，逾期需收手续费',
    highlight: '儿童票与成人票退改规则相同',
    details: [
      '退票时间：演出开始前48小时（含）以上，可全额退款',
      '逾期退票：24-48小时内退款80%，24小时内不支持退票',
      '改票说明：同一剧目其他场次可免费改票1次（需有空座）',
      '申请渠道：购票小程序"我的订单"内自助申请',
      '特殊情况：孩子突发不适，凭就医证明可特殊申请全额退票',
    ],
  },
  {
    id: 'rule-003',
    category: 'safety',
    title: '安全与路线须知',
    icon: '🛡️',
    summary: '4个安全出口分布于剧场四角，紧急情况请就近撤离',
    highlight: '带娃优先选择靠近过道的座位，方便紧急撤离',
    details: [
      '紧急出口：剧场四角共4个安全出口，均有绿色指示灯',
      '疏散路线：座位旁通道直通出口，请遵循工作人员指引',
      '集合地点：如遇紧急疏散，散场后在2楼大厅彩虹小熊雕像旁集合',
      '禁止事项：严禁在过道奔跑、攀爬座椅，家长请看护好儿童',
      '医疗协助：如孩子身体不适，可联系就近工作人员或到服务台',
    ],
  },
  {
    id: 'rule-004',
    category: 'behavior',
    title: '观演礼仪提示',
    icon: '🎭',
    summary: '保持安静不吵闹，互动环节听指挥',
    details: [
      '入场后请将手机调至静音或震动模式',
      '演出进行中请勿随意走动，如需离场请弯腰并尽量不遮挡他人',
      '拍照禁止使用闪光灯，避免干扰表演者',
      '低龄儿童如哭闹，请家长及时抱至场外安抚',
      '互动环节请听从现场主持人引导，不要擅自上台',
      '散场时请有序离场，不要拥挤，照顾好身边的小朋友',
    ],
  },
];
