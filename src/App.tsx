import "./App.css";
import styled from "styled-components";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { UserCommunities } from "./pages/UserCommunities";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCommunity } from "./interfaces/UserCommunity";

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

  const [communities, setCommunities] = useState<UserCommunity[]>([]);

  const fetchData = async () => {
      let result = await axios.get('https://tonalty.localhost.direct:3000/communities/user', { headers: { tmaInitData: window.Telegram.WebApp.initData } });
      setCommunities(result.data);
  };

  useEffect(() => {
      fetchData();
  }, []);

  console.log(`Network: `, network ? network === CHAIN.MAINNET ? "mainnet" : "testnet": "N/A")

  return (
    <>
      {/* { JSON.stringify(communities)} */}
      <UserCommunities communities={communities}></UserCommunities>
    </>
  );
}

export default App;
