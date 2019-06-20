import { Asset } from './asset';
import { RiskProfile } from './risk-profile';

export class Vehicle {
  id: number;
  assetName: string;
  isQualified: boolean;
  isFixed: boolean;
  maxContribution: number;
  isPretax: boolean;
  hasEmployerMatch: boolean;
  assets: Asset;
  riskProfiles: RiskProfile;
}
