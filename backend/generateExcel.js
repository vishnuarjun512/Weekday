import { faker, ja } from "@faker-js/faker";
import * as XLSX from "xlsx";

const generateFakeCandidateData = () => {
  const candidates = [];
  console.log("Generating new Candidates");

  for (let i = 0; i <= 49; i++) {
    // Generate 50 fake candidates
    const round = faker.number.int({ min: 1, max: 3 });
    let status;

    // 0 for Not responded
    // 1 for Responded
    // 2 for Scheduled
    // 3 for Declined
    // 4 for Link 1 Interview Done
    // 5 for Link 2 Interview Done
    // 6 for Link 3 Interview Done
    // 7 for Waiting for Company Result
    // 8 for Not Selected
    // 9 for Selected
    if (round === 1) {
      status = faker.number.int({ min: 0, max: 2 }); // 0, 1, or 2
    } else if (round === 2) {
      status = faker.number.int({ min: 3, max: 4 }); // 3 or 4
    } else if (round === 3) {
      status = faker.number.int({ min: 5, max: 7 }); // 5, 6, or 7
    } else {
      status = faker.number.int({ min: 8, max: 9 }); // 8 or 9
    }

    const roundLinks = [];
    for (var j = 1; j < 4; j++) {
      roundLinks.push({
        roundNumber: `Round${j}`,
        link: faker.internet.url(),
      });
    }

    const candidate = {
      id: i + 1,
      Company: faker.company.name(),
      Interviewer: faker.person.firstName(),
      "Interviewer Email": faker.internet.email(),
      Candidate: faker.person.firstName(),
      "Candidate Email": faker.internet.email(),
      "Candidate Phone": faker.phone.number(),
      "Scheduling method": JSON.stringify(roundLinks),
      Round: `Round ${round}`,
      "Added On": faker.date.recent().toString(),
      Status: status, // Status based on round logic
    };

    candidates.push(candidate);
  }

  return candidates;
};

// Generate the fake data
const candidateData = generateFakeCandidateData();

// Create a new workbook
const wb = XLSX.utils.book_new();
// Create a worksheet from the candidate data
const ws = XLSX.utils.json_to_sheet(candidateData);
// Append the worksheet to the workbook
XLSX.utils.book_append_sheet(wb, ws, "Candidates");

// Write the workbook to a file
XLSX.writeFile(wb, "Candidates.xlsx");
