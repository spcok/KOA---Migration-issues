import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AppProvider } from './context/AppContext';
import DashboardContainer from './features/dashboard/DashboardContainer';
import WeatherView from './features/dashboard/WeatherView';
import Tasks from './features/husbandry/Tasks';
import DailyLog from './features/husbandry/DailyLog';
import DailyRounds from './features/husbandry/DailyRounds';
import MedicalRecords from './features/medical/MedicalRecords';
import Movements from './features/logistics/Movements';
import Timesheets from './features/staff/Timesheets';
import Holidays from './features/staff/Holidays';
import MissingRecords from './features/compliance/MissingRecords';
import SettingsLayout from './features/settings/SettingsLayout';
import HelpSupport from './features/help/HelpSupport';
import Incidents from './features/safety/tabs/Incidents';
import FirstAidLog from './features/safety/tabs/FirstAid';
import SafetyDrills from './features/safety/tabs/SafetyDrills';
import SiteMaintenance from './features/safety/tabs/SiteMaintenance';

const Placeholder = ({ title, phase }: { title: string, phase: string }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-slate-400">
      <p className="text-lg font-black uppercase tracking-widest text-slate-500 mb-2">{phase}</p>
      <p className="text-sm font-medium">Clean room transplant pending...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* COMPLETED MILESTONE 1 ROUTES */}
            <Route index element={<DashboardContainer />} />
            <Route path="weather" element={<div className="p-8"><WeatherView /></div>} />
            <Route path="daily-log" element={<DailyLog />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="daily-rounds" element={<DailyRounds />} />

            {/* PHASE 4: MEDICAL & QUARANTINE */}
            <Route path="medical" element={<MedicalRecords />} />
            <Route path="first-aid" element={<FirstAidLog />} />

            {/* PHASE 5: LOGISTICS & SAFETY */}
            <Route path="movements" element={<Movements />} />
            <Route path="flight-records" element={<Placeholder title="Flight Records" phase="Phase 5: Logistics" />} />
            <Route path="maintenance" element={<SiteMaintenance />} />
            <Route path="incidents" element={<Incidents />} />
            <Route path="safety-drills" element={<SafetyDrills />} />

            {/* PHASE 6: STAFF & COMPLIANCE */}
            <Route path="timesheets" element={<Timesheets />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="compliance" element={<MissingRecords />} />
            <Route path="reports" element={<Placeholder title="Reports" phase="Phase 6: Compliance" />} />
            <Route path="missing-records" element={<MissingRecords />} />

            {/* PHASE 7: SETTINGS */}
            <Route path="settings" element={<SettingsLayout />} />
            <Route path="help" element={<HelpSupport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
