import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("Layout.tsx", [
    index("routes/Home.tsx")
  ])
] satisfies RouteConfig;
