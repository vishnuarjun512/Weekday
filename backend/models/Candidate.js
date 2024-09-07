// Candidate.model.js
import { DataTypes } from "sequelize";

export const createCandidateModel = (sequelize) => {
  return sequelize.define("Candidate", {
    Company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Interviewer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Interviewer Email": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Candidate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Candidate Email": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Candidate Phone": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Scheduling method": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Round: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Added On": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Rounds: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
