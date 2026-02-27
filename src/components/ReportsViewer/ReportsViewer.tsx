import "./ReportsViewer.css";
import type { ReportItem, ReportEndpoint } from "../../types/ReportTypes";
import { formatDate } from "../../utils/date";
import { useReportContext } from "../../context/ReportContext";

const ReportsViewer = () => {
  const { data } = useReportContext();

  const sortedReports = [...data.reports].sort((a, b) => b.total - a.total);

  return (
    <div className="reports-container">
      <h3>Since: {formatDate(data.since)}</h3>
      {sortedReports.map((report: ReportItem) => (
        <div className="report-item" key={report.code}>
          <h4>
            {report.code} — Total: {report.total}
          </h4>

          <ul>
            <li className="report-header">
              <strong>Endpoint</strong>
              <span>Latest</span>
              <span>Total</span>
            </li>
            {[...report.endpoints]
              .sort((a, b) => b.count - a.count)
              .map((e: ReportEndpoint) => (
                <li className="report-text" key={e.endpoint}>
                  <strong>{e.endpoint}</strong>
                  <span>{formatDate(e.latestPeriod)}</span>
                  <span>{e.count}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default ReportsViewer;
