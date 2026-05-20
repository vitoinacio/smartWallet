import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRANSACAO_SCHEMA, TRANSACAO_DEFAULT, TransacaoFormData } from '../models';

export function useTransacaoForm(onSubmitCallback: (data: TransacaoFormData) => Promise<void>) {
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa');

  const form = useForm<TransacaoFormData>({
    resolver: zodResolver(TRANSACAO_SCHEMA),
    defaultValues: TRANSACAO_DEFAULT,
  });

  const handleTipoChange = useCallback((value: 'receita' | 'despesa') => {
    form.setValue('tipo', value);
    form.setValue('categoria', '');
    setTipo(value);
  }, [form]);

  const handleSubmit = useCallback(async (values: TransacaoFormData) => {
    await onSubmitCallback(values);
    form.reset(TRANSACAO_DEFAULT);
  }, [onSubmitCallback, form]);

  const formatValor = useCallback((value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue 
      ? (parseInt(numericValue) / 100).toFixed(2).replace('.', ',')
      : '';
  }, []);

  return {
    form,
    tipo,
    handleTipoChange,
    handleSubmit,
    formatValor,
  };
}