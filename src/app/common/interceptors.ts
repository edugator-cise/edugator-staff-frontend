import axios, {AxiosResponse, AxiosError} from 'axios';
import { EnhancedStore } from '@reduxjs/toolkit'
import { requestLogout } from "../../pages/Login/LoginPage.slice"
const interceptors = {
  authInterceptor: (store: EnhancedStore) => {
    axios.interceptors.response.use((response: AxiosResponse) => response,
    (error: AxiosError) => {
      if ( error.response && error.response.status === 401) {
        store.dispatch(requestLogout())
        return Promise.reject(error);
      }
    }
    
    )
  }
}

export default interceptors;