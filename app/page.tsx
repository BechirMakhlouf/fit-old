"use client";

import AuthForm from "@/components/AuthForm";
import { User } from "@/schemas/User";
import { Session } from "lucia";
import { UserAuth } from "@/server/auth/userAuth";
import { useTheme } from "next-themes";
//
// const dummyUser: User = new User(
//   "nelsdlfkjks",
//   "ldkfjdslkd",
//   "ldskjllsdkfjf",
//   new Date("08-22-2000"),
//   {
//     providerId: "email",
//     providerUserId: "anothertwo@noyi.com",
//     password: "bayinoyi123",
//   },
// );
//
// dummyUser.getId().then((id) => console.log("id is :", id))
// UserAuth.registerUser(dummyUser)

export default function Home() {
  const { theme, setTheme } = useTheme();
  // setTheme("system");
  // console.log(theme);
  return (
    <>
    </>
  );
}
