"use server";

import {database} from "@/db/database";
import {itemSchema} from "@/db/schema";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {getSignedUrlForS3Object} from "@/lib/s3";
import {ItemConditionEnum} from "@/util/enums";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction({
  imageMain,
  name,
  priceStart,
  bidInterval,
  condition,
  endDate,
  }: {
  imageMain: string,
  name: string,
  priceStart: number,
  bidInterval: number,
  condition: ItemConditionEnum,
  endDate: Date
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized")
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized")
  }

  await database.insert(itemSchema).values({
    name,
    priceStart,
    highestBid: priceStart,
    bidInterval,
    condition,
    imageMain,
    userId: user.id,
    endDate,
  })

  redirect('/');
}