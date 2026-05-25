import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/viewModels/AuthContext';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="pt-12 pb-10 px-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-6">
            <SearchX className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>

          <span className="text-7xl font-bold text-blue-600 dark:text-blue-400 block leading-none mb-1">
            404
          </span>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            {t('pageNotFound')}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            {t('pageNotFoundHint')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t('back')}
            </Button>
            <Button
              onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Home className="w-4 h-4" />
              {isLoggedIn ? t('goToDashboard') : t('homePage')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
