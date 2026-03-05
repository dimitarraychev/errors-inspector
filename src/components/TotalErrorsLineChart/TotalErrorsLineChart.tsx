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

const colors = [
  "#0A84FF",
  "#30D158",
  "#FF9F0A",
  "#FF375F",
  "#BF5AF2",
  "#64D2FF",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
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
          <span style={{ color: "var(--text-secondary)" }}>Time: </span>
          {`${formatDate(label)}`}
        </p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.stroke }}>
            {`${p.dataKey}: ${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TotalErrorsLineChart = () => {
  const { data, selectedCodes, timePeriodStart } = useReportContext();

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    selectedCodes.forEach((code, index) => {
      map[code] = colors[index % colors.length];
    });
    return map;
  }, [selectedCodes]);

  const chartData = data.reports.map((bucket) => {
    const codeCounts: { [key: string]: number } = {};
    selectedCodes.forEach((code, index) => {
      codeCounts[code] = bucket.codes[code] ?? 0;
      if (!colorMap[code]) {
        colorMap[code] = colors[index % colors.length];
      }
    });

    return {
      period: new Date(bucket.period),
      total: bucket.total,
      ...codeCounts,
    };
  });

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
        axisLine={false}
        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
      />
      <YAxis
        tickCount={12}
        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
      />
      <Tooltip content={<CustomTooltip />} />

      <Line
        type="monotone"
        dataKey="total"
        stroke="var(--orange)"
        strokeWidth={2.5}
        dot={false}
        filter="url(#glow)"
      />

      {selectedCodes.map((code) => (
        <Line
          key={code}
          type="monotone"
          dataKey={code}
          stroke={colorMap[code]}
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
