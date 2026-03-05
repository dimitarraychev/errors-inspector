import "./SideMenu.css";
import logo from "../../assets/logo.svg";
import menuLogo from "../../assets/menu.svg";
import { useReportContext } from "../../context/ReportContext";
import { formatDate, parsePeriodToHours } from "../../utils/date";

interface SideMenuProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

const SideMenu = ({ isCollapsed, onCollapseToggle }: SideMenuProps) => {
  const { data, selectedCodes, setSelectedCodes, timePeriodStart } =
    useReportContext();
  const sinceDate = new Date(
    Date.now() - parsePeriodToHours(timePeriodStart) * 60 * 60 * 1000,
  );

  const codeTotals = data.codes;

  const sortedCodes = Object.entries(codeTotals)
    .map(([code, total]) => ({ code, total }))
    .sort((a, b) => b.total - a.total);

  const toggleCode = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  };

  return (
    <div className={`side-menu ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="logo-text">Errors Inspector</h1>
        <img
          src={menuLogo}
          alt="Menu"
          className="collapse-toggle"
          onClick={onCollapseToggle}
        />
      </div>

      <p className="since-text">
        <span>Since:</span> <span>{formatDate(sinceDate.toISOString())}</span>
      </p>

      {selectedCodes.length > 0 && (
        <p className="clear-selection" onClick={() => setSelectedCodes([])}>
          Clear All ❌
        </p>
      )}

      <ul>
        <li className="report-code-nav-header">
          <span>Code</span>
          <span>Total</span>
        </li>

        {sortedCodes.map((report) => (
          <li
            className={`report-code-nav ${
              selectedCodes.includes(report.code) ? "active" : ""
            }`}
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
