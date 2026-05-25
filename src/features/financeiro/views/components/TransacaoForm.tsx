import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Form } from '@/components/ui/form';
import { TransacaoTipoSelect } from './TransacaoTipoSelect';
import { TransacaoCategoriaSelect } from './TransacaoCategoriaSelect';
import { TransacaoInputs } from './TransacaoInputs';
import { TransacaoNotificacao } from './TransacaoNotificacao';
import { useTransacaoForm } from '../../viewModels/useTransacaoForm';
import { TransacaoFormData } from '../../models';
import { Plus, Loader2 } from 'lucide-react';

interface TransacaoFormProps {
  onSubmit: (data: TransacaoFormData) => Promise<void>;
  isLoading: boolean;
}

export function TransacaoForm({ onSubmit, isLoading }: TransacaoFormProps) {
  const { form, tipo, handleTipoChange, handleSubmit, formatValor } = useTransacaoForm(onSubmit);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-6 w-36" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="w-5 h-5" />
          Nova Transação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TransacaoTipoSelect form={form} onTipoChange={handleTipoChange} />
              <TransacaoCategoriaSelect form={form} tipo={tipo} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TransacaoInputs form={form} onFormatValor={formatValor} />
            </div>

            <TransacaoNotificacao form={form} />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Adicionar Transação'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}