import express from "express";
import Person from "../models/person.js";

const personRouter = express.Router();

personRouter.get("/", async (request, response) => {
  try {
    const people = await Person.find({});
    response.json(people);
  } catch (error) {
    response.status(404).send({ error: error });
  }
});

personRouter.get("/:id", async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(404);
    next(error);
  }
});

personRouter.post("/post/person", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: "Name or Number missing",
      });
    }

    const existingPerson = await Person.findOne({ name: body.name });
    if (existingPerson) {
      return response.status(400).json({
        error: "Name Already Exists",
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
      createdAt: new Date(),
    });

    const savedPerson = await person.save();
    response.status(201).json(savedPerson);
  } catch (error) {
    response.status(404);
    next(error);
  }
});

personRouter.delete("/delete:id", async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(404);
    next(error);
  }
});

personRouter.put("/update/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const person = new person({
      name: body.name,
      number: body.number,
      createdAt: new Date(),
    });

    const updatedPerson = await Person.findOneAndUpdate(
      request.params.id,
      person,
      { new: true }
    );

    if (!updatedPerson) {
      return response.status(404).json({ error: "Person not found" });
    }

    response.json(updatedPerson);
  } catch (error) {
    response.status(404);
    next(error);
  }
});

export { personRouter };
