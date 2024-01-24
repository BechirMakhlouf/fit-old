"use client";
import React from "react";
import { useFormState } from "react-dom";
import { handleAuth } from "@/app/actions";

const AuthForm = () => {
  const [state, formAction] = useFormState(handleAuth, null);

  console.log(state);
  return (
    <form action={formAction}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <input type="submit" />
    </form>
  );
};

export default AuthForm;
