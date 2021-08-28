import { IUser } from "../../../models/IUser";

export interface IProfileReducerState {
  user: IUser;
  isSuccessResetPassword: boolean;
  isSendedResetPasswordEmail: boolean;
  isSendedConfirmResetPasswordEmail: boolean;

  userInfoRequestPending: boolean;
  userInfoRequestFailed: boolean;
  userInfoRequestError: string;

  updateUserInfoRequestPending: boolean,
  updateUserInfoRequestFailed: boolean,
  updateUserInfoRequestError: string,

  resetPasswordRequestPending: boolean,
  resetPasswordRequestFailed: boolean,
  resetPasswordRequestError: string,

  confirmResetPasswordRequestPending: boolean,
  confirmResetPasswordRequestFailed: boolean,
  confirmResetPasswordRequestError: string,
}