const asyncHandler = require("express-async-handler");
const Person = require("../models/person.model");

// GET: To Display all the Persons
const showPersonList = asyncHandler(async (req, res) => {
  try {
    const people = await Person.find({});
    res.render("index", { people });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: To Create a new person
const createPerson = asyncHandler(async (req, res) => {
  try {
    const { name, age, gender, mobileNumber } = req.body;
    if (!name || !age || !gender || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPerson = new Person({ name, age, gender, mobileNumber });

    await newPerson.save();
    res.redirect("/person");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: To Update a Person by id
const editPerson = asyncHandler(async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ message: "Not found" });
    }

    Object.assign(person, req.body);
    await person.save();
    res.redirect("/person");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: To delete a person by id
const deletePerson = asyncHandler(async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Not found" });
    }
    res.redirect("/person");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { showPersonList, deletePerson, createPerson, editPerson };
