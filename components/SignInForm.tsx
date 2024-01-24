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
import { useForm } from "react-hook-form";

const formSchema = v.object({
  email: v.string([v.email()]),
  password: v.string([
    // v.empt
    v.minLength(8, "Your password must be at least 8 characters long"),
    v.maxLength(64),
    v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number"),
  ]),
});

type formInputs = v.Output<typeof formSchema>;

const SignInForm = () => {
  const form = useForm<formInputs>({
    resolver: valibotResolver(formSchema),
    // defaultValues: {
    //   email: "hello darkness",
    //   password: "my old friend",
    // },
  });
  function onSubmit(values: formInputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <div className="h-screen flex justify-center items-center">
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
                      <Input
                        type="password"
                        placeholder="type password..."
                        autoComplete=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button variant="outline" type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignInForm;
