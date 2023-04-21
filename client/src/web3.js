import Web3 from "web3";
import Certy from "../src/truffle_abis/Certy.json";

let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const getContractInfo = async () => {
  let contractInfo = { contract: null, loading: true };
  contractInfo.loading = true;
  const networkId = await web3.eth.net.getId();
  const contractDetails = await Certy.networks[networkId];
  if (contractDetails) {
    contractInfo.loading = false;
    contractInfo.contract = new web3.eth.Contract(
      Certy.abi,
      contractDetails.address
    );
    return contractInfo;
  }
};

export default getContractInfo;
