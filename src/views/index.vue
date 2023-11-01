<template>
  <div class="main-layout">
    <el-container class="main-container">
      <el-header class="header">
        <el-row>
          <el-col :span="8">
            <div class="header-input">
              <el-input v-model="keyWords" placeholder="Outline"></el-input>
              <el-button type="primary" @click="handleCreateOutline"
                >Tạo Outline</el-button
              >
            </div>
          </el-col>
          <el-col :span="16"> </el-col>
        </el-row>
      </el-header>
      <el-row class="main-content" :gutter="24">
        <el-col :span="10">
          <p class="title">Outline</p>
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
                @sendData="handleOutlineData"
                @rewrite="handleRewriteData"
                @remove="handleRemoveOutline"
              />
              <el-row class="button-area">
                <el-button type="primary" @click="handleCreateOutline"
                  >Viết lại toàn bộ nội dung</el-button
                >
              </el-row>
            </div>
          </el-aside></el-col
        >
        <el-col :span="14">
          <p class="title">Bài viết</p>
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
      // try {
      //   const res = await aiService.getState(this.hashId);
      //   if (!res?.data?.writing?.is_done) {
      //     clearTimeout(this.crawlDataTimeout);
      //     this.crawlDataTimeout = setTimeout(() => {
      //       this.getResultWriting();
      //     }, 2000);
      //   } else {
      //     Vue.notify({
      //       type: 'success',
      //       title: 'Success',
      //       duration: 2000,
      //       text: res?.data?.message,
      //     });
      //     clearTimeout(this.crawlDataTimeout);
      //     this.isWriting = false;
      //     this.contentData = res?.data?.writing?.content;
      //     this.images = res?.data?.generate_outline?.images;
      //   }
      // } catch (error) {
      //   this.isWriting = false;
      // }
      const res = {
      data: {
        generate_outline: {
          is_done: true,
          h2s_generated: [
            '1. \'Halloween là ngày nào? Nguồn gốc lễ Halloween\'',
            '2. \'Halloween bắt nguồn từ nước nào?\'',
            '3. \'Ý nghĩa ngày Halloween và lịch sử ngày halloween\'',
            '4. \'Những hoạt động thú vị trong ngày Halloween\'',
            '5. \'Những món ăn truyền thống trong ngày Halloween\'',
          ],
          summary: '[1] Đoạn văn trên nhấn mạnh về việc lựa chọn địa điểm phù hợp để xem giá và khuyến mãi chính xác trong lĩnh vực marketing. Ngoài ra, nó cũng đề cập đến ngày Halloween, bao gồm nguồn gốc và ý nghĩa của ngày này.\n\n',
          outline: [
            'I. Halloween là ngày nào? Nguồn gốc lễ Halloween\n    A. Giới thiệu về ngày Halloween\n    B. Nguồn gốc của lễ hội Halloween',
            'II. Halloween bắt nguồn từ nước nào?\n    A. Halloween và lịch sử ngày hội cổ xưa ở Ireland\n    B. Cách mà Halloween lan rộng ra các vùng khác của thế giới\n    C. Sự ảnh hưởng của Halloween đến nền văn hóa hiện đại',
            'III. Ý nghĩa ngày Halloween và lịch sử ngày halloween\n    A. Ý nghĩa tâm linh của ngày Halloween trong quá khứ\n    B. Sự thay đổi ý nghĩa của Halloween qua thời gian\n    C. Cách mà lịch sử ngày Halloween ảnh hưởng đến cách chúng ta hiểu và kỷ niệm ngày hội này ngày nay',
            'IV. Những hoạt động thú vị trong ngày Halloween\n    A. Trang trí nhà cửa và làm đèn bí ngô Jack-olantern\n    B. Trò chơi \'trick or treat\' và phong tục mặc đồ hóa trang\n    C. Các sự kiện và lễ hội đặc biệt khác diễn ra trong ngày Halloween\n    D. Ảnh hưởng của những hoạt động này đến việc kỷ niệm Halloween hiện đại',
            'V. Những món ăn truyền thống trong ngày Halloween\n    A. Các món ăn truyền thống từ bí ngô\n    B. Các loại kẹo và bánh được phục vụ trong ngày Halloween\n    C. Ý nghĩa và vai trò của thức ăn trong ngày Halloween\n    D. Sự phổ biến của những món ăn này trong các dịp lễ hội Halloween hiện đại',
          ],
          images: [
            'https://cdn.nguyenkimmall.com/design/themes/responsive/media/images/lazy_img.jpg',
            'https://cdn.nguyenkimmall.com/./images/blog/fb-outline-icon.png',
          ],
        },
        writing: {
          is_done: true,
          count_words: 1728,
          content: 'Lịch Sử Ngày Halloween: Nguồn Gốc, Ý Nghĩa Và Hoạt Động Đặc Biệt\n\nLịch sử ngày Halloween là một chủ đề thú vị, nói về nguồn gốc, ý nghĩa và hoạt động đặc biệt trong ngày này. Trên thực tế, Halloween là một ngày lễ truyền thống được tổ chức vào ngày 31 tháng 10 hàng năm. Lễ hội này có nguồn gốc từ nước nào? Ý nghĩa của Halloween trong quá khứ và ngày nay ra sao? Chúng ta sẽ khám phá tất cả trong bài viết này.\n\n I. Halloween là ngày nào? Nguồn gốc lễ Halloween\nA. Giới thiệu về ngày Halloween\nHalloween là một ngày lễ truyền thống được tổ chức vào ngày 31 tháng 10 hàng năm. Ban đầu, nó được gọi là All HallowsEve và kết thúc vào ngày 1 tháng 11, lễ kỷ niệm \'All SaintsDay trong Kitô giáo. Ngày Halloween là thời điểm mà người ta tin rằng ranh giới giữa thế giới của những người sống và thế giới của người chết trở nên mờ nhạt.\n\nB. Nguồn gốc của lễ hội Halloween\nHalloween có nguồn gốc từ lễ hội cổ xưa ở Ireland gọi là Samhain. Samhain là một ngày đánh dấu sự chuyển đổi từ mùa hè sang mùa đông và được xem là thời điểm ranh giới giữa thế giới của những người sống và thế giới của người chết trở nên mờ nhạt nhất. Ngày này, người dân xưa tin rằng các linh hồn của người đã qua đời sẽ trở lại thăm thân nhân và người thân yêu của mình.\n\nC. Sự ảnh hưởng của Halloween đến nền văn hóa hiện đại\nHalloween đã lan rộng ra các vùng khác của thế giới qua di cư và sự phổ biến của nền văn hóa Mỹ. Ngày Halloween đã trở thành một sự kiện thú vị cho trẻ em và người lớn trong nhiều quốc gia. Việc mặc đồ hóa trang, trang trí nhà cửa và làm đèn bí ngô Jack-o-lantern trở nên phổ biến và đã tạo nên những hoạt động đặc biệt trong ngày Halloween.\n\n II. Halloween bắt nguồn từ nước nào?\nA. Halloween và lịch sử ngày hội cổ xưa ở Ireland\nHalloween có nguồn gốc từ lễ hội cổ xưa ở Ireland gọi là Samhain. Samhain là một lễ hội quan trọng trong văn hóa Celtic, đánh dấu sự chuyển đổi từ mùa hè sang mùa đông. Ngày này, người dân xưa tin rằng các linh hồn của người đã qua đời sẽ trở lại thăm thân nhân và người thân yêu của mình.\n\nB. Cách mà Halloween lan rộng ra các vùng khác của thế giới\nHalloween đã lan rộng ra các vùng khác của thế giới qua di cư và sự phổ biến của nền văn hóa Mỹ. Ngày Halloween đã trở thành một sự kiện thú vị cho trẻ em và người lớn trong nhiều quốc gia. Việc mặc đồ hóa trang, trang trí nhà cửa và làm đèn bí ngô Jack-o-lantern trở nên phổ biến và đã tạo nên những hoạt động đặc biệt trong ngày Halloween.\n\nC. Sự ảnh hưởng của Halloween đến nền văn hóa hiện đại\nHalloween đã trở thành một phần của nền văn hóa hiện đại và ảnh hưởng đến cách chúng ta hiểu và kỷ niệm ngày hội này ngày nay. Trang trí nhà cửa, trò chơi trick or treat, và các sự kiện đặc biệt khác đã trở thành một phần không thể thiếu của Halloween hiện đại.\n\n III. Ý nghĩa ngày Halloween và lịch sử ngày Halloween\nA. Ý nghĩa tâm linh của ngày Halloween trong quá khứ\nTrong quá khứ, Halloween có ý nghĩa tâm linh sâu sắc. Người dân xưa tin rằng trong ngày này, ranh giới giữa thế giới của những người sống và thế giới của người chết trở nên mờ nhạt nhất. Họ tưởng nhớ và tỏ lòng kính trọng đối với các linh hồn của người đã qua đời và tiến hành các nghi lễ để giúp họ vượt qua vào Thế giới Bên Kia.\n\nB. Sự thay đổi ý nghĩa của Halloween qua thời gian\nTheo thời gian, ý nghĩa của Halloween đã thay đổi. Ngày này không chỉ đơn giản là một lễ hội tưởng nhớ người đã qua đời mà còn trở thành một dịp để mọi người thể hiện sự sáng tạo và tham gia vào những hoạt động thú vị. Halloween hiện nay đề cập đến niềm vui, sự hồi hộp và những trò chơi hóa trang.\n\nC. Cách mà lịch sử ngày Halloween ảnh hưởng đến cách chúng ta hiểu và kỷ niệm ngày hội này ngày nay\nLịch sử ngày Halloween đã ảnh hưởng đến cách chúng ta hiểu và kỷ niệm ngày hội này ngày nay. Halloween không chỉ là một dịp để mọi người tham gia vào những hoạt động vui nhộn, mà còn là một cơ hội để chúng ta học hỏi về lịch sử và văn hóa của lễ hội này.\n\n IV. Những hoạt động thú vị trong ngày Halloween\nA. Trang trí nhà cửa và làm đèn bí ngô Jack-o-lantern\nTrang trí nhà cửa và làm đèn bí ngô Jack-o-lantern là những hoạt động thú vị trong ngày Halloween. Người ta thường trang trí nhà cửa của mình bằng những hình ảnh liên quan đến Halloween như ma, quỷ, bóng ma và những người chết. Làm đèn bí ngô Jack-o-lantern cũng là một truyền thống được thực hiện trong ngày Halloween.\n\nB. Trò chơi \'trick or treat\' và phong tục mặc đồ hóa trang\nTrò chơi \'trick or treat\' và phong tục mặc đồ hóa trang là những hoạt động không thể thiếu trong ngày Halloween. Trẻ em thường đi từ nhà này đến nhà khác, nơi họ được nhận kẹo và đồ ngọt từ các gia đình. Mặc đồ hóa trang cũng là một truyền thống phổ biến trong ngày Halloween, người ta thường mặc đồ của các nhân vật ma quỷ, quái vật và người chết.\n\nC. Các sự kiện và lễ hội đặc biệt khác diễn ra trong ngày Halloween\nNgày Halloween cũng là thời điểm để tham gia vào các sự kiện và lễ hội đặc biệt. Có nhiều lễ hội Halloween được tổ chức trên khắp thế giới, từ các buổi biểu diễn nghệ thuật cho đến lễ hội rước đèn bí ngô và các cuộc thi hóa trang.\n\nD. Ảnh hưởng của những hoạt động này đến việc kỷ niệm Halloween hiện đại\nNhững hoạt động thú vị trong ngày Halloween đã tạo nên những truyền thống và ảnh hưởng đến cách chúng ta kỷ niệm Halloween hiện đại. Chúng tạo ra không khí vui nhộn, hồi hộp và sự kết nối giữa mọi người trong ngày này.\n\n V. Những món ăn truyền thống trong ngày Halloween\nA. Các món ăn truyền thống từ bí ngô\nBí ngô là một phần không thể thiếu trong ngày Halloween và có nhiều món ăn truyền thống được làm từ nó. Một trong những món ăn phổ biến là bánh hình bí ngô, một loại bánh có hình dạng giống như bí ngô và được trang trí với kem và socola.\n\nB. Các loại kẹo và bánh được phục vụ trong ngày Halloween\nNgày Halloween không thể thiếu các loại kẹo và bánh ngọt. Trẻ em thường được tặng kẹo và đồ ngọt khi đi từ nhà này đến nhà khác trong trò chơi \'trick or treat\'. Ngoài ra, còn có các loại bánh và bánh ngọt khác được trang trí với hình ảnh liên quan đến Halloween.\n\nC. Ý nghĩa và vai trò của thức ăn trong ngày Halloween\nThức ăn đóng vai trò quan trọng trong ngày Halloween. Nó không chỉ là một phần của những hoạt động và truyền thống, mà còn là một cách để tạo ra một không khí vui nhộn và tận hưởng ngày hội này.\n\nD. Sự phổ biến của những món ăn này trong các dịp lễ hội Halloween hiện đại\nNhững món ăn truyền thống trong ngày Halloween vẫn được ưa chuộng trong các dịp lễ hội Halloween hiện đại. Các món ăn này không chỉ ngon mà còn tạo nên không khí đặc biệt và mang đến niềm vui cho mọi người.\n\nFAQs:\n\n1. Lễ Halloween bắt nguồn từ đâu?\n - Halloween có nguồn gốc từ lễ hội cổ xưa ở Ireland gọi là Samhain.\n\n2. Halloween có ý nghĩa gì?\n - Halloween ban đầu được tổ chức để tưởng nhớ và tỏ lòng kính trọng đối với các linh hồn của người đã qua đời. Ngày nay, nó trở thành một dịp để tham gia vào những hoạt động vui nhộn và tạo niềm vui cho mọi người.\n\n3. Các hoạt động thú vị nào diễn ra trong ngày Halloween?\n - Trang trí nhà cửa và làm đèn bí ngô Jack-o-lantern, trò chơi \'trick or treat\' và mặc đồ hóa trang là những hoạt động phổ biến trong ngày Halloween.\n\n4. Các món ăn truyền thống nào được phục vụ trong ngày Halloween?\n - Các món ăn truyền thống trong ngày Halloween bao gồm bánh hình bí ngô, các loại kẹo và bánh ngọt được trang trí với hình ảnh liên quan đến Halloween.\n\n5. Halloween ảnh hưởng như thế nào đến nền văn hóa hiện đại?\n - Halloween đã trở thành một phần của nền văn hóa hiện đại và ảnh hưởng đến cách chúng ta hiểu và kỷ niệm ngày hội này ngày nay.\n\nKết luận:\nTrên đây là những điều thú vị về lịch sử ngày Halloween, nguồn gốc và ý nghĩa của ngày này. Halloween không chỉ là một ngày lễ truyền thống, mà còn là một dịp để mọi người tham gia vào những hoạt động vui nhộn và tận hưởng không khí đặc biệt trong ngày này. Mỗi năm, Halloween là cơ hội để chúng ta học hỏi về lịch sử và văn hóa của lễ hội này, đồng thời tạo ra những kỷ niệm đáng nhớ.\n\nReferences: \n- [1] Đoạn văn trên nhấn mạnh về việc lựa chọn địa điểm phù hợp để xem giá và khuyến mãi chính xác trong lĩnh vực marketing. Ngoài ra, nó cũng đề cập đến ngày Halloween, bao gồm nguồn gốc và ý nghĩa của ngày này.',
        },
        generate_content_outline: {
          is_done: true,
        },
        keywords: 'lịch sử ngày halloween',
        message: 'writing end!',
      },
    };
    this.isWriting = false;
    this.contentData = res?.data?.writing?.content;
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
      //     this.writingContent(this.outlineData);
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
              '1. \'Halloween là ngày nào? Nguồn gốc lễ Halloween\'',
              '2. \'Halloween bắt nguồn từ nước nào?\'',
              '3. \'Ý nghĩa ngày Halloween và lịch sử ngày halloween\'',
              '4. \'Những hoạt động thú vị trong ngày Halloween\'',
              '5. \'Những món ăn truyền thống trong ngày Halloween\'',
          ],
          summary: '[1] Đoạn văn trên nhấn mạnh về việc lựa chọn địa điểm phù hợp để xem giá và khuyến mãi chính xác trong lĩnh vực marketing. Ngoài ra, nó cũng đề cập đến ngày Halloween, bao gồm nguồn gốc và ý nghĩa của ngày này.\n\n',
          outline: [
              'I. Halloween là ngày nào? Nguồn gốc lễ Halloween\n    A. Giới thiệu về ngày Halloween\n    B. Nguồn gốc của lễ hội Halloween',
              'II. Halloween bắt nguồn từ nước nào?\n    A. Halloween và lịch sử ngày hội cổ xưa ở Ireland\n    B. Cách mà Halloween lan rộng ra các vùng khác của thế giới\n    C. Sự ảnh hưởng của Halloween đến nền văn hóa hiện đại',
              'III. Ý nghĩa ngày Halloween và lịch sử ngày halloween\n    A. Ý nghĩa tâm linh của ngày Halloween trong quá khứ\n    B. Sự thay đổi ý nghĩa của Halloween qua thời gian\n    C. Cách mà lịch sử ngày Halloween ảnh hưởng đến cách chúng ta hiểu và kỷ niệm ngày hội này ngày nay',
              'IV. Những hoạt động thú vị trong ngày Halloween\n    A. Trang trí nhà cửa và làm đèn bí ngô Jack-olantern\n    B. Trò chơi trick or treat và phong tục mặc đồ hóa trang\n    C. Các sự kiện và lễ hội đặc biệt khác diễn ra trong ngày Halloween\n    D. Ảnh hưởng của những hoạt động này đến việc kỷ niệm Halloween hiện đại',
              'V. Những món ăn truyền thống trong ngày Halloween\n    A. Các món ăn truyền thống từ bí ngô\n    B. Các loại kẹo và bánh được phục vụ trong ngày Halloween\n    C. Ý nghĩa và vai trò của thức ăn trong ngày Halloween\n    D. Sự phổ biến của những món ăn này trong các dịp lễ hội Halloween hiện đại',
          ],
          images: [
              'https://cdn.nguyenkimmall.com/design/themes/responsive/media/images/lazy_img.jpg',
              'https://cdn.nguyenkimmall.com/./images/blog/fb-outline-icon.png',
          ],
        },
        writing: {
            is_done: true,
        },
        generate_content_outline: {
            is_done: true,
        },
        keywords: 'lịch sử ngày halloween',
        message: 'generate outline end!',
      },
    };
      this.outlineData = res?.data?.generate_outline?.outline;
      this.writingContent(this.outlineData);
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
  .header {
    padding: 20px;
    .header-input {
      display: flex;
    }
    input {
      width: 400px;
    }
    button {
      margin-left: 8px;
    }
  }
  .main-content {
    padding: 20px;
  }
  .aside {
    padding: 16px;
    border: 1px solid #dfd9d9;
    width: 100% !important;
    height: 72vh;
    border-radius: 5px;
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
    height: 72vh;
    padding: 16px;
    border: 1px solid #dfd9d9;
    border-radius: 5px;
    .el-card__body {
      padding: 0px;
    }
  }
}
</style>
