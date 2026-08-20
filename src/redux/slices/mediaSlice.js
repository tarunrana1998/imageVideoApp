import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imagesData: [],
  page: 1,
  loading: false,
  error: null,
}

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setImagesData: (state, action) => {
      state.imagesData = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setImagesData, setPage, setLoading, setError } = mediaSlice.actions

export default mediaSlice.reducer
