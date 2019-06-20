import { Asset } from './asset';

export class EmployerMatch {
  id: number;
  bottomThreshold: number;
  topThreshold: number;
  matchingPercent: number;
  asset: Asset;
}
