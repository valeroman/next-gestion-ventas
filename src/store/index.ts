import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import clienteReducer from './cliente/clienteSlice';
import productoReducer from './producto/productoSlice';
import vendedorReducer from './vendedor/vendedorSlice';
import proveedorReducer from './proveedor/proveedorSlice';
import ventaReducer from './venta/ventaSlice';

export const store = configureStore({
  reducer: {
    cliente: clienteReducer,
    producto: productoReducer,
    vendedor: vendedorReducer,
    proveedor: proveedorReducer,
    venta: ventaReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;