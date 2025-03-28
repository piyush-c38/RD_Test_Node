const express = require('express');
const router = express.Router();
const {
  showPersonList,
  deletePerson,
  createPerson,
  editPerson,
} = require("../controllers/person.controller");

// CRUD Routes
router.route("/").get(showPersonList).post(createPerson);
router.route("/:id").put(editPerson);
router.route("/delete/:id").delete(deletePerson);

module.exports = router;
