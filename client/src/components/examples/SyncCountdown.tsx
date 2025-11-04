import { SyncCountdown } from '../sync-countdown';

export default function SyncCountdownExample() {
  const nextSync = new Date(Date.now() + 5 * 60 * 1000);

  return (
    <div className="p-6">
      <SyncCountdown nextSyncTime={nextSync} />
    </div>
  );
}
