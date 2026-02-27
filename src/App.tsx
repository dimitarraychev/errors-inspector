import "./App.css";
// import Header from "./components/Header/Header";
import ReportsViewer from "./components/ReportsViewer/ReportsViewer";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  return (
    <div className="app">
      {/* <Header /> */}
      <div className="app-body">
        <SideMenu />
        <ReportsViewer />
      </div>
    </div>
  );
}

export default App;
