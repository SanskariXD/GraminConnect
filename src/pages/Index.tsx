
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'doctor') {
      navigate('/doctor');
    } else if (userRole === 'nurse') {
      navigate('/nurse');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-healthcare-primary mb-2">Seva Sathi Connect</h1>
          <p className="text-xl text-muted-foreground">
            Healthcare collaboration platform for rural communities
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Welcome</h2>
            <p className="text-muted-foreground">
              Connecting doctors and nurses to provide better healthcare in rural areas
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              className="w-full healthcare-btn healthcare-btn-primary"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-healthcare-soft-blue">
            <h3 className="font-medium mb-2">For Doctors</h3>
            <p className="text-sm">
              Access patient vitals, view trends, and get AI-powered insights to make informed decisions remotely.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-healthcare-soft-green">
            <h3 className="font-medium mb-2">For Nurses</h3>
            <p className="text-sm">
              Record patient vitals, add new patients, and flag emergencies for immediate doctor attention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
