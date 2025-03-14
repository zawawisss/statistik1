import { NextResponse } from "next/server";
import { getPacData, getKecamatanList, getPacIpnu, getPacIppnu } from "../../../lib/mongodb"; // Pastikan path benar

export async function GET() {
  try {
    const [pacData, kecamatanList, ipnuData, ippnuData] = await Promise.all([
      getPacData(),
      getKecamatanList(),
      getPacIpnu(),
      getPacIppnu()
      
    ]);

    return NextResponse.json({
      ...pacData, // Menggabungkan data statistik
      kecamatanList, // Menambahkan daftar kecamatan
      ipnuData,
      ippnuData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
