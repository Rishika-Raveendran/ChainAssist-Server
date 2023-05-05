const express = require("express");
// const mongoose = require("mongoose");
const router = express.Router();
const Request = require("../models/Request");

//Saving request,requester and browser active tab url
router.route("/api/post").post((req, res) => {
  let request_address = req.body.request_address;
  let url = req.body.url;
  let req_id = req.body.req_id;
  let description = req.body.description;
  console.log(req.body);

  const newParticipant = new Request({
    req_id: req_id,
    description: description,
    user_address: request_address,
    url: url,
    supporter_address: null,
  });

  newParticipant
    .save(newParticipant)
    .then(() => res.json({ msg: "Successful" }))
    .catch((err) => console.log(err));
});
//Updating request with supporter address
router.route("/api/update").post((req, res) => {
  let supp_address = req.body.supporter_address;
  let req_id = req.body.req_id;

  Request.updateOne(
    { req_id: req_id },
    { $set: { supporter_address: supp_address } }
  )
    .then(() => res.json({ msg: "Successful" }))
    .catch((err) => console.log(err));
});

//Getting all requests from database
router.route("/api/get").get((req, res) => {
  Request.find().then((documents) => res.json(documents));
});

//Get a particular user request
router.route("/api/get_request").get((req, res) => {
  Request.find({ req_id: req.query.id }).then((documents) =>
    res.json(documents)
  );
});

module.exports = router;
