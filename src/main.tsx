import { createRoot } from "react-dom/client";
import "@sanity/ui/css/index.css";
import "./global.css";

import { Router } from "@/core/router";
import { Routes } from "@/routes";
import { Root } from "@sanity/ui";

export default function App() {
  return (
    <Root
      height="fill"
      as="body"
      overflow="hidden"
      tone="transparent"
      scheme="dark"
      data-color-scheme="dark"
    >
      <Router>
        <Routes />
      </Router>
    </Root>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
