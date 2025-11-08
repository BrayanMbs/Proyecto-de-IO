
function calcularLoteEconomico(D, S, H, P) {
  if (P <= D) return { error: "⚠️ La tasa de producción (P) debe ser mayor que la demanda (D)." };

  const Q = Math.sqrt((2 * D * S) / (H * (1 - D / P)));
  const Smax = Q * (1 - D / P);
  const ciclos = D / Q;
  const costo = (D / Q) * S + (Smax / 2) * H;

  return { modelo: "Lote Económico", Q, Smax, faltante: 0, ciclos, costo };
}

