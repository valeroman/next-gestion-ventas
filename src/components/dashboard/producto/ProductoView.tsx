'use client';

import { store, useAppDispatch, useAppSelector } from '@/store';

import React, { useEffect, useState } from 'react';

import { productoData } from '../../../data/producto/productoData';
import { getProducto, getProductos, addProducto } from '@/store/producto/productoSlice';

export const ProductoView = () => {

    const dispatch = useAppDispatch();
    const productos = useAppSelector(state => Object.values(state.producto.productos));
    const productoSeleccionado = useAppSelector(state => state.producto.productoSelected);

    useEffect(() => {
        dispatch(getProductos(productoData));
    }, [dispatch]);

    useEffect(() => {
        const productosStorage = JSON.parse( localStorage.getItem( 'productos' ) ?? '{}' );
        
        if (Object.values(productosStorage).length > 0) {
            store.dispatch( getProductos(productosStorage) );  
        }
    },[])

    const handleProductoSeleccionado = (productoId: string) => {
        dispatch(getProducto(productoId));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [sucursal, setSucursal] = useState('');
    const [error, setError] = useState('');

    const handleAgregarProducto = () => {

        if (!nombre || !precio || !stock || !sucursal) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const nuevoProducto = {
            id: (productos.length + 1).toString(),
            nombre,
            precio,
            stock,
            sucursal,
        };

        dispatch(addProducto(nuevoProducto));

        // Limpiar los campos del formulario
        setNombre('');
        setPrecio(0);
        setStock(0);
        setSucursal('');

        // Cerrar el modal
        setModalOpen(false);
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setModalOpen(true)}
            >
                Agregar Producto
            </button>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {productos.map((producto) => (
                    <li
                        key={producto.id}
                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                        onClick={() => handleProductoSeleccionado(producto.id)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
                        <p className="text-gray-500">Precio: {producto.precio}</p>
                        <p className="text-gray-500">Stock: {producto.stock}</p>
                        <p className="text-gray-500">Sucursal: {producto.sucursal}</p>
                    </li>
                ))}
            </ul>

            {productoSeleccionado && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Producto Seleccionado</h2>
                    <div className="bg-white rounded-lg shadow p-4 mt-4">
                        <p className="text-lg font-semibold mb-2">Nombre: {productoSeleccionado.nombre}</p>
                        <p className="text-lg font-semibold mb-2">Precio: {productoSeleccionado.precio}</p>
                        <p className="text-gray-500">Stock: {productoSeleccionado.stock}</p>
                        <p className="text-gray-500">Sucursal: {productoSeleccionado.sucursal}</p>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
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
                                <label htmlFor="precio" className="block mb-2 font-semibold">Precio:</label>
                                <input
                                    type="number"
                                    id="precio"
                                    value={precio}
                                    onChange={(e) => setPrecio(parseFloat(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !precio && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stock" className="block mb-2 font-semibold">Stock:</label>
                                <input
                                    type="number"
                                    id="stock"
                                    value={stock}
                                    onChange={(e) => setStock(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !stock && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="sucursal" className="block mb-2 font-semibold">Sucursal:</label>
                                <input
                                    type="text"
                                    id="sucursal"
                                    value={sucursal}
                                    onChange={(e) => setSucursal(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {error && !sucursal && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={handleAgregarProducto}
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
