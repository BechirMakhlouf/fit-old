import { UserAuth } from "@/server/auth/userAuth";
import { User } from "@/schemas/User";
import { Session } from "lucia";

export default async function Home() {
  // const user: User = new User(
  //   "bechir",
  //   "makhlouf",
  //   "bycharo",
  //   new Date("07-22-2001"),
  //   {
  //     providerId: "email",
  //     providerUserId: "bechirM@proton.me",
  //     password: "bayinoyi123",
  //   },
  // );
  // UserAuth.registerUser(user)

  const dummySession: Session = {
    user: { userId: "9mxv3q5lghrlute" },
    sessionId: "jg0xlcvz8nstxow2y5e8vo2j04ndc0uno0mx8hie",
    activePeriodExpiresAt: new Date("2024-01-26T13:47:18.951Z"),
    idlePeriodExpiresAt: new Date("2024-02-09T13:47:18.951Z"),
    state: "active",
    fresh: false,
  };

  // const user: User = await UserAuth.getUserFromCredentials({
  //   providerId: "email",
  //   providerUserId: "bechirM@proton.me",
  //   password: "bayinoyi123",
  // });
  return (
    <>
      <h1>Home.</h1>
    </>
  );
}
