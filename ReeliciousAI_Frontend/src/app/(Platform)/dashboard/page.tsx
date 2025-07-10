import { auth } from "@/auth/auth";

import { redirect } from "next/navigation";
import { RAIHeader } from "../_components/rai-header";

export default async function DashboardPage() {
  const user = await auth();
  if (!user) {
    redirect('/auth/sign-in')
  }
  
  return (
    <div className="overflow-hidden max-h-screen">
      <RAIHeader title={"Home"}/>
      <div className="flex items-center justify-center min-h-screen overflow-y-auto">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
      </div>
    </div>
  );
}