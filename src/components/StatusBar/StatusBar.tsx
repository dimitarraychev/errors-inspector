import { useMemo } from "react";
import { useReportContext } from "../../context/ReportContext";
import "./StatusBar.css";

const StatusBar = () => {
  const { data } = useReportContext();

  const stats = useMemo(() => {
    if (!data?.reports?.length) {
      return { min: 0, avg: 0, max: 0 };
    }

    const totals = data.reports.map((r) => r.total);

    const min = Math.min(...totals);
    const max = Math.max(...totals);
    const avg = Math.round(
      totals.reduce((sum, val) => sum + val, 0) / totals.length,
    );

    return { min, avg, max };
  }, [data.reports]);

  return (
    <div className="status-bar">
      <p className="status-wrapper">
        <span className="status-name">MIN:</span>
        <span className="status-value">{stats.min}</span>
      </p>
      <p className="status-wrapper">
        <span className="status-name">AVG:</span>
        <span className="status-value">{stats.avg}</span>
      </p>
      <p className="status-wrapper">
        <span className="status-name">MAX:</span>
        <span className="status-value">{stats.max}</span>
      </p>
    </div>
  );
};

export default StatusBar;
