import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setUsername(data.username || "");
      setFullName(data.full_name || "");
    } catch (error) {
      toast({
        title: "Error fetching profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setUpdating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const updates = {
        id: user.id,
        username,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      getProfile(); // Refresh profile data
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-white">Profile Settings</h1>
        <p className="text-gray-400">Manage your account settings and profile information.</p>
      </div>

      <div className="space-y-6 bg-[#1A1F2C] p-6 rounded-lg border border-gray-800">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="bg-gray-700 text-white text-xl">
              {fullName?.charAt(0) || username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white">{fullName || username || "Anonymous User"}</h3>
            <p className="text-sm text-gray-400">Profile picture will be updated automatically when using social login</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="bg-[#1A1F2C] border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Full Name</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="bg-[#1A1F2C] border-gray-700 text-white"
            />
          </div>

          <Button
            onClick={updateProfile}
            disabled={updating}
            className="w-full"
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};