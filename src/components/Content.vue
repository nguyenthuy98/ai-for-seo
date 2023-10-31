<template>
  <div>
    <el-card class="content-card">
      <div v-if="loading" class="card is-loading">
        <el-card class="mb-m">
          <h2></h2>
          <p></p>
          <p></p>
        </el-card>
      </div>
      <div class="content-card-footer">
        <el-button type="primary" plain>Export</el-button>
        <el-button type="primary" plain>Copy</el-button>
      </div>
    </el-card>
  </div>
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    copyText,
  },
};
</script>
<style lang="scss" scoped>
.content-card {
  margin-top: 40px;
  height: 82vh;
  position: relative;
}
.content-card-footer {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
