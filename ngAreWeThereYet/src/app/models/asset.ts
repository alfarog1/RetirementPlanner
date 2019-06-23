import { RiskProfile } from './risk-profile';
import { EmployerMatch } from './employer-match';
import { User } from './user';
import { Vehicle } from './vehicle';

export class Asset {
  id: number;
  amount: number;
  contributionFixed: number;
  contributionPercent: number;
  user: User;
  vehicle: Vehicle;
  employerMatch: EmployerMatch [];
  riskProfile: RiskProfile;
  doesEmployerMatch: boolean;
  periodicDeposit: number;
}
