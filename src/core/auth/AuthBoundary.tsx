import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useRouter } from "../router";

interface AuthBoundaryProps extends PropsWithChildren {}

interface User {
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string, delay?: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthBoundary = (props: AuthBoundaryProps) => {
  const { navigate, pathname } = useRouter();
  const [state, setState] = useState<AuthState>(() => ({
    isLoggedIn: false,
    user: null,
  }));

  const login = useCallback(
    async (email: string, _password: string, delay: number = 1500) => {
      await new Promise((resolve) => setTimeout(resolve, delay));

      setState((prev) => ({
        ...prev,
        isLoggedIn: true,
        user: {
          email,
        },
      }));
    },
    []
  );

  useEffect(() => {
    if (!state.isLoggedIn && pathname !== "/login") {
      navigate("/login");
    }
  }, [state.isLoggedIn, navigate, pathname]);

  const ctx = useMemo(
    () => ({
      ...state,
      login,
    }),
    [state, login]
  );

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = use(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within a AuthBoundary");
  }
  return ctx;
};

export { AuthBoundary, useAuth };
