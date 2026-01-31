import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("Layout.tsx", [
    index("routes/Home.tsx"),
    route("character", "routes/Character.tsx")
  ]),
] satisfies RouteConfig;
