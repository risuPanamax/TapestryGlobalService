// interfaces-global/userAndOrgInfo.ts

export interface UserAndOrgInfo {
  userId: number;
  emailAddress: string;
  organizationId: number;
  organizationUID: string;
  userStatus: number;
  userType: number;
}

export interface CommonRequest {
  requestId: string;
  request: any;
  body: any;
  query: any;
  userAndOrgInfo: UserAndOrgInfo;

  // ✅ Add DTO-level fields
  Status?: string;
  Visibility?: string;
  ValidFromDate?: Date;
  ValidToDate?: Date;
  CreatedDate?: Date;
  LastUpdatedDate?: Date;
  CreatedBy?: string | null;
  UpdatedBy?: string | null;
  DynamicRequest?: any | null;
  AppTenantId?: string | null;
}

// External API Request Data Interface
export interface ExternalApiRequestData {
  ApiEndPoint: string;
  HTTPRequestType: string;
}