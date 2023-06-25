
'use client';

import { store, useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect, useState } from 'react';

import { vendedorData } from '../../../data/vendedor/vendedorData';
import { addVendedor, getVendedor, getVendedores } from '@/store/vendedor/vendedorSlice';

export const VendedorView = () => {

    const dispatch = useAppDispatch();
    const vendedores = useAppSelector(state => Object.values(state.vendedor.vendedores));
    const vendedorSeleccionado = useAppSelector(state => state.vendedor.vendedorSelected);


    useEffect(() => {
        dispatch(getVendedores(vendedorData));
    }, [dispatch]);

    useEffect(() => {
        const vendedoresStorage = JSON.parse( localStorage.getItem( 'vendedores' ) ?? '{}' );
        if ( Object.values(vendedoresStorage).length > 0 ) {
            store.dispatch( getVendedores(vendedoresStorage) );  
        }
    },[])

    const handleVendedorSeleccionado = (vendedorId: string) => {
        dispatch(getVendedor(vendedorId));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleAgregarVendedor = () => {

        if (!nombre || !apellido || !direccion || !telefono || !fechaNacimiento || !email) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const nuevoVendedor = {
            id: (vendedores.length + 1).toString(),
            nombre,
            apellido,
            direccion,
            telefono,
            fechaNacimiento,
            email,
        };

        dispatch(addVendedor(nuevoVendedor));

        // Limpiar los campos del formulario
        setNombre('');
        setApellido('');
        setDireccion('');
        setTelefono('');
        setFechaNacimiento(''),
        setEmail('');

        // Cerrar el modal
        setModalOpen(false);
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Lista de Vendedores</h2>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setModalOpen(true)}
            >
                Agregar Vendedor
            </button>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {vendedores.map((vendedor) => (
                    <li
                        key={vendedor.id}
                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                        onClick={() => handleVendedorSeleccionado(vendedor.id)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{vendedor.nombre} {vendedor.apellido}</h3>
                        <p className="text-gray-500">Dirección: {vendedor.direccion}</p>
                        <p className="text-gray-500">Teléfono: {vendedor.telefono}</p>
                        <p className="text-gray-500">Fecha de nacimiento: {vendedor.fechaNacimiento}</p>
                        <p className="text-gray-500">Email: {vendedor.email}</p>
                    </li>
                ))}
            </ul>

            {vendedorSeleccionado && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Vendedor Seleccionado</h2>
                    <div className="bg-white rounded-lg shadow p-4 mt-4">
                        <p className="text-lg font-semibold mb-2">Nombre: {vendedorSeleccionado.nombre}</p>
                        <p className="text-lg font-semibold mb-2">Apellido: {vendedorSeleccionado.apellido}</p>
                        <p className="text-gray-500">Dirección: {vendedorSeleccionado.direccion}</p>
                        <p className="text-gray-500">Teléfono: {vendedorSeleccionado.telefono}</p>
                        <p className="text-gray-500">Fecha de nacimiento: {vendedorSeleccionado.fechaNacimiento}</p>
                        <p className="text-gray-500">Email: {vendedorSeleccionado.email}</p>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4">Agregar Vendedor</h2>
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
                            <div className="mb-4">
                                <label htmlFor="fecha" className="block mb-2 font-semibold">Fecha de nacimiento:</label>
                                <input
                                    type="text"
                                    id="fecha"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !fechaNacimiento && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="emai;" className="block mb-2 font-semibold">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !email && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={handleAgregarVendedor}
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
