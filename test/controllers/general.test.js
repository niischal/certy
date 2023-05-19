const {
  getIssuerById,
  getCertificateByCid,
} = require("../../controllers/generalController");
const Issuer = require("../../models/issuerModel");
const Certificate = require("../../models/certificateModel");

// Mock the database models
jest.mock("../../models/issuerModel");
jest.mock("../../models/certificateModel");

describe("getIssuerById", () => {
  it("should return issuer and program based on id and programName", async () => {
    const mockIssuer = {
      _id: "issuerId1",
      name: "Issuer Name",
      programs: [
        { programName: "Program 1", programData: "Program 1 Data" },
        { programName: "Program 2", programData: "Program 2 Data" },
      ],
    };

    const req = {
      body: {
        request: {
          id: "issuerId1",
          programName: "Program 2",
        },
      },
    };
    const res = {
      send: jest.fn(),
    };

    // Mock the findOne method of Issuer model to return the mock issuer
    Issuer.findOne.mockResolvedValueOnce(mockIssuer);

    await getIssuerById(req, res);

    expect(Issuer.findOne).toHaveBeenCalledWith({ _id: req.body.request.id });
    expect(res.send).toHaveBeenCalledWith({
      issuer: mockIssuer.name,
      program: [mockIssuer.programs[1]],
    });
  });

  it("should handle error and return 400 status with error message", async () => {
    const req = {
      body: {
        request: {
          id: "issuerId1",
          programName: "Program 2",
        },
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findOne method of Issuer model to throw an error
    Issuer.findOne.mockRejectedValueOnce(new Error("Database error"));

    await getIssuerById(req, res);

    expect(Issuer.findOne).toHaveBeenCalledWith({ _id: req.body.request.id });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went Wrong!" });
  });
});

describe("getCertificateByCid", () => {
  it("should return certificate based on cid", async () => {
    const mockCertificate = {
      cid: "certificateId1",
      certificateData: "Certificate Data",
    };

    const req = {
      body: {
        cid: "certificateId1",
      },
    };
    const res = {
      send: jest.fn(),
    };

    // Mock the findOne method of Certificate model to return the mock certificate
    Certificate.findOne.mockResolvedValueOnce(mockCertificate);

    await getCertificateByCid(req, res);

    expect(Certificate.findOne).toHaveBeenCalledWith({ cid: req.body.cid });
    expect(res.send).toHaveBeenCalledWith(mockCertificate);
  });

  it("should handle error and return 400 status with error message", async () => {
    const req = {
      body: {
        cid: "certificateId1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findOne method of Certificate model to throw an error
    Certificate.findOne.mockRejectedValueOnce(new Error("Database error"));

    await getCertificateByCid(req, res);

    expect(Certificate.findOne).toHaveBeenCalledWith({ cid: req.body.cid });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went Wrong!" });
  });
});
