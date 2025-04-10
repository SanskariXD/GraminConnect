
export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'doctor' | 'nurse';
  village: string | null;
  created_at: string;
  updated_at: string;
};

export type Patient = {
  id: string;
  full_name: string;
  gender: string;
  age: number;
  village: string;
  phone: string | null;
  medical_history: string | null;
  allergies: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Vital = {
  id: string;
  patient_id: string;
  blood_pressure: string | null;
  heart_rate: number | null;
  temperature: number | null;
  oxygen_saturation: number | null;
  glucose_level: number | null;
  weight: number | null;
  height: number | null;
  symptoms: string | null;
  notes: string | null;
  recorded_by: string | null;
  created_at: string;
};

export type EmergencyCase = {
  id: string;
  patient_id: string | null;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reported_by: string | null;
  assigned_to: string | null;
  created_at: string;
  resolved_at: string | null;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      patients: {
        Row: Patient;
        Insert: Omit<Patient, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Patient, 'id' | 'created_at'>>;
      };
      vitals: {
        Row: Vital;
        Insert: Omit<Vital, 'id' | 'created_at'>;
        Update: Partial<Omit<Vital, 'id' | 'created_at'>>;
      };
      emergency_cases: {
        Row: EmergencyCase;
        Insert: Omit<EmergencyCase, 'id' | 'created_at'>;
        Update: Partial<Omit<EmergencyCase, 'id' | 'created_at'>>;
      };
    };
  };
};
