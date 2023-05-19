const {
  adminLogin,
  acceptIssuerRequest,
  rejectIssuerRequest,
  allissuers,
  allrequest,
} = require("../../controllers/adminController");
const Admin = require("../../models/adminModel");
const Issuer = require("../../models/issuerModel");
// Mock the database models
jest.mock("../../models/adminModel");
jest.mock("../../models/issuerModel");

// Mock the request and response objects
const req = {
  body: {
    adminLoginDetails: {
      username: "admin",
      password: "password",
      address: "address1",
    },
  },
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

describe("adminLogin", () => {
  it("should return 200 with valid credentials", async () => {
    // Mock the findOne method of Admin model to simulate successful login
    Admin.findOne.mockImplementationOnce((query, callback) => {
      const docs = {
        _id: 1,
        username: "admin",
        address: "address1",
        password: "password",
      };
      callback(null, docs);
    });

    await adminLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login Successful",
      adminId: 1,
      adminAddress: "address1",
    });
  });

  it("should return 401 with invalid credentials", async () => {
    // Mock the findOne method of Admin model to simulate invalid credentials
    Admin.findOne.mockImplementationOnce((query, callback) => {
      callback(null, null);
    });

    await adminLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: "Invalid Credentials" });
  });
});

describe("acceptIssuerRequest", () => {
  it("should return 200 and success message when issuer is successfully updated", async () => {
    const mockIssuerId = "issuerId";

    const req = {
      body: {
        issuerId: mockIssuerId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findByIdAndUpdate method of Issuer model to simulate successful update

    Issuer.findByIdAndUpdate.mockResolvedValueOnce({});

    await acceptIssuerRequest(req, res);

    expect(Issuer.findByIdAndUpdate).toHaveBeenCalledWith(mockIssuerId, {
      addedByAdmin: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Successfully added" });
  });

  it("should return 300 and error message when an error occurs during update", async () => {
    const mockIssuerId = "issuerId";

    const req = {
      body: {
        issuerId: mockIssuerId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findByIdAndUpdate method of Issuer model to simulate an error
    Issuer.findByIdAndUpdate.mockRejectedValueOnce(new Error("Some error"));

    await acceptIssuerRequest(req, res);

    expect(Issuer.findByIdAndUpdate).toHaveBeenCalledWith(mockIssuerId, {
      addedByAdmin: true,
    });
    expect(res.status).toHaveBeenCalledWith(300);
    expect(res.json).toHaveBeenCalledWith({ msg: "Something Went Wrong" });
  });
});

describe("rejectIssuerRequest", () => {
  it("should return 200 and success message when issuer is successfully deleted", async () => {
    const mockIssuerId = "issuerId";

    const req = {
      body: {
        issuerId: mockIssuerId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findByIdAndDelete method of Issuer model to simulate successful deletion

    Issuer.findByIdAndDelete.mockResolvedValueOnce({});

    await rejectIssuerRequest(req, res);

    expect(Issuer.findByIdAndDelete).toHaveBeenCalledWith(mockIssuerId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Issuer rejected" });
  });

  it("should return 300 and error message when an error occurs during deletion", async () => {
    const mockIssuerId = "issuerId";

    const req = {
      body: {
        issuerId: mockIssuerId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the findByIdAndDelete method of Issuer model to simulate an error

    Issuer.findByIdAndDelete.mockRejectedValueOnce(new Error("Some error"));

    await rejectIssuerRequest(req, res);

    expect(Issuer.findByIdAndDelete).toHaveBeenCalledWith(mockIssuerId);
    expect(res.status).toHaveBeenCalledWith(300);
    expect(res.json).toHaveBeenCalledWith({ msg: "Something Went Wrong" });
  });
});

describe("allissuers", () => {
  it("should return filtered issuers added by admin", async () => {
    const mockIssuers = [
      { _id: "issuerId1", addedByAdmin: true },
      { _id: "issuerId2", addedByAdmin: false },
    ];

    const req = {};
    const res = {
      send: jest.fn(),
    };

    // Mock the find method of Issuer model to return the mock issuers
    Issuer.find.mockResolvedValueOnce(mockIssuers);

    await allissuers(req, res);

    expect(Issuer.find).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith([mockIssuers[0]]);
  });
});

describe("allrequest", () => {
  it("should return filtered issuers not added by admin", async () => {
    const mockIssuers = [
      { _id: "issuerId1", addedByAdmin: true },
      { _id: "issuerId2", addedByAdmin: false },
    ];

    const req = {};
    const res = {
      send: jest.fn(),
    };

    // Mock the find method of Issuer model to return the mock issuers
    Issuer.find.mockResolvedValueOnce(mockIssuers);

    await allrequest(req, res);

    expect(Issuer.find).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith([mockIssuers[1]]);
  });
});
