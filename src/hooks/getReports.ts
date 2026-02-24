import { useState, useEffect } from "react";
import { reportsExample } from "./reportsExample";
import type { ReportsResponse } from "../types/ReportTypes";

export const useReports = () => {
  const [reports, setReports] = useState({} as ReportsResponse);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  //   const getReports = async () => {
  //     setLoading(true);

  //     try {
  //       const res = await fetch(`/api/reports/`);

  //       if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);

  //       const data = await res.json();
  //       setReports(data);
  //       setError(null);
  //     } catch (err: any) {
  //       setError(err.message || "Unknown error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    // getReports();
    setReports(reportsExample);
  }, []);

  return {
    // loading,
    // error,
    reports,
  };
};
