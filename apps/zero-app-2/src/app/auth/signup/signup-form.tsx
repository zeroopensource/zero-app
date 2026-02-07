import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/components/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ZeroLogo } from "@/components/ui/zero-logo";
import { ZeroSchema } from "@/lib/zero-schema";
import { AuthFormFooter } from "../auth-form-footer";

const formSchema = ZeroSchema.pick({
  email: true,
  newConfirmedPassword: true,
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      newConfirmedPassword: {
        newPassword: "",
        confirmPassword: "",
      },
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          name: value.email,
          email: value.email,
          password: value.newConfirmedPassword.newPassword,
        },
        {
          onSuccess: (
            // ctx
          ) => {
            router.push("/app");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    },
  });
  return (
    <Card {...props} className="pt-0">
      <CardHeader className="border-b pt-2 pb-2!">
        <CardTitle className="flex items-center gap-1">
          Create a <ZeroLogo className="h-4! w-4!" /> Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" required type="email" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
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
                <Button type="submit">Sign up</Button>
              </Field>
              <AuthFormFooter />
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
