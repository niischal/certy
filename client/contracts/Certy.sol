// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Certy {
    constructor() {
        admins[msg.sender] = true;
    }

    struct Issuer {
        address issuerAddress;
        string id;
        bool exists;
    }

    struct Certificate {
        bytes32 cid;
        string holderName;
        string issuerName;
        string timestamp;
        string program;
        bool exist;
    }

    //mapping
    mapping(bytes32 => Certificate) public Certificates;
    mapping(address => bool) admins;
    mapping(address => Issuer) issuers;

    //modifiers
    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Not Admin");
        _;
    }
    modifier onlyIssuer() {
        require(issuers[msg.sender].exists == true, "Not Issuer");
        _;
    }

    //function

    //function to add an issuer
    function addIssuer(
        address _issuerAddress,
        string memory _issuerId
    ) public onlyAdmin {
        issuers[_issuerAddress].issuerAddress = _issuerAddress;
        issuers[_issuerAddress].id = _issuerId;
        issuers[_issuerAddress].exists = true;
    }

    //Stores Certificate CID and details.
    function storeCertificate(
        string memory cid,
        string memory _holderName,
        string memory _issuerName,
        string memory _program,
        string memory _issuedDate
    ) public onlyIssuer {
        bytes32 _cid = keccak256(abi.encodePacked(cid));
        // require(
        //     Certificates[_cid].exist == false,
        //     "The Certificate already exists."
        // );
        Certificates[_cid].cid = _cid;
        Certificates[_cid].holderName = _holderName;
        Certificates[_cid].issuerName = _issuerName;
        Certificates[_cid].program = _program;
        Certificates[_cid].timestamp = _issuedDate;
        Certificates[_cid].exist = true;
    }

    //Get Certificate details from cid
    function getCertificate(
        string memory cid
    ) public view returns (Certificate memory) {
        bytes32 _cid = keccak256(abi.encodePacked(cid));
        require(Certificates[_cid].exist == true, "Certificate Do not Exists");
        return Certificates[_cid];
    }

    //checks if the certificate with given cid exists or not
    function check(string memory cid) public view returns (bool) {
        bytes32 _cid = keccak256(abi.encodePacked(cid));
        return Certificates[_cid].exist;
    }

    //Only for Test

    function returnIssuers(
        address _issuerAddress
    ) public view returns (Issuer memory) {
        return issuers[_issuerAddress];
    }

    function returnAddress() public view returns (address) {
        return msg.sender;
    }
}
