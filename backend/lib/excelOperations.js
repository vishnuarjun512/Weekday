import fs from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";

export const readFromExcelFile = async () => {
  try {
    const filePath = path.join(
      "/Users/apple/Documents/Projects/WeekdayGoogleDocs/backend/Candidates.xlsx"
    );

    const fileBuffer = await fs.readFile(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Make sure to format the data as required by your database schema
    return jsonData.map((item) => ({
      Company: item.Company,
      Interviewer: item.Interviewer,
      "Interviewer Email": item["Interviewer Email"],
      Candidate: item.Candidate,
      "Candidate Email": item["Candidate Email"],
      "Candidate Phone": item["Candidate Phone"],
      "Scheduling method": item["Scheduling method"], // Ensure this is parsed to JSON if it's a string
      Round: item.Round,
      "Added On": new Date(item["Added On"]), // Convert date string to Date object
      Status: item.Status,
    }));
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
};
