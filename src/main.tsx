import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReportContextProvider from "./context/ReportContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ReportContextProvider>
    <App />
  </ReportContextProvider>,
);
