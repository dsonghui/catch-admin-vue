import Vue from 'vue';
import { login, getInfo, logout } from '@/api/login';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { welcome } from '@/utils/util';

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((response: any) => {
          if (response.code === 10000) {
            const result = response.data;
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit('SET_TOKEN', result.token);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data;
          if (result.roles.length > 0) {
            const roles = result.roles;
            commit('SET_ROLES', roles);
            commit('SET_INFO', result);
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'));
          }
          commit('SET_NAME', { name: result.username, welcome: welcome() });
          commit('SET_AVATAR', result.avatar);

          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve();
        }).catch(() => {
          resolve();
        }).finally(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Vue.ls.remove(ACCESS_TOKEN);
        });
      });
    }

  }
};

export default user;
