import { Card } from '@/components/ui/card';

export function TransacaoEmpty() {
  return (
    <Card className="p-8 text-center">
      <p className="text-muted-foreground">
        Nenhuma transação encontrada. Adicione sua primeira transação!
      </p>
    </Card>
  );
}