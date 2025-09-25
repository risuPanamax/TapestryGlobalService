import "express-serve-static-core";
import { UserAndOrgInfo } from "./commonInterfaceAll";

declare module "express-serve-static-core" {
  interface Request {
    requestId: string;
    userAndOrgInfo: UserAndOrgInfo;
  }
}