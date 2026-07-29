"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { auth, db } from "@/lib/firebase";
import { ref, get, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Users, Package, LogOut, Search, Settings } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const { user, role, clearUser } = useAuthStore();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Basic protection (ideally also protected via server/middleware)
    if (!user) {
      router.push("/");
      return;
    }
    
    if (role !== "admin") {
      router.push("/account");
      return;
    }

    async function fetchAdminData() {
      setIsLoading(true);
      try {
        const [usersSnap, ordersSnap] = await Promise.all([
          get(ref(db, "users")),
          get(ref(db, "orders"))
        ]);

        if (usersSnap.exists()) {
          const usersData = Object.entries(usersSnap.val()).map(([id, val]) => ({ id, ...val }));
          setUsers(usersData.sort((a, b) => b.createdAt - a.createdAt));
        }

        if (ordersSnap.exists()) {
          const ordersData = Object.entries(ordersSnap.val()).map(([id, val]) => ({ id, ...val }));
          setOrders(ordersData.sort((a, b) => b.createdAt - a.createdAt));
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdminData();
  }, [user, role, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    clearUser();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Settings size={40} className="text-gold animate-spin mb-4" />
        <p className="text-gray/50">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-sand pb-6">
        <div>
          <h1 className="font-display text-4xl text-espresso tracking-tight">Admin Dashboard</h1>
          <p className="text-brown/70 mt-1">Manage users, orders, and database</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/account")}
            className="px-5 py-2.5 rounded-full border border-sand text-espresso hover:bg-sand/50 transition-colors"
          >
            My Account
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-espresso text-ivory hover:bg-olive transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "users" ? "bg-olive text-white font-medium" : "hover:bg-sand text-gray"}`}
          >
            <Users size={20} />
            Users
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{users.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "orders" ? "bg-olive text-white font-medium" : "hover:bg-sand text-gray"}`}
          >
            <Package size={20} />
            Orders
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{orders.length}</span>
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-ivory border border-sand rounded-3xl p-6 md:p-8 min-h-[500px]">
            
            {activeTab === "users" && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-sand pb-4">
                  <h3 className="font-sans font-semibold text-xl text-espresso">Registered Users</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-brown/50" size={16} />
                    <input type="text" placeholder="Search users..." className="pl-9 pr-4 py-2 border border-sand rounded-full text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-sand text-brown/70 text-sm">
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">Email</th>
                        <th className="pb-3 font-medium">Phone</th>
                        <th className="pb-3 font-medium">Role</th>
                        <th className="pb-3 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr><td colSpan="5" className="py-8 text-center text-brown/50">No users found.</td></tr>
                      ) : (
                        users.map((u) => (
                          <tr key={u.id} className="border-b border-sand/50 last:border-0 hover:bg-sand/20">
                            <td className="py-4 font-medium text-espresso">{u.name}</td>
                            <td className="py-4 text-gray">{u.email}</td>
                            <td className="py-4 text-gray">{u.phone || "-"}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-gold/20 text-gold' : 'bg-olive/10 text-olive'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-4 text-brown/70 text-sm">
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-sand pb-4">
                  <h3 className="font-sans font-semibold text-xl text-espresso">Recent Orders</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-brown/50" size={16} />
                    <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border border-sand rounded-full text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-sand text-brown/70 text-sm">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Total</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr><td colSpan="5" className="py-8 text-center text-brown/50">No orders found.</td></tr>
                      ) : (
                        orders.map((o) => (
                          <tr key={o.id} className="border-b border-sand/50 last:border-0 hover:bg-sand/20">
                            <td className="py-4 font-mono text-sm text-espresso">{o.id.substring(0, 8)}...</td>
                            <td className="py-4 text-gray">{o.customer?.name || "Unknown"}</td>
                            <td className="py-4 text-brown/70 text-sm">
                              {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "-"}
                            </td>
                            <td className="py-4 font-medium text-olive">{formatPrice(o.total)}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${o.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
