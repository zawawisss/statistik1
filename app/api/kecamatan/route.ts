import { NextResponse } from "next/server";
import { getKecamatanList } from "@/lib/mongodb";

export async function GET() {
  const kecamatanList = await getKecamatanList();
  return NextResponse.json(kecamatanList);
}
