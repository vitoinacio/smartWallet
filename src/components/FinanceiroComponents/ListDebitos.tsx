import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import useGetDebitosForm from '@/hooks/useGetDebitos';
import Loading from '../Loading';
import ItemListDebito from './ItemListDebito';

const ListDebitos = () => {
  const { debitosList, isLoading } = useGetDebitosForm();

  console.log(debitosList);

  return (
    <Card>
      <CardHeader className="grid grid-cols-7 text-center items-center p-3 space-y-0">
        <CardTitle>Título</CardTitle>
        <CardTitle>Observação</CardTitle>
        <CardTitle>Valor</CardTitle>
        <CardTitle className="col-span-2">Data de Vencimento</CardTitle>
        <CardTitle>Notificação</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid text-center gap-2 p-3">
        {isLoading ? (
          <Loading message="Buscando debitos" />
        ) : debitosList && debitosList?.length > 0 ? (
          <ItemListDebito debitos={debitosList}/>
        ) : (
          <div className="grid grid-cols-7">
            <p className="">Nenhum Debito adicionado !</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ListDebitos;
