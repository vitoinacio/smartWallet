export function formatedBrl(valor: string) {
  const apenasNumeros = valor.replace(/\D/g, '');
  const numero = parseFloat(apenasNumeros) / 100;

  if (isNaN(numero)) return '';

  return numero
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })
    .replace('R$', '')
    .trim();
}
