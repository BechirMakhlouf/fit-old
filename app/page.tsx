import AuthForm from "@/components/AuthForm";
import { User } from "@/schemas/User";
import { Session } from "lucia";
import { UserAuth } from "@/server/auth/userAuth";

const dummyUser: User = new User(
  "nelsdlfkjks",
  "ldkfjdslkd",
  "ldskjllsdkfjf",
  new Date("08-22-2000"),
  {
    providerId: "email",
    providerUserId: "anothertwo@noyi.com",
    password: "bayinoyi123",
  },
);

// dummyUser.getId().then((id) => console.log("id is :", id))
// UserAuth.registerUser(dummyUser)


export default async function Home() {
  return (
    <>
      <AuthForm />
    </>
  );
}
