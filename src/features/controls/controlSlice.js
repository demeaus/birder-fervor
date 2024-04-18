import { createSlice } from '@reduxjs/toolkit'

export const controlSlice = createSlice({
    name: 'control',
    initialState: {
        userLocation: { lat: 20, lng: 90 },
        selectedLocation: null, //selected location object, selected location for dropdown is derived from this
    },
    reducers: {
        userLocated(state, action) {
            state.userLocation.lat = action.payload.latitude;
            state.userLocation.lng = action.payload.longitude;
        },
        locationSelected(state, action) {
            state.selectedLocation = action.payload;
        },
        locationCleared(state) {
            state.selectedLocation = null;
        },
    }
})

export const { userLocated, locationSelected, locationCleared } = controlSlice.actions;

export default controlSlice.reducer;