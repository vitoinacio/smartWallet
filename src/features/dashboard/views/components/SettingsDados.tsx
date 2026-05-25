import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Database, Download, Trash2, AlertTriangle, FileJson } from 'lucide-react';
import { useState } from 'react';

interface SettingsDadosProps {
  onExport: () => void;
  onClearData: () => void;
}

export function SettingsDados({ onExport, onClearData }: SettingsDadosProps) {
  const { t } = useTranslation('settings');
  const [termoExportacao, setTermoExportacao] = useState(false);
  const [termoLimpeza, setTermoLimpeza] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t('dados.exportar')}
          </CardTitle>
          <CardDescription>
            {t('dados.exportarDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
            <FileJson className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="font-medium">{t('dados.json')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('dados.jsonDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox 
              id="termo-export" 
              checked={termoExportacao}
              onCheckedChange={(checked) => setTermoExportacao(checked as boolean)}
            />
            <Label htmlFor="termo-export" className="text-sm">
              {t('dados.confirmar')}
            </Label>
          </div>

          <Button 
            className="w-full" 
            variant="outline"
            onClick={onExport}
            disabled={!termoExportacao}
          >
            <Download className="h-4 w-4 mr-2" />
            {t('dados.baixar')}
          </Button>
        </CardContent>
      </Card>

      {!showClearConfirm ? (
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              {t('dados.limpar')}
            </CardTitle>
            <CardDescription>
              {t('dados.limparWarning')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowClearConfirm(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('dados.limparDados')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-red-300 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              {t('dados.confirmarLimpeza')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
              <p className="text-sm text-red-800 dark:text-red-200">
                {t('dados.limparDesc')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox 
                id="termo-limpar" 
                checked={termoLimpeza}
                onCheckedChange={(checked) => setTermoLimpeza(checked as boolean)}
              />
              <Label htmlFor="termo-limpar" className="text-sm">
                {t('dados.entendo')}
              </Label>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowClearConfirm(false);
                  setTermoLimpeza(false);
                }}
              >
                {t('dados.cancelar')}
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                disabled={!termoLimpeza}
                onClick={onClearData}
              >
                {t('dados.confirmar')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}