import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { DollarSign, Pencil, X, Check, Loader2 } from 'lucide-react';

const entradaSchema = z.object({
  valor: z.string().min(1, 'Valor é obrigatório'),
});

type EntradaFormValues = z.infer<typeof entradaSchema>;

interface EntradaEditorProps {
  entrada: string;
  isLoading: boolean;
  isEditing: boolean;
  onAtualizar: (valor: string) => Promise<void>;
  onIniciarEdicao: () => void;
  onCancelarEdicao: () => void;
}

export function EntradaEditor({
  entrada,
  isLoading,
  isEditing,
  onAtualizar,
  onIniciarEdicao,
  onCancelarEdicao,
}: EntradaEditorProps) {
  const form = useForm<EntradaFormValues>({
    resolver: zodResolver(entradaSchema),
    defaultValues: { valor: entrada },
  });

  const handleSubmit = async (values: EntradaFormValues) => {
    await onAtualizar(values.valor);
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-6 w-44" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Minha Renda Mensal
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor mensal</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0,00"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          const formatted = value
                            ? (parseInt(value) / 100).toFixed(2).replace('.', ',')
                            : '';
                          field.onChange(formatted);
                        }}
                        className="text-lg font-bold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                  Salvar
                </Button>
                <Button type="button" variant="outline" onClick={onCancelarEdicao}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">
                R$ {entrada || '0,00'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Valor mensal informado
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={onIniciarEdicao}>
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}