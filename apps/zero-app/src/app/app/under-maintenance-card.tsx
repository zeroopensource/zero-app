import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UnderMaintenanceCard() {
  return (
    <Card className="mx-auto my-auto w-full max-w-sm" size="sm">
      <CardHeader>
        <CardTitle>Under Maintenance</CardTitle>
        <CardDescription>Come back another time.</CardDescription>
      </CardHeader>
    </Card>
  );
}
