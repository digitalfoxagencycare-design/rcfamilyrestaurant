import { useState } from "react";
import {
  FileSpreadsheet,
  Printer,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Percent,
  Receipt,
  CheckCircle2,
} from "lucide-react";

export default function ReportsAdmin({ orders }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const totalSales = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 28450);
  const totalGst = Math.round((totalSales * 5) / 105);
  const taxableAmount = totalSales - totalGst;
  const cgst = Math.round(totalGst / 2);
  const sgst = Math.round(totalGst / 2);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer", "Type", "Status", "Payment", "Items", "Subtotal", "GST", "Total"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customer}"`,
      `"${o.type}"`,
      o.status,
      `"${o.paymentStatus}"`,
      `"${o.items.map((i) => `${i.qty}x ${i.name}`).join("; ")}"`,
      o.subtotal || Math.round(o.total * 0.95),
      Math.round(o.total * 0.05),
      o.total,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RC_Restaurant_Sales_Report_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <FileSpreadsheet className="text-emerald-400" /> GST & Daily Sales Reports
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            View daily revenue logs, Taxable Sales, CGST / SGST breakdown, and export CSV audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl transition shadow"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow shadow-primary/20"
          >
            <Printer size={14} /> Print Summary
          </button>
        </div>
      </div>

      {/* Date Filter & GSTIN Card */}
      <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-amber-400" />
          <div>
            <p className="text-xs font-bold text-white">Select Audit Date:</p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 mt-1 focus:outline-none"
            />
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400 font-mono">GSTIN: <span className="text-white font-bold">37AAECR1234F1Z5</span></p>
          <p className="text-[11px] text-amber-400 font-semibold">RC Family Restaurant — Lambasinghi</p>
        </div>
      </div>

      {/* Financial Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">Gross Revenue</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            ₹{totalSales.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">Includes Dine-In, Parcel & Delivery</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">Taxable Value (Net)</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            ₹{taxableAmount.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Excluding 5% GST</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">CGST (2.5%)</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display mt-1">
            ₹{cgst.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Central Goods & Service Tax</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs font-semibold text-slate-400 uppercase">SGST (2.5%)</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display mt-1">
            ₹{sgst.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">State Andhra Pradesh GST</p>
        </div>
      </div>

      {/* Detailed Orders Audit Log */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-white">Daily Order Ledger ({orders.length} Entries)</h3>
          <span className="text-xs text-slate-400">All amounts in INR (₹)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Guest / Customer</th>
                <th className="p-3.5">Channel</th>
                <th className="p-3.5">Items Summary</th>
                <th className="p-3.5">Taxable</th>
                <th className="p-3.5">GST (5%)</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => {
                const itemGst = Math.round(ord.total * 0.05);
                const itemTaxable = ord.total - itemGst;
                return (
                  <tr key={ord.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{ord.id}</td>
                    <td className="p-3.5 font-semibold text-white">{ord.customer}</td>
                    <td className="p-3.5 text-slate-300">{ord.type}</td>
                    <td className="p-3.5 text-slate-400 max-w-xs truncate">
                      {ord.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">₹{itemTaxable}</td>
                    <td className="p-3.5 font-mono text-amber-400">₹{itemGst}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">₹{ord.total}</td>
                    <td className="p-3.5 text-slate-300">{ord.paymentStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
