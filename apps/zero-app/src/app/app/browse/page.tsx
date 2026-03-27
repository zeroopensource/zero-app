"use client";

import { z } from "zod";
import { DataTable } from "@/components/data-table/data-table";
// import { RecordTable } from "./record-table/record-table";
import { columns, taskSchema } from "./record-table/record-table-columns";

export default function Page() {
  const data = z.array(taskSchema).parse([]);
  return (
    <div className="flex flex-1">
      {/* <RecordTable columns={columns} data={data} /> */}
      {/* <UnderMaintenanceCard /> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
