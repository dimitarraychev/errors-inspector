import "./App.css";
import SideMenu from "./components/SideMenu/SideMenu";
import TotalErrorsLineChart from "./components/TotalErrorsLineChart/TotalErrorsLineChart";

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <SideMenu />
        <TotalErrorsLineChart />
      </div>
    </div>
  );
}

export default App;
