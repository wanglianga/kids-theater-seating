import type { Seat, SeatFilters } from '@/types';

export function isSeatRecommended(seat: Seat, filters: SeatFilters): boolean {
  if (seat.isAisle || seat.status === 'sold' || seat.status === 'locked') return false;

  if (seat.price < filters.priceRange[0] || seat.price > filters.priceRange[1]) return false;

  if (filters.hideObstructionRisk && seat.hasObstructionRisk) return false;

  if (seat.distanceToAisle > filters.maxAisleDistance) return false;

  if (filters.preferFamilyZone && seat.zone !== 'family') {
    if (seat.childHeightMin && filters.childHeight < seat.childHeightMin) return false;
  }

  if (filters.preferQuietZone && seat.zone !== 'quiet') return false;

  if (seat.childHeightMin && filters.childHeight < seat.childHeightMin) return false;

  return true;
}

export function getSeatZoneLabel(zone: Seat['zone']): string {
  switch (zone) {
    case 'vip': return 'VIP 贵宾区';
    case 'family': return '亲子专区';
    case 'quiet': return '安静观景区';
    case 'standard': return '普通观演区';
  }
}

export function getSeatZoneColor(zone: Seat['zone'], status: Seat['status']): string {
  if (status === 'sold') return 'bg-gray-200 text-gray-400 border-gray-200';
  if (status === 'locked') return 'bg-gray-100 text-gray-300 border-gray-100 border-dashed';
  if (status === 'selected') return 'bg-brand-400 text-white border-brand-400 shadow-lg ring-2 ring-brand-200 animate-pulseRing';

  switch (zone) {
    case 'vip': return 'bg-gradient-to-br from-amber-300 to-amber-400 text-white border-amber-300';
    case 'family': return 'bg-brand-100 text-brand-600 border-brand-200';
    case 'quiet': return 'bg-mint-100 text-mint-500 border-mint-200';
    case 'standard': return 'bg-sky2-50 text-sky2-500 border-sky2-100';
  }
}

export function formatPrice(price: number): string {
  return `¥${price}`;
}

export function getConvenienceStars(score: number): string {
  return '★'.repeat(score) + '☆'.repeat(5 - score);
}

export function getRiskLabel(seat: Seat): string | null {
  if (seat.hasObstructionRisk) {
    return `⚠️ 前排遮挡风险 · 建议儿童身高 ≥ ${seat.childHeightMin}cm`;
  }
  if (seat.childHeightMin) {
    return `建议儿童身高 ≥ ${seat.childHeightMin}cm`;
  }
  return null;
}
