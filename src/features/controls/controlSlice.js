import { createSlice } from '@reduxjs/toolkit'

export const controlSlice = createSlice({
    name: 'control',
    initialState: {
        userLocation: {},
        selectedLocation: {},
    },
    reducers: {
        userLocated(state, action) {
            state.userLocation = action.payload;
        },
        locationSelected(state, action) {
            const loc = action.payload
            state.selectedLocation = {
                value: {
                    layer: loc.layer,
                    lat: loc.latitude,
                    lng: loc.longitude,
                },
                label: `${loc.countryFlag} ${loc.formattedAddress}`
            };
        },
        locationCleared(state) {
            state.selectedLocation = {};
        },
    }
})

export const { userLocated, locationSelected, locationCleared } = controlSlice.actions;

export default controlSlice.reducer;