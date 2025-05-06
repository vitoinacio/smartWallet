import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DataInfoDebitoType } from '@/types/DebitosTypes';
import { Button } from '../ui/button';
import { Edit, LucideBanknote, Trash2 } from 'lucide-react';
import { formatarDate } from '@/utils/formatedDate';

interface ItemListDebitoProps {
  debitos: DataInfoDebitoType[];
  deleteDebito: (id: number) => void;
}

const ItemListDebito = ({ debitos, deleteDebito }: ItemListDebitoProps) => {

  const handleDelete = (id: number) => {
    deleteDebito(id)
  }

  return (
    <>
      {debitos.map((item, index) => (
        <div key={index} className="grid grid-cols-7">
          <p className="max-h-16 overflow-auto">{item.identificacao}</p>
          <p className="max-h-16 overflow-auto">{item.observacao}</p>
          <p>R$ {item.valor}</p>
          <p className="col-span-2">{formatarDate(item.datavenc)}</p>
          <p>{item.notificacao ? 'Sim' : 'Não'}</p>
          <div className="flex gap-1">
            <Button className="w-3 bg-green-700">
              <LucideBanknote />
            </Button>
            <Button className="w-3 bg-blue-800">
              <Edit />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-3 bg-red-700">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir este débito? Essa ação não
                    poderá ser desfeita e removerá permanentemente os dados
                    relacionados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(item.id_deb)} className="bg-red-600 hover:bg-red-700">
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemListDebito;
