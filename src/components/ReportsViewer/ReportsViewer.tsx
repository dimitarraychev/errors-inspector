import "./ReportsViewer.css";
import type { ReportItem, ReportEndpoint } from "../../types/ReportTypes";
import { formatDate } from "../../utils/date";
import { useReportContext } from "../../context/ReportContext";

const ReportsViewer = () => {
  const { data } = useReportContext();

  const sortedReports = [...data.reports].sort((a, b) => b.total - a.total);

  return (
    <div className="reports-container">
      <h3>Reports since: {formatDate(data.since)}</h3>
      {sortedReports.map((report: ReportItem) => (
        <div className="report-item" key={report.code}>
          <h4>
            {report.code} — Total: {report.total}
          </h4>

          <ul>
            {[...report.endpoints]
              .sort((a, b) => b.count - a.count)
              .map((op: ReportEndpoint) => (
                <li className="report-text" key={op.endpoint}>
                  <strong>{op.endpoint}</strong> - Latest:{" "}
                  {formatDate(op.latestPeriod)} - Total: {op.count}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// function _idLabel(id: string) {
//   return id.includes("/") ? id.split("/").join(" / ") : id;
// }

export default ReportsViewer;
