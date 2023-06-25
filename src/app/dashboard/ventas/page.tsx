import { VentaView } from "@/components/dashboard/venta/VentaView";


export default function NamePage() {
  return (
    <div className="text-black p-2">
        <h1 className="mt-2 text-3xl">Nueva Venta</h1>
        <VentaView />
    </div>
  );
}