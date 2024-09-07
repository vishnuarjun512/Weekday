import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import useInterviewStore from "@/states/InterviewState";
import { Candidate } from "@/types/frontEndTypes";
import axios from "axios";
import { useState, useEffect } from "react";

// Define your status and round options using Maps
const statusOptions = new Map<number, string>([
  [0, "Not Responded"],
  [1, "Responded"],
  [2, "Scheduled"],
  [3, "Declined"],
  [4, "Link 1 Interview Done"],
  [5, "Link 2 Interview Done"],
  [6, "Link 3 Interview Done"],
  [7, "Waiting for Company Result"],
  [8, "Not Selected"],
  [9, "Selected"],
]);

const roundOptions: string[] = ["Round 1", "Round 2", "Round 3"];

interface ActionCardProps {
  sheetData: Candidate[]; // Accept sheetData
  setSheetData: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const ActionCard: React.FC<ActionCardProps> = ({ setSheetData, sheetData }) => {
  const { currentCandidate } = useInterviewStore();

  const { toast } = useToast();

  // Ensure currentCandidate exists, else initialize with default values
  const [formData, setFormData] = useState({
    selectedStatus: currentCandidate?.Status ?? 0,
    selectedRound: currentCandidate?.Round ?? "Round 1",
  });

  useEffect(() => {
    if (currentCandidate) {
      setFormData({
        selectedStatus: currentCandidate.Status ?? 0, // Fallback to 0 if Status is undefined or null
        selectedRound: currentCandidate.Round ?? "Round 1", // Fallback to "Round 1" if Round is undefined or null
      });
    }
  }, [currentCandidate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!currentCandidate) {
      toast({
        title: "Error",
        description: "No candidate selected.",
        variant: "destructive",
      });
      return; // Exit the function if currentCandidate is undefined
    }

    // Prepare the new data to send
    const updatedData = {
      Status: formData.selectedStatus,
      Round: formData.selectedRound,
    };

    console.log("Form data -> ", formData);
    try {
      // Send the API call to update the candidate data on the server
      const res = await axios.put(
        `/api/candidates/${currentCandidate.id}`,
        updatedData
      );

      // Update the local state after a successful API call
      const newData = sheetData.map((candidate: any) =>
        candidate.id === currentCandidate.id
          ? res.data.updatedCandidate
          : candidate
      );

      setSheetData([...newData]);

      toast({
        title: `Updated ${res.data.updatedCandidate.Candidate}'s data `,
        description: "You can proceed further!",
      });
    } catch (error: any) {
      console.error("Error updating candidate:", error);
      toast({
        title: "Error updating candidate",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-[350px] my-3">
      <CardHeader>
        <CardTitle>Candidate Actions</CardTitle>
        <CardDescription>
          Click on Submit to apply changes to the Excel Sheet as well as the
          Database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Status">Status</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, selectedStatus: Number(value) })
                }
                value={formData.selectedStatus.toString()} // ensure the value is correctly set
              >
                <SelectTrigger id="Status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {[...statusOptions.entries()].map(([key, label]) => (
                    <SelectItem key={key} value={key.toString()}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Round">Round</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, selectedRound: value })
                }
                value={formData.selectedRound}
              >
                <SelectTrigger id="Round">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {roundOptions.map((round, index) => (
                    <SelectItem key={index} value={round}>
                      {round}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="destructive" onClick={() => console.log("Cancelled")}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Change
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionCard;
