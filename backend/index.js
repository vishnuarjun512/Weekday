// app.js
import express from "express";
import dotenv from "dotenv";
import { connectDatabase, CandidateModel } from "./db/database.js";
import { readFromExcelFile } from "./lib/excelOperations.js";

import CandidateRouter from "./routers/Candidate.router.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/candidates/", CandidateRouter);

app.get("/api", async (req, res) => {
  try {
    // Extract page and limit from query parameters, defaulting to 1 and 10 respectively
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const offset = (page - 1) * limit; // Calculate offset

    // Step 1: Check if the database has any candidates
    const candidateCount = await CandidateModel.count();

    let excelData;

    if (candidateCount > 0) {
      // Step 2: If there are candidates in the database, retrieve them with pagination
      excelData = await CandidateModel.findAll({
        order: [["id", "ASC"]],
        limit: limit,
        offset: offset,
      });

      // Get the total number of pages
      const totalPages = Math.ceil(candidateCount / limit);

      return res.status(200).json({
        excelData,
        message: "Data retrieved from the database",
        totalItems: candidateCount,
        totalPages: totalPages,
        currentPage: page,
      });
    } else {
      // Step 3: If no candidates in the database, read from the Excel file
      const candidatesToInsert = await readFromExcelFile();
      // Step 4: Insert the data from the Excel file into the database
      excelData = await CandidateModel.bulkCreate(candidatesToInsert);

      // Return the newly inserted data
      return res.status(201).json({
        excelData,
        message: "Data inserted from Excel file",
        totalItems: excelData.length,
        totalPages: 1,
        currentPage: 1,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: `Server_ERROR-> ${error.message}`,
      error: true,
    });
  }
});

app.get("/api/check", async (req, res) => {
  try {
    console.log("Reached Here");
    res.status(200).json({ message: "Received Excel Data" });
  } catch (error) {
    res
      .status(404)
      .json({ message: `Server_ERROR-> ${error.message}`, error: true });
  }
});

// Connect to the database and initialize the models
const startServer = async () => {
  await connectDatabase();

  console.log("Candidate table synced successfully.");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer().catch((err) => console.error("Error starting the server:", err));
