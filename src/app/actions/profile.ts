"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Static test user ID for now as we don't have full auth yet
const TEST_USER_ID = "test-user-123";

/**
 * Ensures a test user exists in the database.
 */
async function ensureTestUser() {
  const user = await prisma.user.findUnique({
    where: { id: TEST_USER_ID },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        id: TEST_USER_ID,
        email: "test@example.com",
        password: "hashedpassword",
        name: "Test User",
      },
    });
  }
}

export async function getProfileAction() {
  await ensureTestUser();
  const user = await prisma.user.findUnique({
    where: { id: TEST_USER_ID },
  });
  return user;
}

export async function updateProfileAction(formData: FormData) {
  const name = formData.get("name") as string;
  const portfolio_url = formData.get("portfolio") as string;
  const github_url = formData.get("github") as string;
  const linkedin_url = formData.get("linkedin") as string;
  const resume_url = formData.get("resume") as string;
  const preferences = formData.get("preferences") as string;

  try {
    await ensureTestUser();
    
    await prisma.user.update({
      where: { id: TEST_USER_ID },
      data: {
        name,
        portfolio_url,
        github_url,
        linkedin_url,
        resume_url,
        preferences,
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.error("Update Profile Error:", error);
  }
}
