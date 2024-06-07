import { configureStore } from '@reduxjs/toolkit'
import controlReducer from './features/controls/controlSlice'

export default configureStore({
    reducer: {
        control: controlReducer
    }
})