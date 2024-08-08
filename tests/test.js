const {
  get_all,
  get_one,
  create_,
  update_,
  delete_,
} = require("../index");

describe("API End Points GET Tests", () => {
  test("should get all customers", async () => {
    try {
      const response = await get_all();
      expect(response.status).toBe(200);
      expect(response.data.status).toBe("success");
      expect(response.data.data.length).toBeGreaterThan(0);
    } catch (error) {
      console.log(error.message);
      throw error; 
    }
  });

  test("should return 404 status for non-existent customer", async () => {
    try {
      const reqBody = {
        name: "name",
        cust_id: 99999,
        email: "email@emial.com",
      };
      const response = await get_one(reqBody);
      expect(response.status).toBe(404);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("should get a customer by cust_id", async () => {
    try {
      const reqBody = {
        name: "newguest",
        cust_id: 51,
        email: "newguest@gmail.com",
      };
      const response = await get_one(reqBody);
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data.data.length).toBeGreaterThan(0);
    } catch (error) {
      console.log(error.message);
      throw error; 
    }
  });
});

describe("API End Points POST tests", () => {
  test("should create a new customer", async () => {
    try {
      const reqBody = {
        name: "newguest70",
        cust_id: 50,
        email: "newguest70@gmail.com",
      };
      const response = await create_(reqBody);
      expect(response.status).toBe(201);
      expect(response.data.status).toBe("success");
    } catch (error) {
      console.log(error.message);
      throw error; 
    }
  });

  test("should return 409 for trying to create an existing record", async () => {
    try {
      const reqBody = {
        name: "newguest9",
        cust_id: 70,
        email: "newguest6@gmail.com",
      };
      await create_(reqBody);
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
  });

  test("should return 400 for invalid customer data", async () => {
    try {
      const reqBody = { name: "sharat" };
      await create_(reqBody);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});

describe("API End Points PUT tests", () => {
  test("should update customer with given cust_id", async () => {
    try {
      const reqBody = {
        name: "newguest",
        cust_id: 51,
        email: "newguest@gmail.com",
      };
      const response = await update_(reqBody);
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data.message).toBe("customer updated successfully");
    } catch (error) {
      // console.log(error.message);
      throw error; 
    }
  });

  test("should return 404 when updating non-existent customer", async () => {
    try {
      const reqBody = {
        name: "newguest",
        cust_id: 99999,
        email: "newguest@gmail.com",
      };
      const response = await update_(reqBody);
      expect(response.status).toBe(404);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("API End Point DELETE tests", () => {
  test("should delete a customer with given cust_id", async () => {
    try {
      const reqBody = {
        cust_id: 50,
      };
      const response = await delete_(reqBody);
      expect(response.status).toBe(200);
      expect(response.statusText).toBe("OK");
      expect(response.data.message).toBe("customer deleted successfully");
    } catch (error) {
      // console.log(error.message);
      throw error; 
    }
  });

  test("should return 404 when deleting non-existent customer", async () => {
    try {
      const reqBody = {
        cust_id: 999,
      };
      const response = await delete_(reqBody);
      
      expect(response.status).toBe(404);
    } catch (error) {
      // console.log(error);
      expect(error.response.status).toBe(404);
    }
  });
});
