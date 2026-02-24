import "./ReportsViewer.css";
import { useReports } from "../../hooks/useReports";
import type { ReportItem, ReportOperator } from "../../types/ReportTypes";

const ReportsViewer = () => {
  const { reports } = useReports();

  const sortedReports = [...reports.reports].sort((a, b) => b.total - a.total);

  return (
    <div className="reports-container">
      <h3>Reports since: {new Date(reports.since).toLocaleString()}</h3>
      {sortedReports.map((report: ReportItem) => (
        <div className="report-item" key={report._id}>
          <h4>
            {_idLabel(report._id)} — Total: {report.total}
          </h4>

          <ul>
            {[...report.operators]
              .sort((a, b) => b.count - a.count)
              .map((op: ReportOperator) => (
                <li className="report-text" key={op.operator}>
                  <strong>{op.operator}</strong> - Latest:{" "}
                  {new Date(op.latestPeriod).toLocaleString()} - Total:{" "}
                  {op.count}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

function _idLabel(id: string) {
  return id.includes("/") ? id.split("/").join(" / ") : id;
}

export default ReportsViewer;
