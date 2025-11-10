import {
  useState,
  createContext,
  use,
  useLayoutEffect,
  useEffect,
  startTransition,
  type PropsWithChildren,
} from "react";

// For the History API, we just call history.pushState in the pendingNav callback.
// This means the URL in the address bar only updates after React has updated the DOM.
// This isn't ideal, but it's the best we can do without the Navigation API.
// We also listen to 'popstate' events to handle back/forward navigations.
function HistoryRouter({ children }: PropsWithChildren) {
  const [routerState, setRouterState] = useState({
    pendingNav: () => {},
    url: document.location.pathname,
    search: parseSearchParams(document.location.search),
  });

  function navigate(url: string) {
    startTransition(() => {
      setRouterState(() => {
        return {
          url,
          search: {},
          pendingNav() {
            window.history.pushState({}, "", url);
          },
        };
      });
    });
  }

  function setParams(key: string, value: string) {
    startTransition(() => {
      setRouterState((prev) => {
        const newParams = { ...prev.search };
        if (value !== "") {
          newParams[key] = value;
        } else {
          delete newParams[key];
        }
        return {
          url: prev.url,
          search: newParams,
          pendingNav() {
            const newUrlParams = new URLSearchParams(newParams).toString();
            window.history.pushState(
              {},
              "",
              prev.url + (newUrlParams ? `?${newUrlParams}` : "")
            );
          },
        };
      });
    });
  }

  function refresh() {
    // revalidate();
    startTransition(() => {
      setRouterState((prev) => {
        return {
          ...prev,
        };
      });
    });
  }

  useEffect(() => {
    function handlePopState() {
      // We still popstate in a transition, but React will flush this synchronously.
      // This ensures that browser 'back' navigations are instant, but if the data
      // layer has a cache miss, it will force fallbacks to be shown. This is a good
      // example why just clearing the cache when a component unmounts is a bad idea.
      startTransition(() => {
        setRouterState({
          url: document.location.pathname,
          search: parseSearchParams(document.location.search),
          pendingNav() {
            // Noop. URL has already updated.
          },
        });
      });
    }
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const pendingNav = routerState.pendingNav;

  useLayoutEffect(() => {
    pendingNav();
  }, [pendingNav]);

  return (
    <RouterContext
      value={{
        url: routerState.url,
        search: routerState.search,
        navigate,
        setParams,
        refresh,
      }}
    >
      {children}
    </RouterContext>
  );
}

export const Router = HistoryRouter;

interface RouterContextValue {
  url: string;
  search: Record<string, string>;
  navigate: (url: string) => void;
  setParams: (key: string, value: string) => void;
  refresh: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

// TODO: fix this - not sure why I can't export a hook with this rule.
// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  const ctx = use(RouterContext);

  if (!ctx) {
    throw new Error("useRouter must be used within a Router");
  }

  return ctx;
}

function parseSearchParams(queryString: string): Record<string, string> {
  const params = new URLSearchParams(
    queryString.startsWith("?") ? queryString : `?${queryString}`
  );
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}
