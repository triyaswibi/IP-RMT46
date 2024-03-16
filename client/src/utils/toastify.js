import Toastify from "toastify-js";

export default function showToast({ message = "Invalid Email/Password" }) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      padding: "8px",
      borderRadius: "16px",
      right: 0,
      zIndex: 999,
      position: "fixed",
      background: "#f55856",
    },
    onClick: function () {},
  }).showToast();
}
