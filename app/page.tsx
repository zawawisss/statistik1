"use client";
import { StatCard } from "../components/stat-card";
import { TabelPac } from "../components/pac";
// import { MemberTable } from "../components/member-table";
// import { getPacData } from "./../lib/mongodb";
import React from "react";
import { useEffect, useState } from "react";
import { KecamatanId, PacIpnu, PacIppnu } from "../types/statistics";
import { Select, SelectItem } from "@heroui/react";

export default function Home() {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string | null>(
    null
  );
  const [kecamatanList, setKecamatanList] = useState<KecamatanId[]>([]);
  const [kecamatanById, setKecamatanById] = useState<KecamatanId[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const colors = ["primary"];
  const handleSelectKecamatan = (id: string) => {
    setSelectedKecamatan(id);
    console.log("Kecamatan terpilih:", id);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/statistik");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();
        console.log("Data dari API:", json); // Debugging
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedKecamatan) return;

    async function fetchKecamatanById() {
      try {
        const res = await fetch(`/api/kecamatan/${selectedKecamatan}`);
        if (!res.ok) throw new Error("Gagal mengambil data kecamatan");
        const json = await res.json();
        setKecamatanById([json]); // Simpan kecamatan yang dipilih
      } catch (err: any) {
        console.error("Error:", err);
      }
    }

    fetchKecamatanById();
  }, [selectedKecamatan]);

  useEffect(() => {
    async function fetchKecamatan() {
      try {
        const response = await fetch("/api/kecamatan");
        if (!response.ok) throw new Error("Gagal mengambil data kecamatan");
        const data = await response.json();
        setKecamatanList(data);
      } catch (error) {
        console.error("Error fetching kecamatan:", error);
      }
    }
    fetchKecamatan();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
          Statistik PC IPNU-IPPNU Ponorogo
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <StatCard
            title="Total Anggota"
            value={data.totalStats.totalAnggota}
            icon="lucide:users"
            color="primary"
          />
          <StatCard
            title="Total Desa"
            value={data.totalStats.totalDesa}
            icon="lucide:home"
            color="success"
          />
          <StatCard
            title="Total Ranting"
            value={data.totalStats.totalRanting}
            icon="lucide:git-branch"
            color="warning"
          />
          <StatCard
            title="Total Sekolah"
            value={data.totalStats.totalSekolah}
            icon="lucide:school"
            color="secondary"
          />
          <StatCard
            title="Total Komisariat"
            value={data.totalStats.totalKomisariat}
            icon="lucide:building"
            color="primary"
          />
        </div>
        <div className="space-y-4">
          <TabelPac />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              Detail Statistik Kecamatan
            </h2>
            {colors.map((color) => (
              <Select
                key={color}
                className="max-w-xs"
                color={"danger"}
                value={selectedKecamatan || ""}
                label="Kecamatan"
                placeholder="Pilih PAC"
                onChange={(e) => setSelectedKecamatan(e.target.value)}
              >
                {kecamatanList.map((kec) => (
                  <SelectItem key={kec._id}>{kec.kecamatan}</SelectItem>
                ))}
              </Select>
            ))}
          </div>
          {selectedKecamatan && kecamatanById.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              <h3 className="font-bold text-lg">Detail Kecamatan</h3>
              <p>ID: {kecamatanById[0]._id}</p>
              <p>Nama: {kecamatanById[0].kecamatan}</p>
            </div>
          )}
        </div>
      </main>
      {/* 
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
        <StatCard title="Total Desa" value={kecamatanList.totalDesa} icon="lucide:home" color="primary" />
        <StatCard title="Total Ranting" value={kecamatanList.totalRanting} icon="lucide:git-branch" color="success" />
        <StatCard title="Total Sekolah" value={kecamatanList.totalSekolah} icon="lucide:school" color="warning" />
        <StatCard title="Total Komisariat" value={kecamatanList.totalKomisariat} icon="lucide:building" color="secondary" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-4">Data Pengurus PAC</h3>
      <MemberTable members={selectedPAC.members} />

      <h3 className="text-lg sm:text-xl font-bold mb-4">Data Ranting & Komisariat</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <BranchTable branches={selectedPAC.branches} />
        <BranchTable branches={selectedPAC.commissariats} />
      </div> */}
    </div>
  );
}
