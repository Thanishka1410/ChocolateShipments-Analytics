# 🍫 Chocolate Shipments Dashboard (Google Apps Script)

An interactive dashboard built with **Google Apps Script** and **Google Sheets**, designed to visualize chocolate shipment data — trends, product performance, regional breakdowns, supplier volumes, and order status — all in one place, directly inside the spreadsheet.

---

## 📊 Features

- **Live interactive dashboard** opened as a modal dialog inside Google Sheets
- **Animated KPI cards**: Total Amount, Total Boxes, Shipment Count, Delivered Rate, Average Order Value
- **Dynamic filters** — Product, Region, Supplier, and Order Status — that instantly update every chart and KPI (no reloads, all client-side)
- **5 charts**:
  - Monthly Amount trend (line chart)
  - Amount by Product (column chart)
  - Amount by Region (pie chart)
  - Boxes by Supplier (bar chart)
  - Order Status breakdown (pie chart)
- Custom menu added to the spreadsheet for one-click access

---

## 🗂️ Project Structure

```
├── Code.gs         # Apps Script backend — reads sheet data, serves it as JSON
├── Dashboard.html  # Frontend dashboard — KPI cards, filters, Google Charts
└── README.md
```

---

## 📋 Expected Data Format

The script reads from a sheet tab named **`Shipments`** with the following columns:

| Column | Field | Example |
|---|---|---|
| A | `ShipmentID` | S00000004 |
| B | `SPID` (Supplier ID) | SP01 |
| C | `PID` (Product ID) | P14 |
| D | `GID` (Region/Group ID) | G2 |
| E | `Shipdate` | 5-May-23 |
| F | `Amount` | 7107.75 |
| G | `Boxes` | 285 |
| H | `Order_Status` | Delivered |

> If your sheet uses a different tab name, update the `SHEET_NAME` constant at the top of `Code.gs`.

---

## 🚀 Setup

1. Open your Google Sheet containing the shipment data.
2. Go to **Extensions → Apps Script**.
3. Create a script file named **`Code.gs`** and paste in the contents of this repo's `Code.gs`.
4. Create a new **HTML file** (File → New → HTML) named exactly **`Dashboard`** and paste in the contents of this repo's `Dashboard.html`.
5. Save the project (💾).
6. Reload the Google Sheet tab in your browser.
7. A new menu will appear: **🍫 Chocolate Dashboard → Open Interactive Dashboard**.
8. On first run, Google will prompt you to **authorize the script** — approve it (this is required since the script reads your sheet's data).

---

## 🛠️ How It Works

- **`Code.gs`** reads the raw rows from the `Shipments` tab and returns them as a clean JSON array via `getShipmentData()`. All aggregation (sums, counts, grouping by month/product/region/supplier/status) happens **client-side** in JavaScript — this keeps filtering instant and avoids repeated server calls.
- **`Dashboard.html`** renders the UI using the [Google Charts](https://developers.google.com/chart) library, plain HTML/CSS/JS (no external frameworks), and communicates with the backend via `google.script.run`.

---

## 🔧 Customization

- **Change chart types/colors**: edit the render functions (`renderTrendChart`, `renderProductChart`, etc.) in `Dashboard.html`.
- **Add more filters or KPIs**: extend `getFiltered()` and `renderKPIs()` in `Dashboard.html`.
- **Map codes to real names** (e.g. `SP01` → `"Supplier A"`): add a lookup step in `getShipmentData()` in `Code.gs` using a `Dimension Data` tab, if available.

---

## 📌 Notes

- This project uses Apps Script's `HtmlService` to show the dashboard as a modal dialog — it does not require deployment as a public web app.
- Currency in KPI cards is formatted for INR (`₹`) by default — update the `fmtMoney()` function in `Dashboard.html` to change this.

---

live url:https://script.google.com/macros/s/AKfycbzdvCEH9QfhRXWzaULfSr6_CZCL4Z9QioBhdfW1kqAF/dev
