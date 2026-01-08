function generateBill() {
  document.getElementById("bInvoice").innerText =
    document.getElementById("invoiceNo").value;

  document.getElementById("bDate").innerText =
    document.getElementById("date").value;

  document.getElementById("bCustomer").innerText =
    document.getElementById("customer").value;

  document.getElementById("bPeriod").innerText =
    "Internet Service charges for the months of " +
    document.getElementById("period").value;

  const amount = document.getElementById("amount").value;
  document.getElementById("bAmount").innerText = amount;
  document.getElementById("bAmountTotal").innerText = amount;
}
