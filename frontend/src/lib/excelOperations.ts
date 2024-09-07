import * as XLSX from "xlsx"; // Ensure you have the XLSX library installed

// Define the type for the JSON data extracted from the Excel file
type Candidate = {
  [key: string]: any; // Adjust the type based on your Excel columns
};

export const readFromExcelFile = async (): Promise<Candidate[]> => {
  const res = await fetch("/Candidates.xlsx");
  const arrayBuffer = await res.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json<Candidate>(worksheet);
  return jsonData;
};

export const updateColumnInRow = async (
  rowIndex: number,
  columnName: string,
  newValue: any
): Promise<Candidate[]> => {
  const data = await readFromExcelFile();

  // Check if the specified row index is valid
  if (rowIndex < 0 || rowIndex >= data.length) {
    throw new Error("Invalid row index");
  }

  // Update the specified column in the specified row
  if (data[rowIndex].hasOwnProperty(columnName)) {
    data[rowIndex][columnName] = newValue;
  } else {
    throw new Error("Column not found in the specified row");
  }

  return data; // Return the modified data or handle it as needed
};

// Example usage
// const exampleRun = async () => {
//   try {
//     const updatedData = await updateColumnInRow(
//       1,
//       "Candidate Email",
//       "newemail@example.com"
//     );
//     console.log(updatedData);
//   } catch (error) {
//     console.error(error);
//   }
// };
