import DataTable from "@/Components/DataTable";
import Navbar from "@/Components/NavigationBar";

export default function Home() {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
          <div className="bg-slate-200 p-4 rounded-lg z-10 w-full max-w-5xl p-20">
            <h1 className="text-2xl font-bold mb-4">User Response</h1>
            <DataTable />
          </div>
        </div>
      </>
    );
  }
  