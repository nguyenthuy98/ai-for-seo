<template>
  <div class="content">
    <div v-if="loading" class="card is-loading">
      <el-card>
        <h2></h2>
        <p></p>
        <p></p>
      </el-card>
    </div>
    <el-card v-else class="content-card">
      <div class="main-content-card" id="card-content">
        <div id="content" v-html="contentData"></div>
        <div v-if="images?.length > 0">
          <div v-for="image in images" :key="image">
            <img :src="image" alt="image" />
          </div>
        </div>
      </div>
      <div v-if="!loading" class="content-card-footer">
        <el-button type="primary" plain @click="handleExport">Export</el-button>
        <el-button type="primary" plain @click="handleCopyText">Copy</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue';
import showdown from 'showdown';
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
    handleExport() {
      try {
        const elm = document.getElementById('card-content').innerHTML;
        const link = document.createElement('a');
        link.setAttribute('download', 'content.html');
        link.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(elm)}`);
        link.click();
        Vue.notify({
          type: 'success',
          title: 'Success',
          duration: 2000,
          text: 'Export file thành công!',
        });
      } catch (error) {
        Vue.notify({
          type: 'error',
          title: 'error',
          duration: 2000,
          text: 'Export file thất bại!',
        });
      }
    },
  },
  computed: {
    contentData() {
      const converter = new showdown.Converter();
      const text = this.data;
      const html = converter.makeHtml(text);
      return html;
    },
  },
};
</script>
<style lang="scss">
.content .card {
  margin-top: 20px;
}
.content-card {
  position: relative;
  border: none !important;
  height: 100%;
  box-shadow: unset;
  border-radius: 12px;
  .card {
    margin-top: 0px;
  }
}
.main-content-card {
  overflow: auto;
  height: 65vh;
}
.content-card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: right;
  padding-top: 16px;
}
.p-20 {
  padding: 20px;
}
.mx-20 {
  margin: 0px 20px;
}
</style>
