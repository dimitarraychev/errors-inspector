export interface ReportEndpoint {
  endpoint: string;
  count: number;
  latestPeriod: string;
}

export interface ReportItem {
  code: string;
  total: number;
  endpoints: ReportEndpoint[];
}

export interface ReportsResponse {
  since: string;
  reports: ReportItem[];
}
