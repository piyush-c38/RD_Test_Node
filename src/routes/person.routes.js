const express = require('express');
const router = express.Router();

const {
  showPersonList, deletePerson, createPerson, editPerson
} = require("../controllers/person.controller");


router.route("/").post(createPerson).get(showPersonList);
router.route("/:id").delete(deletePerson).put(editPerson);
module.exports = router;