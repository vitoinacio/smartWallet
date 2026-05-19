import { User, Smartphone, Shield, Database, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SETTINGS_TABS, SettingsTab } from '../../models';
import { cn } from '@/lib/utils';

const icons = {
  User,
  Smartphone,
  Shield,
  Database,
  Info,
};

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {SETTINGS_TABS.map((tab) => {
        const Icon = icons[tab.icon as keyof typeof icons];
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              "justify-start gap-3 h-11 px-3",
              isActive && "bg-accent"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}