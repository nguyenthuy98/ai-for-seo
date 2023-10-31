<template>
  <div class="main-layout">
    <el-container class="main-container">
      <el-aside class="aside">
        <el-row :gutter="8">
          <el-col :span="18">
            <el-input v-model="keyWords" placeholder="Outline"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="handleCreateOutline"
              >Tạo Outline</el-button
            >
          </el-col>
        </el-row>
        <out-line
          :key="key"
          :data="outlineList"
          @sendData="handleOutlineData"
          @rewrite="handleRewriteData"
          @remove="handleRemoveOutline"
        />
        <el-row class="text-right mt-16">
          <el-button type="primary" @click="handleCreateOutline"
            >Viết lại toàn bộ nội dung</el-button
          >
        </el-row>
      </el-aside>
      <el-main class="main">
        <p class="title">Bài viết</p>
        <Content />
      </el-main>
    </el-container>
  </div>
</template>

<script>

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
      outlineList: [
        {
          id: '1',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '2',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '3',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '4',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '5',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '6',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '7',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '8',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '9',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
        {
          id: '10',
          content: 'dffffffffffffffffsfdfsdfsdfsdfsdfd',
          count: 20,
        },
      ],
      key: 1,
      isCreatingOutline: false,
    };
  },
  methods: {
    randomstring,
    async handleCreateOutline() {
      try {
        this.isCreatingOutline = true;
        const data = {
          keywords: this.keyWords,
          hash_id: this.randomstring(),
        };
        const res = await aiService.generateOutline(data);
        console.log(res);
        this.isCreatingOutline = false;
      } catch (error) {
        this.isCreatingOutline = false;
      }
    },
    handleRemoveOutline(outlineId) {
      const findIndexById = this.outlineList.findIndex((obj) => obj?.id === outlineId);
      this.outlineList.splice(findIndexById, 1);
    },
    handleOutlineData(data) {
      const findIndexById = this.outlineList.findIndex((obj) => obj?.id === data?.id);
      this.outlineList[findIndexById] = {
        ...this.outlineList[findIndexById],
        content: data?.form?.content,
        count: data?.form?.count,
      };
      this.key += 1;
      console.log(this.outlineList[findIndexById]);
    },
    handleRewriteData(data) {
      console.log(data);
    },
  },
};
</script>
<style lang="scss">
.main-layout {
  width: calc(100vw - 200px);
  margin: auto;
  position: relative;
  height: auto;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 6.6px 26px -1.6px rgb(73 141 255 / 30%);
  .main-container {
    height: calc(100vh - 60px);
  }
  .aside {
    height: 100%;
    width: 500px !important;
    padding: 16px;
  }
  .main {
    height: 100%;
    padding: 16px;
    .title {
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
