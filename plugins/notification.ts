// import { Snackbar } from "buefy/dist/components/snackbar";

type NotifyType = "is-danger" | "is-success" | "is-warning" | "is-info";

// const defaultOptions = {
//   position: "is-top-right"
// };

const notify = (_type: NotifyType, _message: string, _options?) => {};
// Snackbar.open({
//   ...defaultOptions,
//   ...options,
//   message,
//   type
// });

export const Notification = {
  error: (message: string, options?) => notify("is-danger", message, options),
  success: (message: string, options?) =>
    notify("is-success", message, options),
  warning: (message: string, options?) =>
    notify("is-warning", message, options),
  info: (message: string, options?) => notify("is-info", message, options)
};
