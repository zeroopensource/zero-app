import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ZeroLogo } from "@/components/ui/zero-logo";
import { AuthFormFooter } from "../auth-form-footer";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props} className="bg-inherit pt-0 ring-transparent">
      <CardHeader className="flex flex-col items-center gap-3 pt-2 pb-2!">
        <ZeroLogo className="h-10! w-10!" />
        <CardTitle className="flex items-center gap-1 text-xl">
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <Input id="password" required type="password" />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" required type="password" />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Reset</Button>
              </Field>
              <AuthFormFooter />
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
