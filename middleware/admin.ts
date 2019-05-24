import { isAuth } from "./utils";

export default function(ctx) {
  return isAuth(ctx, ["ADMIN"]);
}
