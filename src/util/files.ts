import {env} from "@/env";

export function getImageUrl(fileKey: string): string {
  return `${env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_URL}/${fileKey}`;
}