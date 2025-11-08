function calcularEscasezPlaneada(D, S, H, Cs) {
  const Q = Math.sqrt((2 * D * S * (H + Cs)) / (H * Cs));
  const Smax = (Cs / (H + Cs)) * Q;
  const faltante = Q - Smax;
  const ciclos = D / Q;
  const costo = (D / Q) * S + (Smax * H) / 2 + (faltante * Cs) / 2;

  return { modelo: "Escasez Planeada", Q, Smax, faltante, ciclos, costo };
}

