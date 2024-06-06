"use server";

import {database} from "@/db/database";
import {itemSchema} from "@/db/schema";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {getSignedUrlForS3Object} from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized")
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized")
  }

  await database.insert(itemSchema).values({
    name: formData.get("name") as string,
    priceStart: parseFloat(formData.get("priceStart") as string),
    userId: user.id
  })

  redirect('/');
}