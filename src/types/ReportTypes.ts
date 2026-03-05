
export interface EndpointCounts {
  [endpoint: string]: number;
}

export interface CodeDetail {
  total: number;
  endpoints: EndpointCounts;
}

export interface ReportBucket {
  period: string;              
  total: number;              
  codes: { [code: string]: CodeDetail };
}

export interface ErrorReportResponse {
  since: string;            
  total: number;            
  codes: { [code: string]: number }; 
  reports: ReportBucket[];
}
