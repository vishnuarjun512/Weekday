import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import InfoCardCandidate from "./InfoCard";
import { Candidate } from "@/types/frontEndTypes";

interface CandidateCrudSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sheetData: Candidate[]; // Accept sheetData
  setSheetData: React.Dispatch<React.SetStateAction<Candidate[]>>;
}
const CandidateCrudSheet: React.FC<CandidateCrudSheetProps> = ({
  open,
  onOpenChange,
  setSheetData,
  sheetData,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="dark bg-secondary">
        <SheetHeader>
          <SheetTitle>Candidate Info Edit</SheetTitle>
          <SheetDescription>
            Change Information on the Interview for the Candidate here
          </SheetDescription>
        </SheetHeader>
        <InfoCardCandidate sheetData={sheetData} setSheetData={setSheetData} />
      </SheetContent>
    </Sheet>
  );
};

export default CandidateCrudSheet;
