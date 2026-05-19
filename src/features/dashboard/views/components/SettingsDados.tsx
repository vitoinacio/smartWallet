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
  const [termoExportacao, setTermoExportacao] = useState(false);
  const [termoLimpeza, setTermoLimpeza] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Exportar Dados
          </CardTitle>
          <CardDescription>
            Baixe uma cópia de todos os seus dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
            <FileJson className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="font-medium">Arquivo JSON</Label>
              <p className="text-sm text-muted-foreground">
                Exporta todas as suas transações, configurações e dados do perfil
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
              Confirmo que os dados exportados são apenas para uso pessoal
            </Label>
          </div>

          <Button 
            className="w-full" 
            variant="outline"
            onClick={onExport}
            disabled={!termoExportacao}
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar Dados
          </Button>
        </CardContent>
      </Card>

      {!showClearConfirm ? (
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Limpar Todos os Dados
            </CardTitle>
            <CardDescription>
              Esta ação é irreversível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowClearConfirm(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Dados
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-red-300 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirmar Limpeza
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
              <p className="text-sm text-red-800 dark:text-red-200">
                Todos os seus dados serão excluídos permanentemente. 
                Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox 
                id="termo-limpar" 
                checked={termoLimpeza}
                onCheckedChange={(checked) => setTermoLimpeza(checked as boolean)}
              />
              <Label htmlFor="termo-limpar" className="text-sm">
                Eu entendo que esta ação é irreversível
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
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                disabled={!termoLimpeza}
                onClick={onClearData}
              >
                Confirmar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}