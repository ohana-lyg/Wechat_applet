<template>
  <n-data-table
    ref="table"
    :remote="true"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    :bordered="true"
    :single-line="false"
    @update:page="handlePageChange"
  />
</template>
<script lang="ts">
import { h, defineComponent, ref, reactive, onMounted } from "vue";
import { usersInfo } from "../data/index";
import { formatTime } from "../util/util";
import { getPeople, deletePeople } from "../apis/people";
import { PeopleItem, PeopleList } from "../types/types";
import { NButton, useMessage, DataTableColumns, NDataTable } from "naive-ui";

type Song = {
  user_id: string;
  username: string;
  address: string;
  phonenum: string;
  mailbox: string;
  createTime: string;
};

const createColumns = ({
  Delete,
}: {
  Delete: (row: Song) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "User_id",
      key: "user_id",
      align: "center",
    },
    {
      title: "Username",
      key: "username",
      align: "center",
    },
    {
      title: "Address",
      key: "address",
      align: "center",
    },
    {
      title: "Phonenum",
      key: "phonenum",
      align: "center",
    },
    {
      title: "Mailbox",
      key: "mailbox",
      align: "center",
    },
    {
      title: "CreateTime",
      key: "createTime",
      align: "center",
    },
    {
      title: "Action",
      key: "actions",
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            size: "small",
            type: "error",
            onClick: () => Delete(row),
          },
          { default: () => "Delete" }
        );
      },
    },
  ];
};

export default defineComponent({
  name: "PeopleManage",
  components: {
    NDataTable,
  },
  setup() {
    const message = useMessage();
    const dataRef = ref([]);
    const loadingRef = ref(true);
    const columnsRef = ref(createColumns);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
    });
    const allpeople: PeopleItem[] = [];
    onMounted(() => {
      getPeople().then((data: any) => {
        console.log(data.list);
        data.list.map((item: any) => {
          //console.log(item);
          const peopleItem: any = {};
          peopleItem.user_id = item.user_oppenid;
          peopleItem.username = item.username;
          peopleItem.phonenum = item.phonenum;
          peopleItem.mailbox = item.mailbox;
          peopleItem.address = item.address;
          peopleItem.createTime = formatTime(new Date(item.createdAt));
          allpeople.push(peopleItem);
        });
        dataRef.value = allpeople;
        //paginationReactive.pageCount = data.data.pages;
        loadingRef.value = false;
      });
    });

    /*     function query(page: number, pageSize = 10) {
      return new Promise((resolve) => {
        const pagedData = usersInfo.slice(
          (page - 1) * pageSize,
          page * pageSize
        );
        const pageCount = Math.ceil(usersInfo.length / pageSize);
        resolve({
          pageCount,
          data: pagedData,
        });
      });
    } */

    function handlePageChange(currentPage) {
      if (!loadingRef.value) {
        loadingRef.value = true;
        getPeople({
          page: currentPage,
          size: paginationReactive.pageSize,
        }).then((data) => {
          console.log(data.data.list);
          //console.log(data);
          dataRef.value = data.data.list;
          paginationReactive.page = currentPage;
          paginationReactive.pageCount = data.data.pages;
          loadingRef.value = false;
        });
      }
    }

    function rowKey(rowData) {
      return rowData.id;
    }
    return {
      data: dataRef,
      rowKey,
      columns: columnsRef.value({
        Delete(rowData: Song) {
          const data = rowData.user_id;
          deletePeople(data).then((res) => {
            console.log(res);

            if (res.ok == true) {
              const newArr = dataRef.value.filter(
                (item) => item.user_id != data
              );
              //console.log(newArr);
              dataRef.value = newArr;
              //console.log(dataRef.value);
              message.info(`删除成功`);
            } else if (res.status === 1) {
              message.error(`删除失败`);
            }
          });
        },
      }),
      pagination: paginationReactive,
      loading: loadingRef,
      handlePageChange,
    };
  },
});
</script>

<style lang="scss"></style>
