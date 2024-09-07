import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import useInterviewStore from "@/states/InterviewState";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContactDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onSubmit: () => void;
}

const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const { currentCandidate } = useInterviewStore();

  // Provide default values in case of undefined
  const candidateName = currentCandidate?.["Candidate"] || "Candidate";
  const candidateEmail =
    currentCandidate?.["Candidate Email"] || "No email provided";
  const candidatePhone =
    currentCandidate?.["Candidate Phone"] || "No phone number provided";
  const companyName = String(currentCandidate?.Company) || "Company-Name";
  const calendlyLink = "https://calendly.com"; // Dynamically generate or use a preset link

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="dark bg-secondary text-foreground">
        <DrawerHeader>
          <DrawerTitle>Contact</DrawerTitle>
          <DrawerDescription>
            Get in touch with your Candidates here
          </DrawerDescription>
        </DrawerHeader>

        <Tabs
          defaultValue="email"
          className="min-[1200px] flex flex-col items-center"
        >
          <TabsList defaultValue="email" defaultChecked>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="whatsapp">Whatsapp</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          <TabsContent defaultChecked className="h-[400px]" value="email">
            <CandidateEmail email={candidateEmail} />
            <EmailTemplate
              candidateName={candidateName}
              companyName={companyName}
              calendlyLink={calendlyLink}
            />
          </TabsContent>
          <TabsContent className="h-[400px]" value="whatsapp">
            <CandidateWhatsApp phone={candidatePhone} />
            <WhatsAppTemplate
              candidateName={candidateName}
              companyName={companyName}
              calendlyLink={calendlyLink}
            />
          </TabsContent>
          <TabsContent className="h-[400px]" value="phone">
            <CandidatePhone phone={candidatePhone} />
            <PhoneCallScript
              candidateName={candidateName}
              companyName={companyName}
            />
          </TabsContent>
        </Tabs>

        <DrawerFooter className="mt-4">
          <div className="flex justify-center items-center gap-4">
            <Button onClick={onSubmit}>Close</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const CandidateWhatsApp: React.FC<{ phone: string }> = ({ phone }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-2 ">
      <div className="flex justify-center  items-center flex-col px-8 py-3 rounded-xl bg-black/15">
        <div className="">Click to Whatsapp</div>
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};

const CandidatePhone: React.FC<{ phone: string }> = ({ phone }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-2 ">
      <div className="flex justify-center  items-center flex-col px-8 py-3 rounded-xl bg-black/15">
        <div className="">Click to call on Phone</div>
        <a href={`tel:${phone}`} className="text-blue-600 underline">
          {phone}
        </a>
      </div>
    </div>
  );
};

const CandidateEmail: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-2 ">
      <div className="flex justify-center  items-center flex-col px-8 py-3 rounded-xl bg-black/15">
        <div className="">Click to Send Mail</div>
        <a href={`mailto:${email}`} className="text-blue-600 underline">
          {email}
        </a>
      </div>
    </div>
  );
};

// Email template
const EmailTemplate: React.FC<{
  candidateName: string;
  companyName: string;
  calendlyLink: string;
}> = ({ candidateName, companyName, calendlyLink }) => (
  <div className="p-4 mt-4 flex flex-col">
    <h3 className="text-lg font-bold mb-2 flex justify-center underline">
      Email Template
    </h3>
    <p>Subject: Interview Scheduling Reminder - {companyName}</p>
    <p>Dear {candidateName},</p>
    <p>
      We hope you're doing well. This is a friendly reminder to schedule your
      upcoming interview with {companyName}.
    </p>
    <p>
      {" "}
      Please use the following link to choose a time that works best for you:
    </p>
    <a
      href={calendlyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {calendlyLink}
    </a>
    <p>Thank you, and we look forward to your confirmation.</p>
    <p>Best regards,</p>
    <p>Your Name, Weekday Scheduling Team</p>
  </div>
);

// WhatsApp template
const WhatsAppTemplate: React.FC<{
  candidateName: string;
  companyName: string;
  calendlyLink: string;
}> = ({ candidateName, companyName, calendlyLink }) => (
  <div className=" p-4 mt-4">
    <h3 className="text-lg font-bold mb-2">WhatsApp Template</h3>
    <p>
      Hi ${candidateName}, Just a quick reminder to schedule your interview with
      ${companyName}.
    </p>
    <p>Please use this link: ${calendlyLink}</p>
    Thanks!
  </div>
);

// Phone Call Script
const PhoneCallScript: React.FC<{
  candidateName: string;
  companyName: string;
}> = ({ candidateName, companyName }) => (
  <div className="p-4 mt-4">
    <h3 className="text-lg font-bold mb-2">Phone Call Script</h3>
    <p>Hi ${candidateName}, This is [Your Name] from Weekday.</p>
    <p>
      I'm just calling to remind you to schedule your interview with $
      {companyName}.
    </p>
    <p>
      We sent you a link earlier—can I help you with scheduling that now?
      Thanks!
    </p>
  </div>
);

export default ContactDrawer;
