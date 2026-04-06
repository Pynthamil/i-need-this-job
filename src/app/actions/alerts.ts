"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const TEST_USER_ID = "test-user-123";

export async function followCompanyAction(company: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: TEST_USER_ID },
    });

    if (!user) return;

    const followed = user.followed_companies ? user.followed_companies.split(",") : [];
    
    if (followed.includes(company)) {
      // Unfollow
      const newFollowed = followed.filter((c: string) => c !== company);
      await prisma.user.update({
        where: { id: TEST_USER_ID },
        data: { followed_companies: newFollowed.join(",") },
      });
    } else {
      // Follow
      followed.push(company);
      await prisma.user.update({
        where: { id: TEST_USER_ID },
        data: { followed_companies: followed.join(",") },
      });
    }

    revalidatePath("/alerts");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Follow Company Error:", error);
  }
}

export async function getFollowedCompaniesAction() {
  const user = await prisma.user.findUnique({
    where: { id: TEST_USER_ID },
  });
  return user?.followed_companies ? user.followed_companies.split(",") : [];
}
