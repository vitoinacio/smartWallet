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

interface ItemListDebitoProps {
  debitos: DataInfoDebitoType[];
}

const ItemListDebito = ({ debitos }: ItemListDebitoProps) => {
  return (
    <>
      {debitos.map((item, index) => (
        <div key={index} className="grid grid-cols-7">
          <p className="max-h-16 overflow-auto">{item.identificacao}</p>
          <p className="max-h-16 overflow-auto">{item.observacao}</p>
          <p>R$ {item.valor}</p>
          <p className="col-span-2">{item.datavenc}</p>
          <p>{item.notificacao}</p>
          <div className="flex gap-1">
            <Button className="w-3 bg-green-700">
              <LucideBanknote />
            </Button>
            <Button className="w-3 bg-blue-800">
              <Edit />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild className='flex'>
                <Button className="w-3 bg-red-700">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
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
