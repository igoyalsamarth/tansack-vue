<script setup lang="ts">
import {
  type ColumnFiltersState,
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useVueTable,
  getPaginationRowModel
} from '@tanstack/vue-table';
import { h, resolveComponent, ref } from 'vue';
import Filter from '@/components/Filter.vue';
import { makeData, type Person } from '@/functions/makeData';
import dayjs from 'dayjs';

const INITIAL_PAGE_INDEX = 0;

const defaultData = makeData(100);
const columnHelper = createColumnHelper<Person>();
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);
const pageSizes = [10, 20, 30, 40, 50];
const columns = [
  columnHelper.accessor('uid', {
    header: 'UID'
  }),
  columnHelper.accessor('category', {
    header: 'Category'
  }),
  columnHelper.accessor('recurring', {
    header: 'Recurring'
  }),
  columnHelper.accessor('invoiceDate', {
    header: 'Invoice Date',
    cell: info => dayjs(info.getValue()).format('DD MMM YY')
  }),
  columnHelper.accessor('partyName', {
    header: 'Party Name'
  }),
  columnHelper.accessor('description', {
    header: 'Description'
  }),
  columnHelper.accessor('amount', {
    header: 'Amount(INR)',
    cell: value => formatToIndianCurrency(value.getValue())
  }),
  columnHelper.accessor('approval', {
    header: 'Approval'
  }),
  columnHelper.accessor('pendingApprovalFrom', {
    header: 'Pending Approval From',
    cell: info =>
      info.getValue() === 'no'
        ? 'No Approvals'
        : info.getValue() === 'all'
          ? 'All Approved'
          : info.getValue() === 'pending'
            ? 'Pending Submission'
            : info.getValue() === null
              ? '-'
              : info.getValue()
  }),
  columnHelper.accessor('paymentStatus', {
    header: 'Payment Status',
    cell: info =>
      info.getValue() === 'paid'
        ? 'Paid'
        : info.getValue() === 'partial'
          ? 'Partially Paid'
          : info.getValue() === 'unpaid'
            ? 'Unpaid'
            : '-'
  }),
  columnHelper.accessor('accountingStatus', {
    header: 'Accounting Status',
    cell: info => (info.getValue() ? 'Done' : 'Incomplete')
  }),
  {
    id: 'actions',
    header: '',
    cell: ({ row }: { row: any }) => {
      const FontAwesomeIcon = resolveComponent('font-awesome-icon');

      return h('div', { class: 'flex gap-4' }, [
        h(
          'button',
          {
            onClick: () => console.log('view action')
          },
          [h(FontAwesomeIcon, { icon: ['fas', 'eye'] })]
        ),
        h(
          'button',
          {
            onClick: () => console.log('edit action')
          },
          [h(FontAwesomeIcon, { icon: ['fas', 'pen'] })]
        ),
        h(
          'button',
          {
            onClick: () => console.log('delete action')
          },
          [h(FontAwesomeIcon, { icon: ['fas', 'copy'] })]
        )
      ]);
    }
  }
];

function formatToIndianCurrency(amount: number) {
  if (amount == null) return '-';
  return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const data = ref(defaultData);

function handlePageSizeChange(e: any) {
  table.setPageSize(Number(e.target.value));
}
const columnFilters = ref<ColumnFiltersState>([]);
const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  state: {
    get columnFilters() {
      return columnFilters.value;
    }
  },
  onColumnFiltersChange: updaterOrValue => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  getPaginationRowModel: getPaginationRowModel()
});

const visiblePages = computed(() => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pages = [];

  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', pageCount);
    } else if (currentPage >= pageCount - 3) {
      pages.push(
        1,
        '...',
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        pageCount
      );
    }
  }

  return pages;
});
</script>

