const axios = require("axios");

async function get_all() {
  try {
    const response = await axios.get(`http://localhost:8000/api/customers`);
    return response;
  } catch (error) {
    // console.log(error.message);
    throw error;
  }
}

async function get_one(reqBody) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customer/${reqBody.cust_id}`
    );
    return response;
  } catch (error) {
    // console.log( error.message);
    throw error;
  }
}

async function create_(reqBody) {
  try {

    const response = await axios.post(
      `http://localhost:8000/api/customer`,
      reqBody
    );
    return response;
  } catch (error) {
    // console.log(error);
    if (error.response) {
      return { status: error.response.status };
    } else {
      return { status: 500 }; //server error
    }
  }
}
async function update_(reqBody) {
  try {
    const data = {
      name: reqBody.name,
      cust_id: reqBody.cust_id,
      email: reqBody.email,
    };
    const response = await axios.put(
      `http://localhost:8000/api/customer/${data.cust_id}`,
      data
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

async function delete_(reqBody) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/customer/${reqBody.cust_id}`
    );
    return response;
  } catch (error) {
    // console.log(error);
    if (error.response) {
      return { status: error.response.status };
    } else {
      return { status: 500 }; ///server error
    }
  }
}

module.exports = {
  get_all,
  create_,
  get_one,
  update_,
  delete_,
};
