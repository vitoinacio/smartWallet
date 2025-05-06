export function formatarDate(dataIso: string): string {
  if (typeof dataIso !== 'string') return '';

  const data = new Date(dataIso);
  if (isNaN(data.getTime())) return ''; // Verifica se a data é inválida

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
