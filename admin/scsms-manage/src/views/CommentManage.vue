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
import { getComment, deleteComment } from "../apis/comment";
import { CommentItem } from "../types/types";

const columns = ({ handleReject }: any): any => {
  return [
    {
      title: "Id",
      key: "id",
      align: "center",
    },
    {
      title: "Business_name",
      key: "business_name",
      align: "center",
    },
    {
      title: "Food_name",
      key: "food_name",
      align: "center",
    },
    {
      title: "Score",
      key: "score",
      align: "center",
    },
    {
      title: "Content",
      key: "content",
      align: "center",
    },
    {
      title: "Username",
      key: "username",
      align: "center",
    },
    {
      title: "createTime",
      key: "createTime",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render(row: any) {
        return h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleReject(row),
          },
          { default: () => "Delete" }
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
      const allInfo: CommentItem[] = [];
      getComment().then((data: any) => {
        console.log(data);
        data.list.map((item: any) => {
          const commentItem: any = {};
          commentItem.id = item._id;
          commentItem.content = item.content;
          commentItem.username = item.user_name;
          commentItem.score = item.fraction_star + "星";
          commentItem.business_name = item.business_name;
          commentItem.food_name = item.food_name;
          commentItem.createTime = formatTime(new Date(item.createdAt));
          allInfo.push(commentItem);
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
      const auditPyload: AuditInfo = {
        saleId: rowData.id,
        publish: "1",
      };
      auditOrder(auditPyload).then((res) => {
        if (res.status === 0) {
          if (activeArr.value.length === 0) {
            getNewOrderFun(
              paginationReactive.page + 1,
              paginationReactive.pageSize
            );
            dataRef.value = dataRef.value.filter(
              (item: any) => item.id !== auditPyload.saleId
            );
          } else {
            dataRef.value = dataRef.value.filter(
              (item: any) => item.id !== auditPyload.saleId
            );
          }
          //console.log(newArr);
          message.info("已通过审核！");
        }
      });
    };
    const handleReject = (rowData: any): void => {
      const data = rowData.id;
      deleteComment(data).then((res) => {
        console.log(res);
        if (res.ok == true) {
          getOrderFun(paginationReactive.page, paginationReactive.pageSize);
          const newArr = dataRef.value.filter((item) => item.user_id != data);
          //console.log(newArr);
          dataRef.value = newArr;
          //console.log(dataRef.value);
          message.info(`删除成功`);
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
