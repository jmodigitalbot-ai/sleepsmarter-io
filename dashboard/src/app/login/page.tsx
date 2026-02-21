import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AUTH_COOKIE = "dashboard_auth";

async function loginAction(formData: FormData) {
  "use server";
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    redirect("/");
  }

  const submitted = String(formData.get("password") ?? "");
  if (submitted !== password) {
    redirect("/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string; next?: string };
}) {
  const error = searchParams?.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a2e] px-4 text-[#f1faee]">
      <Card className="w-full max-w-md border-[#4a4e69]/60 bg-[#16213e]/90 shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Sleep Smarter Analytics</CardTitle>
          <p className="text-sm text-[#a8dadc]">
            Enter the dashboard password to continue.
          </p>
          {error ? (
            <Badge className="w-fit bg-[#f87171]/20 text-[#f87171]">
              Incorrect password
            </Badge>
          ) : null}
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={loginAction}>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.2em] text-[#a8dadc]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-[#4a4e69] bg-[#0f172a] px-4 py-3 text-sm text-[#f1faee] shadow-inner outline-none transition focus:border-[#a8dadc]"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#a8dadc] px-4 py-3 text-sm font-semibold text-[#1a1a2e] transition hover:bg-[#c7eef0]"
            >
              Unlock Dashboard
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
