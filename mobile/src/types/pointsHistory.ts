export type PointsMovementType = 'earned' | 'redeemed';

export interface PointsHistoryEntry {
  id: string;
  type: PointsMovementType;
  points: number;
  description: string;
  date: string;
}
