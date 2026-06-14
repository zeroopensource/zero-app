import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import z from "zod";
import { useAuthResetPassword } from "@/components/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ZeroLogo } from "@/components/ui/zero-logo";
import { ZeroSchema } from "@/lib/zero-schema";
import { AuthFormFooter } from "../auth-form-footer";

const formSchema = z
  .object({
    newPassword: ZeroSchema.shape.newPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const [token] = useQueryState("token");
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useAuthResetPassword();
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      resetPassword(
        {
          token: token || "",
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            toast.success("New password saved!");
            router.push("/auth/signin");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    },
  });

  return (
    <Card {...props} className="bg-inherit pt-0 ring-transparent">
      <CardHeader className="flex flex-col items-center gap-3 pt-2 pb-2!">
        <ZeroLogo className="h-10! w-10!" />
        <CardTitle className="flex items-center gap-1 text-xl">
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="newPassword">Password</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="newPassword"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="confirmPassword"
            />
            <FieldGroup>
              <Field>
                <Button
                  disabled={isPending}
                  form="reset-password-form"
                  type="submit"
                >
                  Reset
                  {isPending && <Spinner />}
                </Button>
              </Field>
              <AuthFormFooter />
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
