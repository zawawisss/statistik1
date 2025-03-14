import React, { useState, useEffect } from "react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
} from "@heroui/react";
import { PacIpnu, PacIppnu } from "../types/statistics";

const getStatus = (tanggal_berakhir: string) => {
  if (!tanggal_berakhir) return "Tidak Ada Data";
  const today = new Date();
  const tanggalSK = new Date(tanggal_berakhir + "T00:00:00Z");
  return tanggalSK >= today ? "Aktif" : "Tidak Aktif";
};

export function TabelPac() {
  const [ipnuData, setIpnuData] = useState<PacIpnu[]>([]);
  const [ippnuData, setIppnuData] = useState<PacIppnu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State dan hooks untuk infinite scroll
  const [isListLoading, setIsListLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsListLoading(false);
      }
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      let json = await res.json();
      setHasMore(json.next !== null);
      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  // Gunakan useInfiniteScroll
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/statistik");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();
        setIpnuData(json.ipnuData);
        setIppnuData(json.ippnuData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
        Statistik PAC Se-Ponorogo
      </h2>

      {/* Tabel PAC IPNU */}
      <DataTable 
        title="Rekapitulasi Data PAC IPNU" 
        data={ipnuData} 
        list={list} 
        hasMore={hasMore} 
        isListLoading={isListLoading} 
        scrollerRef={scrollerRef} 
        loaderRef={loaderRef} 
      />

      {/* Tabel PAC IPPNU */}
      <DataTable 
        title="Rekapitulasi Data PAC IPPNU" 
        data={ippnuData} 
        list={list} 
        hasMore={hasMore} 
        isListLoading={isListLoading} 
        scrollerRef={scrollerRef} 
        loaderRef={loaderRef} 
      />
    </div>
  );
}

// Komponen DataTable menerima props yang diperlukan, termasuk infinite scroll references
const DataTable = ({
  title,
  data,
  list,
  hasMore,
  isListLoading,
  scrollerRef,
  loaderRef,
}: {
  title: string;
  data: any[];
  list: ReturnType<typeof useAsyncList>;
  hasMore: boolean;
  isListLoading: boolean;
  scrollerRef: React.RefObject<HTMLElement>; // Ubah dari HTMLDivElement ke HTMLElement
  loaderRef: React.RefObject<HTMLElement>; // Ubah dari HTMLDivElement ke HTMLElement
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <Table
        isHeaderSticky
        aria-label={title}
        baseRef={scrollerRef} // Gunakan scrollerRef sebagai baseRef
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader className="text-center">
          <TableColumn className="text-center">KECAMATAN</TableColumn>
          <TableColumn className="text-center">STATUS SP</TableColumn>
          <TableColumn className="text-center">TANGGAL BERAKHIR</TableColumn>
          <TableColumn className="text-center">JUMLAH ANGGOTA</TableColumn>
          <TableColumn className="text-center">JUMLAH DESA</TableColumn>
          <TableColumn className="text-center">JUMLAH KOMISARIAT</TableColumn>
          <TableColumn className="text-center">JUMLAH SEKOLAH</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isListLoading}
          items={list.items}
          loadingContent={<Spinner color="white" />}
        >
          {data.map((pac) => (
            <TableRow key={pac._id}>
              <TableCell className="text-center">{pac.kecamatan}</TableCell>
              <TableCell className="text-center">
                <Chip
                  color={
                    getStatus(pac.tanggal_berakhir) === "Aktif"
                      ? "success"
                      : "danger"
                  }
                  variant="flat"
                >
                  {getStatus(pac.tanggal_berakhir)}
                </Chip>
              </TableCell>
              <TableCell className="text-center">
                {pac.tanggal_berakhir
                  ? new Date(pac.tanggal_berakhir).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Tanggal tidak tersedia"}
              </TableCell>
              <TableCell className="text-center">{pac.jumlah_anggota}</TableCell>
              <TableCell className="text-center">{pac.jumlah_desa}</TableCell>
              <TableCell className="text-center">{pac.jumlah_komisariat}</TableCell>
              <TableCell className="text-center">{pac.jumlah_sekolah}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
