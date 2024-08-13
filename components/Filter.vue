<script lang="ts" setup>
import type { Column, Table } from '@tanstack/vue-table'
import { computed, type PropType } from 'vue'
import DebouncedInput from '@/components/DebouncedInput.vue'
const props = defineProps({
    column: {
        type: Object as PropType<Column<any, unknown>>,
        required: true,
    },
    table: {
        type: Object as PropType<Table<any>>,
        required: true,
    },
})
const firstValue = computed(() =>
    props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id)
)
const columnFilterValue = computed(() => props.column.getFilterValue())
const sortedUniqueValues = computed(() =>
    typeof firstValue.value === 'number'
        ? []
        : Array.from(props.column.getFacetedUniqueValues().keys()).sort()
)
</script>

<template>
    <div v-els>
        <datalist :id="column.id + 'list'">
            <option v-for="value in sortedUniqueValues.slice(0, 5000)" :key="value" :value="value" />
        </datalist>
        <DebouncedInput type="text" :modelValue="(columnFilterValue ?? '') as string"
            @update:modelValue="value => column.setFilterValue(value)"
            :placeholder="`Search`" class="w-36 border shadow rounded"
            :list="column.id + 'list'" />
    </div>
</template>
