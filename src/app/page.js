import Image from "next/image";
import RealTimeCharts from "@/components/RealTimeCharts";
export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Real-time Charts</h1>
      <RealTimeCharts />
    </div>
  );
}
