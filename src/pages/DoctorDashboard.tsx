
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/DashboardHeader';
import PatientList from '@/components/PatientList';
import PatientDetails from '@/components/PatientDetails';
import VitalsChart from '@/components/VitalsChart';
import AIInsights from '@/components/AIInsights';
import EmergencyBanner from '@/components/EmergencyBanner';
import { mockPatients, Patient } from '@/utils/mockData';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'doctor') {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };
  
  // Count emergency cases
  const emergencyCount = patients.filter(patient => patient.isEmergency).length;
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DashboardHeader 
        title="Doctor Dashboard" 
        role="doctor" 
        username={localStorage.getItem('userName') || 'Dr. Ravi Kumar'}
      />
      
      <main className="flex-1 container mx-auto px-4 pb-8">
        <EmergencyBanner count={emergencyCount} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PatientList 
              patients={patients} 
              onSelectPatient={handleSelectPatient}
              selectedPatientId={selectedPatient?.id || null}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <PatientDetails patient={selectedPatient} />
            
            {selectedPatient && selectedPatient.vitals.length > 0 && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <VitalsChart patient={selectedPatient} />
                  <AIInsights patient={selectedPatient} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
