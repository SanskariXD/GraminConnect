
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Patient, villages } from '@/utils/mockData';
import { ArrowRight, Search } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  selectedPatientId: string | null;
  loading?: boolean;
  onRefresh?: () => Promise<void>;
}

const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  onSelectPatient, 
  selectedPatientId 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("all");
  
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVillage = selectedVillage === "all" || patient.village === selectedVillage;
    
    return matchesSearch && matchesVillage;
  });
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Patients</CardTitle>
        <CardDescription>
          {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..." 
                className="pl-9 healthcare-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-[180px]">
              <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by village" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Villages</SelectItem>
                  {villages.map(village => (
                    <SelectItem key={village} value={village}>{village}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No patients found
              </div>
            ) : (
              filteredPatients.map(patient => (
                <div 
                  key={patient.id}
                  className={`p-3 rounded-lg border ${
                    selectedPatientId === patient.id 
                      ? 'border-healthcare-primary bg-healthcare-soft-purple' 
                      : 'border-gray-200 hover:border-healthcare-primary bg-white'
                  } cursor-pointer transition-all duration-200 ${
                    patient.isEmergency ? 'border-l-4 border-l-healthcare-emergency' : ''
                  }`}
                  onClick={() => onSelectPatient(patient)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <div className="flex text-sm text-muted-foreground gap-2">
                        <span>{patient.age} yrs</span>
                        <span>•</span>
                        <span>{patient.gender}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {patient.village} • Last checkup: {new Date(patient.lastCheckup).toLocaleDateString()}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-healthcare-primary" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientList;
