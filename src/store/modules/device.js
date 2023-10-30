const state = {
  deviceWidth: 1366,
  isMobile: false,
  isSmallTablet: false,
  isTablet: false,
  isLargeTablet: false,
  isDesktop: false,
  isLessSmallTablet: false,
  isLessTablet: false,
  isLessLargeTablet: false,
};

const getters = {
  deviceWidth: (state) => {
    return state.deviceWidth;
  },
  isMobile: (state) => {
    return state.isMobile;
  },
  isSmallTablet: (state) => {
    return state.isSmallTablet;
  },
  isTablet: (state) => {
    return state.isTablet;
  },
  isLargeTablet: (state) => {
    return state.isLargeTablet;
  },
  isDesktop: (state) => {
    return state.isDesktop;
  },
  isLessSmallTablet: (state) => {
    return state.isLessSmallTablet;
  },
  isLessTablet: (state) => {
    return state.isLessTablet;
  },
  isLessLargeTablet: (state) => {
    return state.isLessLargeTablet;
  },
};

const RESET_DEVICE_WIDTH = () => {
  state.isMobile = false;
  state.isSmallTablet = false;
  state.isTablet = false;
  state.isLargeTablet = false;
  state.isDesktop = false;
};

const mutations = {
  UPDATE_DEVICE_WIDTH(state, deviceWidth) {
    if (deviceWidth <= 576) {
      RESET_DEVICE_WIDTH();
      state.isMobile = true;
      state.isLessSmallTablet = true;
      state.isLessTablet = true;
      state.isLessLargeTablet = true;
    } else if (deviceWidth <= 768) {
      RESET_DEVICE_WIDTH();
      state.isSmallTablet = true;
      state.isLessSmallTablet = true;
      state.isLessTablet = true;
      state.isLessLargeTablet = true;
    } else if (deviceWidth <= 992) {
      RESET_DEVICE_WIDTH();
      state.isTablet = true;
      state.isLessSmallTablet = false;
      state.isLessTablet = true;
      state.isLessLargeTablet = true;
    } else if (deviceWidth <= 1200) {
      RESET_DEVICE_WIDTH();
      state.isLargeTablet = true;
      state.isLessSmallTablet = false;
      state.isLessTablet = false;
      state.isLessLargeTablet = true;
    } else {
      RESET_DEVICE_WIDTH();
      state.isDesktop = true;
      state.isLessSmallTablet = false;
      state.isLessTablet = false;
      state.isLessLargeTablet = false;
    }
    state.deviceWidth = deviceWidth;
  },
};

const actions = {
  updateDeviceWidth({ commit }, payload) {
    commit('UPDATE_DEVICE_WIDTH', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
