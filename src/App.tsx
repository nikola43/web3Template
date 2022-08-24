import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CompanyManagerAddress, EACAggregatorProxyAddress } from './blockchain/address';
import Params from './blockchain/chainParams';
import { useWeb3React } from '@web3-react/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { injected } from './ConnectWalletButton';


function App() {
  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();



  const [chain, setChain] = useState();

  useEffect(() => {
    if (account) {
      const res = Params.find((e) => e.chainId == chainId);
      console.log(res)

    }
  }, [account, chain, chainId]);







  return (



    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={connectMetamaks}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>


  );

  async function connectMetamaks() {
    console.log("sdsdsd")
    try {
      await activate(injected, undefined, true);
      localStorage.setItem("connector", "injected")
      localStorage.setItem("isWalletConnected", "true")
    } catch (ex) {
      console.log(ex)
      //toast.error("Please log into your wallet and select the Avalanche-C network");
    }
  }
}



export default App;
