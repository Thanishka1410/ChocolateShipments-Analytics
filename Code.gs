// ===== CONFIG — change if your tab/column names differ =====
const SHEET_NAME = 'Shipments';

/**
 * Adds the menu when the spreadsheet opens.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🍫 Chocolate Dashboard')
    .addItem('Open Interactive Dashboard', 'showDashboard')
    .addToUi();
}

/**
 * Opens the dashboard as a large modal dialog over the Sheet.
 */
function showDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('Dashboard')
    .setWidth(1150)
    .setHeight(760);
  SpreadsheetApp.getUi().showModalDialog(html, '🍫 Chocolate Shipments Dashboard');
}

/**
 * Called from the client (google.script.run) to fetch raw shipment rows.
 * Returns a lightweight array of objects — all aggregation & filtering
 * happens client-side so the dashboard stays fully interactive.
 */
function getShipmentData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found. Check the SHEET_NAME constant in Code.gs.');
  }

  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(h => h.toString().trim());
  const col = {};
  headers.forEach((h, i) => col[h] = i);

  const required = ['ShipmentID', 'SPID', 'PID', 'GID', 'Shipdate', 'Amount', 'Boxes', 'Order_Status'];
  required.forEach(r => {
    if (!(r in col)) throw new Error('Missing expected column: ' + r);
  });

  const tz = Session.getScriptTimeZone();
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    if (!r[col.ShipmentID]) continue;

    let d = r[col.Shipdate];
    d = d instanceof Date ? d : new Date(d);
    if (isNaN(d)) continue;

    rows.push({
      id: r[col.ShipmentID],
      supplier: r[col.SPID],
      product: r[col.PID],
      region: r[col.GID],
      date: Utilities.formatDate(d, tz, 'yyyy-MM-dd'),
      month: Utilities.formatDate(d, tz, 'yyyy-MM'),
      amount: Number(r[col.Amount]) || 0,
      boxes: Number(r[col.Boxes]) || 0,
      status: r[col.Order_Status]
    });
  }

  return rows;
}
function doGet(e) {
  // Make sure 'Index' matches the exact name of your HTML file (without the .html part)
  return HtmlService.createHtmlOutputFromFile('Dashboard')
      .setTitle('My Visualizations') 
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 
}
