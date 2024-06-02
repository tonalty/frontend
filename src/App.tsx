import "./App.css";
import styled from "styled-components";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { UserCommunities } from "./pages/UserCommunities";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCommunity } from "./interfaces/UserCommunity";
import { Community } from "./interfaces/Community";
import { Typography } from "@mui/material";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

  const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);

  const [adminCommunities, setAdminCommunities] = useState<Community[]>([]);

  const fetchData = async () => {
      const userResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/user`, { headers: { tmaInitData: (window as any).Telegram.WebApp.initData } });
      setUserCommunities(userResult.data);

      const adminResult = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/communities/admin`, { headers: { tmaInitData: (window as any).Telegram.WebApp.initData } });
      setAdminCommunities(adminResult.data);
  };

  useEffect(() => {
      fetchData();
  }, []);

  console.log(`Network: `, network ? network === CHAIN.MAINNET ? "mainnet" : "testnet": "N/A");

  return (
    <>
      {/* <Typography>{ JSON.stringify(window.location.href) }</Typography> */}
      <UserCommunities adminCommunities={adminCommunities} userCommunities={userCommunities}></UserCommunities>
    </>
  );
}

export default App;
