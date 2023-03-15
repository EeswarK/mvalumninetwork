import { getServerAuthSession } from "@/server/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the session from the server using the getServerSession wrapper function
  const token = await getToken({ req });

  token.


  return res.status(200).json({ user });
}
