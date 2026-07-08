"use client";

import { UnderMaintenanceCard } from "@/components/cards/under-maintenance-card";
import {AddRecordForm} from "./add-record-form/add-record-form";

export default function Page() {
  return (
    <div className="flex flex-1 justify-center">
      <AddRecordForm />
    </div>
  );
}
