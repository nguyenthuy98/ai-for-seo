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
                  :isWritedContent="contentData.length > 0"
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
                :loading="isWriting"
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
        // await aiService.generateOutline(data);
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
    async getResultReWriting(index) {
      try {
        const res = await aiService.getState(this.hashId);
        if (!res?.data?.generate_content_outline?.is_done) {
          clearTimeout(this.crawlDataTimeout);
          this.crawlDataTimeout = setTimeout(() => {
            this.getResultReWriting(index);
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
          this.contentData[index] = res?.data?.generate_content_outline?.content;
        }
      } catch (error) {
        this.isWriting = false;
      }
    },
    handleWriteOutline() {
      this.writingContent(this.outlineData);
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
      //     this.outlineData = res?.data?.generate_outline?.outline;
      //     this.images = res?.data?.generate_outline?.images;
      //   }
      // } catch (error) {
      //   this.isCreatingOutline = false;
      // }
      const res = {
    data: {
        generate_outline: {
            is_done: true,
            h2s_generated: [
                '1. \'Giới thiệu về công ty VCCorp\'',
                '2. \'Cơ hội tuyển dụng tại VCCorp\'',
                '3. \'Thông tin liên hệ VCCorp\'',
                '4. \'Chia sẻ thông tin VCCorp tới bạn bè\'',
                '5. \'Top công ty cùng lĩnh vực với VCCorp\'',
            ],
            summary: '[1] Đoạn văn trên giới thiệu về các dịch vụ và tính năng mà TopCV cung cấp trong lĩnh vực tiếp thị. Các dịch vụ bao gồm đăng ký tài khoản, tìm kiếm việc làm phù hợp, việc làm trong lĩnh vực công nghệ thông tin và việc làm cấp cao, tạo hồ sơ và CV, mẫu CV và mẫu Cover letter, dịch vụ tư vấn viết CV theo ngành nghề, thư viện CV theo ngành nghề, tạo TopCV Profile, danh sách công ty, phát triển sự nghiệp, cuộc thi TopCV Skills, trắc nghiệm tính cách MBTI và MI, công cụ tính lương, thuế thu nhập cá nhân, lãi suất kép, kế hoạch tiết kiệm, bảo hiểm thất nghiệp và bảo hiểm xã hội, ứng dụng di động TopCV và đăng tuyển và tìm kiếm hồ sơ cho nhà tuyển dụng. TopCV là một công ty cổ phần truyền thông Việt Nam (VCcorp).\n\n',
            outline: [
                'I. Giới thiệu về công ty VCCorp\n- Sự ra đời và phát triển của VCCorp\n- Sứ mệnh và giá trị cốt lõi của VCCorp\n- Lịch sử hình thành và phát triển của VCCorp',
                'II. Cơ hội tuyển dụng tại VCCorp\n- Các vị trí tuyển dụng đang mở\n- Quyền lợi của nhân viên khi làm việc tại VCCorp\n- Quy trình tuyển dụng tại VCCorp\n- Kinh nghiệm và gợi ý để ứng tuyển thành công tại VCCorp',
                'III. Thông tin liên hệ VCCorp\n- Địa chỉ văn phòng và chi nhánh của VCCorp\n- Các kênh liên hệ chính thức của VCCorp\n- Giờ làm việc và thời gian phản hồi của VCCorp\n- Cách tìm hiểu thêm thông tin về VCCorp',
                'IV. Chia sẻ thông tin VCCorp tới bạn bè\n- Cách chia sẻ thông tin VCCorp trên các mạng xã hội\n- Những thông tin nổi bật để chia sẻ về VCCorp\n- Lợi ích khi chia sẻ thông tin về VCCorp',
                'V. Top công ty cùng lĩnh vực với VCCorp\n- Giới thiệu về những công ty có cùng lĩnh vực hoạt động\n- So sánh vị trí của VCCorp so với các công ty khác\n- Phân tích ưu điểm và nhược điểm của VCCorp so với các công ty khác.',
            ],
            images: [],
        },
        writing: {
            is_done: true,
        },
        generate_content_outline: {
            is_done: true,
        },
    },
};
      this.isCreatingOutline = false;
      this.outlineData = res?.data?.generate_outline?.outline;
      this.images = res?.data?.generate_outline?.images;
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
        this.getResultReWriting(data.index);
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
