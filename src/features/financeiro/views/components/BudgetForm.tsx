import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Budget, Categoria } from '@/features/financeiro/models';

interface BudgetFormProps {
  categorias: Categoria[];
  budgetsExistentes: Budget[];
  onAdicionar: (categoria: string, limite: number) => void;
}

export function BudgetForm({ categorias, budgetsExistentes, onAdicionar }: BudgetFormProps) {
  const [categoria, setCategoria] = useState('');
  const [limite, setLimite] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria || !limite) return;
    onAdicionar(categoria, parseFloat(limite.replace(',', '.')));
    setCategoria('');
    setLimite('');
  };

  const categoriasDisponiveis = categorias.filter(
    (c) => !budgetsExistentes.some((b) => b.categoria === c.id)
  );

  if (categoriasDisponiveis.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Definir Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categoriasDisponiveis.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Limite Mensal (R$)</Label>
              <Input
                type="number"
                placeholder="0,00"
                value={limite}
                onChange={(e) => setLimite(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <Button type="submit" disabled={!categoria || !limite} className="w-full">
            Definir Orçamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}