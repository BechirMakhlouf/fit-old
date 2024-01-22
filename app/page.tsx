import AuthForm from "@/components/AuthForm";
import { UserCredentials } from "@/schemas/userCredentialsSchema";
import { User } from "@/schemas/userSchema";
import { createUser } from "@/server/api";

const dummyUser: User = {
  firstName: "jhonny",
  lastName: "blanco",
  userName: "dummy",
  birthday: new Date("07-22-2001"),
  created_at: new Date(),
  last_visited: new Date(),
};

const dummyUserCredentials: UserCredentials = {
  providerId: "123",
  providerUserId: "456",
  password: "test",
};

// createUser(dummyUser, dummyUserCredentials);
export default async function Home() {
  return (
    <>
      <AuthForm />
      <h1>hello world</h1>
    </>
  );
}
