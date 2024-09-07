export type Candidate = {
  id: number;
  Company: number;
  Interviewer: string;
  "Interviewer Email": string;
  Candidate: string;
  "Candidate Email": string;
  "Candidate Phone": string;
  "Scheduling method": string;
  Round: string;
  "Added On": string;
  Rounds: any;
  Status?: number;
};

export type InterviewStore = {
  candidates: Candidate[];
  currentCandidate: Candidate | null;
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: number) => void;
  resetCandidates: () => void;
  setCurrentCandidate: (candidate: Candidate) => void;
  getCurrentCandidate: () => Candidate | null;
};
