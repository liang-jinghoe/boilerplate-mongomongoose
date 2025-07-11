require('dotenv').config();

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(`Connecing to ${process.env.MONGO_URI}`);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "name"
  },
  age: {
    type: Number,
    default: 0
  },
  favoriteFoods: {
    type: [String]
  }
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Name",
    age: 20,
    favoriteFoods: ["Carry noddle"]
  });

  person.save((err, data) => {
    done(err, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    done(err, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, done);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $all: [food] } }, done);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);

    person.save(done);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { $set: { age: ageToSet } }, { new: true }, done);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: { $in: [nameToRemove] } }, done);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: { $in: [foodToSearch] } }).sort("name").limit(2).select("-age").exec(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
