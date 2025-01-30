import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Squares from "../components/ui/Squares";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Squares
        direction="diagonal"
        speed={0.5}
        borderColor="rgba(255,255,255,0.1)"
        hoverFillColor="rgba(255,255,255,0.05)"
      />
      <div className="w-full max-w-md bg-[#1A1F2C] rounded-lg shadow-xl p-8 relative z-10">
        <img src="assets/logo.png" alt="Logo" className="w-42 h-20  md:w-80 ml-12 text.center" />
        <h2 className="ml-20 mr-12 max-w-md mt-3 bg-gradient-to-r from-blue-400 to-purple-200 to-green-200 bg-clip-text text-transparent ">
          Welcome to Pace innovation
        </h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0284c7",
                  brandAccent: "#0369a1",
                  defaultButtonBackground: "#1A1F2C",
                  defaultButtonBackgroundHover: "#374151",
                },
              },
            },
            style: {
              button: {
                border: "1px solid #374151",
                color: "white",
              },
              anchor: {
                color: "#60A5FA",
              },
              input: {
                backgroundColor: "#1A1F2C",
                borderColor: "#374151",
                color: "white",
              },
              label: {
                color: "#9CA3AF",
              },
            },
          }}
          providers={["google"]}
          view="sign_in"
          showLinks={true}
          redirectTo={`${window.location.origin}/dashboard`}
        />
      </div>
    </div>
  );
};

export default Login;
