import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Communities } from "./pages/Communities";
import { useEffect, useState } from "react";
import { Community } from "./interfaces/Community";
import axios from "axios";

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

  const [communities, setCommunities] = useState<Community | null>(null);

  const fetchData = async () => {
      // let result = await axios.get('https://tonalty.localhost.direct:3000/community', { headers: { tmaInitData: window.Telegram.WebApp.initData } });
      // setCommunities(result);
      // console.log('result', result);


      const result = await axios.get('https://tonalty.localhost.direct:3000/community/all');

      setCommunities(result.data);
  };

  useEffect(() => {
      fetchData();
  }, []);

  console.log(`Network: `, network ? network === CHAIN.MAINNET ? "mainnet" : "testnet": "N/A")

  return (
    <>
      <Communities communities={communities}></Communities>
    </>
  );
}

export default App;
