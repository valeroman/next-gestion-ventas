'use client'

import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { getClientes } from "./cliente/clienteSlice";
import { getProductos } from "./producto/productoSlice";
import { getProveedores } from "./proveedor/proveedorSlice";
import { getVendedores } from "./vendedor/vendedorSlice";

import { clienteData } from '../data/cliente/clienteData';
import { productoData } from '../data/producto/productoData';
import { proveedorData } from '../data/proveedor/proveedorData';
import { vendedorData } from '../data/vendedor/vendedorData';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

  useEffect(() => {
    const clientesStorage = JSON.parse(localStorage.getItem('clientes') || '{}');
    const clientSource = Object.values(clientesStorage).length > 0 ? clientesStorage : clienteData;
    store.dispatch(getClientes(clientSource));
  }, [])

  useEffect(() => {
    const productosStorage = JSON.parse(localStorage.getItem('productos') || '{}');
    const productosSource = Object.values(productosStorage).length > 0 ? productosStorage : productoData;
    store.dispatch(getProductos(productosSource));
  }, [])

  useEffect(() => {
    const proveedoresStorage = JSON.parse(localStorage.getItem('productos') || '{}');
    const proveedorSource = Object.values(proveedoresStorage).length > 0 ? proveedoresStorage : proveedorData;
    store.dispatch(getProveedores(proveedorSource));
  }, [])

  useEffect(() => {
    const vendedoresStorage = JSON.parse(localStorage.getItem('productos') || '{}');
    const vendedorSource = Object.values(vendedoresStorage).length > 0 ? vendedoresStorage : vendedorData;
    store.dispatch(getVendedores(vendedorSource));
  }, [])

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
