import { create } from "zustand";
import { Candidate, InterviewStore } from "@/types/frontEndTypes";

const useInterviewStore = create<InterviewStore>((set, get) => ({
  candidates: [],
  currentCandidate: null,

  addCandidate: (candidate: Candidate) =>
    set((state) => ({
      candidates: [...state.candidates, candidate],
    })),

  removeCandidate: (id: number) =>
    set((state) => ({
      candidates: state.candidates.filter((candidate) => candidate.id !== id),
    })),

  resetCandidates: () =>
    set(() => ({
      candidates: [],
    })),

  setCurrentCandidate: (candidate: Candidate) =>
    set(() => ({
      currentCandidate: candidate,
    })),

  getCurrentCandidate: (): Candidate | null => {
    const state = get();
    return state.currentCandidate;
  },
}));

export default useInterviewStore;
