<template>
  <div class="content h-100">
    <el-card class="content-card">
      <div class="main-content-card" id="card-content">
        <div v-if="loading">
          <div class="typing-container">
            <p class="typing-text">Loading content</p>
            <div class="typing-dots">
              <div class="dot dot1"></div>
              <div class="dot dot2"></div>
              <div class="dot dot3"></div>
            </div>
          </div>
        </div>
        <div v-else id="content" v-html="contentData"></div>
        <div
          v-if="images?.length > 0 && isShowContent"
          style="display: flex; justify-content: center; flex-direction: column"
        >
          <img
            v-for="image in images"
            :key="image"
            :src="image"
            alt="image"
            style="margin: 16px auto; width: 80%"
          />
        </div>
      </div>
      <div class="content-card-footer">
        <el-button
          :disabled="!isShowContent"
          type="primary"
          plain
          @click="handleExport"
          >Export</el-button
        >
        <el-button
          :disabled="!isShowContent"
          type="primary"
          plain
          @click="handleCopyText"
          >Copy</el-button
        >
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
  // data() {
  //   return {
  //     currentIndex: 0,
  //     isGenerated: true,
  //   };
  // },
  // watch: {
  //   contentData: {
  //     handler() {
  //       console.log('change');
  //       this.handleDisplayWords();
  //     },
  //   },
  // },
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
    // handleDisplayWords() {
    //   const htmlContent = document.getElementById('content').innerText;
    //   const textWithoutNewlines = htmlContent.replace(/\n/g, ' ');
    //   this.writeText(textWithoutNewlines);
    // },
    // writeText() {
    //   const htmlContent = document.getElementById('content').innerText;
    //   const textElement = document.getElementById('text');
    //   if (this.currentIndex < htmlContent?.length) {
    //     textElement.innerHTML += htmlContent.charAt(this.currentIndex);
    //     this.currentIndex += 1;
    //     if (htmlContent[this.currentIndex - 1] === '\n') {
    //       textElement.innerHTML += '<br>';
    //     }
    //     this.isGenerated = true;
    //     setTimeout(this.writeText, 20);
    //   } else {
    //     clearTimeout(this.writeText);
    //     this.currentIndex = 0;
    //     this.isGenerated = false;
    //   }
    // },
  },
  computed: {
    contentData() {
      const converter = new showdown.Converter();
      const text = this.data;
      const html = converter.makeHtml(text);
      return html;
    },
    isShowContent() {
      return this.data?.length > 0;
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
  .el-card__body {
    height: 100%;
  }
}
.main-content-card {
  overflow: auto;
  height: 90%;
}
.content-card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: end;
  align-items: end;
}
</style>
