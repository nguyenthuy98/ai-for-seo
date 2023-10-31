<template>
  <el-card
    shadow="hover"
    class="card-item"
    @mouseover.native="handleHoverCard"
    @mouseleave.native="handleLeaveCard"
  >
    <el-row class="card-item-header" :gutter="8">
      <el-col :span="20">
        <p class="mb-4">{{ data?.[0] }}</p>
      </el-col>
      <el-col :span="4" class="text-right">
        <i
          v-if="isHover || isEditMode"
          class="el-icon-close"
          @click="handleRemoveCardItem"
        ></i>
      </el-col>
    </el-row>
    <el-form ref="form" :model="form" :rules="rules">
      <el-row class="card-item-body">
        <el-form-item prop="content" v-if="isEditMode">
          <el-input
            v-model="form.content"
            type="textarea"
            autosize
            placeholder="Nội dung"
          >
          </el-input>
        </el-form-item>
        <pre class="common-font" v-else>{{ outlineContent }}</pre>
      </el-row>
      <el-row class="card-item-footer" v-if="isHover || isEditMode">
        <el-col :span="10" class="footer-left"
          ><el-form-item prop="count" v-if="isEditMode">
            <el-input v-model="form.count" type="input" placeholder="Số từ">
            </el-input>
            <span class="ml-4">Words</span>
          </el-form-item>
          <span v-else>{{ data?.words ?? 0 }} Words</span></el-col
        >
        <el-col :span="14" class="footer-right text-right">
          <div v-if="isEditMode">
            <el-button type="primary" plain @click="handleSave">Lưu</el-button>
            <el-button type="danger" plain @click="handleCancel"
              >Hủy bỏ</el-button
            >
          </div>
          <div v-else>
            <el-button type="primary" plain @click="handleRewrite"
              >Viết lại</el-button
            >
            <el-button type="success" plain @click="handleEdit"
              >Chỉnh sửa</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>

import rules from '../config/rules';

export default {
  name: 'CardItem',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    outlineContent() {
      let temp = '';
      this.data.forEach((item, index) => {
        if (index === 1) {
          temp = item;
        } else if (index !== 0) {
          temp = `${temp}\n${item}`;
        }
      });
      return temp;
    },
  },
  watch: {
    outlineContent: {
      handler() {
        this.form.content = this.outlineContent;
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      isHover: false,
      isEditMode: false,
      form: {
        content: '',
        count: this.data?.words ?? 0,
      },
      rules: {
        content: [
          {
            required: true,
            message: 'Nội dung không được để trống',
            trigger: ['blur', 'change'],
          },
        ],
        count: [
          {
            required: true,
            message: 'Số từ không được để trống',
            trigger: ['blur', 'change'],
          },
          {
            pattern: rules?.PATTERN_A_NUMBER,
            message: 'Số từ phải là dạng số',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  methods: {
    handleLeaveCard() {
      this.isHover = false;
    },
    handleHoverCard() {
      this.isHover = true;
    },
    handleRemoveCardItem() {
      this.$emit('remove');
    },
    handleSave() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.isEditMode = false;
          this.$emit('sendData', {
            id: this.data?.id,
            form: this.form,
          });
        }
      });
    },
    handleCancel() {
      this.isEditMode = false;
      this.form.content = this.data?.content;
    },
    handleRewrite() {
      this.isEditMode = true;
      this.$emit('rewrite', this.data?.id);
    },
    handleEdit() {
      this.isEditMode = true;
    },
  },
};
</script>
<style lang="scss">
.card-item {
  .el-card__body {
    padding: 16px !important;
  }
  .card-item-header {
    display: flex;
  }
  .el-icon-close:before {
    color: red;
  }
  .card-item-footer {
    display: flex;
    justify-content: space-between;
  }
  .footer-left .el-input {
    width: 80px;
  }
}
</style>
