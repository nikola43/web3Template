import { InjectedConnector } from '@web3-react/injected-connector'

declare var window: any

export const injected = new InjectedConnector({
  supportedChainIds: [97, 56, 137, 80001, 128, 256, 43114, 43113, 250, 4002, 10, 79377087078960, 1666600000],
})

const switchRequest = (param: any) => {
  if (window.ethereum)
    return window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: param.chainIdHex }],
    });
};

const addChainRequest = (param: any) => {
  if (window.ethereum)
    // Switch to Testnet
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: param.chainId,
          chainName: param.chainName,
          rpcUrls: param.rpcUrls,
          blockExplorerUrls: param.blockExplorerUrls,
          nativeCurrency: param.nativeCurrency,
        },
      ],
    });
};

export const swithNetwork = async (param: any) => {
  // console.log("chainId", chainId);
  if (window.ethereum) {
    try {
      await switchRequest(param);
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await addChainRequest(param);
          await switchRequest(param);
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
