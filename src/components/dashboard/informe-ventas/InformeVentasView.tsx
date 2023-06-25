'use client';

import { useAppSelector } from '@/store';
import React from 'react'
import { IoDocumentAttachOutline } from 'react-icons/io5';

export const InformeVentasView = () => {
  const ventas = useAppSelector(state => Object.values(state.venta.sale));

  return (

    <>
      {
        ventas.length === 0
          ? <NoInformeVentas />
          : (

            <div className="grid grid-cols-1 gap-4 p-4">
              {ventas.map((sale) => (
                <div key={sale.id} className="border border-gray-400 rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-bold">Branch:</h2>
                      <p>{sale.branch}</p>
                    </div>
                    <div>
                      <h2 className="font-bold">Total:</h2>
                      <p className='text-2xl'>{sale.total.toFixed(2)} {sale?.saleItems[0]?.currency}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="font-bold">Client:</h2>
                    {sale.client.map((cliente) => (
                      <div key={cliente.id}>
                        <p>Name: {cliente.nombre} {cliente.apellido}</p>
                        <p>Address: {cliente.direccion}</p>
                        <p>Phone: {cliente.telefono}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h2 className="font-bold">Sale Items:</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {sale.saleItems.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4  bg-white">
                          <p>{item.productName}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {item.price.toFixed(2)} {item.currency}</p>
                          <p>Subtotal: {item.subtotal.toFixed(2)} {item.currency}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          )
      }
    </>


  )
}

export const NoInformeVentas = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoDocumentAttachOutline size={100} className="text-red-500" />
      <span>No hay Registros de Ventas</span>
    </div>
  );
}
