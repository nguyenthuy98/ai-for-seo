<template>
  <div class="h-100">
    <router-view />
    <notifications />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  created() {
    this.setWidthScreen();
  },
  computed: {
    ...mapGetters('device', ['deviceWidth']),
  },
  methods: {
    ...mapActions('device', ['updateDeviceWidth']),
    setWidthScreen() {
      window.addEventListener('resize', () => {
        this.updateDeviceWidth(window.innerWidth);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
