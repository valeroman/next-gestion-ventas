'use client';

import { store, useAppDispatch, useAppSelector } from '@/store';
import { Cliente, getClientes } from '@/store/cliente/clienteSlice';
import { Producto, getProductos } from '@/store/producto/productoSlice';
import { SaleItem, saveSale } from '@/store/venta/ventaSlice';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';


const currencyOptions: { [key: string]: string } = {
    Argentina: "AR",
    Chile: "CLP",
    Peru: "PEN",
};



export const VentaView = () => {

    const dispatch = useAppDispatch();

    const clientes = useAppSelector(state => Object.values(state.cliente.clientes));
    const productos = useAppSelector(state => Object.values(state.producto.productos));

    const [client, setClient] = useState<Cliente[]>();
    const [products, setProducts] = useState<Producto[]>();
    const [branch, setBranch] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [currency, setCurrency] = useState("");

    const [selectedClient, setSelectedClient] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProductprice, setSelectedProductPrice] = useState('');

    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [total, setTotal] = useState(0);

    const [productGrid, setProductGrid] = useState<Producto[]>([]);
    const [clienteVenta, setClienteVenta] = useState<Cliente[]>([]);

    useEffect(() => {

        const clientesStorage = JSON.parse(localStorage.getItem('clientes') || '{}');
        const clientData = Object.values(clientesStorage).length > 0 ? clientesStorage : clientes;

        store.dispatch(getClientes(clientData));
        setClient(clientData);

    }, [])

    useEffect(() => {

        if (branch) {
            const productosStorage = JSON.parse(localStorage.getItem('productos') || '{}');
            const productoData: Producto[] = Object.values(productosStorage).length > 0 ? productosStorage : productos;
            const productosFiltrados = productoData.filter(producto => producto.sucursal === branch);
            setProducts(productosFiltrados);
        }

    }, [branch])

    const handleAddSaleItem = () => {
        const newSaleItem = {
            productName: productGrid?.[0].nombre,
            quantity,
            price: parseFloat(selectedProductprice),
            subtotal: subtotal,
            currency,
        };

        const newTotal = total + subtotal;
        setTotal(newTotal);
        setSaleItems((prevItems) => [...prevItems, newSaleItem]);
        setSubtotal(0);
        setQuantity(0);
        setPrice(0);
        setSelectedProduct('');
        setSelectedProductPrice('');

    };

    const showPriceProductSelected = (productId: string) => {
        setSubtotal(0);
        setSelectedProductPrice('');
        setQuantity(0);
        setSelectedProduct(productId);
        const productosFiltrados = products?.filter(producto => producto.id === productId);
        setProductGrid(productosFiltrados ?? []);
        const precio = productosFiltrados?.[0].precio.toString();
        setSelectedProductPrice(precio ?? '');
    }

    const handleQuantity = (quantity: number) => {
        setQuantity(quantity);
        const subTotal = quantity * Number(selectedProductprice);
        setSubtotal(subTotal);
    }

    const handleClient = (clienteId: string) => {
        setSelectedClient(clienteId);

        const clienteFiltrados = clientes?.filter(cliente => cliente.id === clienteId);
        setClienteVenta(clienteFiltrados ?? []);

    }

    const handleSaveSale = () => {

        const venta = {
            id: uuid(),
            client: clienteVenta,
            branch,
            saleItems: saleItems,
            total,
        };

        dispatch(saveSale(venta));
        
        setSelectedClient('');
        setBranch('');
        setCurrency('');
        setTotal(0);
        setSaleItems([]);
    };

    return (

        <div className="p-4 bg-gray-200 rounded-lg shadow-lg">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-2xl font-bold mb-4 text-center">Formulario de Ventas</h1>

                <div className="mb-8">
                    <label htmlFor="client" className="mb-2 block">
                        Clientes:
                    </label>
                    <select
                        id="client-select"
                        value={selectedClient}
                        onChange={(e) => handleClient(e.target.value)}
                        className="border border-gray-300 px-3 py-2 w-full"
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nombre} {client.apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div>
                        <label htmlFor="branch" className="mb-2 block">
                            Sucursal:
                        </label>
                        <select
                            id="branch"
                            value={branch}
                            onChange={(e) => {
                                const selectedBranch = e.target.value;
                                setBranch(selectedBranch);
                                setCurrency(currencyOptions[selectedBranch]);
                            }}
                            className="border border-gray-300 px-3 py-2 w-full"
                        >
                            <option value="">Seleccione una sucursal</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Chile">Chile</option>
                            <option value="Peru">Peru</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="currency" className="mb-2 block">
                            Moneda:
                        </label>
                        <input
                            type="text"
                            id="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="border border-gray-300 px-3 py-2 w-full"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="productName" className="mb-2 block">
                        Producto:
                    </label>
                    <select
                        id="product-select"
                        value={selectedProduct}
                        onChange={(e) => showPriceProductSelected(e.target.value)}
                        className="border border-gray-300 px-3 py-2 w-full mb-4"
                    >
                        <option value="">Seleccione un producto</option>
                        {products !== undefined &&
                            products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.nombre}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div>
                        <label htmlFor="quantity" className="mb-2 block">
                            Cantidad:
                        </label>
                        <input
                            type="text"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => handleQuantity(Number(e.target.value))}
                            className="border border-gray-300 px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="mb-2 block">
                            Precio:
                        </label>
                        <input
                            type="text"
                            id="price"
                            value={selectedProductprice}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="border border-gray-300 px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="subtotal" className="mb-2 block">
                            Subtotal:
                        </label>
                        <input
                            type="number"
                            id="subtotal"
                            value={subtotal.toFixed(2)}
                            readOnly
                            className="border border-gray-300 px-3 py-2 w-full"
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddSaleItem}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full"
                >
                    Agregar Producto
                </button>

                <div className="mt-8">

                    <div className="mt-8 flex justify-between">
                        <h2 className="text-lg font-bold mb-2">Total:</h2>
                        <p className="text-3xl font-bold">{total.toFixed(2)} {currency}</p>
                    </div>

                    <h2 className="text-lg font-bold mb-4">Productos Agregados:</h2>
                    <div className="space-y-4 bg-white rounded-lg">
                        {saleItems.map((item, index) => (
                            <div key={index} className="border border-gray-50 p-4 rounded-lg shadow">
                                <p className="font-bold">Producto: {item.productName}</p>
                                <div className="flex flex-wrap justify-between mt-2">
                                    <p className="text-gray-600">
                                        <span className="font-bold">Cantidad:</span> {item.quantity}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-bold">Precio:</span> {item.price}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-bold">Subtotal:</span> {item.subtotal.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        saleItems !== null && saleItems !== undefined && saleItems.length > 0 && (

                            <button
                                onClick={handleSaveSale}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 w-full"
                            >
                                Guardar Venta
                            </button>

                        )
                    }
                </div>
            </div>
        </div>

    )
}
