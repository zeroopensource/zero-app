import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuthVerifyEmail } from "@/components/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { ZeroLogo } from "@/components/ui/zero-logo";
import { AuthFormFooter } from "../auth-form-footer";

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [token] = useQueryState("token");
  const { mutate: verifyEmail, isPending } = useAuthVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(
        {
          token: token || "",
        },
        {
          onSuccess: () => {
            toast.success("Email Verified!");
            router.push("/auth/signin");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  }, [token, router, verifyEmail]);

  console.log(token);

  return (
    <Card {...props} className="bg-inherit pt-0 ring-transparent">
      <CardHeader className="flex flex-col items-center gap-3 pt-2 pb-2!">
        <ZeroLogo className="h-10! w-10!" />
        <CardTitle className="flex items-center gap-2 text-xl">
          {isPending ? (
            <>
              Verifying email
              <Spinner />
            </>
          ) : (
            <>Verified email</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <AuthFormFooter />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
