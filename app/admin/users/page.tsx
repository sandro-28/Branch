import { redirect } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/actions/users";
import { AdminUsersClient } from "./admin-users-client";

export default async function AdminUsersPage() {
    const isAdmin = await isCurrentUserAdmin();

    if (!isAdmin) {
        redirect("/dashboard");
    }

    return <AdminUsersClient />;
}
