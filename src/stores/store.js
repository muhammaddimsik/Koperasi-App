import axios from 'axios';
import {create} from 'zustand';
import {API_URL} from '../constants/constant';

export const useNasabahStore = create(
  devtools(
    immer(set => ({
      aksesToken: '',
      profil: [],
      pembiayaan: [],
      simpanan: [],
      rekeningdet: [],
      handleLogin: async () => {
        const response = await axios.get(API_URL + 'login', payload);
        set(state => {
          state.aksesToken = response.data;
        });
        console.log(aksesToken);
      },
      getProfil: async () => {
        const response = await axios.get(API_URL + 'profil');
        set(state => {
          state.profil = response.data;
        });
      },
      getPembiayaan: async () => {
        const response = await axios.get(API_URL + 'pembiayaan');
        set(state => {
          state.pembiayaan = response.data;
        });
      },
      getSimpanan: async () => {
        const response = await axios.get(API_URL + 'simpanan');
        set(state => {
          state.simpanan = response.data;
        });
      },
      getRekeningdet: async () => {
        const response = await axios.get(API_URL + 'rekeningdet');
        set(state => {
          state.rekeningdet = response.data;
        });
      },
    })),
  ),
);
