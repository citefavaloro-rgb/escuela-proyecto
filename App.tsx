import React, { useState, useEffect } from 'react';
import { generateMockStudents } from './constants';
import { Student } from './types';
import { StudentList } from './components/StudentList';
import { StudentDetail } from './components/StudentDetail';
import { Dashboard } from './components/Dashboard';
import { DatabaseManagement } from './components/DatabaseManagement';
import { LayoutDashboard, Users, GraduationCap, School, Loader2, Database } from 'lucide-react';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentView, setCurrentView] = useState<'dashboard' | 'students' | 'database'>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    // Generate data once on mount
    const data = generateMockStudents(150);
    setStudents(data);
  }, []);

  const handleImportData = (file: File) => {
    // Determine context based on view
    const isDatabaseView = currentView === 'database';
    
    // We only show the full screen loader if importing from StudentList
    if (!isDatabaseView) setIsImporting(true);
    
    // Simulate parsing and updating database
    setTimeout(() => {
      // In a real app, parse file here. For demo, we regenerate data to simulate "new" data.
      const newData = generateMockStudents(150 + Math.floor(Math.random() * 20));
      setStudents(newData);
      
      if (!isDatabaseView) {
        setIsImporting(false);
        alert(`Base de datos actualizada correctamente. Se procesaron ${newData.length} registros desde "${file.name}".`);
        setCurrentView('students');
      }
      // In database view, the component handles the success UI
    }, 2000);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 transition-transform shadow-xl">
        <div className="p-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <School className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">SGE-CITE</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">EES N°6 Rene Favaloro</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase px-4 mb-2 mt-2">Principal</div>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium text-sm ${currentView === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            Panel General
          </button>
          <button 
            onClick={() => setCurrentView('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium text-sm ${currentView === 'students' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={18} />
            Legajos Alumnos
          </button>

          <div className="text-xs font-bold text-slate-500 uppercase px-4 mb-2 mt-6">Administración</div>
           <button 
             onClick={() => setCurrentView('database')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium text-sm ${currentView === 'database' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Database size={18} />
            Base de Datos
          </button>
          
          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <div>
                  <p className="text-xs font-semibold text-slate-300">Sistema Online</p>
                  <p className="text-[10px] text-slate-500">v1.3.1 CITE Edition</p>
               </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        {isImporting && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-800">Procesando Base de Datos...</h3>
            <p className="text-gray-500">Por favor espere mientras actualizamos los legajos.</p>
          </div>
        )}

        <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-4 z-20">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {currentView === 'dashboard' ? <LayoutDashboard className="text-indigo-600" size={24}/> : 
               currentView === 'database' ? <Database className="text-indigo-600" size={24}/> :
               <Users className="text-indigo-600" size={24}/>}
              
              {currentView === 'dashboard' && 'Panel CITE'}
              {currentView === 'students' && 'Gestión de Trayectorias'}
              {currentView === 'database' && 'Base de Datos Maestra'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {currentView === 'dashboard' && 'Monitoreo de indicadores institucionales'}
              {currentView === 'students' && 'Seguimiento individual de alumnos'}
              {currentView === 'database' && 'Administración y modificación de legajos'}
            </p>
          </div>
          <div className="flex items-center gap-4 border-l pl-4 border-gray-200">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700">Manuel Vera Vilche</p>
                <p className="text-xs text-slate-500">Coord. Institucional CITE</p>
             </div>
             <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-indigo-100 cursor-help" title="Manuel Vera Vilche - CITE">
                MV
             </div>
          </div>
        </header>

        {currentView === 'dashboard' && (
          <Dashboard students={students} />
        )}
        
        {currentView === 'students' && (
          <StudentList 
            students={students} 
            onSelectStudent={setSelectedStudent}
            onImportData={handleImportData}
          />
        )}

        {currentView === 'database' && (
          <DatabaseManagement 
            students={students}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            onImportFile={handleImportData}
          />
        )}
      </main>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetail 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
};

export default App;