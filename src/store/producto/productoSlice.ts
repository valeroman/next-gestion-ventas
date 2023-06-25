
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Producto {
    id       : string;
    nombre   : string;
    precio : number;
    stock: number;
    sucursal : string;
}

interface ProductoState {
    productos: Producto[];
    productoSelected: Producto | null;

}

const initialState: ProductoState = {
    productos: [],
    productoSelected: null,
}

const productoSlice = createSlice({
  name: 'producto',
  initialState,
  reducers: {

    getProductos( state, action:PayloadAction<Producto[]> ) {
        state.productos = action.payload;

        // localStorage.setItem('productos', JSON.stringify(state.productos));
    },

    getProducto( state, action:PayloadAction<string>) {
        state.productoSelected = state.productos.find(
            (producto) => producto.id === action.payload
        ) ?? null;
    },

    addProducto( state, action:PayloadAction<Producto> ) {
        state.productos.push(action.payload);

        localStorage.setItem('productos', JSON.stringify(state.productos));
    }
  }
});

export const { addProducto, getProducto, getProductos } = productoSlice.actions;

export default productoSlice.reducer;