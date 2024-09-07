import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import useInterviewStore from "@/states/InterviewState";

import { Candidate } from "@/types/frontEndTypes";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface InfoCardProps {
  sheetData: Candidate[]; // Accept sheetData
  setSheetData: React.Dispatch<React.SetStateAction<Candidate[]>>;
}
const InfoCardCandidate: React.FC<InfoCardProps> = ({
  sheetData,
  setSheetData,
}) => {
  const { currentCandidate } = useInterviewStore();
  useEffect(() => {
    if (currentCandidate) {
      setFormData({
        selectedStatus: currentCandidate.Status ?? 0, // Fallback to 0 if Status is undefined or null
        selectedRound: currentCandidate.Round ?? "Round 1", // Fallback to "Round 1" if Round is undefined or null
      });
    }
  }, [currentCandidate]);
  const { toast } = useToast();

  // Define form fields as an array of objects
  const formFields = [
    {
      id: "Candidate",
      label: "Candidate Name",
      placeholder: "Enter candidate name",
      defaultValue: currentCandidate?.Candidate,
    },
    {
      id: "Candidate Email",
      label: "Candidate Email",
      placeholder: "Enter candidate email",
      defaultValue: currentCandidate?.["Candidate Email"],
    },
    {
      id: "Company",
      label: "Company Name",
      placeholder: "Enter company name",
      defaultValue: currentCandidate?.Company,
    },
    {
      id: "Interviewer",
      label: "Interviewer Name",
      placeholder: "Enter interviewer name",
      defaultValue: currentCandidate?.Interviewer,
    },
    {
      id: "Interviewer Email",
      label: "Interviewer Email",
      placeholder: "Enter interviewer email",
      defaultValue: currentCandidate?.["Interviewer Email"],
    },
  ];

  // Local state to manage form data
  const [formData, setFormData] = useState(
    formFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: field.defaultValue || "",
      }),
      {}
    )
  );

  // Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCandidate) {
      toast({
        title: "Error",
        description: "No candidate selected.",
        variant: "destructive",
      });
      return; // Exit the function if currentCandidate is undefined
    }

    try {
      const res = await axios.put(
        `/api/candidates/${currentCandidate.id}`,
        formData
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
    } catch (error) {
      console.error("Error updating candidate information:", error);
    }
  };

  return (
    <Card className="w-[350px] my-3">
      <CardHeader>
        <CardTitle>Update Candidate Info</CardTitle>
        <CardDescription>
          Click on Submit to apply changes to the Excel Sheet as well as the
          Database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            {formFields.map((field) => (
              <div className="flex flex-col gap-2" key={field.id}>
                <Label htmlFor={field.id}>{field.label}:</Label>
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="destructive">Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InfoCardCandidate;
