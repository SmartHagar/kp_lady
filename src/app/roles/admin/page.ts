/** @format */

// redirect to dashboard server side
import { redirect } from "next/navigation";

export default function page() {
  redirect("/roles/admin/dashboard");
}
