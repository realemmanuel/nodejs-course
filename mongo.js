import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://devemmanuel1:${password}@cluster0.0s5pcix.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  createdAt: Date,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
  createdAt: new Date(),
});

person.save().then((result) => {
  const message = `added ${name} number: ${number} to phonebook`;
  console.log(message);
});

Person.find({}).then((result) => {
  console.log("Phonebook:");
  result.forEach((note) => {
    console.log(note.name, note.number);
  });
  mongoose.connection.close();
});
