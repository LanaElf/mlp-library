<template>
    <div class="tooltip-container">
        <slot />
        <div class="tooltip">
            <button class="tooltip-button button"
                @click="tooltipVisible = !tooltipVisible">
                i
            </button>

            <div v-show="tooltipVisible" class="tooltip-content">
                {{ tooltipContent }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['tooltipContent']);

const tooltipVisible = ref(false);
</script>

<style>
.tooltip-container {
    position: relative;
    width: max-content;
}
.tooltip {
    position: absolute;
    top: -15px;
    right: -20px;
}
.tooltip-button {
    width: 20px;
    height: 20px;
    border-style: solid;
    border-width: 2px;
    border-radius: 50%;
    border-color: aqua;
    color:aqua;
    cursor: pointer;
}
.tooltip-content {
    background: #fff;
    position: absolute;
    top: 120%;
    right: -65px;
    width: 150px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 10px;
    font-size: 14px;
    z-index: 10;
}
</style>