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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { handleSignIn } from "@/app/actions";
import { useFormState } from "react-dom";
import { User } from "@/schemas/User";

const formSchema = v.object({
  email: v.string([
    v.minLength(0, "email is required."),
    v.email("invalid email"),
  ]),
  password: v.string([
    // v.empt
    // v.minLength(8, "Your password must be at least 8 characters long"),
    // v.maxLength(64),
    // v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    // v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    // v.regex(/[0-9]/, "Your password must contain a number"),
  ]),
});

type formInputs = v.Output<typeof formSchema>;

const SignInForm = () => {
  const form = useForm<formInputs>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      email: "hello darkness",
      password: "my old friend",
    },
  });

  async function onSubmit(formData: formInputs) {
    try {
      const user = await handleSignIn({}, {
        providerId: "email",
        providerUserId: formData.email,
        password: formData.password,
      });

      console.log(user);
    } catch (e) {
      console.log("credentials invalid/ couldn't find user");
    }
  }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Sign In</CardTitle>
            <CardDescription>Put in your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="type the email..."
                            {...field}
                          />
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
                            placeholder="type the password..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div>
                  <Button variant="outline" type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignInForm;
