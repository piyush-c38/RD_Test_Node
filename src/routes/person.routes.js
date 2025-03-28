const express = require('express');
const Person = require("../models/person.model");
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

//Routes for ejs pages
router.route("/edit/:id").get(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  res.render('edit', { person });
});
router.route("/create").get((req, res) => res.render('create'));

module.exports = router;
