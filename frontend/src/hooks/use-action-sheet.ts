import { useState } from "react";

// Hook for managing Candidate Action Sheet
export const useCandidateActionSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  return { isOpen, openSheet, closeSheet, onOpenChange };
};

// Hook for managing CRUD Sheet
export const useCrudSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  return { isOpen, openSheet, closeSheet, onOpenChange };
};
