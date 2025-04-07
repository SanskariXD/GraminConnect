
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Patient, VitalSigns } from '@/utils/mockData';

interface VitalsFormProps {
  patient: Patient | null;
  onSubmit: (patientId: string, vitals: VitalSigns, notes: string, isEmergency: boolean) => void;
}

const VitalsForm: React.FC<VitalsFormProps> = ({ patient, onSubmit }) => {
  const { toast } = useToast();
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [temperature, setTemperature] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [notes, setNotes] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patient) {
      toast({
        title: "No patient selected",
        description: "Please select a patient before submitting vitals",
        variant: "destructive",
      });
      return;
    }
    
    if (!bloodPressure || !heartRate || !bloodSugar || !temperature || !oxygenSaturation) {
      toast({
        title: "Missing information",
        description: "Please fill in all vital sign fields",
        variant: "destructive",
      });
      return;
    }
    
    // Create vitals object
    const vitalsData: VitalSigns = {
      bloodPressure,
      heartRate: Number(heartRate),
      bloodSugar: Number(bloodSugar),
      temperature: Number(temperature),
      oxygenSaturation: Number(oxygenSaturation)
    };
    
    onSubmit(patient.id, vitalsData, notes, isEmergency);
    
    // Reset form
    setBloodPressure('');
    setHeartRate('');
    setBloodSugar('');
    setTemperature('');
    setOxygenSaturation('');
    setNotes('');
    setIsEmergency(false);
    
    toast({
      title: "Vitals recorded",
      description: `Vitals for ${patient.name} have been successfully recorded`,
    });
  };
  
  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Record Vitals</CardTitle>
          <CardDescription>Please select a patient first</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Vitals for {patient.name}</CardTitle>
        <CardDescription>
          {patient.age} years • {patient.gender} • {patient.village}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
              <Input
                id="bloodPressure"
                placeholder="e.g. 120/80"
                className="healthcare-input"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="e.g. 72"
                className="healthcare-input"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
              <Input
                id="bloodSugar"
                type="number"
                placeholder="e.g. 110"
                className="healthcare-input"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="e.g. 98.6"
                className="healthcare-input"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
              <Input
                id="oxygenSaturation"
                type="number"
                placeholder="e.g. 97"
                className="healthcare-input"
                value={oxygenSaturation}
                onChange={(e) => setOxygenSaturation(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the patient..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="emergency" 
              checked={isEmergency} 
              onCheckedChange={setIsEmergency} 
            />
            <Label 
              htmlFor="emergency" 
              className={`font-medium ${isEmergency ? 'text-healthcare-emergency' : ''}`}
            >
              Flag as emergency case
            </Label>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full healthcare-btn healthcare-btn-primary"
          >
            Submit Vitals
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default VitalsForm;
