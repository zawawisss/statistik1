import { NextResponse } from "next/server";
import { getKecamatanById } from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // Menjadikan API selalu dinamis

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const kecamatan = await getKecamatanById(params.id);
    if (!kecamatan) {
      return NextResponse.json({ error: "Kecamatan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(kecamatan);
  } catch (error) {
    console.error("Error fetching kecamatan by ID:", error);
    return NextResponse.json({ error: "Failed to fetch kecamatan" }, { status: 500 });
  }
}
