<template>
  <div class="app-container">
    <div style="height: 20px">
      <!-- <el-tag
        size="small"
        closable
        v-for="(item, i) in tagList"
        :key="i"
        @close="handleClose(item)"
      >
        {{ item.label }}
      </el-tag> -->
    </div>
    <div class="select-list">
      <div class="select-line">
        <div>
          <label class="select-line-tit">{{ insertData.label }}</label>
          <span class="select_line_con">
            <span
              v-show="!isShow1"
              class="select_item"
              @click="insertDateSearch(1)"
              >今天</span
            >
            <span
              v-show="isShow1"
              class="select_item selected"
              @click="insertCancel(1)"
              >今天</span
            >
            <span
              v-show="!isShow2"
              class="select_item"
              @click="insertDateSearch(2)"
              >近七天</span
            >
            <span
              v-show="isShow2"
              class="select_item selected"
              @click="insertCancel(2)"
              >近七天</span
            >
            <span
              v-show="!isShow3"
              class="select_item"
              @click="insertDateSearch(3)"
              >本月</span
            >
            <span
              v-show="isShow3"
              class="select_item selected"
              @click="insertCancel(3)"
              >本月</span
            >
            <span
              v-show="!isShow4"
              class="select_item"
              @click="insertDateSearch(4, insertDate)"
              >自定义</span
            >
            <span
              v-show="isShow4"
              class="select_item selected"
              @click="insertCancel(4)"
              >自定义</span
            >
            <el-date-picker
              v-model="insertDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              size="mini"
            >
            </el-date-picker>
          </span>
        </div>
        <div>
          <label class="select-line-tit">纳税性质：</label>
          <span class="select_line_con">
            <span class="select_item" @click="natureSearch(1)" v-show="!isShow5"
              >一般纳税人</span
            >
            <span
              class="select_item selected"
              @click="natureCancel(0)"
              v-show="isShow5"
              >一般纳税人</span
            >
            <span class="select_item" @click="natureSearch(2)" v-show="!isShow6"
              >小规模纳税人</span
            >
            <span
              class="select_item selected"
              @click="natureCancel(1)"
              v-show="isShow6"
              >小规模纳税人</span
            >
          </span>
        </div>
      </div>
      <div class="select-line">
        <div>
          <label class="select-line-tit">派工岗位：</label>
          <span class="select_line_con">
            <el-select
              size="mini"
              v-model="condition.dispatchStatus"
              @change="dispatchStatusSearch"
            >
              <el-option label="未派工" :value="1"></el-option>
              <el-option label="已派工" :value="2"></el-option>
            </el-select>
            <el-select
              v-model="condition.dispatchPost"
              @change="dispatchStatusSearch"
              size="mini"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option
                v-for="item in postList"
                :key="item.id"
                :label="item.postName"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
        </div>
        <div>
          <label class="select-line-tit">状态：</label>
          <span class="select_line_con">
            <span class="select_item" @click="statusSearch(0)" v-show="!isShow7"
              >未建账</span
            >
            <span
              class="select_item selected"
              @click="statusCancel(0)"
              v-show="isShow7"
              >未建账</span
            >
            <span class="select_item" @click="statusSearch(1)" v-show="!isShow8"
              >已建账</span
            >
            <span
              class="select_item selected"
              @click="statusCancel(1)"
              v-show="isShow8"
              >已建账</span
            >
            <span class="select_item" @click="statusSearch(2)" v-show="!isShow9"
              >待建账</span
            >
            <span
              class="select_item selected"
              @click="statusCancel(2)"
              v-show="isShow9"
              >待建账</span
            >
          </span>
        </div>
      </div>
      <div class="select-line">
        <div>
          <label class="select-line-tit">代账类型：</label>
          <span class="select_line_con">
            <span class="select_item" @click="typeSearch(0)" v-show="!isShow10"
              >记账+报税</span
            >
            <span
              class="select_item selected"
              @click="typeCancel(0)"
              v-show="isShow10"
              >记账+报税</span
            >
            <span class="select_item" @click="typeSearch(1)" v-show="!isShow11"
              >只记账</span
            >
            <span
              class="select_item selected"
              @click="typeCancel(1)"
              v-show="isShow11"
              >只记账</span
            >
            <span class="select_item" @click="typeSearch(2)" v-show="!isShow12"
              >只报税</span
            >
            <span
              class="select_item selected"
              @click="typeCancel(2)"
              v-show="isShow12"
              >只报税</span
            >
          </span>
        </div>
        <div>
          <label class="select-line-tit">跟进记录：</label>
          <span class="select_line_con">
            <el-select
              size="mini"
              v-model="condition.record"
              @change="recordSearch"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.dataValue"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-input size="mini" style="width: 200px">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="recordSearch"
              ></el-button
            ></el-input>
          </span>
        </div>
      </div>
      <div class="select-line">
        <div>
          <label class="select-line-tit">派工日期：</label>
          <span class="select_line_con">
            <span
              v-show="!isShow13"
              class="select_item"
              @click="pgDateSearch(1)"
              >今天</span
            >
            <span
              v-show="isShow13"
              class="select_item selected"
              @click="pgDateCancel(1)"
              >今天</span
            >
            <span
              v-show="!isShow14"
              class="select_item"
              @click="pgDateSearch(2)"
              >近七天</span
            >
            <span
              v-show="isShow14"
              class="select_item selected"
              @click="pgDateCancel(2)"
              >近七天</span
            >
            <span
              v-show="!isShow15"
              class="select_item"
              @click="pgDateSearch(3)"
              >本月</span
            >
            <span
              v-show="isShow15"
              class="select_item selected"
              @click="pgDateCancel(3)"
              >本月</span
            >
            <span
              v-show="!isShow16"
              class="select_item"
              @click="pgDateSearch(4, insertDate)"
              >自定义</span
            >
            <span
              v-show="isShow16"
              class="select_item selected"
              @click="pgDateCancel(4)"
              >自定义</span
            >
            <el-date-picker
              v-model="dispatchDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              size="mini"
            >
            </el-date-picker>
          </span>
        </div>
      </div>
    </div>
    <el-row>
      <div class="more">
        <div>
          <div class="group-btn">
            <span
              class="left"
              :class="{ 'btn-selected': serveStatus === 0 }"
              @click="serviceSearch(0)"
              >正常服务</span
            ><span
              class="right"
              :class="{ 'btn-selected': serveStatus === 1 }"
              @click="serviceSearch(1)"
              >已停止服务</span
            >
          </div>
        </div>
        <div style="margin-left: 5px">
          <el-select v-model="myselfText" filterable size="mini">
            <el-option value="1" label="暂无"></el-option>
          </el-select>
          <el-button
            size="mini"
            style="margin: 0 5px 0 -5px"
            @click="myselfSearch"
            >我的</el-button
          >
        </div>
        <div style="flex: 1">
          <el-input
            size="mini"
            v-model="condition.fuzzy"
            style="width: 300px"
            placeholder="客户名称/编号/联系人/联系电话/业务员"
          >
            <el-button
              size="mini"
              type="primary"
              slot="append"
              icon="el-icon-search"
              @click="fuzzySearch"
            ></el-button
          ></el-input>
        </div>
        <div class="more-a">
          <el-button
            type="primary"
            @click="showDispatch"
            size="mini"
            v-if="serveStatus === 0"
          >
            派工
          </el-button>
          <el-dropdown v-if="serveStatus === 0">
            <el-button type="primary" size="mini">
              批量联系客户<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>发送短信</el-dropdown-item>
              <el-dropdown-item>发送微信</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            type="primary"
            size="mini"
            @click="startService"
            v-if="serveStatus === 1"
            >删除账套</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="stopService"
            v-if="serveStatus === 0"
            >停止服务</el-button
          >

          <el-button
            type="primary"
            size="mini"
            @click="startService"
            v-if="serveStatus === 1"
            >恢复服务</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="startService"
            v-if="serveStatus === 1"
            >导出</el-button
          >
          <el-dropdown @command="moreHandle" v-if="serveStatus === 0">
            <el-button type="primary" size="mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="新增客户">新增客户</el-dropdown-item>
              <el-dropdown-item command="查合同">查合同</el-dropdown-item>
              <download-excel
                :data="multipleSelection"
                :fields="json_fields"
                type="xls"
                :name="`代账服务#${new Date()}#`"
              >
                <el-dropdown-item command="导出">导出</el-dropdown-item>
              </download-excel>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        width="308px"
        align="center"
        :label="$t('servermobj.client')"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.clientName }}</p>
          <p>{{ scope.row.clientNo }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('servermobj.stopdate')"
        width="150px"
        v-if="condition.delete"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.stopService.split("T")[0] }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('servermobj.stopuser')"
        width="150px"
        prop="stopId"
        v-if="condition.delete"
      ></el-table-column>
      <el-table-column
        :style="{ width: condition.delete ? '100px' : '180px' }"
        :label="$t('servermobj.ticket')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.manager }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :style="{ width: condition.delete ? '100px' : '160px' }"
        :label="$t('servermobj.scanning')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taxNature }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :style="{ width: condition.delete ? '100px' : '140px' }"
        align="center"
        :label="$t('servermobj.accounting')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.accounting }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :style="{ width: condition.delete ? '100px' : '140px' }"
        align="center"
        :label="$t('servermobj.dutiablegoods')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contactsPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="145px"
        align="center"
        :label="$t('servermobj.lackticket')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.addressId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160px"
        align="center"
        :label="$t('servermobj.dispinfo')"
      >
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="click">
            <p v-for="(item, index) in scope.row.sendInfo" :key="index">
              {{ item.positionName }}:{{ item.staff }}
            </p>
            <el-button slot="reference" circle>···</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        width="160px"
        align="center"
        :label="$t('servermobj.followrecords')"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleFollow(scope.row)"
            v-if="scope.row.followRecords"
            >{{ scope.row.followRecords.split(" ")[0] }}</el-button
          >
          <el-button type="text" @click="handleFollow(scope.row)" v-else
            >跟进</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handlebooks(scope.row)"
            v-if="scope.row.isCreate == 1"
            >{{ $t("servermobj.intobooks") }}</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="createbooks(scope.row)"
            v-else
            >{{ $t("servermobj.createbooks") }}</el-button
          >

          <el-button type="text" size="mini" @click="handleDelete(scope.row)"
            >{{ $t("clientobj.sefield") }}
          </el-button>
          <el-button type="text" size="mini" @click="handleDelete(scope.row)"
            >{{ $t("clientobj.addremark") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <addService
      :addVisable="addVisable"
      :title="title"
      @toggleViable="toggleViable"
    ></addService>
    <createSet
      :createVisable="createVisable"
      :customer="customer"
      @toggleCreateViable="toggleCreateViable"
    ></createSet>
    <Dispatch
      :dispatchVisable="dispatchVisable"
      @toggleViable="toggleViable"
      :dispatchData="dispatchData"
    />
    <FollowUp
      @toggleViable="toggleViable"
      :followupVisable="followupVisable"
      :followData="followData"
      :followLists="followList"
    />
  </div>
</template>

<script>
import waves from "@/components/waves"; // 水波纹指令
import { getlistPartData } from "@/api/syspar";
import {
  getlistServerData,
  getService,
  getFollowList,
  outService,
  recover,
} from "@/api/serverm";
import { getToday, getWeek, getMonth } from "@/utils/autoGetDate";
import { CheckintoChildSystem } from "@/api/acc/clientinfo";
import addService from "../components/addService.vue";
import createSet from "../components/createSet.vue";
import Dispatch from "../components/dispatch.vue";
import FollowUp from "../components/followUp.vue";
import { getPost } from "@/api/user";

export default {
  components: {
    addService,
    createSet,
    Dispatch,
    FollowUp,
  },
  name: "ServicesManagement",
  directives: {
    waves,
  },
  data() {
    return {
      json_fields: {
        客户名称: "clientName",
        客户标签: "clientNo",
        客户编号: "clientNo",
        停止服务人: "stopId",
        停止服务时间: "stopService",
        地址: "addressId",
        联系电话: "contactsPhone",
        派工信息: {
          field: "dispatchList",
          callback: (arr) => {
            let str = "";
            arr.forEach((item) => {
              str += item.role + "-" + item.staff + " ";
            });
            return str;
          },
        },
        法人代表: "a",
        法人身份证号: "a",
        统一信用代码: "a",
        成立日期: "a",
        服务开始期: "tableCreateTime",
        记账开始期: "accounting",
        看账账号: "a",
        纳税性质: "taxNature",
        纳税识别号: "a",
        "纳税区域(省)": "a",
        "纳税区域(市)": "a",
        所属税务局: "a",
        " 实名（网报）账号": "a",
        "实名（网报）密码": "a",
      },
      typeList: [],
      myselfText: "",
      serveStatus: 0,
      dispatchData: "",
      insertData: {
        label: "新增日期：",
        list: [
          {
            tit: "今天",
            typeLabel: "新增日期",
            isShow: true,
          },
          {
            tit: "近七天",
            typeLabel: "新增日期",
            isShow: true,
          },
          {
            tit: "本月",
            typeLabel: "新增日期",
            isShow: true,
          },
          {
            tit: "自定义",
            typeLabel: "新增日期",
            isShow: true,
            date: "",
          },
        ],
      },
      insertDateObj: {
        label: "",
        val: "",
      },
      natureObj: {
        label: "",
        val: "",
      },
      dispatchObj: {
        label: "",
        val: "",
      },
      statusObj: {
        label: "",
        val: "",
      },
      typeObj: {
        label: "",
        val: "",
      },
      recordeObj: {
        label: "",
        val: "",
      },
      pgDateObj: {
        label: "",
        val: "",
      },
      tagList: [],
      postList: [],
      followList: [],
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
      isShow8: false,
      isShow9: false,
      isShow10: false,
      isShow11: false,
      isShow12: false,
      isShow13: false,
      isShow14: false,
      isShow15: false,
      isShow16: false,
      condition: {
        clientCreateDate: null,
        clientToDate: null,
        customersSource: null,
        dispatchEnd: null,
        dispatchPost: null,
        dispatchStart: null,
        dispatchStatus: null,
        fuzzy: null,
        isTaxControlPlate: null,
        myself: null,
        record: null,
        serviceType: null,
        status: null,
        taxNature: null,
        delete: 0,
      },
      followData: "",
      dispatchVisable: false,
      followupVisable: false,
      insertDate: "",
      dispatchDate: "",
      yewu: "",
      input: "",
      tableKey: 0,
      list: null,
      listQuery: {
        pageSize: 10,
        pageNum: 1,
      },
      multipleSelection: [],
      total: 0,
      title: "新建客户",
      openstate: false,
      addVisable: false,
      createVisable: false,
      customer: "",
    };
  },

  created() {
    this.getTypeList();
    this.getListserver();
    getPost().then((res) => {
      this.postList = res.data.data.children[0].children;
    });
  },
  methods: {
    getTypeList() {
      getlistPartData(11).then((res) => {
        this.typeList = res.data.data;
      });
    },
    getListserver() {
      this.listLoading = true;
      getService(
        this.condition,
        this.condition.delete,
        this.listQuery.pageNum,
        this.listQuery.pageSize
      ).then((response) => {
        this.list = response.data.data.object;
        this.total = response.data.data.totalCount;
        this.listLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;

      this.getListserver();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getListserver();
    },
    async handlebooks(val) {
      CheckintoChildSystem(val.id)
        .then((res) => {
          // this.$router.push(`/dashboardacc/dashboardacc?cid=${val.clientId}`);
          const { href } = this.$router.resolve({
            path: "/dashboardacc/dashboardacc",
            query: {
              cid: val.clientId,
            },
          });
          // console.log(href);  //  =>#/dashboardacc/dashboardacc?cid=1402189309051392001
          window.open(href, "_blank");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    moreHandle(command) {
      if (command == "新增客户") {
        this.addVisable = true;
      }
    },
    createbooks(row) {
      this.createVisable = true;
      this.customer = row;
    },
    toggleViable(bool, update, list) {
      this.addVisable = bool;
      this.dispatchVisable = bool;
      this.followupVisable = bool;
      if (update) this.getListserver();
      if (list) this.multipleSelection = list;
    },
    toggleCreateViable(bool, update) {
      this.createVisable = bool;
      if (update) this.getListserver();
    },
    stopService() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请先选择客户",
          type: "warning",
        });
      } else {
        this.$confirm("是否确定停止服务？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const clientId = this.multipleSelection.map((item) => item.id);
            outService(clientId).then((res) => {
              if (res.data.retCode === 200) {
                this.getListserver();
                return this.$message.success("停止成功");
              }
            });
          })
          .catch(() => {});
      }
    },
    startService() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请先选择客户",
          type: "warning",
        });
      } else {
        this.$confirm("是否确定恢复服务？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const clientId = this.multipleSelection.map((item) => item.id);
            recover(clientId).then((res) => {
              if (res.data.retCode === 200) {
                this.getListserver();
                return this.$message.success("恢复成功");
              }
            });
          })
          .catch(() => {});
      }
    },
    showDispatch() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "最少选择一个用户才可以派工",
          type: "warning",
        });
      } else {
        this.dispatchVisable = true;
        this.dispatchData = this.multipleSelection;
      }
    },
    handleFollow(row) {
      this.followupVisable = true;
      this.followData = row;
      getFollowList(row.id, null).then((res) => {
        this.followList = res.data.data;
      });
    },
    serviceSearch(type) {
      this.serveStatus = type;
      this.condition.delete = type;
      this.getListserver();
    },
    insertDateSearch(type, date) {
      this.isShow1 = false;
      this.isShow2 = false;
      this.isShow3 = false;
      this.isShow4 = false;
      this.tagList.pop(this.insertDateObj);
      if (type === 1) {
        this.isShow1 = true;
        // this.insertDateObj.label = "新增日期：今天";
        // this.insertDateObj.val = getToday();
        this.condition.clientCreateDate = getToday();
        this.condition.clientToDate = getToday();
      }
      if (type === 2) {
        const week = getWeek();
        this.isShow2 = true;
        this.insertDateObj.label = "新增日期：近七天";
        this.insertDateObj.val = getWeek();
        this.condition.clientCreateDate = week[0];
        this.condition.clientToDate = week[1];
      }
      if (type === 3) {
        const month = getMonth();
        this.isShow3 = true;
        this.insertDateObj.label = "新增日期：本月";
        this.insertDateObj.val = getMonth();
        this.condition.clientCreateDate = month[0];
        this.condition.clientToDate = month[1];
      }
      if (type === 4) {
        this.isShow4 = true;
        this.insertDateObj.label = "新增日期：自定义";
        this.insertDateObj.val = this.insertDate;
        this.condition.clientCreateDate = this.insertDate && this.insertDate[0];
        this.condition.clientToDate = this.insertDate && this.insertDate[1];
      }
      this.tagList.push(this.insertDateObj);
      this.getListserver();
    },
    natureSearch(type) {
      this.isShow5 = false;
      this.isShow6 = false;
      this.condition.taxNature = type;
      this.natureObj.val = type;
      this.getListserver();
      if (type === 1) {
        this.isShow5 = true;
        this.natureObj.label = "纳税性质：一般纳税人";
      }
      if (type === 2) {
        this.isShow6 = true;
        this.natureObj.label = "纳税性质:小规模纳税人";
      }
      this.tagList.push(this.natureObj);
    },
    dispatchStatusSearch() {
      // this.getListserver();
    },
    statusSearch(type) {
      this.isShow7 = false;
      this.isShow8 = false;
      this.isShow9 = false;
      this.condition.status = type;
      this.statusObj.val = type;
      if (type === 0) {
        this.isShow7 = true;
        this.statusObj.label = "状态:未建账";
      }
      if (type === 1) {
        this.isShow8 = true;
        this.statusObj.label = "状态:已建账";
      }
      if (type === 2) {
        this.isShow9 = true;
        this.statusObj.label = "状态:待建账";
      }
      this.tagList.push(this.statusObj);
      this.getListserver();
    },
    typeSearch(type) {
      this.isShow10 = false;
      this.isShow11 = false;
      this.isShow12 = false;
      this.condition.serviceType = null;
      this.typeObj.val = type;
      if (type === 0) {
        this.isShow10 = true;
        this.typeObj.label = "代账类型:记账+报税";
      }
      if (type === 1) {
        this.isShow11 = true;
        this.typeObj.label = "代账类型:只记账";
      }
      if (type === 2) {
        this.isShow12 = true;
        this.typeObj.label = "代账类型:只报税";
      }

      this.tagList.push(this.typeObj);
      this.getListserver();
    },
    recordSearch() {},
    pgDateSearch(type) {
      this.isShow13 = false;
      this.isShow14 = false;
      this.isShow15 = false;
      this.isShow16 = false;
      if (type === 1) {
        this.isShow13 = true;
        this.pgDateObj.label = "派工日期：今天";
        this.pgDateObj.val = getToday();
        this.condition.dispatchStart = getToday();
        this.condition.dispatchEnd = getToday();
      }
      if (type === 2) {
        const week = getWeek();
        this.isShow14 = true;
        this.pgDateObj.label = "派工日期：7天";
        this.pgDateObj.val = getWeek();
        this.condition.dispatchStart = week[0];
        this.condition.dispatchEnd = week[1];
      }
      if (type === 3) {
        const month = getMonth();
        this.isShow15 = true;
        this.pgDateObj.label = "派工日期：本月";
        this.pgDateObj.val = getMonth();
        this.condition.dispatchStart = month[0];
        this.condition.dispatchEnd = month[1];
      }
      if (type === 4) {
        this.isShow16 = true;
        this.pgDateObj.label = "派工日期：自定义";
        this.pgDateObj.val = this.dispatchDate;
        this.condition.dispatchStart =
          this.dispatchDate && this.dispatchDate[0];
        this.condition.dispatchEnd = this.dispatchDate && this.dispatchDate[1];
      }
      console.log(this.isShow13);
      this.tagList.push(this.pgDateObj);
      this.getListserver();
    },
    fuzzySearch() {
      this.getListserver();
    },
    myselfSearch() {
      this.condition.myself = this.condition.myself ? null : 1;
      this.myselfText = this.$store.getters.name;
      this.getListserver();
    },
    insertCancel(type) {
      this.condition.clientCreateDate = null;
      this.condition.clientToDate = null;
      this.getListserver();
      type === 1
        ? (this.isShow1 = false)
        : type === 2
        ? (this.isShow2 = false)
        : type === 3
        ? (this.isShow3 = false)
        : type === 4
        ? (this.isShow4 = false)
        : null;
      this.tagList.pop(this.insertDateObj);
    },
    natureCancel(type) {
      this.condition.taxNature = null;
      if (type === 0) this.isShow5 = false;
      if (type === 1) this.isShow6 = false;
      this.getListserver();
    },
    statusCancel(type) {
      this.condition.status = null;
      if (type === 0) this.isShow7 = false;
      if (type === 1) this.isShow8 = false;
      if (type === 2) this.isShow9 = false;
      this.getListserver();
    },
    typeCancel(type) {
      this.condition.serviceType = null;
      if (type === 0) this.isShow10 = false;
      if (type === 1) this.isShow11 = false;
      if (type === 2) this.isShow12 = false;
      this.getListserver();
    },
    pgDateCancel(type) {
      this.condition.dispatchStart = null;
      this.condition.dispatchEnd = null;
      console.log(this.isShow13);
      if (type === 1) this.isShow13 = false;
      if (type === 2) this.isShow14 = false;
      if (type === 3) this.isShow15 = false;
      if (type === 4) this.isShow16 = false;
      this.getListserver();
    },
    // handleClose(tag) {
    //   this.tagList.splice(this.tagList.indexOf(tag), 1);
    // },
  },
};
</script>


<style lang='scss' scoped>
.group-btn {
  font-size: 13px;
  .left,
  .right {
    display: inline-block;
    width: 70px;
    height: 16px;
    line-height: 18px;
    padding: 5px 8px;
    border: 1px solid #92c3eb;
    cursor: pointer;
    text-align: center;
    box-sizing: content-box;
  }
  .left {
    float: left;
    border-radius: 5px 0 0 5px;
  }
  .right {
    border-radius: 0 5px 5px 0;
  }
}
.btn-selected {
  background: #66b1ff;
  color: #fff;
}
.more {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
}
.selected {
  background-color: #d6f2f5 !important;
}
/* .more-a{
  margin-left: 425px;
} */
</style>