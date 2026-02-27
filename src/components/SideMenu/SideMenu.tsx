import "./SideMenu.css";
import logo from "../../assets/logo.svg";
import { useReportContext } from "../../context/ReportContext";
import { formatDate } from "../../utils/date";

const SideMenu = () => {
  const { data, selectedCodes, setSelectedCodes } = useReportContext();

  const codeTotals: { [code: string]: number } = {};

  data.reports.forEach((bucket) => {
    Object.entries(bucket.codes).forEach(([code, count]) => {
      codeTotals[code] = (codeTotals[code] || 0) + count;
    });
  });

  const sortedCodes = Object.entries(codeTotals)
    .map(([code, total]) => ({ code, total }))
    .sort((a, b) => b.total - a.total);

  const toggleCode = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  };

  return (
    <div className="side-menu">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="logo-text">Errors Inspector</h1>
      </div>

      <p className="since-text">Since {formatDate(data.since)}</p>

      <ul>
        <li className="report-code-nav-header">
          <span>Code</span>
          <span>Total</span>
        </li>

        {sortedCodes.map((report) => (
          <li
            className={
              selectedCodes.includes(report.code)
                ? `report-code-nav active`
                : `report-code-nav`
            }
            key={report.code}
            onClick={() => toggleCode(report.code)}
          >
            <span>{report.code}</span>
            <span>{report.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
