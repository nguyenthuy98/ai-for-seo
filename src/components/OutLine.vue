<template>
  <div class="flex justify-center">
    <div class="">
      <draggable
        class="list-group"
        :list="outlineData"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <transition-group type="transition" name="flip-list">
          <div
            class="list-group-item"
            v-for="element in outlineData"
            :key="element?.id"
          >
            <card-item
              :key="element?.id"
              :data="element"
              @sendData="handleSendData"
              @rewrite="handleRewriteData"
              @remove="handleRemoveOutLine(element?.id)"
            />
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import CardItem from './CardItem';

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
      console.log(this.data);
      return this.data;
    },
  },
  methods: {
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

<style>
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
</style>
