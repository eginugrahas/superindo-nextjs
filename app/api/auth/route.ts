import { NextApiRequest, NextApiResponse } from "next";
import users from '../../jsons/user.json'

var jwt = require('jsonwebtoken');
var crypto = require('crypto');

export async function POST(req:any) {
  const { username, password } = await req.json();

  const user = users.find((u) => u.username === username);

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 405,
      statusText: "Error",
    });
  }

  if (user.password !== password) {
    return new Response(JSON.stringify({ message: "Password not match" }), {
      status: 405,
      statusText: "Error",
    });
  }

  const token = jwt.sign({username: username, password: password}, crypto.randomBytes(32).toString('hex'))
  const res = {user: user, token: token}

  return new Response(JSON.stringify(res), {
    status: 200,
    statusText: "OK",
  });
}
