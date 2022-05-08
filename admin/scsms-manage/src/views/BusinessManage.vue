<template>
  <n-data-table
    ref="table"
    :remote="true"
    :columns="columns"
    :data="data"
    striped
    :single-line="false"
    size="large"
    min-height="75vh"
    :flex-height="true"
    :bordered="true"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    @update:page="handlePageChange"
  />
</template>

<script lang="ts">
import { NButton, NDataTable, useMessage } from "naive-ui";
import { warnOnce } from "naive-ui/lib/_utils";
import {
  defineComponent,
  h,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import { get } from "../apis";
import { formatTime } from "../util/util";
import { getBusiness, updateBusiness, auditBusiness } from "../apis/business";
import { BusinessInfo, BusinessItem, BusinessList } from "../types/types";

const columns = ({ handleAgree, handleReject }: any): any => {
  return [
    {
      title: "Id",
      key: "id",
      align: "center",
    },
    {
      title: "user_id",
      key: "user_id",
      align: "center",
    },
    {
      title: "name",
      key: "name",
      align: "center",
    },
    {
      title: "rest",
      key: "rest",
      align: "center",
    },
    {
      title: "examine",
      key: "examine",
      align: "center",
    },
    {
      title: "createTime",
      key: "createTime",
      align: "center",
    },
    {
      title: "同意",
      key: "agree",
      align: "center",
      render(row: any) {
        return h(
          NButton,
          {
            size: "small",
            type: "success",
            onClick: () => handleAgree(row),
          },
          { default: () => "Agree" }
        );
      },
    },
    {
      title: "拒绝",
      key: "argue",
      align: "center",
      render(row: any) {
        return h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleReject(row),
          },
          { default: () => "Reject" }
        );
      },
    },
  ];
};

export default defineComponent({
  name: "OrderManage",
  components: { NDataTable },
  setup() {
    const message = useMessage();
    const dataRef = ref<any>([]);
    const loadingRef = ref(true);
    const paginationReactive = reactive({
      page: 2,
      pageSize: 5,
      showSizePicker: true,
      pageSizes: [10],
      onChange: (page) => {
        paginationReactive.page = page;
      },
      onUpdatePageSize: (pageSize) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
      },
    });

    const getOrderFun = (page: number, size: number): void => {
      const allInfo: BusinessItem[] = [];
      getBusiness().then((data: any) => {
        console.log(data);
        const dataset = data.list.filter((item) => item.examine == false);
        dataset.map((item: any) => {
          const BusinessItem: any = {};
          BusinessItem.id = item._id;
          BusinessItem.user_id = item.user_oppenid;
          BusinessItem.name = item.name;
          //console.log(item.rest);
          BusinessItem.rest = item.rest ? "是" : "否";
          //console.log(BusinessItem.rest);
          BusinessItem.examine = item.examine ? "是" : "否";
          BusinessItem.createTime = formatTime(new Date(item.createdAt));
          allInfo.push(BusinessItem);
        });
        console.log(allInfo);

        dataRef.value = allInfo;
        //paginationReactive.page = data.data.pageNum;
        //paginationReactive.pageCount = data.data.pages;
        loadingRef.value = false;
      });
    };

    const handlePageChange = (currentPage: number): void => {
      if (!loadingRef.value) {
        loadingRef.value = true;
        getOrderFun(currentPage, paginationReactive.pageSize);
      }
    };
    onMounted(() => {
      getOrderFun(1, 10);
    });
    const activeArr = ref<any>([]);
    const handleAgree = (rowData: any): void => {
      const business: BusinessInfo = {
        id: rowData.id,
      };
      updateBusiness(business).then((res) => {
        console.log(res);
        if (res.list.examine == true) {
          //console.log(newArr);
          getOrderFun(paginationReactive.page, paginationReactive.pageSize);
          message.info("已通过审核！");
        }
      });
    };
    const handleReject = (rowData: any): void => {
      const data = rowData.id;
      console.log(data);
      auditBusiness(data).then((res) => {
        console.log(res);
        if (res.ok == true) {
          getOrderFun(paginationReactive.page, paginationReactive.pageSize);
          const newArr = dataRef.value.filter((item) => item.user_id != data);
          //console.log(newArr);
          dataRef.value = newArr;
          //console.log(dataRef.value);
          message.info(`审核未通过`);
        } else if (res.status === 1) {
          message.error(`删除失败`);
        }
      });
    };

    return {
      data: dataRef,
      columns: columns({
        handleAgree,
        handleReject,
      }),
      loading: loadingRef,
      pagination: paginationReactive,
      rowKey(rowData: any) {
        return rowData.id;
      },
      handlePageChange,
    };
  },
});
</script>

<style lang="scss"></style>
