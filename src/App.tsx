import "./App.css";
import { ThemeProvider } from "styled-components";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { UserCommunities } from "./pages/UserCommunities";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Confirmation } from "./pages/Confirmation";
import { Triggers } from "./pages/Triggers";
import { RewardShop } from "./pages/RewardShop";
import { ConnectCommunity } from "./pages/ConnectCommunity";
import { ConnectBot } from "./pages/ConnectBot";
import { GlobalStyles } from "./components/GlobalStyle";
import { darkTheme, lightTheme, muiGlobalOverrides } from "./components/Theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserCommunities></UserCommunities>
  },
  {
    path: '/connectbot',
    element: <ConnectBot></ConnectBot>
  },
  {
    path: "/connectcommunity/:id",
    element: <ConnectCommunity></ConnectCommunity>
  },
  {
    path: '/community/:id',
    element: <RewardShop></RewardShop>
  },
  {
    path: '/triggers',
    element: <Triggers></Triggers>
  },
  {
    path: '/confirmation',
    element: <Confirmation></Confirmation>
  }
]);

function App() {
  const { network } = useTonConnect();

// https://habr.com/ru/articles/666278/
  const isDarkMode = window.Telegram.WebApp.colorScheme === 'dark';

  console.log('isDarkMode', isDarkMode);
  console.log(`Network: `, network ? network === CHAIN.MAINNET ? "mainnet" : "testnet": "N/A");

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles/>
        <RouterProvider router={router} />
        {/* <Typography>{ JSON.stringify(window.location.href) }</Typography> */}
      </ThemeProvider>
    </>
  );
}

export default App;
