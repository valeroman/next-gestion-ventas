'use client';

import { store, useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect, useState } from 'react';

import { proveedorData } from '../../../data/proveedor/proveedorData';
import { addProveedor, getProveedor, getProveedores } from '@/store/proveedor/proveedorSlice';

export const ProveedorView = () => {

    const dispatch = useAppDispatch();
    const proveedores = useAppSelector(state => Object.values(state.proveedor.proveedores));
    const proveedorSeleccionado = useAppSelector(state => state.proveedor.proveedorSelected);

    useEffect(() => {
        dispatch(getProveedores(proveedorData));
    }, [dispatch]);

    useEffect(() => {
        const proveedoresStorage = JSON.parse( localStorage.getItem( 'proveedores' ) ?? '{}' );
        if (Object.values(proveedoresStorage).length > 0) {
            store.dispatch( getProveedores(proveedoresStorage) );  
        }
    },[])

    const handleProveedorSeleccionado = (proveedorId: string) => {
        dispatch(getProveedor(proveedorId));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [web, setWeb] = useState('');
    const [error, setError] = useState('');

    const handleAgregarProveedor = () => {

        if (!nombre || !web || !direccion || !telefono) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const nuevoProveedor = {
            id: (proveedores.length + 1).toString(),
            nombre,
            direccion,
            telefono,
            web,
        };

        dispatch(addProveedor(nuevoProveedor));

        // Limpiar los campos del formulario
        setNombre('');
        setWeb('');
        setDireccion('');
        setTelefono('');

        // Cerrar el modal
        setModalOpen(false);
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Lista de Proveedores</h2>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setModalOpen(true)}
            >
                Agregar Proveedor
            </button>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {proveedores.map((proveedor) => (
                    <li
                        key={proveedor.id}
                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                        onClick={() => handleProveedorSeleccionado(proveedor.id)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{proveedor.nombre}</h3>
                        <p className="text-gray-500">Dirección: {proveedor.direccion}</p>
                        <p className="text-gray-500">Teléfono: {proveedor.telefono}</p>
                        <p className="text-gray-500">Teléfono: {proveedor.web}</p>
                    </li>
                ))}
            </ul>

            {proveedorSeleccionado && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Proveedor Seleccionado</h2>
                    <div className="bg-white rounded-lg shadow p-4 mt-4">
                        <p className="text-lg font-semibold mb-2">Nombre: {proveedorSeleccionado.nombre}</p>
                        <p className="text-gray-500">Dirección: {proveedorSeleccionado.direccion}</p>
                        <p className="text-gray-500">Teléfono: {proveedorSeleccionado.telefono}</p>
                        <p className="text-lg font-semibold mb-2">Web: {proveedorSeleccionado.web}</p>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4">Agregar Proveedor</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block mb-2 font-semibold">Nombre:</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !nombre && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="direccion" className="block mb-2 font-semibold">Dirección:</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !direccion && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telefono" className="block mb-2 font-semibold">Teléfono:</label>
                                <input
                                    type="text"
                                    id="telefono"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !telefono && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="web" className="block mb-2 font-semibold">Web:</label>
                                <input
                                    type="text"
                                    id="web"
                                    value={web}
                                    onChange={(e) => setWeb(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !web && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={handleAgregarProveedor}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Agregar
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setModalOpen(false);
                                    setError('');
                                }}
                                className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
