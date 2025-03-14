/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const options = {};
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// ✅ Fungsi utama untuk mengambil statistik
export async function getPacData() {
  try {
    const client = await clientPromise;
    const today = new Date().toISOString().split("T")[0];
    const db = client.db("ipnu_ponorogo");

    const pacData = db.collection("database");
    const komisariatData = db.collection("database_komisariat");
    const rantingData = db.collection("database_ranting");
    const anggotaData = db.collection("data_anggota");

    const totalPAC = await pacData.countDocuments();
    const totalSekolah = await komisariatData.countDocuments();
    const totalDesa = await rantingData.countDocuments();
    const totalAnggota = await anggotaData.countDocuments();
    const totalRanting = await rantingData.countDocuments({
      status_sp: "Aktif",
      tanggal_sp: { $gte: today },
    });
    const totalKomisariat = await komisariatData.countDocuments({
      status_sp: "Aktif",
      tanggal_sp: { $gte: today },
    });

    return {
      totalStats: {
        totalPAC,
        totalKomisariat,
        totalRanting,
        totalAnggota,
        totalDesa,
        totalSekolah,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { totalStats: {} };
  }
}

// ✅ Fungsi untuk mendapatkan daftar kecamatan
export async function getKecamatanList() {
  try {
    const client = await clientPromise;
    const db = client.db("ipnu_ponorogo");
    const kecamatanCollection = db.collection("database");

    const kecamatanList = await kecamatanCollection
      .find({}, { projection: { _id: 1, kecamatan: 1 } })
      .toArray();
    return kecamatanList;
  } catch (error) {
    console.error("Error fetching kecamatan:", error);
    return [];
  }
}

// ✅ Fungsi untuk mendapatkan kecamatan berdasarkan ID
export async function getKecamatanById(kecamatanId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("ipnu_ponorogo");
    const kecamatanCollection = db.collection("database");

    const kecamatan = await kecamatanCollection.findOne({
      _id: new ObjectId(kecamatanId), // Sesuaikan dengan tipe `_id` di database
    });

    return kecamatan;
  } catch (error) {
    console.error("Error fetching kecamatan by ID:", error);
    return null;
  }
}

// ✅ Fungsi untuk mendapatkan data PAC IPNU
export async function getPacIpnu() {
  try {
    const client = await clientPromise;
    const db = client.db("ipnu_ponorogo");
    const pacIpnuCollection = db.collection("database");

    const ipnuList = await pacIpnuCollection.find().toArray();
    return ipnuList;
  } catch (error) {
    console.error("Error fetching PAC IPNU data:", error);
    return [];
  }
}

// ✅ Fungsi untuk mendapatkan data PAC IPPNU
export async function getPacIppnu() {
  try {
    const client = await clientPromise;
    const db = client.db("ippnu_ponorogo"); // Pastikan database ini benar
    const pacIppnuCollection = db.collection("database");

    const ippnuList = await pacIppnuCollection.find().toArray();
    return ippnuList;
  } catch (error) {
    console.error("Error fetching PAC IPPNU data:", error);
    return [];
  }
}

export default clientPromise;
