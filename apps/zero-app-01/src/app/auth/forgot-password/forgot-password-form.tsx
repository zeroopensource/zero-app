import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthFormFooter } from "../auth-form-footer";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email for account recovery</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" required type="email" />
            </Field>
            <Field>
              <Button type="submit">Send Recovery Email</Button>
            </Field>
            <AuthFormFooter />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
