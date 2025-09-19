import CrimeDashboard from '@/components/dashboard/crime-dashboard';
import { genderViolenceData, trustData } from '@/lib/data';

export default function Home() {
  return (
    <main>
      <CrimeDashboard
        genderViolenceData={genderViolenceData}
        trustData={trustData}
      />
    </main>
  );
}
