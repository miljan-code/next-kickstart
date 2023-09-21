import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return { session };
};

export const getCurrentUser = async () => {
  const { session } = await getUserSession();

  if (!session) return null;

  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!currentUser) return null;

  return { currentUser };
};
