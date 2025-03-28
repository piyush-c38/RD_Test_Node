const asyncHandler = require("express-async-handler");
const Person = require("../models/person.model");

// GET: Display all persons
const showPersonList = asyncHandler(async (req, res) => {
    try {
      const people = await Person.find({});
      res.status(200).json(people);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST: Create a new person
  const createPerson = asyncHandler(async (req, res) => {
    const { name, age, gender, mobileNumber } = req.body;
  
    const newPerson = new Person({ name, age, gender, mobileNumber });
  
    try {
      await newPerson.save();
      res.status(201).json(newPerson);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT: Update a person by ID
  const editPerson = asyncHandler(async (req, res) => {
    try {
      const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPerson) return res.status(404).json({ message: 'Person not found' });
      res.status(200).json(updatedPerson);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE: Delete a person by ID
  const deletePerson = asyncHandler(async (req, res) => {
    try {
      const deletedPerson = await Person.findByIdAndDelete(req.params.id);
      if (!deletedPerson) return res.status(404).json({ message: 'Person not found' });
      res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = {  showPersonList, deletePerson, createPerson, editPerson };
