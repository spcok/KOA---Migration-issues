import Dexie, { Table } from 'dexie';
import { Animal, LogEntry, Task, ClinicalNote, MARChart, QuarantineRecord, InternalMovement, ExternalTransfer, Timesheet, Holiday, User, OrgProfileSettings, Contact, ZLADocument, SafetyDrill, MaintenanceLog, FirstAidLog, Incident } from '../types';

export class AppDatabase extends Dexie {
  animals!: Table<Animal, string>;
  logEntries!: Table<LogEntry, string>;
  daily_logs!: Table<LogEntry, string>;
  tasks!: Table<Task, string>;
  medical_logs!: Table<ClinicalNote, string>;
  mar_charts!: Table<MARChart, string>;
  quarantine_records!: Table<QuarantineRecord, string>;
  internal_movements!: Table<InternalMovement, string>;
  external_transfers!: Table<ExternalTransfer, string>;
  timesheets!: Table<Timesheet, string>;
  holidays!: Table<Holiday, string>;
  users!: Table<User, string>;
  settings!: Table<OrgProfileSettings, string>;
  contacts!: Table<Contact, string>;
  zla_documents!: Table<ZLADocument, string>;
  safety_drills!: Table<SafetyDrill, string>;
  maintenance_logs!: Table<MaintenanceLog, string>;
  first_aid_logs!: Table<FirstAidLog, string>;
  incidents!: Table<Incident, string>;

  constructor() {
    super('KentOwlAcademyDB');
    this.version(12).stores({
      animals: 'id, name, species, category, location',
      logEntries: 'id, animal_id, log_type, log_date',
      daily_logs: 'id, animal_id, log_type, log_date',
      tasks: 'id, animal_id, animalId, dueDate, completed',
      medical_logs: 'id, animal_id, date',
      mar_charts: 'id, animal_id, medication_name',
      quarantine_records: 'id, animal_id, status',
      internal_movements: 'id, animal_id, log_date, movement_type',
      external_transfers: 'id, animal_id, date, transfer_type',
      timesheets: 'id, staff_name, date, status',
      holidays: 'id, staff_name, status',
      users: 'id, name, role',
      settings: 'id',
      contacts: 'id, name, role',
      zla_documents: 'id, name, category',
      safety_drills: 'id, date, title',
      maintenance_logs: 'id, title, status, priority',
      first_aid_logs: 'id, date, personName, type',
      incidents: 'id, date, severity'
    });
  }
}

export const db = new AppDatabase();
