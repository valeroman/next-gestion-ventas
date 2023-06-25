
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Cliente {
    id: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
}

interface ClienteState {
    clientes: Cliente[];
    clienteSelected: Cliente | null;

}

const initialState: ClienteState = {
    clientes: [],
    clienteSelected: null,
}

const clienteSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {

        getClientes(state, action: PayloadAction<Cliente[]>) {
            state.clientes = action.payload;

            // localStorage.setItem('clientes', JSON.stringify(state.clientes));
        },

        getCliente(state, action: PayloadAction<string>) {
            state.clienteSelected = state.clientes.find(
                (cliente) => cliente.id === action.payload
            ) ?? null;
        },

        addCliente(state, action: PayloadAction<Cliente>) {
            state.clientes.push(action.payload);


            localStorage.setItem('clientes', JSON.stringify(state.clientes));
        }
    }
});

export const { addCliente, getCliente, getClientes } = clienteSlice.actions;

export default clienteSlice.reducer;