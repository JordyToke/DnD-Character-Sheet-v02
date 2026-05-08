import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("Layout.tsx", [
    index("routes/Home.tsx"),
    route("/character/:charId", "routes/CharacterSheet.tsx"),
    route("/test/:testId", "routes/Test.tsx"),
  ]),
] satisfies RouteConfig;
