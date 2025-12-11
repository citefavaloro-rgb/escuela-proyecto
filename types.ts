export enum YearLevel {
  PRIMERO = '1°',
  SEGUNDO = '2°',
  TERCERO = '3°',
  CUARTO = '4°',
  QUINTO = '5°',
  SEXTO = '6°'
}

export enum SubjectStatus {
  APROBADA = 'Aprobada',
  PENDIENTE = 'Pendiente', // Materia previa
  CURSANDO = 'Cursando',
  INTENSIFICACION = 'En Intensificación', // Recuperatorio/Periodo de intensificación
  RECURSA = 'Recursando' // Debe cursar de nuevo
}

export interface Subject {
  id: string;
  name: string;
  status: SubjectStatus;
  score?: number; // 1-10
  year: YearLevel; // The year this subject belongs to
  isPrevious: boolean; // Is it from a previous year?
}

export interface Guardian {
  name: string;
  relation: string;
  phone: string;
  email?: string;
}

export interface AuthorizedPerson {
  name: string;
  dni: string;
  relation: string;
  phone: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  birthDate: string;
  currentYear: YearLevel;
  division: string; // e.g., "A", "B"
  address: string;
  phone: string;
  email: string;
  photoUrl: string;
  guardians: Guardian[];
  authorizedPersons: AuthorizedPerson[];
  subjects: Subject[];
  attendanceRate: number; // Percentage 0-100
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  notes: string;
}

export interface AIAnalysisResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}