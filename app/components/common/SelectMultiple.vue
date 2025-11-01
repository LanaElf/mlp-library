<template>
  <div class="select-multiple">
    <button
        @click="isOpen = !isOpen"
        class="dropdown-btn button"
        :class="isOpen ? 'open' : ''">
      {{ placeholder }}
    </button>
    <div v-show="isOpen" class="dropdown-menu">
      <label
          v-for="option in options"
          :key="option.value"
          class="dropdown-item button"
          :class="isSelected(option.value) ? 'selected' : ''">
        <input
            type="checkbox"
            :value="option.value"
            :checked="isSelected(option.value)"
            @change="(e) => { changeSelected(e, option.value) }"
        />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  options: { value: string, label: string }[],
  selected: Set<string>,
  placeholder?: string
}>()

const emit = defineEmits<{(
    e: 'changeSelected',
    payload: { checked: boolean; value: string }
): void }>()

const selected = ref<string[]>([])

function changeSelected(event: Event, value: string) {
  const target = event.target as HTMLInputElement

  if (target) {
    const checked: boolean = target.checked;

    emit('changeSelected', { checked, value });

    if (checked) {
      selected.value.push(value)
    } else {
      selected.value = selected.value.filter((item) => {
        return item !== value
      })
    }
  }
}

const isOpen = ref(false)

const placeholder = props.placeholder ?? 'Выбрать значения'

function isSelected(value: string) {
    return props.selected.has(value)
}
</script>

<style scoped lang="scss">
.select-multiple {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em
}
.dropdown-btn {
  padding: 2px 10px;
  cursor: pointer;
  font-size: 1.1em;
  padding-right: 30px;
  position: relative;
  font-family: "vollcorn", sans-serif;

  &::after {
    content: '▼';
    margin-left: 8px;
    font-size: 0.8em;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    transition: $baseTransition;
  }

  &.open {
    &::after {
      transform: scaleY(-1) translateY(60%);
    }
  }
}
.dropdown-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  gap: 0.6em;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.dropdown-item {
  display: flex;
  align-items: center;
}

label {
  border-width: 1px;
  border-style: solid;
  padding: 0 6px;

  input {
    display: none;
  }
}
</style>
