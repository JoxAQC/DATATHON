import CrimeDashboard from '@/components/dashboard/crime-dashboard';
import { regions, crimeData, genderViolenceData, trustData } from '@/lib/data';

export default function Home() {
  return (
    <main>
      <CrimeDashboard
        regions={regions}
        initialCrimeData={crimeData}
        genderViolenceData={genderViolenceData}
        trustData={trustData}
      />
    </main>
  );
}
