function calcularEOQ(D, S, H) {
  const Q = Math.sqrt((2 * D * S) / H);
  const ciclos = D / Q;
  const costo = (D / Q) * S + (Q / 2) * H;

  return { modelo: "EOQ", Q, Smax: Q / 2, faltante: 0, ciclos, costo };
}


function formatNumber(num) {
  return num.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

document.getElementById("resultados").innerHTML = `
Q*: ${formatNumber(Q)} unidades<br>
Inventario máximo: ${formatNumber(Imax)} unidades<br>
Faltante máximo: ${formatNumber(Smax)} unidades<br>
Nº de ciclos/año: ${formatNumber(N)}<br>
Costo total anual: Q${formatNumber(CT)}
`;
