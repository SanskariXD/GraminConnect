
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { generateHistoricalData, Patient } from '@/utils/mockData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";

interface VitalsChartProps {
  patient: Patient | null;
}

type ChartMetric = "bloodPressure" | "heartRate" | "bloodSugar" | "temperature" | "oxygenSaturation";

const VitalsChart: React.FC<VitalsChartProps> = ({ patient }) => {
  const [selectedMetric, setSelectedMetric] = useState<ChartMetric>("heartRate");
  
  if (!patient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vitals Trend</CardTitle>
          <CardDescription>Select a patient to view trends</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  // Generate historical data for the selected patient
  const chartData = generateHistoricalData(patient.id);
  
  // Format data for display in the chart
  const formattedData = chartData.map(record => {
    if (selectedMetric === "bloodPressure") {
      const [systolic, diastolic] = record.bloodPressure.split("/").map(Number);
      return {
        date: new Date(record.date).toLocaleDateString(),
        Systolic: systolic,
        Diastolic: diastolic
      };
    }
    
    return {
      date: new Date(record.date).toLocaleDateString(),
      [getMetricDisplayName(selectedMetric)]: record[selectedMetric]
    };
  });
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Vitals Trend</CardTitle>
            <CardDescription>Historical trends for {patient.name}</CardDescription>
          </div>
          <div className="w-full sm:w-[200px]">
            <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as ChartMetric)}>
              <SelectTrigger>
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
                <SelectItem value="heartRate">Heart Rate</SelectItem>
                <SelectItem value="bloodSugar">Blood Sugar</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="oxygenSaturation">Oxygen Saturation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 5, right: 20, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                label={{ 
                  value: 'Date', 
                  position: 'insideBottomRight', 
                  offset: -10 
                }}
              />
              <YAxis 
                label={{ 
                  value: getYAxisLabel(selectedMetric), 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip />
              <Legend />
              
              {selectedMetric === "bloodPressure" ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="Systolic" 
                    stroke="#9b87f5" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Diastolic" 
                    stroke="#7E69AB" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </>
              ) : (
                <Line 
                  type="monotone" 
                  dataKey={getMetricDisplayName(selectedMetric)} 
                  stroke="#9b87f5" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get display name for the metric
function getMetricDisplayName(metric: ChartMetric): string {
  switch (metric) {
    case "bloodPressure": return "Blood Pressure";
    case "heartRate": return "Heart Rate";
    case "bloodSugar": return "Blood Sugar";
    case "temperature": return "Temperature";
    case "oxygenSaturation": return "Oxygen Saturation";
  }
}

// Helper function to get Y-axis label based on the metric
function getYAxisLabel(metric: ChartMetric): string {
  switch (metric) {
    case "bloodPressure": return "mmHg";
    case "heartRate": return "bpm";
    case "bloodSugar": return "mg/dL";
    case "temperature": return "°F";
    case "oxygenSaturation": return "%";
  }
}

export default VitalsChart;
