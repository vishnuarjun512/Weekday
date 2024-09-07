import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ActionCard from "./ActionCard";
import RoundLinks from "./RoundLinks";
import { Candidate } from "@/types/frontEndTypes";

interface CandidateActionsheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sheetData: Candidate[]; // Accept sheetData
  setSheetData: React.Dispatch<React.SetStateAction<Candidate[]>>;
}
const CandidateActionsheet: React.FC<CandidateActionsheetProps> = ({
  open,
  onOpenChange,
  sheetData,
  setSheetData,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="dark bg-secondary">
        <SheetHeader>
          <SheetTitle>Candidate Action</SheetTitle>
          <SheetDescription>
            Perform Operations on the Interview for the Candidate here
          </SheetDescription>
        </SheetHeader>
        <ActionCard sheetData={sheetData} setSheetData={setSheetData} />
        <RoundLinks />
      </SheetContent>
    </Sheet>
  );
};

export default CandidateActionsheet;
