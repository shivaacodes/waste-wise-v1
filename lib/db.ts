import prisma from "@/prisma/client";

async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user; // Return the user object if found
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    throw new Error("Database query failed");
  }
}

export { getUserByEmail };
