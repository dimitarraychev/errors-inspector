import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useReportContext } from "../../context/ReportContext";
import { shortFormatDate } from "../../utils/date";
import { useMemo } from "react";
import { getCodeColor } from "../../utils/codeColors";
import CustomTooltip from "./CustomTooltip";
import { useHoverClickTooltip } from "../../hooks/useHoverClickTooltip";

const TotalErrorsLineChart = () => {
  const { data, selectedCodes } = useReportContext();
  const { tooltipTrigger, handleChartClick } = useHoverClickTooltip();

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
      height={"95%"}
      data={chartData}
      margin={{ bottom: 80, right: 30, top: 30 }}
      responsive={true}
      onClick={handleChartClick}
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
        dy={46}
        dx={-5}
        tickFormatter={(time) => shortFormatDate(time)}
        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
      />
      <YAxis
        tickCount={12}
        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
      />
      <Tooltip content={<CustomTooltip />} trigger={tooltipTrigger} />

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
