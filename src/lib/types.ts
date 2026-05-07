export type ScamType = 
  | 'phishing' 
  | 'romance' 
  | 'investment' 
  | 'loan' 
  | 'impersonation' 
  | 'tech-support' 
  | 'prize' 
  | 'buy-sell'
  | 'digital-service'
  | 'other';

export type ReportStatus = 'pending' | 'approved' | 'rejected';

export interface ScammerReport {
  id?: string;
  phoneNumber?: string;
  facebookId?: string;
  instagramId?: string;
  otherId?: string;
  scamType: ScamType;
  description: string;
  reportedByEmail?: string;
  status: ReportStatus;
  createdAt: number;
  updatedAt: number;
  rejectionReason?: string;
}

export interface AdminStats {
  totalReports: number;
  pendingReports: number;
  approvedReports: number;
  rejectedReports: number;
}
