import { useRouter } from "../core/router";
import { Login } from "./login/route";
import { NotFound } from "./NotFound";

const Routes = () => {
  const { pathname } = useRouter();

  if (pathname === "/login") {
    return <Login />;
  }

  return <NotFound />;
};

export { Routes };
