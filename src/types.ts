import { UserSpec } from 'multinet';

export interface Store {
  state: {
    userInfo: UserSpec
  },
  dispatch: {
    logout: () => unknown;
    fetchUserInfo: () => Promise<void>;
  }
}
