"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { auth, db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { User, LogOut, Package, Mail, Phone, Settings } from "lucide-react";

export default function AccountPage() {
  const { user, role, clearUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    
    async function fetchProfile() {
      const snapshot = await get(ref(db, `users/${user.uid}`));
      if (snapshot.exists()) {
        setProfile(snapshot.val());
      }
    }
    fetchProfile();
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    clearUser();
    router.push("/");
  };

  if (!user || !profile) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray/50">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-sand pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-olive text-white rounded-full flex items-center justify-center text-2xl font-serif">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl text-espresso tracking-tight">Welcome, {profile.name}</h1>
            <p className="text-brown/70 mt-1">Manage your account and orders</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sand text-espresso hover:bg-sand/50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-ivory border border-sand rounded-3xl p-6">
            <h3 className="font-sans font-semibold text-espresso mb-4 flex items-center gap-2">
              <User size={18} className="text-gold" />
              Profile Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-brown/60 flex items-center gap-2"><Mail size={14}/> Email</p>
                <p className="text-espresso font-medium mt-1">{profile.email}</p>
              </div>
              {profile.phone && (
                <div>
                  <p className="text-sm text-brown/60 flex items-center gap-2"><Phone size={14}/> Phone</p>
                  <p className="text-espresso font-medium mt-1">{profile.phone}</p>
                </div>
              )}
            </div>
            
            {role === "admin" && (
              <button
                onClick={() => router.push("/admin")}
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-espresso text-ivory rounded-xl text-sm font-medium hover:bg-olive transition-colors"
              >
                <Settings size={16} />
                Admin Dashboard
              </button>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-ivory border border-sand rounded-3xl p-6 h-full min-h-[300px]">
            <h3 className="font-sans font-semibold text-espresso mb-6 flex items-center gap-2">
              <Package size={18} className="text-gold" />
              Order History
            </h3>
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Package size={40} className="text-sand mb-3" />
              <p className="text-brown/70">You haven't placed any orders yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
