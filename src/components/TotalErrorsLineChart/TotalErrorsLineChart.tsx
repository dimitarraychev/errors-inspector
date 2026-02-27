import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useReportContext } from "../../context/ReportContext";
import { formatDate } from "../../utils/date";

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
        <p>{`Time: ${formatDate(label)}`}</p>
        <p>{`Total: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const TotalErrorsLineChart = () => {
  const { data } = useReportContext();

  const chartData = data.reports.map((bucket) => ({
    period: new Date(bucket.period),
    total: bucket.total,
  }));

  return (
    <LineChart width={"100%"} height={"100%"} data={chartData}>
      <XAxis
        dataKey="period"
        tickFormatter={(time) => {
          const d = new Date(time);
          return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
        }}
      />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="total" stroke="#8884d8" />
    </LineChart>
  );
};

export default TotalErrorsLineChart;
