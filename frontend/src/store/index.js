import Vue from 'vue'
import Vuex from 'vuex'

import openSocket from 'socket.io-client'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: null,
    messagesArray: [],
    socket: null,
    anotherUser: null
  },
  mutations: {
    setUser(state, data) {
      state.nickname = data.nickname;
      state.socket = data.socket;
      router.push('/app');
    }
  },
  actions: {
    enterRoom({ state, commit }, nickname) {
      const socket = openSocket('http://localhost:3000');
      socket.on('connect', () => {
        socket.emit('joinqueue', nickname);

        socket.on(socket.id, data => {
          if(!state.anotherUser) {
            state.anotherUser = data.socketid;
            state.messagesArray.push({ sender: data.sender, message: data.message, socketid: data.socketid });
          } else {
            state.messagesArray.push({ sender: data.sender, message: data.message, socketid: data.socketid });
          }
        });
      });

      let data = { socket: socket, nickname: nickname };
      commit('setUser', data);

    },
    sendMessage({ state }, payload) {
      if(state.anotherUser) {
        state.socket.emit('message', { pairId: state.anotherUser, message: payload, sender: state.nickname });
      }
    },
    leaveRoom({ state }) {
      if(state.socket) {
        state.socket.disconnect();
      }
      state.nickname = null;
      state.messagesArray = [];
      state.socket = null;
      state.anotherUser = null;
      router.push('/');
    },
    onDestroy({ state }) {
      if(state.socket) {
        state.socket.disconnect();
      }
      state.nickname = null;
      state.messagesArray = [];
      state.socket = null;
      state.anotherUser = null;
    }
  }
})
