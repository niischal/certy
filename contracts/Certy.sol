pragma solidity ^0.5.0;

contract Certy{
    struct Certificate{
        bytes32 cid;
        string holderName;
        string issuerName;
        uint timestamp;
        string program;
        bool exist;
    }

    mapping(bytes32 => Certificate) public Certificates;

    function storeCertificate(bytes32 _cid, string memory _holderName, string memory _issuerName, string memory _program) public{
        require(Certificates[_cid].exist == false, "The Certificate already exists.");
        Certificates[_cid].cid = _cid;
        Certificates[_cid].holderName = _holderName;
        Certificates[_cid].issuerName = _issuerName;
        Certificates[_cid].program = _program;
        Certificates[_cid].timestamp = block.timestamp;
        Certificates[_cid].exist = true;
    }

    function getCertificate(bytes32 _cid) public returns (Certificate memory){
        require(Certificates[_cid].exist == true);
        return Certificates[_cid];
    }

    function check(bytes32 _cid) public  returns(bool){
        require(Certificates[_cid].exist == true,"The Certificate is invalid");
        return Certificates[_cid].exist;

    }

}