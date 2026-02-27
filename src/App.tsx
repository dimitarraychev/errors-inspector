import "./App.css";
import ReportsViewer from "./components/ReportsViewer/ReportsViewer";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <SideMenu />
        <ReportsViewer />
      </div>
    </div>
  );
}

export default App;
