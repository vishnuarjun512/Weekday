import { useState } from "react";

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    onOpenChange,
  };
};
