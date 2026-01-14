import { getTables } from "@/lib/actions/tables";
import { TableExplorerClient } from "./table-explorer-client";

export const dynamic = "force-dynamic";

export default async function TablesPage() {
    const tables = await getTables();

    return <TableExplorerClient tables={tables} />;
}
