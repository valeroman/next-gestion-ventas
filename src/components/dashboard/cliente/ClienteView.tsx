'use client';

import { store, useAppDispatch, useAppSelector } from '@/store';
import { addCliente, getCliente, getClientes } from '@/store/cliente/clienteSlice';
import React, { useEffect, useState } from 'react';

import { clienteData } from '../../../data/cliente/clienteData';

export const ClienteView = () => {

    const dispatch = useAppDispatch();
    const clientes = useAppSelector(state => Object.values(state.cliente.clientes));
    const clienteSeleccionado = useAppSelector(state => state.cliente.clienteSelected);

    useEffect(() => {
        dispatch(getClientes(clienteData));
    }, [dispatch]);

    useEffect(() => {
        const clientes = JSON.parse( localStorage.getItem( 'clientes' ) ?? '{}' );
        if ( Object.values(clientes).length > 0 ) {
            store.dispatch( getClientes(clientes) );  
        }
    },[])

    const handleClienteSeleccionado = (clienteId: string) => {
        dispatch(getCliente(clienteId));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');

    const handleAgregarCliente = () => {

        if (!nombre || !apellido || !direccion || !telefono) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const nuevoCliente = {
            id: (clientes.length + 1).toString(),
            nombre,
            apellido,
            direccion,
            telefono,
        };

        dispatch(addCliente(nuevoCliente));

        // Limpiar los campos del formulario
        setNombre('');
        setApellido('');
        setDireccion('');
        setTelefono('');

        // Cerrar el modal
        setModalOpen(false);
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setModalOpen(true)}
            >
                Agregar Cliente
            </button>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {clientes.map((cliente) => (
                    <li
                        key={cliente.id}
                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                        onClick={() => handleClienteSeleccionado(cliente.id)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{cliente.nombre} {cliente.apellido}</h3>
                        <p className="text-gray-500">Dirección: {cliente.direccion}</p>
                        <p className="text-gray-500">Teléfono: {cliente.telefono}</p>
                    </li>
                ))}
            </ul>

            {clienteSeleccionado && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Cliente Seleccionado</h2>
                    <div className="bg-white rounded-lg shadow p-4 mt-4">
                        <p className="text-lg font-semibold mb-2">Nombre: {clienteSeleccionado.nombre}</p>
                        <p className="text-lg font-semibold mb-2">Apellido: {clienteSeleccionado.apellido}</p>
                        <p className="text-gray-500">Dirección: {clienteSeleccionado.direccion}</p>
                        <p className="text-gray-500">Teléfono: {clienteSeleccionado.telefono}</p>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4">Agregar Cliente</h2>
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
                                <label htmlFor="apellido" className="block mb-2 font-semibold">Apellido:</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !apellido && <p className="text-red-500 mt-2">{error}</p>}
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
                            <button
                                type="button"
                                onClick={handleAgregarCliente}
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
