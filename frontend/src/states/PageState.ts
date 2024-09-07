// src/stores/usePaginationStore.ts
import { create } from "zustand";

interface PaginationState {
  page: number;
  limit: number;
  totalPages: number;
  setPage: (pageNum: number) => void;
  setTotalPage: (totalPageNum: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
}

const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  totalPages: 10,
  limit: 10,
  setPage: (pageNum) => set({ page: pageNum }),
  setTotalPage: (totalPageNum) => set({ totalPages: totalPageNum }),
  incrementPage: () =>
    set((state) => ({ page: Math.min(state.page + 1, state.totalPages) })),
  decrementPage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),
}));

export default usePaginationStore;
