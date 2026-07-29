import { SettingsView } from "@/features/shared/components/SettingsView";
import { checkSubscription } from "@/features/shared/lib/subscription";

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return <SettingsView isPro={isPro} />;
}
