import express from "express";
import db from "../db/conn.mjs";
import Grades from "../models/grade.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
// Create a single grade entry
router.post("/", async (req, res) => {
  let { scores, class_id, learner_id } = req.body;

  const result = new Grades({
    scores: scores, 
    class_id: class_id, 
    learner_id: learner_id
  })

  const savedResult = await result.save(); 
  res.send(savedResult).status(204);
});

router.get("/:id", async (req, res) => {
  let query = { _id: ObjectId(req.params.id) };

  let result = await Grades.findById(query);

  console.log(result); 
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  let query = { _id: ObjectId(req.params.id) };

  let result = await Grades.updateOne({_id: query}, {
    $set: { scores: req.body }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  let query = { _id: ObjectId(req.params.id) };

  let result = await Grades.updateOne({_id: query}, {
    $pull: { scores: req.body }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  let query = { _id: ObjectId(req.params.id) };
  let result = await Grades.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// I don't understand this one * * * * * * * 
// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  let query = { learner_id: Number(req.params.id) };
  
  // Check for class_id parameter
  if (req.query.class) query.class_id = Number(req.query.class);

  let result = await Grades.find(query); 

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a learner's grade data
router.get("/student/learner/:id", async (req, res) => {
  let query = { learner_id: Number(req.params.id) };
  
  // Check for class_id parameter
  if (req.query.class) query.class_id = Number(req.query.class);

  let result = await Grades.find(query); 

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => { 
  let query = { learner_id: Number(req.params.id) };

  let result = await Grades.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  // Check for learner_id parameter
  if (req.query.learner) query.learner_id = Number(req.query.learner);

  let result = await Grades.find(query); 

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let result = await Grades.updateMany(query, {
    $set: { class_id: req.body.class_id }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let result = await Grades.deleteMany(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
