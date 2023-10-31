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
        <div v-else>
          <out-line
            :loading="isCreatingOutline"
            :key="key"
            :data="outlineData"
            @sendData="handleOutlineData"
            @rewrite="handleRewriteData"
            @remove="handleRemoveOutline"
          />
          <el-row class="text-right mt-16">
            <el-button type="primary" @click="handleCreateOutline"
              >Viết lại toàn bộ nội dung</el-button
            >
          </el-row>
        </div>
      </el-aside>
      <el-main class="main">
        <p class="title">Bài viết</p>
        <Content :loading="isCreatingOutline" :data="summaryData" />
      </el-main>
    </el-container>
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
      summaryData: '',
    };
  },
  methods: {
    randomstring,
    async handleCreateOutline() {
      try {
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
    async getResult() {
      // try {
      //   const res = await aiService.getState(this.hashId);
      //   if (!res?.data?.generate_outline?.is_done) {
      //     clearTimeout(this.crawlDataTimeout);
      //     this.crawlDataTimeout = setTimeout(() => {
      //       this.getResult();
      //     }, 2000);
      //   } else {
      //     Vue.notify({
      //       type: 'success',
      //       title: 'Success',
      //       duration: 2000,
      //       text: res?.data?.message,
      //     });
      //     clearTimeout(this.crawlDataTimeout);
      //     this.isCreatingOutline = false;
      //     this.outlineData = res?.data?.outline;
      //     this.summaryData = res?.data?.summary;
      //   }
      // } catch (error) {
      //   this.isCreatingOutline = false;
      // }
      this.isCreatingOutline = false;
      const res = {
        data: {
          generate_outline: {
            is_done: true,
            h2s_generated: [
              '1. \'Hiểu rõ về Cloud Computing\'',
              '2. \'Các mô hình Cloud Computing đa dạng\'',
              '3. \'Dịch vụ Cloud Computing tiện lợi và phổ biến\'',
              '4. \'Cơ chế hoạt động thông minh của Cloud Computing\'',
              '5. \'Lợi ích của Cloud Computing trong cuộc sống hiện đại\'',
            ],
            summary: '[1] Cloud Computing là một dịch vụ điện toán đám mây được nhiều doanh nghiệp lựa chọn để tiết kiệm chi phí đầu tư cho phần cứng và tối ưu hóa quy trình lưu trữ và xử lý thông tin. Cloud Computing hoạt động thông qua mô hình cung cấp tài nguyên máy tính qua internet. Có 4 mô hình chính của Cloud Computing là Public Cloud, Private Cloud, Hybrid Cloud và Community Cloud. Các dịch vụ phổ biến của Cloud Computing bao gồm dịch vụ hạ tầng (IaaS), dịch vụ nền tảng (PaaS) và dịch vụ phần mềm (SaaS). Cloud Computing có nhiều ứng dụng trong đời sống như lưu trữ dữ liệu, phân tích big data và quản trị doanh nghiệp. Có nhiều lợi ích khi sử dụng Cloud Computing như giảm thiểu chi phí đầu tư, thuận tiện cho người dùng và vận hành an toàn và liên tục. Cloud Computing phù hợp cho các tổ chức doanh nghiệp, nhà phát triển web và người dùng cá nhân.\n\n',
            outline: [
              'I. Hiểu rõ về Cloud Computing\n    A. Định nghĩa về Cloud Computing\n    B. Nguyên lý cơ bản của Cloud Computing',
              'II. Các mô hình Cloud Computing đa dạng\n    A. Mô hình IaaS (Infrastructure as a Service)\n        1. Đặc điểm của IaaS\n        2. Ứng dụng của IaaS trong thực tế\n    B. Mô hình PaaS (Platform as a Service)\n        1. Đặc điểm của PaaS\n        2. Ứng dụng của PaaS trong thực tế\n    C. Mô hình SaaS (Software as a Service)\n        1. Đặc điểm của SaaS\n        2. Ứng dụng của SaaS trong thực tế',
              'III. Dịch vụ Cloud Computing tiện lợi và phổ biến\n    A. Dịch vụ lưu trữ trực tuyến\n        1. Dịch vụ Google Drive\n        2. Dịch vụ Dropbox\n    B. Dịch vụ xử lý dữ liệu trực tuyến\n        1. Dịch vụ Google Docs\n        2. Dịch vụ Microsoft Office 365\n    C. Dịch vụ quản lý và điều hành doanh nghiệp trực tuyến\n        1. Dịch vụ Salesforce\n        2. Dịch vụ Oracle NetSuite',
              'IV. Cơ chế hoạt động thông minh của Cloud Computing\n    A. Kết nối Internet và các thiết bị kỹ thuật số\n    B. Sử dụng máy chủ và hệ thống lưu trữ dữ liệu từ xa\n    C. Cơ chế cung cấp và tiêu thụ dịch vụ thông qua Internet',
              'V. Lợi ích của Cloud Computing trong cuộc sống hiện đại\n    A. Tính linh hoạt và thuận tiện trong việc truy cập dữ liệu\n    B. Giảm chi phí đầu tư và bảo dưỡng hạ tầng CNTT\n    C. Tăng cường khả năng hợp tác và làm việc nhóm\n    D. Đảm bảo an toàn và bảo mật thông tin.',
            ],
            images: [],
          },
          writing: {
            is_done: true,
          },
          generate_content_outline: {
            is_done: true,
          },
          keywords: 'cloud computing',
          message: 'generate outline end!',
        },
      };
      this.outlineData = res?.data?.generate_outline?.outline;
      console.log(this.outlineData);
      this.summaryData = res?.data?.generate_outline?.summary;
    },
    handleRemoveOutline(outlineId) {
      const findIndexById = this.outlineData.findIndex((obj) => obj?.id === outlineId);
      this.outlineData.splice(findIndexById, 1);
    },
    handleOutlineData(data) {
      const findIndexById = this.outlineData.findIndex((obj) => obj?.id === data?.id);
      this.outlineData[findIndexById] = {
        ...this.outlineData[findIndexById],
        content: data?.form?.content,
        count: data?.form?.count,
      };
      this.key += 1;
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
    width: auto !important;
    max-width: 600px;
    padding: 16px;
    min-width: 550px;
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
