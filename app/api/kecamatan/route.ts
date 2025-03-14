import { NextResponse } from "next/server";
import { getKecamatanList } from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // Menjadikan API selalu dinamis

export async function GET() {
  const kecamatanList = await getKecamatanList();
  return NextResponse.json(kecamatanList);
}
