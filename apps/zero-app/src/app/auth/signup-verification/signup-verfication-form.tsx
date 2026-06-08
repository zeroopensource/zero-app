import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ZeroLogo } from "@/components/ui/zero-logo";
import { AuthFormFooter } from "../auth-form-footer";

export function SignupVerificationForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const [token] = useQueryState("token");

  return (
    <Card {...props} className="bg-inherit pt-0 ring-transparent">
      <CardHeader className="flex flex-col items-center gap-3 pt-2 pb-2!">
        <ZeroLogo className="h-10! w-10!" />
        <CardTitle className="flex items-center gap-1 text-xl">
          Sign up Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="signupVerificationCode">
                Verification Code
              </FieldLabel>
              <Input disabled id="signupVerificationCode" required />
            </Field>
            <Field>
              <Button disabled type="submit">
                Verify
              </Button>
            </Field>
            <AuthFormFooter />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
