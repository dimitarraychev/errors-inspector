import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { ReportsResponse } from "../types/ReportTypes";
import { reportsExample } from "./reportsExample";

interface ReportContextType {
  data: ReportsResponse;
  loading: boolean;
  error: string | null;
}

interface ReportContextProviderProps {
  children: ReactNode;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const ReportContextProvider = ({ children }: ReportContextProviderProps) => {
  const [data, setData] = useState<ReportsResponse>({
    since: "",
    reports: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   const getReport = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const res = await fetch(`/api/report/`);

  //       if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);

  //       const data = await res.json();
  //       setData(data);
  //       setError(null);
  //     } catch (error: any) {
  //       setError(error.message || "Failed to load report");
  //       setData({
  //         since: "",
  //         reports: [],
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    // getReport();
    setData(reportsExample);
  }, []);

  const contextValue = {
    data,
    loading,
    error,
  };

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContextProvider;

export const useReportContext = () => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error(
      "ReportContext must be used within a ReportContextProvider",
    );
  }

  return context;
};
