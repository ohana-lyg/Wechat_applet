import { LoginInfo } from "../types/types";
import { post } from "./index.ts";

export const login = (loginInfo: LoginInfo): Promise<any> =>
  post("/admin/check", loginInfo);
