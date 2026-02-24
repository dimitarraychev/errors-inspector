import { useState, useEffect } from "react";

export interface useReportsProps {}

export const useReports = ({}: useReportsProps = {}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReports = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/reports/`);

      if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);

      const data = await res.json();
      setReports(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return {
    loading,
    error,
    reports,
  };
};
