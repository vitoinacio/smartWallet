import { Wallet } from 'lucide-react';

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthFormContainer({ title, subtitle, children }: AuthFormContainerProps) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-8 bg-gray-50 dark:bg-neutral-900">
      <div className="w-full max-w-md">
        <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-700 dark:text-white">SmartWallet</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}