
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting auth session:', error);
        navigate('/login');
        return;
      }

      if (data.session) {
        // Get user profile to determine role for redirection
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (profileData?.role === 'doctor') {
          navigate('/doctor');
        } else {
          navigate('/nurse');
        }
      } else {
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="animate-pulse mb-4 flex justify-center">
          <div className="h-12 w-12 bg-healthcare-primary/20 rounded-full flex items-center justify-center">
            <div className="h-8 w-8 bg-healthcare-primary rounded-full"></div>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Completing Authentication</h1>
        <p className="text-slate-500">Please wait while we verify your details...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
