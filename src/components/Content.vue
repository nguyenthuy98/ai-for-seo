<template>
  <div>
    <el-card class="content-card" :loading="true">
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
      type: Object,
      default: () => {},
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
  height: 78vh;
  position: relative;
}
.content-card-footer {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
