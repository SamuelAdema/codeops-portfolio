"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";
import SubmitButton from "./submit-button";

const initialState = {
  error: "",
  fieldErrors: {},
};

export default function CheckoutForm() {
  const [state, formAction] = useActionState(placeOrder, initialState);

  return (
    <form action={formAction}>
      {state.success && <p style={{ color: "green" }}>Order placed successfully!</p>}
      {state.error && !state.fieldErrors && <p style={{ color: "red" }}>{state.error}</p>}
      
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
        {state.fieldErrors?.name && (
          <p role="alert" style={{ color: "red" }}>
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" />
        {state.fieldErrors?.phone && (
          <p role="alert" style={{ color: "red" }}>
            {state.fieldErrors.phone[0]}
          </p>
        )}
      </div>

      <input type="hidden" name="dishId" value="1" />

      <SubmitButton />
    </form>
  );
}