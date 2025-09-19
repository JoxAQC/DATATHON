import CrimeDashboard from '@/components/dashboard/crime-dashboard';
import { genderViolenceData } from '@/lib/data';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <CrimeDashboard
        genderViolenceData={genderViolenceData}
      />
    </main>
  );
}
