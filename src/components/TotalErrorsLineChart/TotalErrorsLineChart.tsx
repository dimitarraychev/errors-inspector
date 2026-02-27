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

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#FF8C33",
  "#33FFF5",
  "#A633FF",
];
const getColor = (index: number) => colors[index % colors.length];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "var(--dark)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <p>
          <span style={{ color: "var(--light-gray)" }}>Time: </span>
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
  const { data, selectedCodes } = useReportContext();

  const chartData = data.reports.map((bucket) => {
    const codeCounts: { [key: string]: number } = {};
    selectedCodes.forEach((code) => {
      codeCounts[code] = bucket.codes[code] ?? 0;
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
      height={"100%"}
      data={chartData}
      margin={{ bottom: 30, right: 30, top: 30 }}
    >
      <CartesianGrid
        stroke="var(--border)"
        strokeDasharray="5 5"
        vertical={true}
        horizontal={true}
      />
      <XAxis
        dataKey="period"
        tickFormatter={(time) => shortFormatDate(time)}
        interval={1}
        angle={-90}
        textAnchor="end"
        dy={25}
      />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />

      <Line
        type="monotone"
        dataKey="total"
        stroke="var(--red)"
        strokeWidth={3}
      />

      {selectedCodes.map((code, index) => (
        <Line
          key={code}
          type="monotone"
          dataKey={code}
          stroke={getColor(index)}
          strokeWidth={3}
        />
      ))}
    </LineChart>
  );
};

export default TotalErrorsLineChart;
