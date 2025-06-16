// components/ExportPDFButton.js
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportPDFButton({ targetId = "export-section" }) {
  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      alert("Export target not found!");
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('dashboard-export.pdf');
  };

  return (
    <button onClick={handleExport} style={{ marginTop: '1rem' }}>
      🖨️ Export as PDF
    </button>
  );
}
