import "./SideMenu.css";
import logo from "../../assets/logo.svg";
import { useReportContext } from "../../context/ReportContext";

const SideMenu = () => {
  const { data, setCodeToInspect } = useReportContext();

  return (
    <div className="side-menu">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="logo-text">Errors Inspector</h1>
      </div>

      <ul>
        <li className="report-code-nav-header">
          <span>Code</span>
          <span>Total</span>
        </li>
        {data.reports
          .sort((a, b) => b.total - a.total)
          .map((report) => (
            <li
              className="report-code-nav"
              key={report.code}
              onClick={() => setCodeToInspect(report.code)}
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