<template>
  <div class="w-full">
    <table class="w-full table-auto border-collapse bg-white">
      <thead class="border border-[#F4F4F5]">
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <td
            :class="{
              'py-4 text-[#52525B] text-xs': true,
              'pl-6 pr-2': header.id === 'uid',
              'pr-6 pl-2': header.id === 'actions',
              'px-2': header.id !== 'uid' && header.id !== 'actions'
            }"
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
          >
            <div
              class="flex flex-col gap-2 font-medium whitespace-nowrap"
              :class="{
                'pb-9': header.id === 'approval' || header.id === 'amount'
              }"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <template
                v-if="
                  !header.isPlaceholder &&
                  header.column.getCanFilter() &&
                  header.id !== 'approval' &&
                  header.id !== 'amount'
                "
              >
                <Filter :column="header.column" :table="table" />
              </template>
            </div>
          </td>
        </tr>
      </thead>
      <!-- <tbody>
                <tr class="border border-[#F4F4F5] font-medium" v-for="row in table.getRowModel().rows" :key="row.id">
                    <td :class="{
                        'py-4 text-[#52525B] text-sm': true,
                        'pl-6 pr-2': cell.column.id === 'uid',
                        'pr-6 pl-2': cell.column.id === 'actions',
                        'px-2': cell.column.id !== 'uid' && cell.column.id !== 'actions'
                    }" v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </td>
                </tr>
            </tbody> -->
      <tbody>
        <tr
          class="border border-[#F4F4F5] font-medium text-sm text-[#52525B]"
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td class="py-4 pl-6 pr-2">
            <FlexRender
              v-if="row.getVisibleCells()[0].getValue() !== null"
              :render="row.getVisibleCells()[0].column.columnDef.cell"
              :props="row.getVisibleCells()[0].getContext()"
            />
            <p v-else>-</p>
          </td>
          <td class="py-4 px-2">
            <FlexRender
              :render="row.getVisibleCells()[1].column.columnDef.cell"
              :props="row.getVisibleCells()[1].getContext()"
            />
          </td>
          <td class="py-4 px-2 text-[#1D4ED8]">
            <FlexRender
              v-if="row.getVisibleCells()[2].getValue() !== null"
              :render="row.getVisibleCells()[2].column.columnDef.cell"
              :props="row.getVisibleCells()[2].getContext()"
            />
            <p v-else>-</p>
          </td>
          <td class="py-4 px-2">
            <FlexRender
              :render="row.getVisibleCells()[3].column.columnDef.cell"
              :props="row.getVisibleCells()[3].getContext()"
            />
          </td>
          <td class="py-4 px-2">
            <FlexRender
              :render="row.getVisibleCells()[4].column.columnDef.cell"
              :props="row.getVisibleCells()[4].getContext()"
            />
          </td>
          <td class="py-4 px-2">
            <FlexRender
              :render="row.getVisibleCells()[5].column.columnDef.cell"
              :props="row.getVisibleCells()[5].getContext()"
            />
          </td>
          <td class="py-4 px-2">
            <FlexRender
              :render="row.getVisibleCells()[6].column.columnDef.cell"
              :props="row.getVisibleCells()[6].getContext()"
            />
          </td>
          <td class="py-4 px-2">
            <FlexRender
              :render="row.getVisibleCells()[7].column.columnDef.cell"
              :props="row.getVisibleCells()[7].getContext()"
            />
          </td>
          <td
            class="py-4 px-2"
            :class="{
              'text-[#15803D] font-bold':
                row.getVisibleCells()[8].getValue() === 'all',
              'text-[#A1A1AA]':
                row.getVisibleCells()[8].getValue() === 'no' ||
                row.getVisibleCells()[8].getValue() === 'pending'
            }"
          >
            <FlexRender
              :render="row.getVisibleCells()[8].column.columnDef.cell"
              :props="row.getVisibleCells()[8].getContext()"
            />
          </td>
          <td
            class="py-4 px-2"
            :class="{
              'text-[#15803D]': row.getVisibleCells()[9].getValue() === 'paid',
              'text-[#854D0E]':
                row.getVisibleCells()[9].getValue() === 'partial'
            }"
          >
            <FlexRender
              :render="row.getVisibleCells()[9].column.columnDef.cell"
              :props="row.getVisibleCells()[9].getContext()"
            />
          </td>
          <td
            class="py-4 px-2"
            :class="{
              'text-[#15803D]': row.getVisibleCells()[10].getValue() === true
            }"
          >
            <FlexRender
              :render="row.getVisibleCells()[10].column.columnDef.cell"
              :props="row.getVisibleCells()[10].getContext()"
            />
          </td>
          <td class="py-4 pr-6 pl-2">
            <FlexRender
              :render="row.getVisibleCells()[11].column.columnDef.cell"
              :props="row.getVisibleCells()[11].getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center py-3 bg-[#F9FAFB]">
      <div class="px-3">
        <p class="text-sm font-medium text-[#6B7280]">
          {{ table.getRowCount() }} Expense Items
        </p>
      </div>
      <div class="flex items-center gap-2 px-3">
        <div class="flex gap-7">
          <p class="font-medium text-xs text-[#6B7280]">Results per page</p>
          <select
            class="bg-white border border-[#E5E7EB] p-2 text-xs text-[#374151] font-medium h-full shadow-[0_1px_2px_0px_#0000000D]"
            :value="table.getState().pagination.pageSize"
            @change="handlePageSizeChange"
          >
            <option
              :key="pageSize"
              :value="pageSize"
              v-for="pageSize in pageSizes"
            >
              {{ pageSize }}
            </option>
          </select>
        </div>
        <div class="flex gap-1">
          <button
            class="border rounded px-2 py-[6px] border-[#D1D5DB] text-xs font-medium text-[#6B7280]"
            @click="() => table.setPageIndex(0)"
            :disabled="!table.getCanPreviousPage()"
          >
            First
          </button>
          <button
            class="border rounded p-2 border-[#D1D5DB] text-xs font-medium text-[#6B7280]"
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.1658 4.23431C10.4782 4.54673 10.4782 5.05327 10.1658 5.36569L7.53147 8L10.1658 10.6343C10.4782 10.9467 10.4782 11.4533 10.1658 11.7657C9.85336 12.0781 9.34683 12.0781 9.03441 11.7657L5.83441 8.56569C5.52199 8.25327 5.52199 7.74673 5.83441 7.43431L9.03441 4.23431C9.34683 3.9219 9.85336 3.9219 10.1658 4.23431Z"
                fill="#6B7280"
              />
            </svg>
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            class="border rounded px-2 py-[6px] border-[#D1D5DB] text-xs font-medium text-[#6B7280]"
            @click="() => table.setPageIndex(Number(page) - 1)"
            :class="{
              'bg-[#2563EB] border border-[#1D4ED8] text-white':
                table.getState().pagination.pageIndex === Number(page) - 1,
              'py-1 h-fit': page === '...'
            }"
            :disabled="page === '...'"
          >
            {{ page }}
          </button>
          <button
            class="border rounded px-2 border-[#D1D5DB] text-xs font-medium text-[#6B7280]"
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.83441 11.7657C5.52199 11.4533 5.52199 10.9467 5.83441 10.6343L8.46873 8L5.83441 5.36569C5.52199 5.05327 5.52199 4.54673 5.83441 4.23431C6.14683 3.9219 6.65336 3.9219 6.96578 4.23431L10.1658 7.43431C10.4782 7.74673 10.4782 8.25327 10.1658 8.56569L6.96578 11.7657C6.65336 12.0781 6.14683 12.0781 5.83441 11.7657Z"
                fill="#6B7280"
              />
            </svg>
          </button>
          <button
            class="border rounded px-2 py-[6px] border-[#D1D5DB] text-xs font-medium text-[#6B7280]"
            @click="() => table.setPageIndex(table.getPageCount() - 1)"
            :disabled="!table.getCanNextPage()"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
