import { useReports } from "../../hooks/useReports";
import type { ReportItem, ReportOperator } from "../../types/ReportTypes";

const ReportsViewer = () => {
  const { reports } = useReports();

  const sortedReports = [...reports.reports].sort((a, b) => b.total - a.total);

  return (
    <div
      className="reports-container"
      style={{ padding: "1rem", fontFamily: "sans-serif" }}
    >
      <h2>Reports since: {new Date(reports.since).toLocaleString()}</h2>
      {sortedReports.map((report: ReportItem) => (
        <div
          key={report._id}
          style={{
            margin: "1rem 0",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <h3>
            {_idLabel(report._id)} — Total: {report.total}
          </h3>
          <ul>
            {report.operators.map((op: ReportOperator) => (
              <li key={op.operator} style={{ margin: "0.25rem 0" }}>
                <strong>{op.operator}</strong> — Count: {op.count} — Latest:{" "}
                {new Date(op.latestPeriod).toLocaleString()}
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
