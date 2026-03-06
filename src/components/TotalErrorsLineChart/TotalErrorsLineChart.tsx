import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useReportContext } from "../../context/ReportContext";
import { formatDate, shortFormatDate } from "../../utils/date";
import { useMemo } from "react";
import { getCodeColor } from "../../utils/codeColors";

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
      <div
        style={{
          background: "rgba(20,20,20,0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "1rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        <p>
          <span style={{ color: "var(--text-secondary)" }}>time: </span>
          {`${formatDate(label)}`}
        </p>

        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.stroke }}>
            {`${p.dataKey}: ${p.value}`}
          </p>
        ))}

        {endpoints && (
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>endpoints:</p>
            {Object.entries(endpoints)
              .sort(([, a], [, b]) => b - a)
              .map(([ep, count]) => (
                <p key={ep} style={{ marginLeft: "0.5rem", color: "white" }}>
                  {ep}: {count}
                </p>
              ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};
const TotalErrorsLineChart = () => {
  const { data, selectedCodes, timePeriodStart, showAll } = useReportContext();

  const codeColors = useMemo(() => {
    const map: Record<string, string> = {};
    selectedCodes.forEach((code) => {
      map[code] = getCodeColor(code);
    });
    return map;
  }, [selectedCodes]);

  const chartData = useMemo(() => {
    return data.reports.map((bucket) => {
      const codeCounts: Record<string, number> = {};

      selectedCodes.forEach((code) => {
        codeCounts[code] = bucket.codes[code]?.total ?? 0;
      });

      return {
        period: new Date(bucket.period),
        total: bucket.total,
        ...codeCounts,
      };
    });
  }, [data.reports, selectedCodes]);

  return (
    <LineChart
      width={"100%"}
      height={"97%"}
      data={chartData}
      margin={{ bottom: 30, right: 30, top: 30 }}
      responsive={true}
    >
      <CartesianGrid
        stroke="rgba(255,255,255,0.2)"
        vertical={false}
        strokeDasharray="5 5"
        horizontal={true}
      />
      <XAxis
        dataKey="period"
        interval="preserveStartEnd"
        angle={-90}
        textAnchor="end"
        dy={25}
        tickFormatter={(time) => shortFormatDate(time, timePeriodStart)}
        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
      />
      <YAxis
        tickCount={12}
        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
      />
      <Tooltip content={<CustomTooltip />} />

      {showAll && (
        <Line
          type="monotone"
          dataKey="total"
          stroke="var(--orange)"
          strokeWidth={2.5}
          dot={false}
          filter="url(#glow)"
        />
      )}

      {selectedCodes.map((code) => (
        <Line
          key={code}
          type="monotone"
          dataKey={code}
          stroke={codeColors[code]}
          strokeWidth={2.5}
          dot={false}
          filter="url(#glow)"
        />
      ))}

      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </LineChart>
  );
};

export default TotalErrorsLineChart;
