import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./authorization";

export function LoggedInRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/" />;
}
export function LoggedOutRoute() {
  return !getToken() ? <Outlet /> : <Navigate to="/patient" />;
}
