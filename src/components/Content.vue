<template>
  <el-card class="content-card">
    <div v-if="loading" class="card is-loading">
      <el-card class="mb-m">
        <h2></h2>
        <p></p>
        <p></p>
      </el-card>
    </div>
    <pre v-else class="main-content-card">
      {{ data }}
    </pre>
    <div class="content-card-footer">
      <el-button type="primary" plain>Export</el-button>
      <el-button type="primary" plain @click="handleCopyText">Copy</el-button>
    </div>
  </el-card>
</template>

<script>
import { copyText } from '../utils/common';

export default {
  name: 'Content',
  props: {
    data: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    copyText,
    handleCopyText() {
      this.copyText(this.data);
    },
  },
};
</script>
<style lang="scss" scoped>
.content-card {
  position: relative;
  border: none !important;
  height: 100%;
  box-shadow: unset;
}
.main-content-card {
  overflow: auto;
  height: 60vh;
}
.content-card-footer {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
