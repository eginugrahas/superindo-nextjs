import { NextApiRequest, NextApiResponse } from "next";

const users = [
  { id: 101, name: "Admin 01", username: "admin01", password:"admin01", isOperator: true },
  { id: 102, name: "Admin 02", username: "admin02", password:"admin02", isOperator: true },
  { id: 103, name: "Admin 03", username: "admin03", password:"admin03", isOperator: true },
  { id: 201, name: "John Smith", username: "johnsmith", password:"passjs", isOperator: false },
  { id: 202, name: "Maria Hill", username: "mariahill", password:"passmh", isOperator: false },
  { id: 202, name: "Jake Mass", username: "jakemass", password:"passjm", isOperator: false },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(users);
};
