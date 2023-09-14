import { NextApiRequest, NextApiResponse } from "next";
import users from '../../jsons/user.json'

export async function POST(req:any) {
  const { username, password } = await req.json();

  const user = users.find((u) => u.username === username);

  if (!user) {
    // Username not found
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 405,
      statusText: "Error",
    });
  }

  if (user.password !== password) {
    // Password doesn't match
    return new Response(JSON.stringify({ message: "Password not match" }), {
      status: 405,
      statusText: "Error",
    });
  }

  // Username and password match, return the user
  return new Response(JSON.stringify({ data: user }), {
    status: 200,
    statusText: "OK",
  });
}
