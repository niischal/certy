import React from "react";
import Web3 from "web3";
import { BiRefresh } from "react-icons/bi";

function WalletConnect({ address, setAddress }) {
  const handleConnect = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(acc[0]);
    } else if (window.web3) {
      const web3 = new Web3(window.ethereum.currentProvider);
      await window.ethereum.enable();
      const acc = await web3.eth.getAccounts();
      setAddress(acc[0]);
    } else {
      console.log("No Ethereum Browser");
    }
  };
  return (
    <>
      <div className="d-flex">
        <div className="col-12 text-center">
          {address === "" ? (
            <div>
              Wallet Not Connected &nbsp;
              <BiRefresh className="refresh-icon" onClick={handleConnect} />
            </div>
          ) : (
            <div>
              Wallet Address: <b>{address}</b> &nbsp;
              <BiRefresh className="refresh-icon" onClick={handleConnect} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WalletConnect;
