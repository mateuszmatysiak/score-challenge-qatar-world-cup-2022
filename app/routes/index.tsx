import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getUser } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user) {
    return redirect("game");
  }
  return redirect("login");
};
