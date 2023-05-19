const {
  issuerRegistrationRequest,
  issuerLogin,
  addProgram,
  getIssuerById,
  issueCertificate,
} = require("../../controllers/issuerController");

// Mock the required modules
jest.mock("bcrypt");
jest.mock("../../models/issuerModel");
jest.mock("../../models/certificateModel");

describe("issuerRegistrationRequest", () => {
  //   it("should register a new issuer and return success message", async () => {
  //     const mockSalt = "$2a$10$abcdefghijklmnopqrstuvwxyz1234567890";
  //     const mockHash =
  //       "$2a$10$abcdefghijklmnopqrstuvwxyz1234567890hashedpassword";

  //     const req = {
  //       body: {
  //         name: "Issuer Name",
  //         issuerID: "issuerID1",
  //         address: "Issuer Address",
  //         email: "issuer@example.com",
  //         password: "password123",
  //         phoneNo: "1234567890",
  //         addedByAdmin: false,
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //       send: jest.fn(),
  //     };

  //     // Mock the find and save methods of Issuer model
  //     const Issuer = require("../../models/issuerModel");
  //     Issuer.find.mockImplementationOnce((query, callback) => {
  //       callback(null, []);
  //     });
  //     Issuer.prototype.save.mockImplementationOnce((callback) => {
  //       callback(null);
  //     });

  //     // Mock the genSalt and hash methods of bcrypt
  //     const bcrypt = require("bcrypt");
  //     bcrypt.genSalt.mockResolvedValueOnce(mockSalt);
  //     bcrypt.hash.mockResolvedValueOnce(mockHash);

  //     await issuerRegistrationRequest(req, res);

  //     expect(Issuer.find).toHaveBeenCalledWith(
  //       { email: req.body.email, issuerID: req.body.issuerID },
  //       expect.any(Function)
  //     );
  //     expect(bcrypt.genSalt).toHaveBeenCalledWith(5);
  //     expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, mockSalt);
  //     expect(Issuer.prototype.save).toHaveBeenCalledTimes(1);
  //     expect(res.send).toHaveBeenCalledWith("Request Sent Successfully");
  //   });

  it("should return 400 status with error message if issuer is already registered", async () => {
    const req = {
      body: {
        name: "Issuer Name",
        issuerID: "issuerID1",
        address: "Issuer Address",
        email: "issuer@example.com",
        password: "password123",
        phoneNo: "1234567890",
        addedByAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the find method of Issuer model to return a mock result with length > 0
    const Issuer = require("../../models/issuerModel");
    Issuer.find.mockImplementationOnce((query, callback) => {
      callback(null, [{ name: "Issuer Name" }]);
    });

    await issuerRegistrationRequest(req, res);

    expect(Issuer.find).toHaveBeenCalledWith(
      { email: req.body.email, issuerID: req.body.issuerID },
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Already Registered" });
  });

  it("should handle error and return 400 status with error message", async () => {
    const req = {
      body: {
        name: "Issuer Name",
        issuerID: "issuerID1",
        address: "Issuer Address",
        email: "issuer@example.com",
        password: "password123",
        phoneNo: "1234567890",
        addedByAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the find method of Issuer model to throw an error
    const Issuer = require("../../models/issuerModel");
    Issuer.find.mockImplementationOnce((query, callback) => {
      callback(new Error("Database error"));
    });

    await issuerRegistrationRequest(req, res);

    expect(Issuer.find).toHaveBeenCalledWith(
      { email: req.body.email, issuerID: req.body.issuerID },
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });
});

describe("issuerLogin", () => {
  it("should login a verified issuer and return success message", async () => {
    const req = {
      body: {
        email: "issuer@example.com",
        password: "password123",
        address: "Wallet Address",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findOne method of Issuer model to return a verified issuer
    const Issuer = require("../../models/issuerModel");
    Issuer.findOne.mockImplementationOnce((query, callback) => {
      const verifiedIssuer = {
        email: "issuer@example.com",
        password: "$2a$10$abcdefghijklmnopqrstuvwxyz1234567890hashedpassword",
        addedByAdmin: true,
        address: "Wallet Address",
        _id: "issuerId123",
      };
      callback(null, verifiedIssuer);
    });

    const bcrypt = require("bcrypt");
    bcrypt.compare.mockResolvedValueOnce(true);

    await issuerLogin(req, res);

    expect(Issuer.findOne).toHaveBeenCalledWith(
      { email: req.body.email },
      expect.any(Function)
    );
    expect(bcrypt.compare).toHaveBeenCalledWith(
      req.body.password,
      expect.any(String)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login Successful",
      email: "issuer@example.com",
      name: undefined,
      address: "Wallet Address",
      _id: "issuerId123",
    });
  });
});

describe("addProgram", () => {
  it("should add a program to the issuer and return success message", async () => {
    const req = {
      body: {
        currentUser: { _id: "issuerId123" },
        programDetails: {
          programName: "Program Name",
          initiationDate: "2023-01-01",
          completionDate: "2023-01-31",
        },
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Mock the findOne and save methods of Issuer model
    const Issuer = require("../../models/issuerModel");
    Issuer.findOne.mockImplementationOnce((query) => {
      const issuer = {
        _id: "issuerId123",
        programs: [],
        save: jest.fn().mockResolvedValueOnce(),
      };
      return issuer;
    });

    await addProgram(req, res);

    expect(Issuer.findOne).toHaveBeenCalledWith({
      _id: req.body.currentUser._id,
    });
    // expect(res.send).toHaveBeenCalledWith(
    //   "Your Program has been added Successfully!"
    // );
  });
});

describe("getIssuerById", () => {
  it("should return the issuer with the specified ID", async () => {
    const req = {
      body: {
        userId: "issuerId123",
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findById method of Issuer model to return an issuer
    const Issuer = require("../../models/issuerModel");
    Issuer.findById.mockResolvedValueOnce({
      _id: "issuerId123",
      name: "Issuer Name",
      email: "issuer@example.com",
      address: "Wallet Address",
      programs: [],
    });

    await getIssuerById(req, res);

    expect(Issuer.findById).toHaveBeenCalledWith({ _id: "issuerId123" });
    expect(res.send).toHaveBeenCalledWith({
      _id: "issuerId123",
      name: "Issuer Name",
      email: "issuer@example.com",
      address: "Wallet Address",
      programs: [],
    });
  });

  it("should return an error response if something went wrong", async () => {
    const req = {
      body: {
        userId: "issuerId123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findById method of Issuer model to throw an error
    const Issuer = require("../../models/issuerModel");
    Issuer.findById.mockRejectedValueOnce(new Error("Something went wrong"));

    await getIssuerById(req, res);

    expect(Issuer.findById).toHaveBeenCalledWith({ _id: "issuerId123" });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went Wrong!" });
  });
});

describe("issueCertificate", () => {
  //   it("should issue a certificate and return its ID", async () => {
  //     const req = {
  //       protocol: "http",
  //       get: jest.fn().mockReturnValueOnce("localhost"),
  //       file: {
  //         filename: "certificate123.pdf",
  //       },
  //       body: {
  //         cid: "certificateId123",
  //         holderName: "John Doe",
  //         issuedDate: "2023-05-18",
  //         programName: "Certificate Program",
  //         currentUserId: "issuerId123",
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //       json: jest.fn(),
  //     };
  //     // Mock the findById method of Issuer model to return an issuer
  //     const Issuer = require("../../models/issuerModel");
  //     Issuer.findById.mockResolvedValueOnce({
  //       _id: "issuerId123",
  //     });
  //     // Mock the save method of Certificate model
  //     const Certificate = require("../../models/certificateModel");
  //     Certificate.prototype.save.mockImplementationOnce(async function () {
  //       // Simulate saving the certificate
  //       this.cid = "certificateId123";
  //     });
  //     await issueCertificate(req, res);
  //     expect(Issuer.findById).toHaveBeenCalledWith("issuerId123");
  //     expect(Certificate.prototype.save).toHaveBeenCalled();
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.send).toHaveBeenCalledWith("certificateId123");
  //   });
  //   it("should return an error response if the certificate already exists", async () => {
  //     const req = {
  //       protocol: "http",
  //       get: jest.fn().mockReturnValueOnce("localhost"),
  //       file: {
  //         filename: "certificate123.pdf",
  //       },
  //       body: {
  //         cid: "certificateId123",
  //         holderName: "John Doe",
  //         issuedDate: "2023-05-18",
  //         programName: "Certificate Program",
  //         currentUserId: "issuerId123",
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //       json: jest.fn(),
  //     };
  //     // Mock the find method of Certificate model to return an existing certificate
  //     const Certificate = require("../../models/certificateModel");
  //     Certificate.find.mockResolvedValueOnce([{ cid: "certificateId123" }]);
  //     await issueCertificate(req, res);
  //     expect(Certificate.find).toHaveBeenCalledWith({ cid: "certificateId123" });
  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.send).toHaveBeenCalledWith({
  //       message: "Certificate already Exists",
  //     });
  //   });
  //   it("should return an error response if something went wrong", async () => {
  //     const req = {
  //       protocol: "http",
  //       get: jest.fn().mockReturnValueOnce("localhost"),
  //       file: {
  //         filename: "certificate123.pdf",
  //       },
  //       body: {
  //         cid: "certificateId123",
  //         holderName: "John Doe",
  //         issuedDate: "2023-05-18",
  //         programName: "Certificate Program",
  //         currentUserId: "issuerId123",
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //       json: jest.fn(),
  //     };
  //     // Mock the findById method of Issuer model to throw an error
  //     const Issuer = require("../../models/issuerModel");
  //     Issuer.findOne.mockImplementationOnce((query, callback) => {
  //       callback(null, null);
  //     });
  //     await issueCertificate(req, res);
  //     expect(Issuer.findById).toHaveBeenCalledWith("issuerId123");
  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.send).toHaveBeenCalledWith({ message: "Something Went Wrong" });
  //   });
});
