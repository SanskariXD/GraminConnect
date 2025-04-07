
import React from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';
import { getVitalStatus, Patient } from '@/utils/mockData';

interface PatientDetailsProps {
  patient: Patient | null;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Details</CardTitle>
          <CardDescription>Select a patient to view details</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  // Get the latest vitals
  const latestVitals = patient.vitals[0];
  
  // Get status for each vital sign
  const bpStatus = getVitalStatus("bloodPressure", latestVitals.bloodPressure);
  const hrStatus = getVitalStatus("heartRate", latestVitals.heartRate);
  const bsStatus = getVitalStatus("bloodSugar", latestVitals.bloodSugar);
  const tempStatus = getVitalStatus("temperature", latestVitals.temperature);
  const o2Status = getVitalStatus("oxygenSaturation", latestVitals.oxygenSaturation);
  
  // Helper function to get style based on status
  const getStatusStyle = (status: "normal" | "warning" | "emergency") => {
    switch (status) {
      case "emergency":
        return "bg-healthcare-soft-red text-healthcare-emergency";
      case "warning":
        return "bg-healthcare-soft-yellow text-healthcare-warning";
      default:
        return "bg-healthcare-soft-green text-healthcare-success";
    }
  };
  
  return (
    <Card>
      <CardHeader className={patient.isEmergency ? "border-b-4 border-healthcare-emergency" : ""}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>
              Patient ID: {patient.id} • Last Updated: {new Date(patient.lastCheckup).toLocaleDateString()}
            </CardDescription>
          </div>
          {patient.phone && (
            <Button variant="outline" size="icon" className="rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Age</p>
            <p className="font-medium">{patient.age} years</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="font-medium">{patient.gender}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Village</p>
            <p className="font-medium">{patient.village}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{patient.phone || "Not available"}</p>
          </div>
        </div>
        
        <h3 className="font-semibold mb-4">Latest Vital Signs</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${getStatusStyle(bpStatus)}`}>
            <p className="text-sm font-medium">Blood Pressure</p>
            <p className="text-xl font-semibold">{latestVitals.bloodPressure} mmHg</p>
          </div>
          
          <div className={`p-3 rounded-lg ${getStatusStyle(hrStatus)}`}>
            <p className="text-sm font-medium">Heart Rate</p>
            <p className="text-xl font-semibold">{latestVitals.heartRate} bpm</p>
          </div>
          
          <div className={`p-3 rounded-lg ${getStatusStyle(bsStatus)}`}>
            <p className="text-sm font-medium">Blood Sugar</p>
            <p className="text-xl font-semibold">{latestVitals.bloodSugar} mg/dL</p>
          </div>
          
          <div className={`p-3 rounded-lg ${getStatusStyle(tempStatus)}`}>
            <p className="text-sm font-medium">Temperature</p>
            <p className="text-xl font-semibold">{latestVitals.temperature} °F</p>
          </div>
          
          <div className={`p-3 rounded-lg ${getStatusStyle(o2Status)} col-span-2`}>
            <p className="text-sm font-medium">Oxygen Saturation</p>
            <p className="text-xl font-semibold">{latestVitals.oxygenSaturation}%</p>
          </div>
        </div>
        
        {patient.notes && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm">{patient.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
