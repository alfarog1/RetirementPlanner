import { UserProfile } from './user-profile';
import { Asset } from './asset';
export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  enabled: boolean;
  userProfile: UserProfile;
  assets: Asset [];
}
