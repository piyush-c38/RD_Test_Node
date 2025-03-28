const asyncHandler = require("express-async-handler");
const Person = require("../models/person.model");

// GET: Display all persons
const showPersonList = asyncHandler(async (req, res) => {
  const people = await Person.find({});
  res.render('index', { people });
});

// POST: Create a new person
const createPerson = asyncHandler(async (req, res) => {
  const { name, age, gender, mobileNumber } = req.body;
  if (!name || !age || !gender || !mobileNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newPerson = new Person({ name, age, gender, mobileNumber });

  await newPerson.save();
  res.redirect('/person');
});

// PUT: Update a person by ID
const editPerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  Object.assign(person, req.body);
  await person.save();
  res.redirect('/person');
});

// DELETE: Delete a person by ID
const deletePerson = asyncHandler(async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.redirect('/person');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { showPersonList, deletePerson, createPerson, editPerson };
