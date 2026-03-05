const mongoose = require("mongoose");
const userSchema = require("./src/models/user-model");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const files = [
  "69a49d7c199914da8eeb0365",
  "69a49d7c199914da8eeb0366",
  "69a49d7c199914da8eeb0367",
  "69a49d7c199914da8eeb0368",
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log(new Date().toLocaleString());
    for (let index = 0; index < 100; index++) {
      const users = {
        username: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ max: 100 }),
        files: [
          files[Math.floor(Math.random() * 4)],
          files[Math.floor(Math.random() * 4)],
        ],
      };
      // Insert new data
      await userSchema.insertMany(users);
      console.log("Database seeded successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDB();
