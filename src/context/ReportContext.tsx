import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { ErrorReportResponse } from "../types/ReportTypes";
// import { reportsExample } from "./reportsExample";
import { parsePeriodToHours } from "../utils/date";

interface ReportContextType {
  data: ErrorReportResponse;
  loading: boolean;
  error: string | null;
  selectedCodes: string[];
  setSelectedCodes: React.Dispatch<React.SetStateAction<string[]>>;
  setTimePeriodStart: React.Dispatch<React.SetStateAction<string>>;
}

interface ReportContextProviderProps {
  children: ReactNode;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const ReportContextProvider = ({ children }: ReportContextProviderProps) => {
  const [data, setData] = useState<ErrorReportResponse>({
    since: "",
    reports: [],
  });
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timePeriodStart, setTimePeriodStart] = useState("6h");

  const getReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const hours = parsePeriodToHours(timePeriodStart);

      const res = await fetch(`/api/report?hours=${hours}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch reports: ${res.status}`);
      }

      const data = await res.json();
      setData(data);
    } catch (error: any) {
      setError(error.message || "Failed to load report");
      setData({
        since: "",
        reports: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport();
    // setData(reportsExample as unknown as ErrorReportResponse);
  }, [timePeriodStart]);

  const contextValue = {
    data,
    loading,
    error,
    selectedCodes,
    setSelectedCodes,
    setTimePeriodStart,
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
