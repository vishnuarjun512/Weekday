import { useState } from "react";
import { Candidate } from "@/types/frontEndTypes";
import axios from "axios";
import { useToast } from "./use-toast";

const useSheetData = () => {
  const { toast } = useToast();
  const [sheetData, setSheetData] = useState<Candidate[]>([]);

  const updateSheetData = (newData: Candidate[]) => {
    setSheetData(newData);
  };

  const updateCandidate = async (
    id: number,
    newCandidateData: Partial<Candidate>
  ) => {
    try {
      // Send the API call to update the candidate data on the server
      const res = await axios.put(`/api/candidates/${id}`, newCandidateData);

      // Update the local state after a successful API call
      const newData = sheetData.map((candidate) =>
        candidate.id === id ? { ...candidate, ...newCandidateData } : candidate
      );

      setSheetData([...newData]);

      toast({
        title: `Updated ${res.data.data.Candidate}'s data`,
        description: "You can proceed further!",
      });
    } catch (error) {
      console.error("Error updating candidate:", error);
      // Handle error appropriately, e.g., show a notification
    }
  };

  // Function to fetch candidates from the API
  const getCandidate = async (id: number) => {
    try {
      const response = await axios.get(`/api/candidate/${id}`); // Adjust the endpoint as necessary
      setSheetData(response.data); // Assuming the response data is an array of candidates
    } catch (error) {
      console.error("Error fetching candidates:", error);
      // Handle error appropriately, e.g., show a notification
    }
  };

  // Function to delete a candidate
  const deleteCandidate = async (id: number) => {
    try {
      await axios.delete(`/api/candidates/${id}`); // Adjust the endpoint as necessary
      setSheetData((prevData) =>
        prevData.filter((candidate) => candidate.id !== id)
      ); // Update local state
    } catch (error) {
      console.error("Error deleting candidate:", error);
      // Handle error appropriately
    }
  };

  // Function to create a new candidate
  const createCandidate = async (newCandidateData: Candidate) => {
    try {
      const response = await axios.post("/api/candidates", newCandidateData); // Adjust the endpoint as necessary
      setSheetData((prevData) => [...prevData, response.data]); // Add the new candidate to the local state
    } catch (error) {
      console.error("Error creating candidate:", error);
      // Handle error appropriately
    }
  };

  return {
    sheetData,
    updateSheetData,
    updateCandidate,
    createCandidate,
    deleteCandidate,
    getCandidate,
    setSheetData,
  };
};

export default useSheetData;
