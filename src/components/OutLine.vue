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
          :key="`${index}-key`"
        >
          <card-item
            :key="index"
            :data="element"
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
  },
  data() {
    return {
    };
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
    outlineData() {
      return this.data.map((item) => {
        const temp = item.split('\n');
        return temp;
      });
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
    handleRewriteData(outlineId) {
      this.$emit('rewrite', outlineId);
    },
  },
};
</script>

<style lang="scss">
.outline-content {
  height: 60vh;
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
