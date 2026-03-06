import { useState } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu/SideMenu";
import TotalErrorsLineChart from "./components/TotalErrorsLineChart/TotalErrorsLineChart";
import TabsMenu from "./components/TabMenu/TabsMenu";
import { useTabs } from "./hooks/useTabs";
import { useReportContext } from "./context/ReportContext";
import Loader from "./components/Loader/Loader";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const tabs = ["1h", "2h", "3h", "6h", "12h", "1d", "7d", "14d", "1m"];
  const { selectedTab, changeSelectedTab } = useTabs();
  const { setTimePeriodStart, loading } = useReportContext();

  return (
    <div className="app">
      <div className="app-body">
        <SideMenu
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        {loading && (
          <div className="loader-overlay">
            <Loader size={20} />
          </div>
        )}
        <div
          className={
            isSidebarCollapsed ? "chart-wrapper expanded" : "chart-wrapper"
          }
        >
          <TabsMenu
            tabs={tabs}
            selectedTab={selectedTab}
            onChange={(tab) => {
              changeSelectedTab(tab);
              setTimePeriodStart(tab);
            }}
          />
          <TotalErrorsLineChart />
        </div>
      </div>
    </div>
  );
}

export default App;
