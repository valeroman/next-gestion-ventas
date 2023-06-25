
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Proveedor {
    id       : string;
    nombre   : string;
    direccion: string;
    telefono : string;
    web      : string;
}

interface ProveedorState {
    proveedores: Proveedor[];
    proveedorSelected: Proveedor | null;

}

const initialState: ProveedorState = {
    proveedores: [],
    proveedorSelected: null,
}

const proveedorSlice = createSlice({
  name: 'proveedor',
  initialState,
  reducers: {

    getProveedores( state, action:PayloadAction<Proveedor[]> ) {
        state.proveedores = action.payload;

        // localStorage.setItem('proveedores', JSON.stringify(state.proveedores));
    },

    getProveedor( state, action:PayloadAction<string>) {
        state.proveedorSelected = state.proveedores.find(
            (proveedor) => proveedor.id === action.payload
        ) ?? null;
    },

    addProveedor( state, action:PayloadAction<Proveedor> ) {
        state.proveedores.push(action.payload);

        localStorage.setItem('proveedores', JSON.stringify(state.proveedores));
    }
  }
});

export const { addProveedor, getProveedor, getProveedores } = proveedorSlice.actions;

export default proveedorSlice.reducer;