import { createContext } from "react";
import { useState } from "react";
import MySnackBar from "../myComponents/MySnackBar";
import { useContext } from "react";
export let toastContext = createContext("");

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setMessage(message);
    setOpen(true);
  }
  return (
    <toastContext.Provider value={showHideToast}>
      <MySnackBar open={open} setOpen={setOpen} message={message} />

      {children}
    </toastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(toastContext);
};
