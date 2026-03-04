import React, { useState } from 'react';
import { useMedicalData } from './useMedicalData';
import { Pill, ClipboardList, AlertTriangle, Plus, Edit2, Download, CheckCircle } from 'lucide-react';
import { AddClinicalNoteModal } from './AddClinicalNoteModal';
import { AddMarChartModal } from './AddMarChartModal';
import { AddQuarantineModal } from './AddQuarantineModal';
import { generateMarChartDocx } from './exportMarChart';

const MedicalRecords: React.FC = () => {
  const { clinicalNotes, marCharts, quarantineRecords, animals, isLoading, addClinicalNote, addMarChart, signOffDose, addQuarantineRecord, updateQuarantineRecord } = useMedicalData();
  const [activeTab, setActiveTab] = useState<'notes' | 'mar' | 'quarantine'>('notes');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isMarModalOpen, setIsMarModalOpen] = useState(false);
  const [isQuarantineModalOpen, setIsQuarantineModalOpen] = useState(false);

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading Clinical Records...</div>;

  const handleAdd = () => {
    if (activeTab === 'notes') setIsNoteModalOpen(true);
    else if (activeTab === 'mar') setIsMarModalOpen(true);
    else setIsQuarantineModalOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Clinical Records</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm"
        >
          <Plus size={16} /> Add {activeTab === 'notes' ? 'Note' : activeTab === 'mar' ? 'Medication' : 'Record'}
        </button>
      </div>
      
      <AddClinicalNoteModal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)} 
        onSave={addClinicalNote} 
        animals={animals} 
      />
      
      <AddMarChartModal 
        isOpen={isMarModalOpen} 
        onClose={() => setIsMarModalOpen(false)} 
        onSave={addMarChart} 
        animals={animals} 
      />

      <AddQuarantineModal
        isOpen={isQuarantineModalOpen}
        onClose={() => setIsQuarantineModalOpen(false)}
        onSave={addQuarantineRecord}
        animals={animals}
      />
      
      <div className="flex space-x-4 border-b border-slate-200">
        {[
          { id: 'notes', label: 'Clinical Notes', icon: ClipboardList },
          { id: 'mar', label: 'MAR Charts', icon: Pill },
          { id: 'quarantine', label: 'Quarantine', icon: AlertTriangle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'notes' | 'mar' | 'quarantine')}
            className={`flex items-center gap-2 px-4 py-2 font-medium ${activeTab === tab.id ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-slate-500'}`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {activeTab === 'notes' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Animal</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Clinical Note</th>
                <th className="px-6 py-4">Recheck Due</th>
                <th className="px-6 py-4">Initials</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(clinicalNotes || []).map(n => (
                <tr key={n.id}>
                  <td className="px-6 py-4">{String(n.date)}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{String(n.animal_name)}</td>
                  <td className="px-6 py-4">{String(n.note_type)}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{String(n.note_text)}</td>
                  <td className="px-6 py-4">{String(n.recheck_date || '-')}</td>
                  <td className="px-6 py-4">{String(n.staff_initials)}</td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-emerald-600"><Edit2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'mar' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4">Medication</th>
                <th className="px-6 py-4">Animal</th>
                <th className="px-6 py-4">Dosage & Freq</th>
                <th className="px-6 py-4">Start-End</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(marCharts || []).map(m => (
                <tr key={m.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">{String(m.medication)}</td>
                  <td className="px-6 py-4">{String(m.animal_name)}</td>
                  <td className="px-6 py-4">{String(m.dosage)} / {String(m.frequency)}</td>
                  <td className="px-6 py-4">{String(m.start_date)} - {String(m.end_date || 'Ongoing')}</td>
                  <td className="px-6 py-4">{String(m.status)}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-slate-400 hover:text-emerald-600"><Edit2 size={16} /></button>
                    <button onClick={() => generateMarChartDocx(m)} className="text-slate-400 hover:text-emerald-600"><Download size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'quarantine' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4">Animal</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Start</th>
                <th className="px-6 py-4">Target Release</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(quarantineRecords || []).map(q => (
                <tr key={q.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">{String(q.animal_name)}</td>
                  <td className="px-6 py-4">{String(q.reason)}</td>
                  <td className="px-6 py-4">{String(q.start_date)}</td>
                  <td className="px-6 py-4">{String(q.end_date)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${q.status === 'Active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {String(q.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{String(q.isolation_notes)}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-slate-400 hover:text-emerald-600"><Edit2 size={16} /></button>
                    {q.status === 'Active' && (
                      <button 
                        onClick={() => updateQuarantineRecord({...q, status: 'Cleared'})}
                        className="text-slate-400 hover:text-emerald-600"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
