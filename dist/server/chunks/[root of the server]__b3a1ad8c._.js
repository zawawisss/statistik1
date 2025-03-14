module.exports = {

"[project]/.next-internal/server/app/api/kecamatan/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongodb [external] (mongodb, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "getKecamatanById": (()=>getKecamatanById),
    "getKecamatanList": (()=>getKecamatanList),
    "getPacData": (()=>getPacData),
    "getPacIpnu": (()=>getPacIpnu),
    "getPacIppnu": (()=>getPacIppnu)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local");
}
const options = {};
let client;
let clientPromise;
if ("TURBOPACK compile-time truthy", 1) {
    if (!global._mongoClientPromise) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    "TURBOPACK unreachable";
}
async function getPacData() {
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
            tanggal_sp: {
                $gte: today
            }
        });
        const totalKomisariat = await komisariatData.countDocuments({
            status_sp: "Aktif",
            tanggal_sp: {
                $gte: today
            }
        });
        return {
            totalStats: {
                totalPAC,
                totalKomisariat,
                totalRanting,
                totalAnggota,
                totalDesa,
                totalSekolah
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            totalStats: {}
        };
    }
}
async function getKecamatanList() {
    try {
        const client = await clientPromise;
        const db = client.db("ipnu_ponorogo");
        const kecamatanCollection = db.collection("database");
        const kecamatanList = await kecamatanCollection.find({}, {
            projection: {
                _id: 1,
                kecamatan: 1
            }
        }).toArray();
        return kecamatanList;
    } catch (error) {
        console.error("Error fetching kecamatan:", error);
        return [];
    }
}
async function getKecamatanById(kecamatanId) {
    try {
        const client = await clientPromise;
        const db = client.db("ipnu_ponorogo");
        const kecamatanCollection = db.collection("database");
        const kecamatan = await kecamatanCollection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](kecamatanId)
        });
        return kecamatan;
    } catch (error) {
        console.error("Error fetching kecamatan by ID:", error);
        return null;
    }
}
async function getPacIpnu() {
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
async function getPacIppnu() {
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
const __TURBOPACK__default__export__ = clientPromise;
}}),
"[project]/app/api/kecamatan/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const kecamatanList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKecamatanList"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(kecamatanList);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__b3a1ad8c._.js.map