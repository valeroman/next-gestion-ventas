
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cliente } from '../cliente/clienteSlice';


export interface SaleItem {
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
    currency: string;
}

export interface Sale {
    id: string;
    client: Cliente[];
    branch: string;
    saleItems: SaleItem[];
    total: number;
}

interface SaleState {
    sale: Sale[];
}

const initialState: SaleState = {
    sale: []
}

const saleSlice = createSlice({
    name: 'venta',
    initialState,
    reducers: {

        saveSale: (state, action: PayloadAction<Sale>) => {
            state.sale.push(action.payload);
            localStorage.setItem('ventas', JSON.stringify(state.sale));
          },

    }
});

export const { saveSale } = saleSlice.actions;

export default saleSlice.reducer;