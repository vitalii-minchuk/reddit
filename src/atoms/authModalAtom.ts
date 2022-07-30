import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view: "signIn" | "signUp" | "resetPassword";
}

export const defaultModalState: AuthModalState = {
  open: false,
  view: "signIn",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});