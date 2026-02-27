export interface ErrorBucket {
  period: string;
  total: number;
  codes: { [key: string]: number };
}

export interface ErrorReportResponse {
  since: string;
  reports: ErrorBucket[];
}
