import { Router } from "@/core/router";
import { Routes } from "@/routes";
import { Root } from "@sanity/ui";
import { QueryClientProvider } from "./core/query";
import { AuthBoundary } from "./core/auth/AuthBoundary";

export default function App() {
  return (
    <Root
      height="fill"
      as="div"
      overflow="hidden"
      tone="transparent"
      scheme="dark"
      data-color-scheme="dark"
    >
      <Router>
        <QueryClientProvider>
          <AuthBoundary>
            <Routes />
          </AuthBoundary>
        </QueryClientProvider>
      </Router>
    </Root>
  );
}
