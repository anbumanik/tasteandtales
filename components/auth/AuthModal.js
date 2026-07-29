"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { useAuthStore, useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, setUser } = useAuthStore();
  const showToast = useUIStore((s) => s.showToast);
  
  const [view, setView] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  // Handle saving/fetching user to DB
  const handleUserAuth = async (user, additionalData = {}) => {
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    
    let role = "user";

    if (!snapshot.exists()) {
      // New user, save to DB
      const userData = {
        name: additionalData.name || user.displayName || "User",
        email: user.email,
        phone: additionalData.phone || user.phoneNumber || "",
        role: "user",
        createdAt: Date.now(),
      };
      await set(userRef, userData);
    } else {
      // Existing user, get role
      role = snapshot.val().role || "user";
    }

    setUser(user, role);
    closeAuthModal();
    showToast({
      title: "Success",
      message: `Welcome back, ${additionalData.name || user.displayName || "User"}!`,
      type: "success",
    });
  };

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
      await handleUserAuth(userCred.user);
    } catch (error) {
      showToast({
        title: "Login Failed",
        message: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data) => {
    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await handleUserAuth(userCred.user, { name: data.name, phone: data.phone });
    } catch (error) {
      showToast({
        title: "Signup Failed",
        message: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      await handleUserAuth(userCred.user);
    } catch (error) {
      showToast({
        title: "Google Sign-In Failed",
        message: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-ivory rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-sand/50">
            <h2 className="font-serif text-2xl text-espresso">
              {view === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <button
              onClick={closeAuthModal}
              className="p-2 -mr-2 text-brown hover:text-espresso transition-colors rounded-full hover:bg-sand/30"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {/* Tabs */}
            <div className="flex bg-sand/30 p-1 rounded-xl mb-6">
              <button
                onClick={() => setView("login")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                  view === "login" ? "bg-white text-espresso shadow-sm" : "text-brown/70 hover:text-espresso"
                )}
              >
                Log In
              </button>
              <button
                onClick={() => setView("signup")}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                  view === "signup" ? "bg-white text-espresso shadow-sm" : "text-brown/70 hover:text-espresso"
                )}
              >
                Sign Up
              </button>
            </div>

            {/* Google Sign In */}
            <button
              onClick={onGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-sand py-3 px-4 rounded-xl text-espresso font-medium hover:bg-sand/10 transition-colors disabled:opacity-50 mb-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-sand"></div>
              <span className="flex-shrink-0 mx-4 text-brown/50 text-sm">or with email</span>
              <div className="flex-grow border-t border-sand"></div>
            </div>

            {/* Forms */}
            {view === "login" ? (
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-brown/50" size={20} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      {...loginForm.register("email")}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-brown/50" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pl-10 pr-12 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-brown/50 hover:text-espresso"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-olive hover:bg-olive/90 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-70 mt-2"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>
            ) : (
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-brown/50" size={20} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      {...signupForm.register("name")}
                    />
                  </div>
                  {signupForm.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{signupForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-brown/50" size={20} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      {...signupForm.register("email")}
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-brown/50" size={20} />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      {...signupForm.register("phone")}
                    />
                  </div>
                  {signupForm.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{signupForm.formState.errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-brown/50" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pl-10 pr-12 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                      {...signupForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-brown/50 hover:text-espresso"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-olive hover:bg-olive/90 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-70 mt-2"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
