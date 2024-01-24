"use client";
import * as v from "valibot";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitHandler, useForm } from "react-hook-form";

const formSchema = v.object({
  email: v.string([v.email()]),
  password: v.string([
    v.minLength(8, "Your password must be at least 8 characters long"),
    v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number"),
  ]),
});

type formInputs = v.Output<typeof formSchema>;

const SignInForm = () => {
  const form = useForm<formInputs>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: formInputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"

            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="type email..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="type password..." {...field} />
                  </FormControl>
                  <FormDescription>
                    account password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button variant="outline" type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
