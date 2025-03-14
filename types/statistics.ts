export interface PacIpnu {
  _id: string;
  id: number;
  kecamatan: string;
  status_sp: string;
  tanggal_sp: number;
  jumlah_anggota: number;
  jumlah_desa: number;
  jumlah_ranting: number;
  jumlah_sekolah: number;
  jumlah_komisariat: number;
}
export interface PacIppnu {
  _id: string;
  id: number;
  kecamatan: string;
  status_sp: string;
  tanggal_sp: number;
  jumlah_anggota: number;
  jumlah_desa: number;
  jumlah_ranting: number;
  jumlah_sekolah: number;
  jumlah_komisariat: number;
}

export interface KecamatanId {
  _id: string;
  kecamatan: string;
}

interface Desa {
  _id: string;
  nama_desa: string;
  status_sp: string;
  tanggal_sp: string | null;
  nomor_sp: string | null;
}

interface Komisariat {
  _id: string;
  sekolah_maarif: string;
  status_sp: string;
  tanggal_sp: string | null;
}

interface Anggota {
  _id: string;
  nama_anggota: string;
  jabatan: string;
  pengkaderan: string | null;
}