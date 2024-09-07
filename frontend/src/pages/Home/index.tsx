import axios from "axios";
import { useEffect } from "react";

import { convertExcelDate } from "@/lib/excelDateNumbertoDate";
// import { readFromExcelFile } from "@/lib/excelOperations";

import useSheetData from "@/hooks/use-sheet-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useInterviewStore from "@/states/InterviewState";
import {
  useCandidateActionSheet,
  useCrudSheet,
} from "@/hooks/use-action-sheet";
import { Candidate } from "@/types/frontEndTypes";
import CandidateActionsheet from "./components/CandidateAction";
import CandidateCrudSheet from "./components/CandidateCRUD";

const Home = () => {
  const { toast } = useToast();
  const { sheetData, updateSheetData, setSheetData } = useSheetData();

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
  const setCurrentCandidate = useInterviewStore(
    (state) => state.setCurrentCandidate
  );

  const handleOpenActionSheet = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent the dropdown from closing
    const candidateData = event.currentTarget.getAttribute("data-value");
    if (candidateData) {
      const parsedCandidate: Candidate = JSON.parse(candidateData); // Parse as Candidate type

      // Set the current candidate using the store
      setCurrentCandidate(parsedCandidate);
    }
    openActionSheet(); // Use hook to open the Candidate Action Sheet
  };

  const handleOpenCrudSheet = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent the dropdown from closing
    event.stopPropagation(); // Prevent the dropdown from closing
    const candidateData = event.currentTarget.getAttribute("data-value");
    if (candidateData) {
      const parsedCandidate: Candidate = JSON.parse(candidateData); // Parse as Candidate type

      // Set the current candidate using the store
      setCurrentCandidate(parsedCandidate);
    }

    openCrudSheet(); // Use hook to open the CRUD Sheet
  };

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      // const excelData = await readFromExcelFile();

      const res = await axios.get("/api");
      const excelData = res.data.excelData;

      const parsingLinks = excelData.map(
        (singleCandidate: any, index: number) => {
          if (index == 0) {
            console.log(singleCandidate);
          }
          const links = JSON.parse(singleCandidate?.["Scheduling method"]);

          return {
            ...singleCandidate,

            // Convert the "Added On" date
            "Added On":
              typeof singleCandidate["Added On"] === "number"
                ? convertExcelDate(singleCandidate["Added On"])
                : singleCandidate["Added On"],
            Rounds: links,
          };
        }
      );

      updateSheetData(parsingLinks);
    };
    fetchGoogleSheetData();
  }, []);

  return (
    <div className="">
      {sheetData?.length != 0 ? (
        <>
          <div>
            {sheetData[0]?.Candidate} round is {sheetData[0]?.Round}
            <div className="flex justify-center items-center border-[1px] border-white">
              <table>
                <th></th>
                <div className="">
                  {sheetData.map((singleCandidate) => {
                    return (
                      <tr
                        key={
                          singleCandidate.Candidate + singleCandidate.Company
                        }
                        className="grid grid-cols-9 text-center border-b-[1px] border-white "
                      >
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate.Company}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate.Candidate}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate["Candidate Email"]}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate.Interviewer}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate["Interviewer Email"]}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate.Round}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate.Status}
                        </td>
                        <td className="border-r-[1px] border-white p-1">
                          {singleCandidate["Added On"]}
                        </td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-white text-black flex flex-col space-y-1 p-2 rounded-xl"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    singleCandidate["Candidate Email"]
                                  );
                                  toast({
                                    title: "Copied to Clipboard",
                                    description:
                                      "Email has been Copied to Clipboard",
                                  });
                                }}
                              >
                                Copy Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                data-value={JSON.stringify(singleCandidate)}
                                onClick={handleOpenActionSheet}
                              >
                                Candidate Actions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                data-value={JSON.stringify(singleCandidate)}
                                onClick={handleOpenCrudSheet}
                              >
                                Edit Candidate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </div>
              </table>
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
            </div>
          </div>
        </>
      ) : (
        <div>No Data Fetched from Google Docs</div>
      )}
    </div>
  );
};

export default Home;
