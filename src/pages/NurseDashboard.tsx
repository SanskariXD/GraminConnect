
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/DashboardHeader';
import PatientList from '@/components/PatientList';
import VitalsForm from '@/components/VitalsForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { mockPatients, Patient, VitalSigns } from '@/utils/mockData';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const NurseDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  
  // Form states for new patient
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState<"Male" | "Female" | "Other">("Male");
  const [newPatientVillage, setNewPatientVillage] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'nurse') {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };
  
  const handleVitalsSubmit = (patientId: string, vitals: VitalSigns, notes: string, isEmergency: boolean) => {
    // Update the patient's vitals
    setPatients(prevPatients => 
      prevPatients.map(patient => {
        if (patient.id === patientId) {
          return {
            ...patient,
            vitals: [vitals, ...patient.vitals],
            notes: notes || patient.notes,
            lastCheckup: new Date().toISOString().split('T')[0],
            isEmergency
          };
        }
        return patient;
      })
    );
    
    // Update selected patient
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient({
        ...selectedPatient,
        vitals: [vitals, ...selectedPatient.vitals],
        notes: notes || selectedPatient.notes,
        lastCheckup: new Date().toISOString().split('T')[0],
        isEmergency
      });
    }
  };
  
  const handleAddPatient = () => {
    if (!newPatientName || !newPatientAge || !newPatientVillage) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Create new patient
    const newPatient: Patient = {
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      name: newPatientName,
      age: Number(newPatientAge),
      gender: newPatientGender,
      village: newPatientVillage,
      phone: newPatientPhone || undefined,
      vitals: [],
      lastCheckup: new Date().toISOString().split('T')[0],
      isEmergency: false
    };
    
    // Add to patients list
    setPatients(prevPatients => [...prevPatients, newPatient]);
    
    // Select the new patient
    setSelectedPatient(newPatient);
    
    // Reset form and close dialog
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientGender("Male");
    setNewPatientVillage('');
    setNewPatientPhone('');
    setIsAddingPatient(false);
    
    toast({
      title: "Patient added",
      description: `${newPatientName} has been added to your patient list`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DashboardHeader 
        title="Nurse Dashboard" 
        role="nurse" 
        username={localStorage.getItem('userName') || 'Nurse'}
      />
      
      <main className="flex-1 container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Patient Management</h2>
          
          <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
            <DialogTrigger asChild>
              <Button className="healthcare-btn healthcare-btn-primary flex items-center gap-2">
                <Plus className="h-5 w-5" />
                <span>Add Patient</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>
                  Enter the patient details below to register them in the system.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="Full name" 
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      placeholder="Age" 
                      value={newPatientAge}
                      onChange={(e) => setNewPatientAge(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select 
                      value={newPatientGender} 
                      onValueChange={(value) => setNewPatientGender(value as "Male" | "Female" | "Other")}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="village">Village/Town *</Label>
                  <Select 
                    value={newPatientVillage} 
                    onValueChange={setNewPatientVillage}
                  >
                    <SelectTrigger id="village">
                      <SelectValue placeholder="Select village" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Ranchi', 'Hazaribagh', 'Dhanbad', 'Bokaro', 'Jamshedpur', 'Dumka', 'Giridih', 'Deoghar', 'Ramgarh', 'Chatra'].map((village) => (
                        <SelectItem key={village} value={village}>
                          {village}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input 
                    id="phone" 
                    placeholder="Phone number" 
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddingPatient(false)}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="healthcare-btn healthcare-btn-primary" 
                  onClick={handleAddPatient}
                >
                  Add Patient
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PatientList 
            patients={patients} 
            onSelectPatient={handleSelectPatient}
            selectedPatientId={selectedPatient?.id || null}
          />
          <VitalsForm 
            patient={selectedPatient} 
            onSubmit={handleVitalsSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default NurseDashboard;
