import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, SkipForward, Camera } from 'lucide-react';

interface StepWelcomeProps {
  nome: string;
  avatarPreview: string | null;
  error?: string;
  onNomeChange: (value: string) => void;
  onAvatarChange: (file: File | null) => void;
  onNext: () => void;
  onSkip: () => void;
}

export function StepWelcome({
  nome,
  avatarPreview,
  error,
  onNomeChange,
  onAvatarChange,
  onNext,
  onSkip,
}: StepWelcomeProps) {
  const { t } = useTranslation('onboarding');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (file && file.size > 200 * 1024) {
      return;
    }
    onAvatarChange(file);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t('welcome.title')}</h2>
        <p className="text-muted-foreground">{t('welcome.subtitle')}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full w-24 h-24 p-0 overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
          aria-label={t('welcome.addPhoto')}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        >
          <Avatar className="w-24 h-24">
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt={t('welcome.yourPhoto')} />
            ) : (
              <AvatarFallback className={`bg-primary/10 ${dragOver ? 'ring-2 ring-primary' : ''}`}>
                <User className="w-10 h-10 text-primary" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5">
            <Camera className="w-4 h-4" />
          </span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        <p className="text-xs text-muted-foreground">{t('welcome.clickToAdd')}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">{t('welcome.nameLabel')}</Label>
        <Input
          id="nome"
          placeholder={t('welcome.namePlaceholder')}
          value={nome}
          onChange={(e) => onNomeChange(e.target.value)}
          aria-invalid={!!error}
          autoFocus
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onSkip} className="flex-1">
          <SkipForward className="w-4 h-4 mr-2" />
          {t('welcome.skip')}
        </Button>
        <Button onClick={onNext} className="flex-1" disabled={!nome.trim()}>
          {t('welcome.continue')}
        </Button>
      </div>
    </div>
  );
}
