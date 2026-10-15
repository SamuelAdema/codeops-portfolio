"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signInAction } from "@/app/actions";

function SignInForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Sign In to Addis Eats</h1>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            name="phone"
            type="text"
            required
            defaultValue="0911000001"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            defaultValue="password123"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {state?.error && (
          <p className="text-sm font-medium text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-amber-600 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="rounded-lg bg-stone-100 p-3 text-xs text-stone-700 space-y-1">
        <p className="font-semibold">Test Accounts:</p>
        <p>Customer 1 (Almaz): <code>0911000001</code> / <code>password123</code></p>
        <p>Customer 2 (Dawit): <code>0911000002</code> / <code>password123</code></p>
        <p>Staff Member: <code>0911999999</code> / <code>staffpassword</code></p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <main className="py-8">
      <Suspense fallback={<p>Loading sign-in...</p>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}