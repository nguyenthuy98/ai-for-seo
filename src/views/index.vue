<template>
  <div class="home-layout">
    <div class="header-input">
      <el-input v-model="keyWords" placeholder="Type something..."></el-input>
      <el-button type="primary" @click="handleCreateOutline"
        >Tạo Outline</el-button
      >
    </div>
    <div class="main-layout" v-if="isShowLayout">
      <el-container class="main-container">
        <el-row class="main-content" :gutter="20">
          <el-col :span="9" class="h-100">
            <el-aside class="aside">
              <div v-if="isCreatingOutline" class="card is-loading">
                <el-card class="mb-m">
                  <h2></h2>
                  <p></p>
                  <p></p>
                </el-card>
                <el-card class="mb-m">
                  <h2></h2>
                  <p></p>
                  <p></p>
                </el-card>
                <el-card class="mb-m">
                  <h2></h2>
                  <p></p>
                  <p></p>
                </el-card>
              </div>
              <div v-else class="out-line">
                <out-line
                  :loading="isCreatingOutline"
                  :key="key"
                  :data="outlineData"
                  @sendData="handleEditData"
                  @rewrite="handleRewriteData"
                  @remove="handleRemoveOutline"
                />
                <el-row class="button-area">
                  <el-button type="primary" @click="handleWriteOutline"
                    >Viết toàn bộ nội dung</el-button
                  >
                </el-row>
              </div>
            </el-aside>
          </el-col>
          <el-col :span="14" class="float-right h-100">
            <el-main class="main">
              <Content
                :loading="isCreatingOutline || isWriting"
                :data="contentData"
                :images="images"
              />
            </el-main>
          </el-col>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import aiService from '../services/ai-services';
import OutLine from '../components/OutLine';
import Content from '../components/Content';
import { randomstring } from '../utils/common';

export default {
  name: 'Home',
  components: {
    OutLine,
    Content,
  },
  data() {
    return {
      keyWords: '',
      key: 1,
      isCreatingOutline: false,
      hashId: randomstring(),
      crawlDataTimeout: '',
      outlineData: [],
      contentData: '',
      isWriting: false,
      images: [],
      isShowLayout: false,
      currentCount: 0,
    };
  },
  methods: {
    randomstring,
    async handleCreateOutline() {
      try {
        this.isShowLayout = true;
        this.isCreatingOutline = true;
        const data = {
          keywords: this.keyWords,
          hash_id: this.hashId,
        };
        await aiService.generateOutline(data);
        Vue.notify({
          type: 'success',
          title: 'Success',
          duration: 2000,
          text: 'Crawl data and summary begin!',
        });
        this.getResult();
      } catch (error) {
        this.isCreatingOutline = false;
      }
    },
    async getResultWriting() {
      try {
        const res = await aiService.getState(this.hashId);
        if (!res?.data?.writing?.is_done) {
          clearTimeout(this.crawlDataTimeout);
          this.crawlDataTimeout = setTimeout(() => {
            this.getResultWriting();
          }, 2000);
        } else {
          Vue.notify({
            type: 'success',
            title: 'Success',
            duration: 2000,
            text: res?.data?.message,
          });
          clearTimeout(this.crawlDataTimeout);
          this.isWriting = false;
          this.contentData = res?.data?.writing?.content;
          this.images = res?.data?.generate_outline?.images;
        }
      } catch (error) {
        this.isWriting = false;
      }
    },
    handleWriteOutline() {
      this.writingContent(this.outlineData);
    },
    async getResult() {
      try {
        const res = await aiService.getState(this.hashId);
        if (!res?.data?.generate_outline?.is_done) {
          clearTimeout(this.crawlDataTimeout);
          this.crawlDataTimeout = setTimeout(() => {
            this.getResult();
          }, 2000);
        } else {
          Vue.notify({
            type: 'success',
            title: 'Success',
            duration: 2000,
            text: res?.data?.message,
          });
          clearTimeout(this.crawlDataTimeout);
          this.isCreatingOutline = false;
          this.outlineData = res?.data?.generate_outline?.outline;
          this.images = res?.data?.generate_outline?.images;
        }
      } catch (error) {
        this.isCreatingOutline = false;
      }
    },
    async writingContent(outline) {
      try {
        this.isWriting = true;
        const data = {
          outline,
          hash_id: this.hashId,
        };
        await aiService.writing(data);
        Vue.notify({
          type: 'success',
          title: 'Success',
          duration: 2000,
          text: 'Writing begin!',
        });
        this.getResultWriting();
      } catch (error) {
        this.isWriting = false;
      }
    },
    handleRemoveOutline(outlineId) {
      const findIndexById = this.outlineData.findIndex((obj) => obj?.id === outlineId);
      this.outlineData.splice(findIndexById, 1);
    },
    handleEditData(data) {
      this.outlineData[data?.index] = data?.form?.content;
      this.currentCount = data?.form?.count;
      this.key += 1;
    },
    async handleRewriteData(data) {
      try {
        const outlineRewrite = data?.form?.content;
        this.isWriting = true;
        const postData = {
          index_h2s: data.index,
          index_h2s_next: data.index + 1,
          words: this.currentCount,
          h2s_outline: outlineRewrite,
          hash_id: this.hashId,
        };
        await aiService.regenerateContentH2(postData);
        Vue.notify({
          type: 'success',
          title: 'Success',
          duration: 2000,
          text: 'Writing begin!',
        });
        this.getResultWriting();
      } catch (error) {
        this.isWriting = false;
      }
    },
  },
};
</script>
<style lang="scss">
.home-layout {
  margin: 0 auto;
  padding: 0;
}
.header-input {
  width: 40%;
  margin: 0 auto;
  display: flex;
  .el-input__inner {
    border-radius: 12px;
  }
  button {
    margin-left: 8px;
    border-radius: 12px;
  }
  margin-bottom: 20px;
}
.main-layout {
  width: calc(100vw - 100px);
  margin: auto;
  position: relative;
  height: auto;
  border-radius: 12px;
  .main-content {
    padding: 20px;
    margin: 0 !important;
    height: 100%;
    width: 100%;
  }
  .aside {
    padding: 16px;
    width: 100% !important;
    height: 80vh;
    .out-line {
      position: relative;
      height: 100%;
    }
    .button-area {
      position: absolute;
      text-align: right;
      bottom: 0;
      right: 0;
    }
  }
  .main {
    width: 100% !important;
    height: 80vh;
  }
}
</style>
