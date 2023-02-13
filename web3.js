const Web3 = require("web3");
const Certy = require("./truffle_abis/Certy");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

let contractInfo = { contract: null, loading: true };

const getContractInfo = async () => {
  contractInfo.loading = true;
  const networkId = await web3.eth.net.getId();
  contractDetails = await Certy.networks[networkId];
  if (contractDetails) {
    contractInfo.loading = false;
    contractInfo.contract = new web3.eth.Contract(
      Certy.abi,
      contractDetails.address
    );
  }
};
getContractInfo();
module.exports = contractInfo;
// const contract = new web3.eth.Contract(Certy.abi, contractDetails.address);
// if (!contractInfo.loading) {
//   console.log("contractDetail", contractDetails);
//   module.exports = contract;
// }
