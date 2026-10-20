// On-demand PDF reports made on this PC with pdf-lib (no internet, nothing stored).
// Clinic header on every page, one or more tables with page breaks + repeated column headers, totals rows, page numbers.
// Adapted from JharLab's lib/pdf-table.ts.
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';

export interface PdfColumn {
  header: string;
  width: number; // relative width
  align?: 'left' | 'right';
}

export interface PdfTable {
  title?: string;
  columns: PdfColumn[];
  rows: unknown[][];
  totals?: unknown[];
}

export interface PdfClinic {
  clinicName?: string;
  address?: string;
  phone?: string;
  gstin?: string;
}

// The built-in PDF fonts only cover Latin-1, so ₹ becomes "Rs." and other characters are dropped.
// ponytail: names typed in Devanagari print as "?"; embed a Unicode font (fontkit + TTF) if clinics need it.
const clean = (v: unknown) =>
  String(v ?? '')
    .replace(/₹\s?/g, 'Rs. ')
    .replace(/[–—]/g, '-')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '?');

function fit(text: string, font: PDFFont, size: number, width: number) {
  if (font.widthOfTextAtSize(text, size) <= width) return text;
  let t = text;
  while (t.length > 1 && font.widthOfTextAtSize(`${t}...`, size) > width) t = t.slice(0, -1);
  return `${t}...`;
}

export async function makeReportPdf(opts: {
  title: string;
  subtitle?: string;
  clinic?: PdfClinic | null;
  tables: PdfTable[];
  landscape?: boolean;
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const [W, H] = opts.landscape ? [842, 595] : [595, 842];
  const M = 36;
  const ink = rgb(0.06, 0.09, 0.16);
  const muted = rgb(0.38, 0.43, 0.5);
  const line = rgb(0.85, 0.88, 0.92);
  const teal = rgb(0.06, 0.46, 0.43);
  const size = 8.5;
  const rowH = 16;
  const clinic = opts.clinic || {};

  const pages: PDFPage[] = [];
  let page: PDFPage;
  let y = 0;

  const newPage = () => {
    page = doc.addPage([W, H]);
    pages.push(page);
    y = H - M;
    page.drawText(clean(clinic.clinicName || 'MedBilling'), { x: M, y: y - 12, size: 14, font: bold, color: teal });
    const contact = [clinic.address, clinic.phone && `Ph: ${clinic.phone}`, clinic.gstin && `GSTIN: ${clinic.gstin}`].filter(Boolean).join('  |  ');
    if (contact) page.drawText(fit(clean(contact), font, 8, W - 2 * M), { x: M, y: y - 25, size: 8, font, color: muted });
    y -= 44;
  };

  newPage();
  page!.drawText(clean(opts.title), { x: M, y, size: 13, font: bold, color: ink });
  if (opts.subtitle) page!.drawText(clean(opts.subtitle), { x: M, y: y - 14, size: 8.5, font, color: muted });
  y -= opts.subtitle ? 30 : 20;

  for (const table of opts.tables) {
    const unit = (W - 2 * M) / table.columns.reduce((a, c) => a + c.width, 0);
    const cols = table.columns.map((c) => ({ ...c, w: c.width * unit }));

    const drawRow = (cells: unknown[], f: PDFFont, s: number, color = ink) => {
      let x = M;
      cols.forEach((c, i) => {
        const text = fit(clean(cells[i]), f, s, c.w - 8);
        const tx = c.align === 'right' ? x + c.w - 4 - f.widthOfTextAtSize(text, s) : x + 4;
        page.drawText(text, { x: tx, y: y - rowH + 9, size: s, font: f, color });
        x += c.w;
      });
      y -= rowH;
    };
    const headerRow = () => {
      page.drawRectangle({ x: M, y: y - rowH + 4, width: W - 2 * M, height: rowH, color: rgb(0.94, 0.95, 0.97) });
      drawRow(cols.map((c) => c.header.toUpperCase()), bold, 7.5, muted);
    };
    const room = (needed: number) => {
      if (y - needed < M + 24) {
        newPage();
        headerRow();
      }
    };

    // Keep a section title with its header row and first line.
    if (y - (table.title ? 18 : 0) - 3 * rowH < M + 24) newPage();
    if (table.title) {
      page!.drawText(clean(table.title), { x: M, y: y - 10, size: 10, font: bold, color: ink });
      y -= 18;
    }
    headerRow();
    if (!table.rows.length) {
      page!.drawText('No records for this period.', { x: M + 4, y: y - 12, size, font, color: muted });
      y -= rowH;
    }
    for (const row of table.rows) {
      room(rowH);
      drawRow(row, font, size);
      page!.drawLine({ start: { x: M, y: y + 4 }, end: { x: W - M, y: y + 4 }, thickness: 0.4, color: line });
    }
    if (table.totals) {
      room(rowH);
      page!.drawLine({ start: { x: M, y: y + 3 }, end: { x: W - M, y: y + 3 }, thickness: 1, color: ink });
      drawRow(table.totals, bold, size);
    }
    y -= 14;
  }

  const stamp = `Generated ${new Date().toLocaleString('en-IN')} by MedBilling`;
  pages.forEach((p, i) => {
    p.drawText(clean(stamp), { x: M, y: 20, size: 7, font, color: muted });
    const n = `Page ${i + 1} of ${pages.length}`;
    p.drawText(n, { x: W - M - font.widthOfTextAtSize(n, 7), y: 20, size: 7, font, color: muted });
  });
  return doc.save();
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
