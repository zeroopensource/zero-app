import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupVerificationForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Signup Verification</CardTitle>
        <CardDescription>
          Enter the verification code send to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="signupVerificationCode">
                Signup Verification Code
              </FieldLabel>
              <Input id="signupVerificationCode" required />
            </Field>
            <Field>
              <Button type="submit">Verify</Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
