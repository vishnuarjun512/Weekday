import { CandidateModel } from "../db/database.js";

// Create a new candidate
export const createCandidate = async (candidateData) => {
  const {
    Company,
    Interviewer,
    "Interviewer Email": interviewerEmail,
    Candidate,
    "Candidate Email": candidateEmail,
    "Candidate Phone": candidatePhone,
    "Scheduling method": schedulingMethod,
    Round,
    "Added On": addedOn,
    Rounds,
    Status,
  } = candidateData;

  if (!Company || !Interviewer || !Candidate) {
    throw new Error("Missing required fields");
  }

  return await CandidateModel.create({
    Company,
    Interviewer,
    "Interviewer Email": interviewerEmail,
    Candidate,
    "Candidate Email": candidateEmail,
    "Candidate Phone": candidatePhone,
    "Scheduling method": schedulingMethod,
    Round,
    "Added On": addedOn,
    Rounds,
    Status,
  });
};

// Delete a candidate by ID
export const deleteCandidate = async (id) => {
  const candidate = await CandidateModel.findByPk(id);

  if (!candidate) {
    throw new Error("Candidate not found");
  }

  return await candidate.destroy();
};

// Get a candidate by ID
export const getCandidate = async (id) => {
  const candidate = await CandidateModel.findByPk(id);

  if (!candidate) {
    throw new Error("Candidate not found");
  }

  return candidate;
};

// Update a candidate by ID
export const updateCandidate = async (id, updateData) => {
  const candidate = await CandidateModel.findByPk(id);

  if (!candidate) {
    throw new Error("Candidate not found");
  }

  return await candidate.update(updateData);
};
