"use server";

export async function handleAuth(state: any, formData: FormData): Promise<{
  hello: string;
}> {
  console.log(formData);
  return { hello: "from the server" };
}
