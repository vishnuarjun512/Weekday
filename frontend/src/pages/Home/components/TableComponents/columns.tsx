import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import CandidateActionsheet from "../CandidateAction";

import CandidateCrudSheet from "../CandidateCRUD";

import { useToast } from "@/hooks/use-toast";

import useInterviewStore from "@/states/InterviewState";

import { Candidate } from "@/types/frontEndTypes";
import {
  useCandidateActionSheet,
  useCrudSheet,
} from "@/hooks/use-action-sheet";
import useSheetData from "@/hooks/use-sheet-data";

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "Company",
    header: "Company",
  },
  {
    accessorKey: "Interviewer",
    header: "Interviewer",
  },
  {
    accessorKey: "Interviewer Email",
    header: "Interviewer Email",
  },
  {
    accessorKey: "Candidate",
    header: "Candidate",
  },
  {
    accessorKey: "Candidate Email",
    header: "Candidate Email",
  },

  {
    accessorKey: "Round",
    header: "Current Round",
  },
  {
    accessorKey: "Added On",
    header: "Added On",
    cell: ({ row }) => {
      // Function to convert the date to formatted string without the year
      function formatDateTime(dateString: string) {
        const date = new Date(dateString);

        // Options for formatting the date and time
        const dateOptions: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "short", // Changed to 'short'
        };

        const timeOptions: Intl.DateTimeFormatOptions = {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

        // Get the formatted date and time
        const formattedDate = date.toLocaleDateString("en-IN", dateOptions);
        const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

        // Extract the day to append the appropriate suffix
        const day = date.getDate();
        const suffix =
          day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
            ? "nd"
            : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

        // Construct the final formatted date string
        return `${day}${suffix} ${
          formattedDate.split(" ")[1]
        } ${formattedTime}`; // Combine the month and time
      }

      const date = row.original["Added On"]; // Ensure the date field is correctly accessed
      const formattedTime = formatDateTime(date);
      return <div>{formattedTime}</div>;
    },
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.Status as number; // Assert that status is a number

      // Create a mapping from status number to status string and styles
      const statusMap: Record<number, { label: string; color: string }> = {
        0: { label: "Not Responded", color: "bg-red-400" },
        1: { label: "Responded", color: "bg-orange-400" },
        2: { label: "Scheduled", color: "bg-blue-500" },
        3: { label: "Declined", color: "bg-red-600" },
        4: { label: "1st Interview Done", color: "bg-green-300" },
        5: { label: "2nd Interview Done", color: "bg-green-400" },
        6: { label: "3rd Interview Done", color: "bg-green-500" },
        7: { label: "Waiting for Company Result", color: "bg-yellow-300" },
        8: { label: "Not Selected", color: "bg-red-700" },
        9: { label: "Selected", color: "bg-green-600" },
      };

      // Get the status label and color based on the status number
      const { label, color } = statusMap[status] || {
        label: "Unknown",
        color: "bg-black",
      };

      return (
        <div
          className={`${color} px-2 py-1 font-semibold rounded-xl text-black whitespace-nowrap`}
        >
          {label}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const interview = row.original;
      const { toast } = useToast();

      // Use hooks to manage CandidateActionSheet and CandidateCrudSheet
      const {
        isOpen: isActionSheetOpen,
        openSheet: openActionSheet,
        onOpenChange: onActionSheetOpenChange,
      } = useCandidateActionSheet();
      const {
        isOpen: isCrudSheetOpen,
        openSheet: openCrudSheet,
        onOpenChange: onCrudSheetOpenChange,
      } = useCrudSheet();

      // Zustand state to store user data
      const { setCurrentCandidate } = useInterviewStore();

      const handleOpenActionSheet = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the dropdown from closing
        setCurrentCandidate(interview);
        openActionSheet(); // Use hook to open the Candidate Action Sheet
      };

      const handleOpenCrudSheet = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the dropdown from closing
        setCurrentCandidate(interview);
        openCrudSheet(); // Use hook to open the CRUD Sheet
      };

      const { setSheetData, sheetData } = useSheetData();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(interview["Candidate Email"]);
                  toast({
                    title: "Copied to Clipboard",
                    description: "Email has been Copied to Clipboard",
                  });
                }}
              >
                Copy Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOpenActionSheet}>
                Candidate Actions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenCrudSheet}>
                Edit Candidate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CandidateActionsheet
            open={isActionSheetOpen}
            onOpenChange={onActionSheetOpenChange}
            sheetData={sheetData}
            setSheetData={setSheetData}
          />
          <CandidateCrudSheet
            open={isCrudSheetOpen}
            onOpenChange={onCrudSheetOpenChange}
            sheetData={sheetData}
            setSheetData={setSheetData}
          />
        </>
      );
    },
  },
];
