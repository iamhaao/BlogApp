import { toast } from "react-toastify";

function Toast({ message, type }) {
  switch (type) {
    case "SUCCESS":
      toast.success(message);
      break;
    case "ERROR":
      toast.error(message);
      break;
    default:
      break;
  }
}

export default Toast;
