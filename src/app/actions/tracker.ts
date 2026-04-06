"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function trackJobAction(formData: FormData) {
  const jobId = formData.get("jobId") as string;
  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const url = formData.get("url") as string;
  const tags = formData.get("tags") as string;

  try {
    // 1. Ensure the Job exists in our database
    let job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      job = await prisma.job.create({
        data: {
          id: jobId,
          title,
          company,
          location,
          url,
          tags,
          source: "Arbeitnow",
          date_posted: new Date(),
        },
      });
    }

    // 2. Check if already tracked
    const existingApp = await prisma.application.findFirst({
      where: { job_id: jobId },
    });

    if (existingApp) {
      return; 
    }

    // 3. Create the Application
    await prisma.application.create({
      data: {
        job_id: jobId,
        status: "applied",
      },
    });

    revalidatePath("/tracker");
  } catch (error) {
    console.error("Tracker Action Error:", error);
  }
}

export async function updateApplicationStatusAction(applicationId: string, newStatus: string) {
  try {
    await prisma.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    });

    revalidatePath("/tracker");
  } catch (error) {
    console.error("Update Status Error:", error);
  }
}

export async function deleteApplicationAction(applicationId: string) {
  try {
    await prisma.application.delete({
      where: { id: applicationId },
    });

    revalidatePath("/tracker");
  } catch (error) {
    console.error("Delete Application Error:", error);
  }
}
