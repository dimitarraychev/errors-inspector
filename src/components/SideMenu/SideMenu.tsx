import "./SideMenu.css";
import logo from "../../assets/logo.svg";
import menuLogo from "../../assets/menu.svg";
import { useReportContext } from "../../context/ReportContext";
import { getCodeColor } from "../../utils/codeColors";
// import { formatDate } from "../../utils/date";

interface SideMenuProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

const SideMenu = ({ isCollapsed, onCollapseToggle }: SideMenuProps) => {
  const {
    data,
    selectedCodes,
    setSelectedCodes,
    // timePeriodStart,
    // timePeriodEnd,
  } = useReportContext();

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

      <ul>
        <li className="report-code-nav-header">
          <span>Code</span>
          <span>Total</span>
        </li>

        <li
          className="report-code-nav active"
          onClick={() => setSelectedCodes([])}
        >
          <span
            className="code-color"
            style={{
              backgroundColor: "var(--orange)",
            }}
          />

          <span>All</span>
          <span>{data.total}</span>
        </li>

        {sortedCodes.map((report) => (
          <li
            className={`report-code-nav ${
              selectedCodes.includes(report.code) ? "active" : ""
            }`}
            key={report.code}
            onClick={() => toggleCode(report.code)}
          >
            {selectedCodes.includes(report.code) && (
              <span
                className="code-color"
                style={{
                  backgroundColor: getCodeColor(report.code),
                }}
              />
            )}
            <span>{report.code}</span>

            <span>{report.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
