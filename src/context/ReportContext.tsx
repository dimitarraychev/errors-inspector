import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { ErrorReportResponse } from "../types/ReportTypes";
import { getDefaultRange, parsePeriodToHours } from "../utils/date";
// import { reportsExample } from "./reportsExample";

interface ReportContextType {
  data: ErrorReportResponse;
  loading: boolean;
  error: string | null;
  selectedCodes: string[];
  setSelectedCodes: React.Dispatch<React.SetStateAction<string[]>>;
  timePeriodStart: string;
  setTimePeriodStart: React.Dispatch<React.SetStateAction<string>>;
  timePeriodEnd: string;
  setTimePeriodEnd: React.Dispatch<React.SetStateAction<string>>;
}

interface ReportContextProviderProps {
  children: ReactNode;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const ReportContextProvider = ({ children }: ReportContextProviderProps) => {
  const [data, setData] = useState<ErrorReportResponse>({
    start: "",
    end: "",
    total: 0,
    codes: {},
    reports: [],
  });
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultRange = getDefaultRange("6h");

  const [timePeriodStart, setTimePeriodStart] = useState(defaultRange.start);
  const [timePeriodEnd, setTimePeriodEnd] = useState(defaultRange.end);

  const getReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (timePeriodStart) params.append("start", timePeriodStart);
      if (timePeriodEnd) params.append("end", timePeriodEnd);

      if (!timePeriodEnd && timePeriodStart.includes("h")) {
        const hours = parsePeriodToHours(timePeriodStart);
        const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);
        params.set("start", startDate.toISOString());
      }

      const res = await fetch(`/api/report?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch reports: ${res.status}`);
      }

      const data = await res.json();
      setData(data);
    } catch (error: any) {
      setError(error.message || "Failed to load report");
      setData({
        start: "",
        end: "",
        total: 0,
        codes: {},
        reports: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // return setData(reportsExample as unknown as ErrorReportResponse);
    getReport();

    const interval = setInterval(getReport, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [timePeriodStart, timePeriodEnd]);

  const contextValue = {
    data,
    loading,
    error,
    selectedCodes,
    setSelectedCodes,
    timePeriodStart,
    setTimePeriodStart,
    timePeriodEnd,
    setTimePeriodEnd,
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
