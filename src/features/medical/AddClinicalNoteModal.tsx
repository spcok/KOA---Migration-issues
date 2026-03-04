import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Animal, ClinicalNote } from '../../types';

const schema = z.object({
  animal_id: z.string().min(1, 'Animal is required'),
  date: z.string().min(1, 'Date is required'),
  note_type: z.enum(['Illness', 'Checkup', 'Injury', 'Routine']),
  note_text: z.string().min(5, 'Note must be at least 5 characters'),
  recheck_date: z.string().optional(),
  staff_initials: z.string().min(2, 'Initials must be at least 2 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<ClinicalNote, 'id' | 'animal_name'>) => Promise<void>;
  animals: Animal[];
}

export const AddClinicalNoteModal: React.FC<Props> = ({ isOpen, onClose, onSave, animals }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      note_type: 'Routine',
    }
  });

  if (!isOpen) return null;

  const onSubmit = async (data: FormData) => {
    await onSave(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Add Clinical Note</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Animal</label>
            <select {...register('animal_id')} className="w-full mt-1 border border-slate-300 rounded-lg p-2">
              <option value="">Select an animal</option>
              {animals?.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            {errors.animal_id && <p className="text-red-500 text-xs">{errors.animal_id.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Date</label>
            <input type="date" {...register('date')} className="w-full mt-1 border border-slate-300 rounded-lg p-2" />
            {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Note Type</label>
            <select {...register('note_type')} className="w-full mt-1 border border-slate-300 rounded-lg p-2">
              <option value="Illness">Illness</option>
              <option value="Checkup">Checkup</option>
              <option value="Injury">Injury</option>
              <option value="Routine">Routine</option>
            </select>
            {errors.note_type && <p className="text-red-500 text-xs">{errors.note_type.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Note</label>
            <textarea {...register('note_text')} className="w-full mt-1 border border-slate-300 rounded-lg p-2" rows={3} />
            {errors.note_text && <p className="text-red-500 text-xs">{errors.note_text.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Recheck Date (Optional)</label>
            <input type="date" {...register('recheck_date')} className="w-full mt-1 border border-slate-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Staff Initials</label>
            <input type="text" {...register('staff_initials')} className="w-full mt-1 border border-slate-300 rounded-lg p-2" />
            {errors.staff_initials && <p className="text-red-500 text-xs">{errors.staff_initials.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white rounded-lg p-2 font-medium hover:bg-emerald-700 disabled:bg-slate-400">
            {isSubmitting ? 'Saving...' : 'Save Note'}
          </button>
        </form>
      </div>
    </div>
  );
};
