<template>
  <div class="flex justify-center outline-content">
    <draggable
      :list="outlineData"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="onEnd"
    >
      <transition-group type="transition" name="flip-list">
        <div
          class="list-group-item"
          v-for="(element, index) in outlineData"
          :key="element?.order"
        >
          <card-item
            :key="element?.order"
            :itemIndex="index"
            :oldIndex="element?.newIndex ?? element?.order"
            :data="element?.item"
            :isWritedContent="isWritedContent"
            :currentWordsCount="currentWordsCount[index]"
            @sendData="handleSendData"
            @rewrite="handleRewriteData"
            @remove="handleRemoveOutLine"
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
      default: false,
    },
    currentWordsCount: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isDragging: false,
      outlineData: [],
      isFirst: true,
    };
  },
  mounted() {
    this.outlineData = this.data.map((item, index) => {
      const temp = item?.split('\n');
      return {
        item,
        order: index,
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
    handleRemoveOutLine(index) {
      this.$emit('remove', index);
    },
    handleSendData(data) {
      this.$emit('sendData', data);
    },
    handleRewriteData(data) {
      this.$emit('rewrite', data);
    },
    onEnd(e) {
      this.isDragging = false;
      this.$emit('resetOutline', this.outlineData);
      this.outlineData[e.newIndex] = {
        ...this.outlineData[e.newIndex],
        oldIndex: e.oldIndex,
        newIndex: e.newIndex,
      };
    },
  },
};
</script>

<style lang="scss">
.outline-content {
  height: 90%;
  overflow: auto;
  padding-right: 16px;
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
