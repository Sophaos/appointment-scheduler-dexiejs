import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    console.log(open);
    setOpen(!open);
  };

  const toggleOff = () => {
    setOpen(false);
  };
  const toggleOn = () => {
    setOpen(true);
  };

  return {
    open,
    toggleModal,
    toggleOn,
    toggleOff,
  };
};
