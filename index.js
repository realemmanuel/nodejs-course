import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Person from "./models/person.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/persons", async (request, response) => {
  try {
    const persons = await Person.find({});
    response.json(persons);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/info", async (request, response) => {
  try {
    const totalUsers = await Person.countDocuments({});
    const requestDate = new Date();
    response.send(
      `<p>Phonebook has info for ${totalUsers} people <br/> <br/> ${requestDate} </p>`
    );
  } catch (error) {
    response.status(500).send("Error retrieving user information");
  }
});

app.get("/api/persons/:id", async (request, response) => {
  try {
    const person = await Person.findById(request.params.id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/persons/delete/:id", async (request, response) => {
  try {
    await Person.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/post/persons", async (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or Number missing",
    });
  }

  try {
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
    response.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
