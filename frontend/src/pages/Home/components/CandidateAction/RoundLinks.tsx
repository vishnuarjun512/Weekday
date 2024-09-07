import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Terminal } from "lucide-react";
import useInterviewStore from "@/states/InterviewState";

import { useToast } from "@/hooks/use-toast";
import ContactDrawer from "./ContactDrawer";
import { useDrawer } from "@/hooks/use-drawer";

const RoundLinks = () => {
  const { currentCandidate } = useInterviewStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Add logic to handle submit, such as saving to Excel and the database
    console.log("Submitting changes...");
  };
  const roundLinks = currentCandidate?.Rounds;

  const { toast } = useToast();

  const { isOpen, openDrawer, closeDrawer, onOpenChange } = useDrawer();

  const handleOpenDrawer = () => {
    // Perform submit action
    console.log("Submitted!");
    closeDrawer();
  };
  return (
    <Card className="w-[350px] my-3">
      <CardHeader>
        <CardTitle>Round Links</CardTitle>
        <CardDescription>Info of the Interview Round links</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Round Links</Label>
              <div id="RoundLinks">
                {roundLinks.map((roundLink: any, i: number) => {
                  return (
                    <Alert key={roundLink.roundNumber + i}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4" />
                          <div className="grid">
                            <AlertTitle>{roundLink?.roundNumber}</AlertTitle>
                            <AlertDescription>
                              {roundLink?.link}
                            </AlertDescription>
                          </div>
                        </div>
                        <Copy
                          onClick={() => {
                            navigator.clipboard.writeText(roundLink.link);
                            toast({
                              title: "Copied to Clipboard",
                              description: "Link has been Copied to Clipboard",
                            });
                          }}
                          className="h-4 w-4 cursor-pointer hover:scale-110 ease-in-out transition-all duration-150"
                        />
                      </div>
                    </Alert>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={openDrawer} variant="default" className="bg-green-400">
          Contact Candidate
        </Button>
      </CardFooter>
      <ContactDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Are you absolutely sure?"
        description="This action cannot be undone."
        onSubmit={handleOpenDrawer}
      />
    </Card>
  );
};

export default RoundLinks;
