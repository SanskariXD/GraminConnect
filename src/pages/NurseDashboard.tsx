
import React, { useEffect, useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import PatientList from '@/components/PatientList';
import VitalsForm from '@/components/VitalsForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Patient, VitalSigns } from '@/utils/mockData';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import SignOutButton from '@/components/SignOutButton';

const NurseDashboard = () => {
  const { toast } = useToast();
  const { userDetails } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  
  // Form states for new patient
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState<"Male" | "Female" | "Other">("Male");
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientMedicalHistory, setNewPatientMedicalHistory] = useState('');
  const [newPatientAllergies, setNewPatientAllergies] = useState('');
  
  useEffect(() => {
    if (userDetails?.village) {
      fetchPatients();
    }
  }, [userDetails]);
  
  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      // Query patients for the nurse's village
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('village', userDetails?.village)
        .order('full_name', { ascending: true });
      
      if (error) throw error;
      
      setPatients(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast({
        title: "Error fetching patients",
        description: "Please try again later",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };
  
  const handleVitalsSubmit = async (patientId: string, vitals: any, notes: string, isEmergency: boolean) => {
    try {
      // Add vitals record to database
      const { error: vitalsError } = await supabase
        .from('vitals')
        .insert({
          patient_id: patientId,
          blood_pressure: vitals.bloodPressure,
          heart_rate: vitals.heartRate,
          temperature: vitals.temperature,
          oxygen_saturation: vitals.oxygenSaturation,
          glucose_level: vitals.glucoseLevel,
          weight: vitals.weight,
          height: vitals.height,
          symptoms: vitals.symptoms,
          notes: notes,
          recorded_by: userDetails?.id
        });
        
      if (vitalsError) throw vitalsError;
      
      // If emergency, create an emergency case
      if (isEmergency) {
        const { error: emergencyError } = await supabase
          .from('emergency_cases')
          .insert({
            patient_id: patientId,
            description: notes || "Emergency situation reported",
            severity: vitals.emergencySeverity || "medium",
            reported_by: userDetails?.id,
            status: 'pending'
          });
          
        if (emergencyError) throw emergencyError;
      }
      
      toast({
        title: "Vitals recorded successfully",
        description: isEmergency ? "Emergency alert has been sent to doctors" : "Patient records updated",
      });
      
      // Refresh patient list
      fetchPatients();
      
    } catch (error) {
      console.error('Error submitting vitals:', error);
      toast({
        title: "Error recording vitals",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  
  const handleAddPatient = async () => {
    if (!newPatientName || !newPatientAge) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Add patient to database
      const { data, error } = await supabase
        .from('patients')
        .insert({
          full_name: newPatientName,
          age: parseInt(newPatientAge),
          gender: newPatientGender,
          village: userDetails?.village || "",
          phone: newPatientPhone || null,
          medical_history: newPatientMedicalHistory || null,
          allergies: newPatientAllergies || null,
          created_by: userDetails?.id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Add to patients list and select the new patient
      setPatients(prev => [...prev, data]);
      setSelectedPatient(data);
      
      // Reset form and close dialog
      setNewPatientName('');
      setNewPatientAge('');
      setNewPatientGender("Male");
      setNewPatientPhone('');
      setNewPatientMedicalHistory('');
      setNewPatientAllergies('');
      setIsAddingPatient(false);
      
      toast({
        title: "Patient added",
        description: `${newPatientName} has been added to your patient list`,
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      toast({
        title: "Error adding patient",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DashboardHeader 
        title="Nurse Dashboard" 
        subtitle={userDetails?.village ? `Village: ${userDetails.village}` : ''}
      >
        <SignOutButton />
      </DashboardHeader>
      
      <main className="flex-1 container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Patient Management</h2>
            <p className="text-slate-600">Welcome, {userDetails?.full_name || 'Nurse'}</p>
          </div>
          
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
                  <Label htmlFor="village">Village/Town</Label>
                  <Input 
                    id="village" 
                    value={userDetails?.village || ''}
                    disabled
                    className="bg-slate-100"
                  />
                  <p className="text-xs text-slate-500">You can only add patients from your assigned village</p>
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
                
                <div className="space-y-2">
                  <Label htmlFor="medical-history">Medical History (Optional)</Label>
                  <Input 
                    id="medical-history" 
                    placeholder="Any significant medical history" 
                    value={newPatientMedicalHistory}
                    onChange={(e) => setNewPatientMedicalHistory(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies (Optional)</Label>
                  <Input 
                    id="allergies" 
                    placeholder="Any allergies" 
                    value={newPatientAllergies}
                    onChange={(e) => setNewPatientAllergies(e.target.value)}
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
            loading={loading}
            onRefresh={fetchPatients}
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
