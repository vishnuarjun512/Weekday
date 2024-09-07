import express from "express";

import {
  createCandidate,
  getCandidate,
  deleteCandidate,
  updateCandidate,
  deleteAllCandidates,
  getAllCandidates,
} from "../controllers/candidate.controller.js";

const router = express.Router();

router.post("/", createCandidate);
router.get("/:id", getCandidate);
router.delete("/:id", deleteCandidate);
router.put("/:id", updateCandidate);
router.get("/", getAllCandidates);
router.delete("/", deleteAllCandidates);

export default router;
