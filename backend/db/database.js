// db/database.js
import { Sequelize } from "sequelize";
import { createCandidateModel } from "../models/Candidate.js";

// Create a Sequelize instance using PostgreSQL connection details
const sequelize = new Sequelize("weekday", "me", "acer", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

// Test the connection
let CandidateModel = null;
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");

    CandidateModel = await createCandidateModel(sequelize);
    await sequelize.sync();
    console.log("Database Synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Export the sequelize instance
export { sequelize, CandidateModel };
