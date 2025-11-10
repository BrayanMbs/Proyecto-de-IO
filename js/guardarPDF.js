function guardarPDF() {
  const resultados = document.getElementById('resultados').innerText;
  const interpretacion = document.getElementById('interpretacion').innerText;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");


  const colorPrincipal = [33, 150, 243];
  const colorFondoCaja = [245, 247, 250];
  const colorTexto = [30, 30, 30];

  doc.setFillColor(...colorPrincipal);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Simulador de Modelos de Inventario", 105, 18, { align: "center" });


  doc.setTextColor(...colorPrincipal);
  doc.setFontSize(16);
  doc.text("Informe de Resultados", 105, 45, { align: "center" });

  // Caja de resultados
  let y = 55;
  doc.setFillColor(...colorFondoCaja);
  doc.roundedRect(15, y, 180, 100, 5, 5, "F");
  doc.setFontSize(12);
  doc.setTextColor(...colorTexto);


  let lineas = resultados.split("\n").filter(l => l.trim() !== "");
  y += 10;

  lineas.forEach(linea => {
    if (y > 150) {
      doc.addPage();
      y = 20;
    }

    if (linea.toLowerCase().includes("modelo")) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colorPrincipal);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...colorTexto);
    }

    doc.text("• " + linea, 25, y);
    y += 8;
  });

  // 🧩 Sección del punto de reorden
  y += 5;
  doc.setDrawColor(...colorPrincipal);
  doc.setLineWidth(0.8);
  doc.line(25, y, 185, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colorPrincipal);
  doc.text(" Punto de Reorden Calculado", 25, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colorTexto);
  const punto = lineas.find(l => l.toLowerCase().includes("reorden"));
  doc.text(punto ? punto : "No calculado", 30, y);

  // 📄 Interpretación
  y += 20;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colorPrincipal);
  doc.text(" Interpretación del Modelo", 25, y);
  y += 8;

  doc.setFont("helvetica", "italic");
  doc.setTextColor(60, 60, 60);
  const textoInterpretacion = doc.splitTextToSize(interpretacion, 160);
  doc.text(textoInterpretacion, 25, y + 5);

  // 🧾 PIE DE PÁGINA
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text("Generado automáticamente por el Simulador de Modelos de Inventario", 105, 285, { align: "center" });

  // 💾 Guardar PDF
  doc.save("Informe_Modelo_Inventario.pdf");

  // ✅ Alerta visual
  alert("✅ Se generó el informe PDF exitosamente con estilo profesional.");
}
