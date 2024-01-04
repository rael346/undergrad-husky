import ReactDOM from "react-dom/client";
import { Root } from "./Root.tsx";
import "./index.css";
import { StrictMode } from "react";
import {
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar.tsx";
import { Plan } from "@/components/Plan.tsx";
import { preparePlanForDnd } from "@/lib/utils.ts";
import { TEST_PLAN } from "@/constants.ts";
import { usePlanStore } from "@/stores/planStore.ts";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="flex flex-row space-x-2">
        <Sidebar />
        <Plan />
      </div>
    );
  },
  loader: async () => {
    const { dndPlan, courseMap, yearCount } =
      await preparePlanForDnd(TEST_PLAN);
    usePlanStore.setState({
      catalogYear: dndPlan.catalogYear,
      major: dndPlan.major,
      concentration: dndPlan.concentration,
      schedule: dndPlan.schedule,
      courseMap: courseMap,
      yearCount,
    });
  },
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
