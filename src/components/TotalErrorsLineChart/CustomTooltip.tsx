import { useReportContext } from "../../context/ReportContext";
import { formatDate } from "../../utils/date";
import "./CustomTooltip.css";

const CustomTooltip = ({ active, payload, label }: any) => {
  const { selectedCodes, data } = useReportContext();

  if (active && payload && payload.length) {
    const singleCode = selectedCodes.length === 1 ? selectedCodes[0] : null;

    const report = data.reports.find(
      (r: any) => new Date(r.period).getTime() === new Date(label).getTime(),
    );

    const endpoints =
      singleCode && report?.codes[singleCode]?.endpoints
        ? report.codes[singleCode].endpoints
        : null;

    return (
      <div className="custom-tooltip">
        <p>
          <span className="time-label">Time: </span>
          {`${formatDate(label)}`}
        </p>

        {payload.map((p: any) => (
          <p key={p.dataKey} className="payload-value">
            <span
              className="data-key"
              style={p.dataKey !== "total" ? { color: p.stroke } : {}}
            >
              {p.dataKey[0].toUpperCase() + p.dataKey.slice(1)}:{" "}
            </span>
            {`${p.value}`}
          </p>
        ))}
        {endpoints ? (
          <div className="endpoints-wrapper">
            <p className="endpoints-title">Endpoints:</p>
            <div className="endpoints-list">
              {Object.entries(endpoints)
                .sort(([, a], [, b]) => b - a)
                .map(([ep, count]) => (
                  <p key={ep}>
                    <span className="endpoint-name">{ep}:</span>
                    <span className="endpoint-count">{count}</span>
                  </p>
                ))}
            </div>
          </div>
        ) : (
          report?.codes &&
          selectedCodes.length === 0 && (
            <div className="endpoints-wrapper">
              <p className="endpoints-title">Codes:</p>

              <div className="endpoints-list">
                {Object.entries(report.codes)
                  .sort(([, a]: any, [, b]: any) => b.total - a.total)
                  .map(([code, details]: any) => (
                    <p key={code}>
                      <span className="endpoint-name">{code}:</span>
                      <span className="endpoint-count">{details.total}</span>
                    </p>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
