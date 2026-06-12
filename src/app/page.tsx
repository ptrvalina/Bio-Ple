import { AuthGate } from "@/components/auth/AuthGate";
import { DashboardApp } from "@/components/DashboardApp";

export default function Home() {
  return (
    <AuthGate>
      <DashboardApp />
    </AuthGate>
  );
}
