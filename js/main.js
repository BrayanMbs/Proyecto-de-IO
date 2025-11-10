let resultados = [];

function clasificarModelo() {
  const D = parseFloat(document.getElementById("D").value);
  const S = parseFloat(document.getElementById("S").value);
  const H = parseFloat(document.getElementById("H").value);
  const P = parseFloat(document.getElementById("P").value);
  const Cs = parseFloat(document.getElementById("Cs").value);
  const L = parseFloat(document.getElementById("L").value);

  if (!D || !S || !H) {
    alert("⚠️ D, S y H son obligatorios.");
    return;
  }

  let resultado;
  if (P && P > D) resultado = calcularLoteEconomico(D, S, H, P);
  else if (Cs && Cs > 0) resultado = calcularEscasezPlaneada(D, S, H, Cs);
  else resultado = calcularEOQ(D, S, H);

  if (resultado.error) return alert(resultado.error);

  // Cálculo del punto de reorden (R)
  const demandaDiaria = D / 365;
  const R = L ? Math.round(demandaDiaria * L) : null;
  resultado.reorden = R;

  mostrarResultados(resultado);
  guardarResultado(resultado);
  graficarCosto(D, S, H, resultado.Q);

  alert("✅ Se hicieron los cálculos exitosamente");
}

function mostrarResultados(r) {
  const div = document.getElementById("resultados");
  div.innerHTML = `
    <h3> Modelo: ${r.modelo}</h3>
    Q*: ${Math.round(r.Q)} unidades<br>
    Inventario máximo: ${Math.round(r.Smax)} unidades<br>
    Faltante máximo: ${Math.round(r.faltante)} unidades<br>
    Nº de ciclos/año: ${r.ciclos.toFixed(2)}<br>
    Costo total anual: Q${r.costo.toFixed(2)}<br>
    ${r.reorden ? `Punto de reorden (R): ${r.reorden} unidades` : ""}
  `;
  interpretarResultados(r);
}

function interpretarResultados(r) {
  const texto = `
    El modelo ${r.modelo} sugiere realizar pedidos de ${Math.round(r.Q)} unidades,
    manteniendo un inventario máximo de ${Math.round(r.Smax)} unidades.
    El costo total anual mínimo estimado es de Q${r.costo.toFixed(2)}.
    ${r.reorden ? `El punto de reorden calculado es de ${r.reorden} unidades.` : ""}
  `;
  document.getElementById("interpretacion").innerText = texto;
}

function guardarResultado(r) {
  resultados.push(r);
  console.table(resultados);
}

function graficarCosto(D, S, H, Qoptimo) {
  const cantidades = [];
  const costos = [];

  for (let Q = 1; Q <= Qoptimo * 2; Q += Qoptimo / 10) {
    const costo = (D / Q) * S + (Q / 2) * H;
    cantidades.push(Math.round(Q));
    costos.push(costo.toFixed(2));
  }

  new Chart(document.getElementById("grafico"), {
    type: "line",
    data: {
      labels: cantidades,
      datasets: [{
        label: "Costo Total (Q)",
        data: costos,
        borderColor: "blue",
        fill: false,
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true },
        x: { title: { display: true, text: "Cantidad (Q)" } }
      }
    }
  });
}

