
import React from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Sparkles } from 'lucide-react';
import { mockAIInsights, Patient } from '@/utils/mockData';

interface AIInsightsProps {
  patient: Patient | null;
}

const AIInsights: React.FC<AIInsightsProps> = ({ patient }) => {
  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-healthcare-secondary" />
            <span>AI Insights</span>
          </CardTitle>
          <CardDescription>Select a patient to view insights</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  // Find insights for this patient
  const patientInsights = mockAIInsights.find(
    insight => insight.patientId === patient.id
  );
  
  // Generate generic insights if none exist
  const insightText = patientInsights 
    ? patientInsights.insight 
    : generateGenericInsight(patient);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-healthcare-secondary" />
          <span>AI Insights</span>
        </CardTitle>
        <CardDescription>AI-powered analysis for {patient.name}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="p-4 bg-healthcare-soft-purple rounded-lg">
          <p className="text-sm">{insightText}</p>
          
          {!patientInsights && (
            <div className="mt-4 pt-4 border-t border-healthcare-primary border-opacity-20">
              <h4 className="text-sm font-semibold mb-2">Recommendations:</h4>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Continue monitoring vital signs regularly</li>
                <li>Follow up with patient in 2 weeks</li>
                <li>No medication changes needed at this time</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate generic insights based on patient data
function generateGenericInsight(patient: Patient): string {
  const latestVitals = patient.vitals[0];
  
  // Extract values
  const [systolic, diastolic] = latestVitals.bloodPressure.split("/").map(Number);
  const { heartRate, bloodSugar, temperature, oxygenSaturation } = latestVitals;
  
  // Simple analysis
  if (patient.isEmergency) {
    return "Patient requires immediate attention. Multiple vital signs are outside normal ranges, suggesting possible acute condition that should be evaluated promptly.";
  }
  
  if (systolic > 140 || diastolic > 90) {
    return `Blood pressure (${latestVitals.bloodPressure}) is elevated. Consider lifestyle modifications or medication adjustment if this is a consistent pattern.`;
  }
  
  if (bloodSugar > 140) {
    return `Blood sugar reading (${bloodSugar} mg/dL) is above target range. Recommend dietary counseling and monitoring for symptoms of hyperglycemia.`;
  }
  
  if (oxygenSaturation < 95) {
    return `Oxygen saturation (${oxygenSaturation}%) is below optimal levels. Consider respiratory assessment and monitoring for symptoms of respiratory distress.`;
  }
  
  return "All vital signs are within normal ranges. Patient appears to be stable based on current readings. Recommend continuing current management plan.";
}

export default AIInsights;
