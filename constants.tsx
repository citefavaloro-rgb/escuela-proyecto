import { Student, YearLevel, SubjectStatus, Subject } from './types';

const SUBJECTS_LIST = [
  "Matemáticas", "Prácticas del Lenguaje", "Inglés", "Historia", 
  "Geografía", "Biología", "Físico-Química", "Educación Física", 
  "Construcción de Ciudadanía", "Arte"
];

const NAMES = ["Sofía", "Martín", "Lucas", "Valentina", "Mateo", "Camila", "Benjamín", "Abril", "Joaquín", "Mía", "Lautaro", "Isabella", "Bautista", "Catalina"];
const SURNAMES = ["García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez", "Romero", "Díaz", "Fernández", "Ruiz", "Gómez", "Flores", "Benítez"];
const STREETS = ["Av. Bernardo de Irigoyen", "Int. Manny", "Av. San Martín", "25 de Mayo", "Pueyrredón", "Sarmiento", "Belgrano", "Rivadavia"];

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMockStudents = (count: number): Student[] => {
  return Array.from({ length: count }).map((_, i) => {
    const year = getRandom(Object.values(YearLevel));
    const subjectsCount = 10;
    const subjects: Subject[] = Array.from({ length: subjectsCount }).map((__, subIdx) => {
      const statusRoll = Math.random();
      let status = SubjectStatus.APROBADA;
      let score: number | undefined = randomInt(7, 10);
      let isPrevious = false;

      if (statusRoll < 0.15) {
        status = SubjectStatus.INTENSIFICACION;
        score = randomInt(4, 6);
      } else if (statusRoll < 0.25) {
        status = SubjectStatus.RECURSA;
        score = randomInt(1, 3);
      } else if (statusRoll < 0.30) {
        status = SubjectStatus.PENDIENTE;
        isPrevious = true;
        score = undefined;
      } else if (statusRoll < 0.35) {
        status = SubjectStatus.CURSANDO;
        score = undefined;
      }

      return {
        id: `sub-${subIdx}`,
        name: SUBJECTS_LIST[subIdx],
        status,
        score,
        year: year,
        isPrevious
      };
    });

    const failedSubjects = subjects.filter(s => s.status === SubjectStatus.RECURSA || s.status === SubjectStatus.INTENSIFICACION).length;
    const previousSubjects = subjects.filter(s => s.isPrevious).length;
    
    let riskLevel: 'Bajo' | 'Medio' | 'Alto' = 'Bajo';
    if (failedSubjects + previousSubjects >= 3) riskLevel = 'Alto';
    else if (failedSubjects + previousSubjects >= 1) riskLevel = 'Medio';

    const authorizedPersons = Array.from({ length: randomInt(1, 3) }).map(() => ({
      name: `${getRandom(NAMES)} ${getRandom(SURNAMES)}`,
      dni: `${randomInt(20000000, 40000000)}`,
      relation: getRandom(['Abuelo/a', 'Tío/a', 'Hermano/a Mayor', 'Vecino/a', 'Padrino/Madrina']),
      phone: `11-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`
    }));

    return {
      id: `st-${i}`,
      firstName: getRandom(NAMES),
      lastName: getRandom(SURNAMES),
      dni: `${randomInt(40000000, 60000000)}`,
      birthDate: `${randomInt(1, 28)}/${randomInt(1, 12)}/${randomInt(2006, 2012)}`,
      currentYear: year,
      division: getRandom(["A", "B", "C"]),
      address: `${getRandom(STREETS)} ${randomInt(100, 900)}, Gral. Rodríguez`,
      phone: `11-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
      email: `alumno${i}@ees6favaloro.edu.ar`,
      photoUrl: `https://picsum.photos/200/200?random=${i}`,
      guardians: [
        {
          name: `${getRandom(NAMES)} ${getRandom(SURNAMES)}`,
          relation: getRandom(['Padre', 'Madre', 'Tutor']),
          phone: `11-${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
          email: `tutor${i}@gmail.com`
        }
      ],
      authorizedPersons,
      subjects,
      attendanceRate: randomInt(60, 100),
      riskLevel,
      notes: "Alumno regular de la institución. " + (riskLevel === 'Alto' ? 'Requiere seguimiento estricto por inasistencias.' : '')
    };
  });
};