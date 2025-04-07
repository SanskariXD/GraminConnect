
export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  bloodSugar: number;
  temperature: number;
  oxygenSaturation: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  village: string;
  phone?: string;
  vitals: VitalSigns[];
  notes?: string;
  lastCheckup: string;
  isEmergency: boolean;
}

// Villages for filtering
export const villages = [
  "Ranchi",
  "Hazaribagh",
  "Dhanbad",
  "Bokaro",
  "Jamshedpur",
  "Dumka",
  "Giridih",
  "Deoghar",
  "Ramgarh",
  "Chatra"
];

// Mock patients data
export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Anita Devi",
    age: 32,
    gender: "Female",
    village: "Ranchi",
    phone: "9845123456",
    vitals: [
      {
        bloodPressure: "120/80",
        heartRate: 72,
        bloodSugar: 110,
        temperature: 98.6,
        oxygenSaturation: 97
      },
      {
        bloodPressure: "118/78",
        heartRate: 75,
        bloodSugar: 115,
        temperature: 98.4,
        oxygenSaturation: 98
      }
    ],
    notes: "Patient reported mild headaches in the evening",
    lastCheckup: "2025-04-05",
    isEmergency: false
  },
  {
    id: "P002",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    village: "Hazaribagh",
    phone: "8765432198",
    vitals: [
      {
        bloodPressure: "160/100",
        heartRate: 88,
        bloodSugar: 170,
        temperature: 99.2,
        oxygenSaturation: 94
      }
    ],
    notes: "Patient has a history of hypertension. Needs immediate attention.",
    lastCheckup: "2025-04-06",
    isEmergency: true
  },
  {
    id: "P003",
    name: "Meena Singh",
    age: 28,
    gender: "Female",
    village: "Dhanbad",
    vitals: [
      {
        bloodPressure: "115/75",
        heartRate: 68,
        bloodSugar: 105,
        temperature: 98.2,
        oxygenSaturation: 99
      }
    ],
    lastCheckup: "2025-04-04",
    isEmergency: false
  },
  {
    id: "P004",
    name: "Sanjay Prasad",
    age: 52,
    gender: "Male",
    village: "Bokaro",
    phone: "7788990011",
    vitals: [
      {
        bloodPressure: "145/95",
        heartRate: 82,
        bloodSugar: 185,
        temperature: 98.8,
        oxygenSaturation: 95
      }
    ],
    notes: "Diabetic patient. Blood sugar levels are high.",
    lastCheckup: "2025-04-06",
    isEmergency: false
  },
  {
    id: "P005",
    name: "Kavita Sharma",
    age: 35,
    gender: "Female",
    village: "Jamshedpur",
    vitals: [
      {
        bloodPressure: "110/70",
        heartRate: 65,
        bloodSugar: 100,
        temperature: 98.0,
        oxygenSaturation: 98
      }
    ],
    lastCheckup: "2025-04-03",
    isEmergency: false
  },
  {
    id: "P006",
    name: "Mohan Lal",
    age: 62,
    gender: "Male",
    village: "Dumka",
    phone: "9876543210",
    vitals: [
      {
        bloodPressure: "170/110",
        heartRate: 92,
        bloodSugar: 200,
        temperature: 100.4,
        oxygenSaturation: 92
      }
    ],
    notes: "Patient experiencing chest pain and shortness of breath. Immediate attention required.",
    lastCheckup: "2025-04-07",
    isEmergency: true
  }
];

// Mock AI insights for doctor dashboard
export const mockAIInsights = [
  {
    patientId: "P002",
    insight: "Blood pressure readings indicate Stage 2 hypertension. Recommend medication adjustment and follow-up within 48 hours."
  },
  {
    patientId: "P004",
    insight: "Blood sugar level (185 mg/dL) indicates poor glycemic control. Consider adjusting insulin dose and dietary counseling."
  },
  {
    patientId: "P006",
    insight: "Combined symptoms (chest pain, elevated BP, fever, low O2) suggest possible cardiovascular event or respiratory infection. Immediate evaluation recommended."
  }
];

// Helper function to get vitals threshold status
export const getVitalStatus = (vital: string, value: number | string): "normal" | "warning" | "emergency" => {
  if (vital === "bloodPressure") {
    const [systolic, diastolic] = (value as string).split("/").map(Number);
    if (systolic >= 160 || diastolic >= 100) return "emergency";
    if (systolic >= 140 || diastolic >= 90) return "warning";
    return "normal";
  }
  
  if (vital === "heartRate") {
    const rate = value as number;
    if (rate > 100 || rate < 50) return "emergency";
    if (rate > 90 || rate < 60) return "warning";
    return "normal";
  }
  
  if (vital === "bloodSugar") {
    const sugar = value as number;
    if (sugar > 180 || sugar < 70) return "emergency";
    if (sugar > 140 || sugar < 80) return "warning";
    return "normal";
  }
  
  if (vital === "temperature") {
    const temp = value as number;
    if (temp > 100.4 || temp < 97) return "emergency";
    if (temp > 99.5 || temp < 97.5) return "warning";
    return "normal";
  }
  
  if (vital === "oxygenSaturation") {
    const oxygen = value as number;
    if (oxygen < 92) return "emergency";
    if (oxygen < 95) return "warning";
    return "normal";
  }
  
  return "normal";
};

// Function to generate some historical data for charts
export const generateHistoricalData = (patientId: string) => {
  const dates = [
    "2025-03-10", "2025-03-17", "2025-03-24", "2025-03-31", 
    "2025-04-01", "2025-04-03", "2025-04-05", "2025-04-07"
  ];
  
  return dates.map(date => {
    const randomFactor = Math.random() * 0.2 + 0.9; // Random factor between 0.9 and 1.1
    
    // Find the patient
    const patient = mockPatients.find(p => p.id === patientId);
    const latestVitals = patient?.vitals[0] || {
      bloodPressure: "120/80",
      heartRate: 75,
      bloodSugar: 110,
      temperature: 98.6,
      oxygenSaturation: 97
    };
    
    // Generate slightly different values based on the latest
    const [systolic, diastolic] = latestVitals.bloodPressure.split("/").map(Number);
    
    return {
      date,
      bloodPressure: `${Math.round(systolic * randomFactor)}/${Math.round(diastolic * randomFactor)}`,
      heartRate: Math.round(latestVitals.heartRate * randomFactor),
      bloodSugar: Math.round(latestVitals.bloodSugar * randomFactor),
      temperature: +(latestVitals.temperature * randomFactor).toFixed(1),
      oxygenSaturation: Math.min(99, Math.round(latestVitals.oxygenSaturation * randomFactor))
    };
  });
};
