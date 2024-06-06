"use server";

import {database} from "@/db/database";
import {itemSchema} from "@/db/schema";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {getSignedUrlForS3Object} from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction({
  fileName,
  name,
  priceStart,
  }: {fileName: string, name: string, priceStart: number}
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized")
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized")
  }

  await database.insert(itemSchema).values({
    name: name,
    priceStart: priceStart,
    fileKey: fileName,
    userId: user.id
  })

  redirect('/');
}