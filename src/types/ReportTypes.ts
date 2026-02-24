export interface ReportOperator {
  operator: string;
  count: number;
  latestPeriod: string;
}

export interface ReportItem {
  _id: string;
  total: number;
  operators: ReportOperator[];
}

export interface ReportsResponse {
  since: string;
  reports: ReportItem[];
}
