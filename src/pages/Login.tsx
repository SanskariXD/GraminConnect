
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would normally be Firebase authentication
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        // Simulate login and redirect based on role
        if (role === 'doctor') {
          navigate('/doctor');
          localStorage.setItem('userRole', 'doctor');
          localStorage.setItem('userName', 'Dr. Ravi Kumar');
        } else {
          navigate('/nurse');
          localStorage.setItem('userRole', 'nurse');
          localStorage.setItem('userName', 'Nurse Priya Singh');
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter your email and password",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-slate-600 hover:text-slate-900 p-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="text-sm">Back</span>
          </Button>
          
          <div className="inline-block p-3 bg-healthcare-soft-purple rounded-full mb-4">
            <div className="bg-healthcare-primary text-white h-10 w-10 rounded-full flex items-center justify-center">
              <LogIn className="h-5 w-5" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to continue to Seva Sathi Connect</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl text-center">Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials below</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="h-12 text-base border-slate-200 focus:border-healthcare-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 text-base border-slate-200 focus:border-healthcare-primary pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <Label className="text-slate-700">Select your role</Label>
                <RadioGroup
                  value={role}
                  onValueChange={setRole}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
                    <RadioGroupItem value="doctor" id="doctor" className="text-healthcare-primary" />
                    <Label htmlFor="doctor" className="flex-1 cursor-pointer font-medium text-slate-700">Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
                    <RadioGroupItem value="nurse" id="nurse" className="text-healthcare-primary" />
                    <Label htmlFor="nurse" className="flex-1 cursor-pointer font-medium text-slate-700">Nurse</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full py-6 text-base font-medium bg-healthcare-primary hover:bg-healthcare-secondary transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <p className="mt-6 text-center text-sm text-slate-500">
                For demo: Enter any email and password
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
