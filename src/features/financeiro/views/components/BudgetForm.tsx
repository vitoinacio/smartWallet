import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('financeiro');
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
        <CardTitle className="text-lg">{t('orcamento.definir')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('orcamento.categoria')}</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder={t('orcamento.selecione')} />
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
              <Label>{t('orcamento.limite')}</Label>
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
            {t('orcamento.confirmar')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}