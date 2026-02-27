import { useState, useEffect } from "react";
import { reportsExample } from "./reportsExample";
import type { ReportsResponse } from "../types/ReportTypes";

export const useReports = () => {
  const [data, setData] = useState<ReportsResponse>({
    since: "",
    reports: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReports = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/report/`);

      if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);

      const data = await res.json();
      setData(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getReports();
    setData(reportsExample);
  }, []);

  return {
    loading,
    error,
    data,
  };
};
