let invoiceCounter = localStorage.getItem("invoiceCounter") || 1000;
 
function addItem() {
  const table = document.getElementById("itemsInput");
  const row = table.insertRow();

  row.innerHTML = `
    <td><input placeholder="Description"></td>
    <td><input type="number" placeholder="Amount"></td>
    <td><button onclick="this.parentElement.parentElement.remove()">X</button></td>
  `;
}

addItem();

function generateBill() {
  invoiceCounter++;
  localStorage.setItem("invoiceCounter", invoiceCounter);

  document.getElementById("bInvoice").innerText = "SKY/" + invoiceCounter;
  document.getElementById("bDate").innerText = document.getElementById("billDate").value;
  document.getElementById("bCustomerName").innerText = document.getElementById("customerName").value;
  document.getElementById("bCustomerAddress").innerText = document.getElementById("customerAddress").value;

  const billItems = document.getElementById("billItems");
  billItems.innerHTML = `
    <tr>
      <th>SR. No.</th>
      <th>Particulars</th>
      <th>Amount (₹)</th>
    </tr>
  `;

  let total = 0;
  const rows = document.querySelectorAll("#itemsInput tr");

  rows.forEach((row, index) => {
    if (index === 0) return;

    const desc = row.cells[0].querySelector("input").value;
    const amt = parseInt(row.cells[1].querySelector("input").value || 0);

    if (desc) {
      total += amt;
      billItems.innerHTML += `
        <tr>
          <td>${index}</td>
          <td>${desc}</td>
          <td>${amt}</td>
        </tr>
      `;
    }
  });

  billItems.innerHTML += `
    <tr>
      <td colspan="2" class="right"><strong>Total</strong></td>
      <td><strong>${total}</strong></td>
    </tr>
  `;

  document.getElementById("amountWords").innerText =
    convertToWords(total) + " Only";
}

function convertToWords(num) {
  const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
  "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

  if (num === 0) return "Zero Rupees";

  if (num < 20) return a[num] + " Rupees";

  if (num < 100)
    return b[Math.floor(num / 10)] + " " + a[num % 10] + " Rupees";

  if (num < 1000)
    return a[Math.floor(num / 100)] + " Hundred " + convertToWords(num % 100);

  return a[Math.floor(num / 1000)] + " Thousand " + convertToWords(num % 1000);
}

function downloadPDF() {
  const bill = document.getElementById("bill");

  html2canvas(bill, { scale: 2 }).then(canvas => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 190;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("Internet_Bill.pdf");
  });
}
