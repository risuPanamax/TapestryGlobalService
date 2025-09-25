import "express";

export interface UserAndOrgInfo {
  userId: string;
  emailAddress: string;
  organizationId: string;
  organizationUID: string;
  userStatus: string;
  userType: string;
}
