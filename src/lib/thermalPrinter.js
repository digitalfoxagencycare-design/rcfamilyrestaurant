// 58mm / 80mm ESC/POS Thermal Receipt & KOT Printing Engine
// Powered by Nova SaaS POS Architecture

export function printThermalReceipt58mm(order, restaurantInfo = {}) {
  const printWindow = window.open("", "_blank", "width=380,height=600");
  if (!printWindow) {
    alert("Please allow popups to print thermal receipts.");
    return;
  }

  const name = restaurantInfo.name || "RC FAMILY RESTAURANT";
  const address = restaurantInfo.address || "Bhajangi, Chintapalli Mandal, Lambasinghi, ASR District, AP";
  const phones = restaurantInfo.phones ? restaurantInfo.phones.join(" / ") : "9346749665 / 9490546643";
  const gstin = restaurantInfo.gstin || "37AAECR1234F1Z5";

  const subtotal = order.subtotal || Math.round(order.total * 0.95);
  const gst = order.gst || Math.round(order.total * 0.05);
  const cgst = (gst / 2).toFixed(2);
  const sgst = (gst / 2).toFixed(2);
  const grandTotal = Number(order.total).toFixed(2);
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bill Receipt - ${order.id}</title>
  <style>
    @page {
      size: 58mm auto;
      margin: 0mm;
    }
    body {
      font-family: 'Courier New', Courier, monospace;
      width: 54mm;
      margin: 0 auto;
      padding: 3mm 1mm;
      color: #000;
      background: #fff;
      font-size: 11px;
      line-height: 1.25;
      font-weight: 600;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-left { text-align: left; }
    .bold { font-weight: 900; }
    .title { font-size: 14px; font-weight: 900; letter-spacing: 0.5px; }
    .subtitle { font-size: 9px; line-height: 1.2; margin-top: 1px; }
    .divider { border-top: 1px dashed #000; margin: 4px 0; }
    .double-divider { border-top: 1px double #000; border-bottom: 1px double #000; padding: 2px 0; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; margin: 2px 0; }
    th { font-size: 10px; border-bottom: 1px dashed #000; padding-bottom: 2px; }
    td { padding: 2px 0; font-size: 10.5px; }
    .grand-total { font-size: 13px; font-weight: 900; }
    .branding {
      margin-top: 6px;
      padding-top: 4px;
      border-top: 1px dashed #000;
      font-size: 9px;
      text-align: center;
      text-transform: uppercase;
    }
    .branding-logo {
      font-weight: 900;
      font-size: 10px;
      letter-spacing: 1px;
    }
    @media print {
      body { width: 54mm; margin: 0; padding: 1mm; }
    }
  </style>
</head>
<body onload="window.print(); setTimeout(function(){ window.close(); }, 500);">
  <div class="text-center">
    <div class="title">${name}</div>
    <div class="subtitle">${address}</div>
    <div class="subtitle">Ph: ${phones}</div>
    <div class="subtitle">GSTIN: ${gstin}</div>
  </div>

  <div class="double-divider text-center">
    TAX INVOICE / CASH BILL
  </div>

  <div>
    <div><b>Bill No:</b> ${order.id}</div>
    <div><b>Date:</b> ${dateStr}  ${timeStr}</div>
    <div><b>Type:</b> ${order.type.toUpperCase()}</div>
    <div><b>Guest:</b> ${order.customer}</div>
  </div>

  <div class="divider"></div>

  <table>
    <thead>
      <tr>
        <th class="text-left" style="width: 50%;">ITEM</th>
        <th class="text-center" style="width: 15%;">QTY</th>
        <th class="text-right" style="width: 15%;">RATE</th>
        <th class="text-right" style="width: 20%;">AMT</th>
      </tr>
    </thead>
    <tbody>
      ${order.items
        .map(
          (item) => `
        <tr>
          <td class="text-left">${item.name}</td>
          <td class="text-center">${item.qty}</td>
          <td class="text-right">${item.price}</td>
          <td class="text-right">${(item.price * item.qty).toFixed(2)}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="divider"></div>

  <table>
    <tr>
      <td>Item Subtotal:</td>
      <td class="text-right">₹${Number(subtotal).toFixed(2)}</td>
    </tr>
    <tr>
      <td>CGST (2.5%):</td>
      <td class="text-right">₹${cgst}</td>
    </tr>
    <tr>
      <td>SGST (2.5%):</td>
      <td class="text-right">₹${sgst}</td>
    </tr>
    ${
      order.discount
        ? `<tr><td>Discount:</td><td class="text-right">-₹${order.discount.toFixed(2)}</td></tr>`
        : ""
    }
    <tr class="grand-total" style="border-top: 1px dashed #000; border-bottom: 1px dashed #000;">
      <td style="padding: 4px 0;">NET PAYABLE:</td>
      <td class="text-right" style="padding: 4px 0;">₹${grandTotal}</td>
    </tr>
  </table>

  <div style="margin-top: 3px; font-size: 10px;">
    <b>Payment:</b> ${order.paymentStatus || "PAID"}
  </div>

  <div class="divider"></div>

  <div class="text-center" style="font-size: 9.5px;">
    <div>*** THANK YOU! VISIT AGAIN ***</div>
    <div>Experience Lambasinghi Misty Taste 🌿</div>
  </div>

  <!-- Nova SaaS Agency Branding -->
  <div class="branding">
    <div class="branding-logo">POWERED BY NOVA SAAS</div>
    <div>Smart Cloud POS & Restaurant Platform</div>
    <div>www.novasaas.com</div>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

export function printThermalKOT58mm(order) {
  const printWindow = window.open("", "_blank", "width=380,height=500");
  if (!printWindow) {
    alert("Please allow popups to print KOT slips.");
    return;
  }

  const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit" });
  const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>KOT - ${order.id}</title>
  <style>
    @page { size: 58mm auto; margin: 0mm; }
    body {
      font-family: 'Courier New', Courier, monospace;
      width: 54mm;
      margin: 0 auto;
      padding: 3mm 1mm;
      color: #000;
      background: #fff;
      font-size: 12px;
      line-height: 1.3;
      font-weight: 800;
    }
    .text-center { text-align: center; }
    .title { font-size: 16px; font-weight: 900; }
    .divider { border-top: 2px dashed #000; margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 3px 0; font-size: 13px; font-weight: 900; }
    .branding {
      margin-top: 8px;
      padding-top: 4px;
      border-top: 1px dashed #000;
      font-size: 8.5px;
      text-align: center;
    }
  </style>
</head>
<body onload="window.print(); setTimeout(function(){ window.close(); }, 500);">
  <div class="text-center">
    <div class="title">*** KITCHEN KOT ***</div>
    <div style="font-size: 13px; margin-top: 2px;">RC FAMILY RESTAURANT</div>
  </div>

  <div class="divider"></div>

  <div>
    <div><b>KOT / Ticket:</b> ${order.id}</div>
    <div><b>Table/Type:</b> <span style="font-size: 14px; background: #000; color: #fff; padding: 1px 4px;">${order.type.toUpperCase()}</span></div>
    <div><b>Time:</b> ${dateStr} ${timeStr}</div>
  </div>

  <div class="divider"></div>

  <table>
    <thead>
      <tr style="border-bottom: 1px solid #000; font-size: 11px;">
        <th align="left" style="width: 25%;">QTY</th>
        <th align="left" style="width: 75%;">ITEM NAME</th>
      </tr>
    </thead>
    <tbody>
      ${order.items
        .map(
          (i) => `
        <tr>
          <td valign="top" style="font-size: 15px;"><b>[ ${i.qty} ]</b></td>
          <td valign="top">${i.name}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="divider"></div>
  <div class="text-center" style="font-size: 10px;">
    Please prepare hot & fresh.
  </div>

  <!-- Nova SaaS Kitchen Engine -->
  <div class="branding">
    <b>Nova SaaS Kitchen KDS Engine</b>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
