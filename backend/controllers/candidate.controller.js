import { CandidateModel, sequelize } from "../db/database.js";
import * as candidateService from "../services/candidate.service.js";

// Controller for creating a candidate
export const createCandidate = async (req, res) => {
  try {
    const newCandidate = await candidateService.createCandidate(req.body);
    res.status(201).json({
      message: "Candidate created successfully",
      data: newCandidate,
    });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: error.message, error: true });
  }
};

// Controller for deleting a candidate by ID
export const deleteCandidate = async (req, res) => {
  try {
    await candidateService.deleteCandidate(req.params.id);
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: error.message, error: true });
  }
};

// Controller for getting a candidate by ID
export const getCandidate = async (req, res) => {
  try {
    const candidate = await candidateService.getCandidate(req.params.id);
    res.status(200).json({
      message: "Candidate retrieved successfully",
      data: candidate,
    });
  } catch (error) {
    console.error("Error retrieving candidate:", error);
    res.status(500).json({ message: error.message, error: true });
  }
};

// Controller for updating a candidate by ID
export const updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await candidateService.updateCandidate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Candidate updated successfully",
      updatedCandidate,
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: error.message, error: true });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    // Step 1: Truncate the Candidates table
    const excelData = await CandidateModel.findAll();
    if (excelData.length == 0) {
      return res
        .status(200)
        .json({ excelData, message: "No Candidates to retreive" });
    }
    res
      .status(200)
      .json({ excelData, message: "All candidates retreived successfully" });
  } catch (error) {
    console.error("Error Getting candidates:", error);
    res
      .status(500)
      .json({ message: `Server_ERROR-> ${error.message}`, error: true });
  }
};

export const deleteAllCandidates = async (req, res) => {
  try {
    // Step 1: Check the count of candidates before truncating
    const [countResult] = await sequelize.query(
      'SELECT COUNT(*) AS count FROM "Candidates";'
    );

    // Check the result of the count query
    if (!countResult || countResult.length === 0) {
      console.error("Count query returned no results");
      return res
        .status(500)
        .json({ message: "Could not retrieve initial count", error: true });
    }

    const initialCount = countResult[0].count; // Accessing the first item in the result
    console.log(`Initial candidate count: ${initialCount}`);

    // Step 2: Truncate the Candidates table
    console.log("Truncating the Candidates table...");
    await sequelize.query('TRUNCATE TABLE "Candidates" RESTART IDENTITY;');
    console.log("Candidates table truncated.");

    // Step 3: Check the count of candidates after truncating
    const [newCountResult] = await sequelize.query(
      'SELECT COUNT(*) AS count FROM "Candidates";'
    );

    if (!newCountResult || newCountResult.length === 0) {
      console.error("Count query after truncation returned no results");
      return res
        .status(500)
        .json({ message: "Could not retrieve final count", error: true });
    }

    const finalCount = newCountResult[0].count; // Accessing the first item in the result
    console.log(`Final candidate count: ${finalCount}`);

    res.status(200).json({
      message: "All candidates deleted successfully",
      initialCount,
      finalCount,
    });
  } catch (error) {
    console.error("Error deleting candidates:", error);
    res
      .status(500)
      .json({ message: `Server_ERROR-> ${error.message}`, error: true });
  }
};
