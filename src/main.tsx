import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ConnectCommunity, Jetons } from "./pages/ConnectCommunity";
import { Communities } from "./pages/Communities";
import { PointShop } from "./pages/PointShop";
// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/connectcommunity",
    element: <ConnectCommunity></ConnectCommunity>
  },
  {
    path: 'community/:id',
    element: <PointShop></PointShop>
  }
]);

console.log('window.Telegram.WebApp', window.Telegram.WebApp)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </TonConnectUIProvider>
);
