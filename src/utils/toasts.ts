import { toast } from "react-hot-toast";

export const successToast = (message: string) =>
  toast.success(`${message}`, {
    duration: 2500,
    position: "top-center",
    style: {
      border: "1px solid purple",
      backgroundColor: "white",
    },
  });

export const errorToast = (message: string) =>
  toast.error(`${message}`, {
    duration: 2500,
    position: "top-center",
    style: {
      border: "1px solid purple",
      backgroundColor: "white",
    },
  });
