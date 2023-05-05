const mongoose = require("mongoose");

const requestSchema = {
  req_id: String,
  description:String,
  user_address: String,
  url: String,
  supporter_address: String,
};

const Request = mongoose.model("Request", requestSchema, "requests");
module.exports = Request;
