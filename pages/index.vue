<script lang="ts">
import { ref } from 'vue';

export default {
    setup(props, ctx) {
        const activeKey = ref('1');
        const checked = ref<boolean>(true);

        return {
            activeKey,
            checked
        }
    }
}
</script>


<template>
    <div class="flex flex-col">
        <div class="flex justify-between border-b border-[#F4F4F5] bg-[#FAFAFA] px-4 py-3 items-center">
            <p class="text-[#52525B] text-lg font-bold">Expenses</p>
            <a-button class="rounded text-sm font-medium" type="primary">Add New Expense</a-button>
        </div>
        <a-tabs class="w-full bg-[#FAFAFA] text-[#71717A]" v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Submitted By Me">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="Pending Approval from me" force-render>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="Default">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="4" tab="Payroll">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="5" tab="Petty Cash">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="6" tab="Sub Grant">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="7" tab="Custom Exp3">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="8" class="-py-2" tab="All Expense">
                <TansackTable />
            </a-tab-pane>
            <template #rightExtra>
                <div class="flex gap-4 mr-6 items-center">
                    <a-switch size="small" v-model:checked="checked" />
                    <p class="text-sm font-medium text-[#52525B]">Expenses by line item</p>
                </div>
            </template>
        </a-tabs>
    </div>
</template>

<style scoped>
:deep(.ant-tabs-tab){
    padding: 8px, 4px
}

:deep(.ant-tabs-nav-wrap) {
    margin-left: 24px;
}

:deep(.ant-tabs-nav) {
    margin-bottom: 0px;
}
:deep(.ant-btn-primary) {
    padding: 8px 12px;
    height: auto;
}
:deep(.ant-tabs-tab-btn){
    font-weight: 500;
}; 
:deep(.ant-tabs-tab-btn):hover {
        color: #0000 !important;
    }
</style>