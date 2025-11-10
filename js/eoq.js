function calcularEOQ(D, S, H) {
  const Q = Math.sqrt((2 * D * S) / H);
  const ciclos = D / Q;
  const costo = (D / Q) * S + (Q / 2) * H;

  return { modelo: "EOQ", Q, Smax: Q / 2, faltante: 0, ciclos, costo };
}