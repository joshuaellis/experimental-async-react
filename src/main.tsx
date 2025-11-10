import { createRoot } from "react-dom/client";
import "@sanity/ui/css/index.css";
import "./global.css";
import App from "./app";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
