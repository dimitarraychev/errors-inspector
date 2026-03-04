import { useState } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu/SideMenu";
import TotalErrorsLineChart from "./components/TotalErrorsLineChart/TotalErrorsLineChart";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="app">
      <div className="app-body">
        <SideMenu
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <TotalErrorsLineChart isSidebarCollapsed={isSidebarCollapsed} />
      </div>
    </div>
  );
}

export default App;
