import {create} from 'zustand';
import axios from 'axios';
import {API_URL} from '../constants/constant';
import jwt_decode from 'jwt-decode';
import {Alert} from 'react-native';

interface TokenPayload {
  username: string;
}

type AuthStore = {
  accessToken: string | null;
  message: string;
  messageErrResetPassword: string;
  noKtp: string;
  profil: Record<string, unknown>;
  username: string;
  expire: string;
  loading: boolean;
  dataPembiayaan: any[];
  simpanan: any[];
  rekeningDetData: Record<string, unknown>;
  rekeningDetResult: any[];
  detailPembiayaanAngsuran: any[];
  detailPembiayaanPembiayaan: Record<string, unknown>;
  handleLogin: (username: string, password: string) => Promise<void>;
  resetPassword: (
    password: string,
    confirm_password: string,
    old_password: string,
  ) => Promise<void>;
  getProfil: () => Promise<void>;
  getPembiayaan: () => Promise<void>;
  getDetailPembiayaan: (norek: number) => Promise<void>;
  getSimpanan: () => Promise<void>;
  getRekeningDet: (norek: number) => Promise<void>;
  handleLogout: () => void;
  getRekeningdetByDate: (
    norek: number,
    dateStart: string,
    dateEnd: string,
  ) => Promise<void>;
  setLoadingDefault: () => void;
  setDefaultMsgResetPassword: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: null,
  message: '',
  messageErrResetPassword: '',
  noKtp: '',
  loading: false,
  profil: {},
  dataPembiayaan: [],
  simpanan: [],
  rekeningDetData: {},
  rekeningDetResult: [],
  username: '',
  expire: '',
  detailPembiayaanAngsuran: [],
  detailPembiayaanPembiayaan: {},
  handleLogin: async (username: string, password: string) => {
    set({loading: true});
    try {
      const response = await axios.post(API_URL + 'login', {
        username,
        password,
      });
      set({accessToken: response.data.access_token});
      // console.log(get().accessToken)
      const decode = jwt_decode<TokenPayload>(response.data.access_token);
      set({username: decode.username});
    } catch (error: any) {
      set({message: error.response.data.message});
      set({loading: false});
      // if (get().message === 'wrong password') {
      //   Alert.alert('Maaf, password yang anda masukan salah');
      // } else if (get().message === 'no user found') {
      //   Alert.alert('Maaf, username tidak ditemukan');
      // } else if (get().message === 'Validation failed') {
      //   Alert.alert('Silakan isi username dan password untuk melakukan login');
      // } else {
      //   Alert.alert('Terjadi kesalahan saat melakukan permintaan login');
      // }
    }
  },
  getProfil: async () => {
    set({loading: true});
    try {
      const response = await axios.get(API_URL + 'profil/', {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      set({profil: response.data.user});
      set({username: response.data.nasabah.nama});
      set({noKtp: response.data.nasabah.noKtp});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  getPembiayaan: async () => {
    set({loading: true});
    try {
      const response = await axios.get(API_URL + 'pembiayaan/', {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      set({dataPembiayaan: response.data.pembiayaan});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  getDetailPembiayaan: async (norek: number) => {
    set({loading: true});
    try {
      const response = await axios.get(`${API_URL}pembiayaan/${norek}`, {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      set({detailPembiayaanAngsuran: response.data.angsuran});
      set({detailPembiayaanPembiayaan: response.data.pembiayaan});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  getSimpanan: async () => {
    set({loading: true});
    try {
      const response = await axios.get(API_URL + 'simpanan/', {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      set({simpanan: response.data.result});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  getRekeningDet: async (norek: number) => {
    set({loading: true});
    try {
      const response = await axios.get(`${API_URL}rekeningdet?q=${norek}`, {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      set({rekeningDetData: response.data.data});
      set({rekeningDetResult: response.data.result});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  getRekeningdetByDate: async (
    norek: number,
    dateStart: string,
    dateEnd: string,
  ) => {
    set({loading: true});
    try {
      const response = await axios.get(
        `${API_URL}rekeningdet?q=${norek}&start=${dateStart}&end=${dateEnd}`,
        {
          headers: {
            Authorization: `Bearer ${get().accessToken}`,
          },
        },
      );
      set({rekeningDetData: response.data.data});
      set({rekeningDetResult: response.data.result});
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  resetPassword: async (
    password: string,
    confirm_password: string,
    old_password: string,
  ) => {
    set({loading: true});
    try {
      const response = await axios.post(
        API_URL + 'reset-password',
        {
          password,
          confirm_password,
          old_password,
        },
        {
          headers: {
            Authorization: `Bearer ${get().accessToken}`,
          },
        },
      );
      set({loading: false});
      set({accessToken: null});
    } catch (error: any) {
      console.error(error.response.data);
      // if (error.response.data.message === 'old password wrong') {
      //   Alert.alert('Maaf, password lama yang anda masukan salah');
      // } else if (
      //   error.response.data.message ===
      //   'password and confirm password not match'
      // ) {
      //   Alert.alert('Maaf, password baru dan konfirmasi password tidak sesuai');
      // } else {
      //   Alert.alert(
      //     'Terjadi kesalahan saat melakukan permintaan ubah password',
      //   );
      // }
      set({messageErrResetPassword: error.response.data.message});
      set({loading: false});
    }
  },
  handleLogout: async () => {
    set({loading: true});
    try {
      const response = await axios.delete(API_URL + 'logout', {
        headers: {
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      // Mengembalikan nilai default untuk setiap variabel
      const defaultValues = {
        accessToken: null,
        message: '',
        loading: true,
        profil: {},
        dataPembiayaan: [],
        simpanan: [],
        rekeningDetData: {},
        rekeningDetResult: [],
        username: '',
        expire: '',
        detailPembiayaanAngsuran: [],
        detailPembiayaanPembiayaan: {},
        messageErrResetPassword: '',
        noKtp: '',
        // ... tambahkan variabel lainnya jika ada
      };

      set(defaultValues);
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({loading: false});
    }
  },
  setLoadingDefault: () => {
    set({loading: true});
  },
  setDefaultMsgResetPassword: () => {
    set({messageErrResetPassword: ''})
  }
}));
