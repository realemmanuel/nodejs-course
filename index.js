import express from "express";
import cors from "cors";

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateUniqueId = () => {
  const uniqueId = Math.random() * 1000000;
  return uniqueId;
};

const app = express();

app.use(cors());

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

app.get("/info", (request, response) => {
  const totalUsers = phoneBook.length;
  const requestDate = new Date();
  response.send(
    `<p>Phonebook has info for ${totalUsers} people <br/> <br/> ${requestDate} </p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phoneBook.find((item) => item.id === id);

  response.json(person);
});

app.get("/api/persons/delete/:id", (request, response) => {
  const id = Number(request.params.id);
  phoneBook = phoneBook.filter((item) => item.id !== id);

  response.status(204).end();
});

app.use(express.json());

app.post("/api/post/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name Or Number missing",
    });
  }

  const names = phoneBook.map((item) => item.name);

  if (names.includes(body.name)) {
    return response.status(400).json({
      error: "Name Already Exists",
    });
  }

  const person = {
    id: generateUniqueId(),
    name: body.name,
    number: body.number,
  };

  phoneBook = phoneBook.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
