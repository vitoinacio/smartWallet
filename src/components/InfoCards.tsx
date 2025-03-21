import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const InfoCards = () => {
  return (
    <div className='w-full flex gap-[6%] justify-around'>
      <Card className="flex flex-[28%] flex-col items-center duration-100 bg-blue-900">
        <CardHeader>
          <CardTitle className="text-popover dark:text-primary">
            <h3>Entrada</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-xl font-bold text-white">
          <p>R$ 800,00</p>
        </CardContent>
      </Card>
      <Card className="flex flex-[28%] flex-col items-center duration-100 bg-orange-800">
        <CardHeader>
          <CardTitle className="text-popover dark:text-primary">
            <h3>Saida</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-xl font-bold text-white">
          <p>R$ 500,00</p>
        </CardContent>
      </Card>
      <Card className="flex flex-[28%] flex-col items-center duration-100 bg-green-800">
        <CardHeader>
          <CardTitle className="text-popover dark:text-primary">
            <h3>Restante</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-xl font-bold text-white">
          <p>R$ 300,00</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
