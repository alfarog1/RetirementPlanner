import { User } from './user';

export class UserProfile {
  id: number;
  retirementAge: number;
  retirementExpectancy: number;
  percentIncome: number;
  fName: string;
  lName: string;
  dob: Date;
  income: number;
  payPeriod: string;
  user: User;
}
