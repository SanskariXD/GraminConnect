
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, LogIn, MapPin, Mail } from 'lucide-react';
import { villages } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');
  const [village, setVillage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  // Show/hide village selection based on role
  const showVillageSelect = role === 'nurse';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate nurse has selected a village
    if (role === 'nurse' && !village) {
      toast({
        title: "Village Selection Required",
        description: "Please select your assigned village",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      if (isSignUp) {
        await signUp(email, password, role, role === 'nurse' ? village : undefined);
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account",
        });
      } else {
        await signIn(email, password, role, role === 'nurse' ? village : undefined);
        toast({
          title: "Login successful",
          description: `Welcome back${role === 'doctor' ? ', Doctor' : ', Nurse'}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      toast({
        title: "Google Sign In Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
    }
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
          
          <div className="inline-block p-3 bg-healthcare-soft-teal rounded-full mb-4">
            <div className="bg-healthcare-primary text-white h-10 w-10 rounded-full flex items-center justify-center">
              <LogIn className="h-5 w-5" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Gramin Connect</h1>
          <p className="text-slate-500">Sign in to continue to rural healthcare platform</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-xl text-center">{isSignUp ? "Create Account" : "Login"}</CardTitle>
            <CardDescription className="text-center">
              {isSignUp ? "Sign up for a new account" : "Enter your credentials below"}
            </CardDescription>
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
                  required
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
                    required
                    minLength={6}
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
                  onValueChange={(value) => {
                    setRole(value);
                    // Reset village if switching to doctor
                    if (value === 'doctor') {
                      setVillage('');
                    }
                  }}
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
              
              {showVillageSelect && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="village" className="text-slate-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Assigned Village
                  </Label>
                  <Select value={village} onValueChange={setVillage} required={role === 'nurse'}>
                    <SelectTrigger id="village" className="h-12 text-base border-slate-200">
                      <SelectValue placeholder="Select your assigned village" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full py-6 text-base font-medium bg-healthcare-primary hover:bg-healthcare-secondary transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>
              
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full py-5 text-base font-medium border-slate-300 hover:bg-slate-50"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              
              <div className="text-center text-sm">
                {isSignUp ? (
                  <p>
                    Already have an account?{" "}
                    <button 
                      type="button" 
                      className="text-healthcare-primary hover:underline font-medium"
                      onClick={() => setIsSignUp(false)}
                    >
                      Sign in
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{" "}
                    <button 
                      type="button" 
                      className="text-healthcare-primary hover:underline font-medium"
                      onClick={() => setIsSignUp(true)}
                    >
                      Create one
                    </button>
                  </p>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
