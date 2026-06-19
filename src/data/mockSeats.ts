import type { Seat, ShowInfo, SeatFilters } from '@/types';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 14;

function getZoneForSeat(row: string, num: number): Seat['zone'] {
  const rowIdx = row.charCodeAt(0) - 65;
  if (rowIdx <= 1 && num >= 5 && num <= 10) return 'vip';
  if (rowIdx >= 2 && rowIdx <= 4 && num >= 4 && num <= 11) return 'family';
  if ((rowIdx >= 5 && num >= 12) || (rowIdx >= 6 && num <= 3)) return 'quiet';
  return 'standard';
}

export function generateSeats(): Seat[] {
  const seats: Seat[] = [];
  for (const row of ROWS) {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      if (num === 7 || num === 8) {
        seats.push({
          id: `aisle-${row}-${num}`,
          row,
          number: num,
          zone: 'standard',
          status: 'available',
          price: 0,
          distanceToStage: 0,
          distanceToAisle: 0,
          hasObstructionRisk: false,
          stepsToExit: 0,
          convenienceScore: 3,
          isAisle: true,
        });
        continue;
      }

      const rowIdx = row.charCodeAt(0) - 65;
      const zone = getZoneForSeat(row, num);
      const basePrice = zone === 'vip' ? 380 : zone === 'family' ? 280 : zone === 'quiet' ? 220 : 180;
      const distToStage = (rowIdx + 1) * 2.5;
      const leftAisleDist = Math.min(num - 1, num < 7 ? num - 1 : num - 8);
      const rightAisleDist = Math.min(SEATS_PER_ROW - num, num < 7 ? 7 - num : SEATS_PER_ROW - num);
      const distToAisle = Math.min(leftAisleDist, rightAisleDist);
      const hasRisk = rowIdx >= 4 && num >= 4 && num <= 11 && Math.random() < 0.15;
      const childHeightMin = hasRisk ? 120 : zone === 'standard' && rowIdx >= 5 ? 110 : undefined;
      const stepsToExit = rowIdx + Math.min(num, SEATS_PER_ROW - num + 1);
      const convenience = (5 - Math.min(4, Math.floor(distToAisle / 2))) as 1 | 2 | 3 | 4 | 5;

      const isSold = Math.random() < 0.35;
      const isLocked = !isSold && Math.random() < 0.08;

      seats.push({
        id: `${row}-${num}`,
        row,
        number: num,
        zone,
        status: isSold ? 'sold' : isLocked ? 'locked' : 'available',
        price: basePrice,
        distanceToStage: Math.round(distToStage * 10) / 10,
        distanceToAisle: distToAisle,
        hasObstructionRisk: hasRisk,
        childHeightMin,
        stepsToExit,
        convenienceScore: convenience,
      });
    }
  }
  return seats;
}

export const defaultFilters: SeatFilters = {
  childHeight: 110,
  preferFamilyZone: false,
  maxAisleDistance: 4,
  preferQuietZone: false,
  hideObstructionRisk: false,
  priceRange: [100, 500],
};

export const currentShow: ShowInfo = {
  id: 'show-001',
  title: '彩虹森林奇遇记',
  subtitle: '大型亲子互动音乐剧',
  coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20musical%20theater%20stage%20with%20rainbow%20forest%20theme%20whimsical%20friendly%20characters%20soft%20pastel%20colors&image_size=landscape_16_9',
  date: '2026年6月21日（周日）',
  time: '下午 14:30 - 16:15',
  venue: '星光剧场 · 主厅',
  duration: '约 105 分钟（含15分钟中场休息）',
  ageLimit: '建议 3-10 岁儿童观看',
};

export const SEAT_ROWS = ROWS;
export const SEATS_PER_ROW_COUNT = SEATS_PER_ROW;
