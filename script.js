function generateBill() {
  const invoiceNo = document.getElementById("invoiceNo").value;
  const billDate = document.getElementById("billDate").value;
  const customerName = document.getElementById("customerName").value;
  const customerAddress = document.getElementById("customerAddress").value;
  const billPeriod = document.getElementById("billPeriod").value;
  const amount = document.getElementById("amount").value;

  document.getElementById("bInvoice").innerText = invoiceNo;
  document.getElementById("bDate").innerText = billDate;
  document.getElementById("bCustomerName").innerText = customerName;
  document.getElementById("bCustomerAddress").innerText = customerAddress;
  document.getElementById("bParticulars").innerText =
    `Internet Service charges for the months of ${billPeriod}.`;
  document.getElementById("bAmount").innerText = amount;
  document.getElementById("bTotal").innerText = amount;
  document.getElementById("amountWords").innerText =
    convertToWords(amount) + " Only";
}

function convertToWords(num) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
  const tens = ["","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

  if (num == 0) return "Zero Rupees";

  let words = "";
  if (num >= 1000) {
    words += ones[Math.floor(num / 1000)] + " Thousand ";
    num %= 1000;
  }
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + " ";
    num %= 10;
  }
  if (num > 0) {
    words += ones[num] + " ";
  }
  return words + "Rupees";
}
