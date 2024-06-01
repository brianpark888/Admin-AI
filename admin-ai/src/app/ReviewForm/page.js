import DataTable from "@/Components/DataTable";
import Navbar from "@/Components/NavigationBar";
import ChatBot from "@/Components/ChatBot";

export default function Home() {
  return (
      <>
          <Navbar />
          <div className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
              <div className="relative w-full max-w-5xl">
                  <div className="bg-white shadow-md rounded-lg z-10 w-full max-w-7xl p-20">
                      <h1 className="text-2xl font-bold mb-4">User Response</h1>
                          <DataTable />
                          <ChatBot />
                  </div>
                  {/* 보라색 박스 */}
                  <div className="absolute top-0 left-0 right-0 bg-[#8302E1] h-3 rounded-t-lg"></div>
              </div>
          </div>
      </>
  );
}
