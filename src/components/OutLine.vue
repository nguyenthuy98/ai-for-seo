<template>
  <div class="flex justify-center outline-content">
    <draggable
      :list="outlineData"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" name="flip-list">
        <div
          class="list-group-item"
          v-for="(element, index) in outlineData"
          :key="element?.id"
        >
          <card-item
            :key="element?.id"
            :itemIndex="index"
            :data="element?.item"
            :isWritedContent="isWritedContent"
            @sendData="handleSendData"
            @rewrite="handleRewriteData"
            @remove="handleRemoveOutLine(index)"
          />
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import CardItem from './CardItem';
import { randomstring } from '../utils/common';

export default {
  name: 'OutLine',
  components: {
    draggable,
    CardItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isWritedContent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isDragging: false,
      outlineData: [],
    };
  },
  mounted() {
    this.outlineData = this.data.map((item, index) => {
      const temp = item.split('\n');
      return {
        id: index,
        item: temp,
      };
    });
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  methods: {
    randomstring,
    handleRemoveOutLine(outlineId) {
      this.$emit('remove', outlineId);
    },
    handleSendData(data) {
      this.$emit('sendData', data);
    },
    handleRewriteData(data) {
      this.$emit('rewrite', data);
    },
  },
};
</script>

<style lang="scss">
.outline-content {
  height: 70vh;
  overflow: auto;
  .button {
    margin-top: 35px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    height: 70vh;
    overflow: scroll;
    margin-top: 24px;
  }
  .list-group-item {
    cursor: move;
    border: none !important;
    padding: 0px !important;
  }
  .list-group-item i {
    cursor: pointer;
  }
  .card-item {
    margin-bottom: 16px;
  }
}
</style>
