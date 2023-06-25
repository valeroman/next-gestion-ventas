
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Vendedor {
    id              : string;
    nombre          : string;
    apellido        : string;
    direccion       : string;
    telefono        : string;
    fechaNacimiento : string;
    email           : string
}

interface VendedorState {
    vendedores: Vendedor[];
    vendedorSelected: Vendedor | null;

}

const initialState: VendedorState = {
    vendedores: [],
    vendedorSelected: null,
}

const vendedorSlice = createSlice({
  name: 'vendedor',
  initialState,
  reducers: {

    getVendedores( state, action:PayloadAction<Vendedor[]> ) {
        state.vendedores = action.payload;

        // localStorage.setItem('vendedores', JSON.stringify(state.vendedores));
    },

    getVendedor( state, action:PayloadAction<string>) {
        state.vendedorSelected = state.vendedores.find(
            (vendedor) => vendedor.id === action.payload
        ) ?? null;
    },

    addVendedor( state, action:PayloadAction<Vendedor> ) {
        state.vendedores.push(action.payload);

        localStorage.setItem('vendedores', JSON.stringify(state.vendedores));
    }
  }
});

export const { addVendedor, getVendedor, getVendedores } = vendedorSlice.actions;

export default vendedorSlice.reducer;