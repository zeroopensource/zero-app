import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/components/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ZeroLogo } from "@/components/ui/zero-logo";
import { AuthFormFooter } from "../auth-form-footer";

const formSchema = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must include at least one special character"
    )
    // biome-ignore lint/performance/useTopLevelRegex: Intentional
    .refine((val) => !/\s/.test(val), "Password must not contain spaces"),
});

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
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
        <CardTitle className="flex items-center">
          Sign in to your <ZeroLogo className="mx-1 h-4 w-4" /> Account
        </CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form
          id="signin-form"
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
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="email"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
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
              name="password"
            />
            <Field>
              <Button form="signin-form" type="submit">
                Sign in
              </Button>
            </Field>
            <AuthFormFooter />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
