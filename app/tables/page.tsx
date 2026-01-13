import { getTables } from "@/lib/actions/tables";
import { TableExplorerClient } from "./table-explorer-client";

export default async function TablesPage() {
    const tables = await getTables();

    return <TableExplorerClient tables={tables} />;
}
