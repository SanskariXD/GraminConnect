
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-healthcare-soft-green to-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 mb-4 bg-healthcare-soft-teal rounded-full">
              <Heart className="h-6 w-6 text-healthcare-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-healthcare-primary to-healthcare-secondary bg-clip-text text-transparent mb-4">
              Gramin Connect
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto">
              Empowering healthcare professionals to deliver better care in rural communities
            </p>
          </div>
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="md:flex">
              {/* Image Section - only visible on md and above */}
              <div className="hidden md:block md:w-1/2 bg-healthcare-soft-teal">
                <div className="h-full flex items-center justify-center p-6">
                  <img 
                    src="/placeholder.svg" 
                    alt="Rural healthcare" 
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4">Connect Rural Healthcare</h2>
                  <p className="text-slate-500">
                    Bridging the gap between doctors and nurses across rural areas
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={() => navigate('/login')}
                    className="healthcare-btn flex items-center group px-8 py-6 text-lg bg-healthcare-primary text-white hover:bg-healthcare-secondary transition-colors"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-healthcare-soft-blue rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-healthcare-info" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">For Doctors</h3>
                <p className="text-slate-600 mb-4">
                  Access patient vitals remotely, view trends over time, and get AI-powered insights to make informed decisions.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-healthcare-primary rounded-full mr-2"></div>
                    View patient data in real-time
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-healthcare-primary rounded-full mr-2"></div>
                    Analyze historical trends with graphs
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-healthcare-primary rounded-full mr-2"></div>
                    Receive emergency alerts instantly
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-healthcare-soft-green rounded-lg flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-healthcare-success" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">For Nurses</h3>
                <p className="text-slate-600 mb-4">
                  Record patient vitals, add new patients, and flag emergencies for immediate doctor attention.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-healthcare-success rounded-full mr-2"></div>
                    Record and upload patient vitals
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-healthcare-success rounded-full mr-2"></div>
                    Register new patients efficiently
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-healthcare-success rounded-full mr-2"></div>
                    Highlight critical cases with emergency flags
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10 text-sm text-slate-500">
            <p>Securely connecting healthcare providers in rural areas since 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
