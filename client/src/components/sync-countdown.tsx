import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface SyncCountdownProps {
  nextSyncTime?: Date;
}

export function SyncCountdown({ nextSyncTime }: SyncCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!nextSyncTime) {
      setTimeLeft("--:--:--");
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(nextSyncTime).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextSyncTime]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Próxima Sincronização</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-mono font-bold" data-testid="text-countdown">
          {timeLeft}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {nextSyncTime ? "Automática em breve" : "Nenhuma agendada"}
        </p>
      </CardContent>
    </Card>
  );
}
