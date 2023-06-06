<template>
  <div>
    <div class="header">
      <div>
        <label>卡片</label>
        <div class="ui-btn-menu">
          <span class="ui-btn pointer" @click="moreVisible = !moreVisible">
            <span class="selected-period">
              <strong>过滤</strong>
            </span>
            <b></b>
          </span>
          <div v-if="moreVisible" class="moreBox">
            <el-form
              ref="form"
              :model="query"
              label-width="80px"
              label-position="right"
            >
              <el-form-item label="会计期间">
                <el-row>
                  <el-col :span="10">
                    <el-select v-model="condition" @change="wuu">
                      <el-option label="编码" :value="1"></el-option>
                      <el-option label="名称" :value="2"></el-option>
                      <el-option label="类别" :value="3"></el-option>
                      <el-option label="部门" :value="4"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-input type="text" v-model="content"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <el-button
          icon="el-icon-refresh-right"
          @click="updateList"
          size="mini"
        ></el-button>

        <span v-if="reveal">[资产类别:'{{ ta }}']</span>
        <span v-if="reveall">[{{ why }}:{{ ta }}]</span>
      </div>
      <div>
        <el-button type="primary" @click="add" size="mini">新增</el-button>
        <el-button type="info" size="mini" @click="delList">删除</el-button>
        <el-button size="mini">导入</el-button>
        <download-excel
          style="display: inline"
          :data="arrList"
          :fields="json_fields"
          :name="'卡片' + '_' + new Date().getTime()"
        >
          <el-button size="mini">导出</el-button>
        </download-excel>
      </div>
    </div>
    <!-- 下拉列表 -->
    <div class="footer">
      <div class="footer-a">
        <el-table
          :key="tableKey"
          :data="arrList"
          border
          height="750"
          fit
          max-height="750"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column width="100px" align="center" label="操作">
            <template slot-scope="scope" v-if="scope.row.assetsNumber">
              <a
                class="el-icon-edit aa"
                href="/#/CardSetup/CardSetup/CardSetup"
                @click="compile(scope.row)"
              ></a>

              <i class="el-icon-close aa" @click="remove(scope.row.id)"></i>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="编码">
            <template slot-scope="scope">
              <span class="frist" @click="frist(scope.row)">{{
                scope.row.assetsNumber
              }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" align="center" label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.assetsName }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" align="center" label="类别">
            <template slot-scope="scope">
              <span>{{ scope.row.assetsType }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="部门">
            <template slot-scope="scope">
              <span>{{ scope.row.department }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="开始使用日期">
            <template slot-scope="scope">
              <span>{{ scope.row.usageDate }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="原值">
            <template slot-scope="scope">
              <span>{{ scope.row.originalValue }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="期初累计折旧">
            <template slot-scope="scope">
              <span>{{ scope.row.initialDepreciation }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="期末累计折旧">
            <template slot-scope="scope">
              <span>{{ scope.row.endDepreciation }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="月折旧">
            <template slot-scope="scope">
              <span>{{ scope.row.monthlyDepreciation }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200px" align="center" label="预计使用期限">
            <template slot-scope="scope">
              <span>{{ scope.row.estimatedServiceLife }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="已使用期">
            <template slot-scope="scope">
              <span>{{ scope.row.termUse }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="残值">
            <template slot-scope="scope">
              <span>{{ scope.row.estimatedResidualValue }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="残值率">
            <template slot-scope="scope">
              <span>{{ scope.row.residualValueRate }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="减值准备">
            <template slot-scope="scope">
              <span>{{ scope.row.provisionImpairment }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="期初净值">
            <template slot-scope="scope">
              <span>{{ scope.row.openingNetValue }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="折旧方法">
            <template slot-scope="scope">
              <span>{{
                scope.row.depreciationMethod == 1 ? "平均年限法" : "不提折旧"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="清理期间">
            <template slot-scope="scope">
              <span>{{ scope.row.clearDate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <div class="item">
          <div class="item-a">资产类别</div>
          <el-tree
            :data="list"
            :props="defaultProps"
            @node-click="typeHandleNodeClick"
            node-key="id"
          ></el-tree>
        </div>
        <div>
          <div class="item-a">部门</div>
          <el-tree
            :data="arr"
            :props="arrdate"
            @node-click="departHandleNodeClick"
            node-key="id"
          ></el-tree>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div>
      <el-dialog
        title="新增卡片"
        :visible.sync="dialogFormVisible"
        width="60%"
        top="30px"
      >
        <el-form ref="temp" :model="temp">
          <div class="from">
            <el-form-item
              label="资产编码:"
              prop="assetsNumber"
              label-width="80px"
            >
              <el-input class="int" v-model="temp.assetsNumber"> </el-input>
            </el-form-item>
            <el-form-item
              label="资产名称:"
              prop="assetsName"
              label-width="185px"
            >
              <el-input class="int" v-model="temp.assetsName"> </el-input>
            </el-form-item>
          </div>
          <div class="from">
            <el-form-item label="资产类别:" prop="value2" label-width="80px">
              <el-select v-model="temp.assetsType2" @change="zi" value-key="id">
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="录入时间:" label-width="120px">
              <el-input
                class="int"
                v-model="
                  $store.getters.childrenData.numberOfPeriods[0].disPeriod
                "
                disabled
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="from">
            <el-form-item label="使用部门:" prop="value1" label-width="80px">
              <el-select v-model="value1" @change="wu">
                <el-option
                  v-for="item in arr"
                  :key="item.id"
                  :label="item.value"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="开始使用日期:"
              prop="usageDate"
              label-width="120px"
            >
              <el-date-picker
                v-model="temp.usageDate"
                type="date"
                class="int"
                placeholder="选择日期"
              >
              </el-date-picker>
              <!-- <span>数量</span> -->
            </el-form-item>
            <el-form-item
              label="清理期间:"
              prop="subjectCode"
              label-width="80px"
            >
              <el-input class="int" v-model="temp.subjectCode" disabled>
              </el-input>
            </el-form-item>
          </div>
          <span>折旧方式</span>
          <div class="xian"></div>
          <div class="from">
            <el-form-item
              label="折旧方式:"
              prop="depreciationMethod"
              label-width="100px"
            >
              <el-select v-model="temp.depreciationMethod" @change="zhe">
                <el-option label="平均年限法" :value="1"></el-option>
                <el-option label="不提折旧" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="预计使用期限:"
              prop="estimatedServiceLife"
              label-width="120px"
            >
              <el-input class="int" v-model="temp.estimatedServiceLife">
              </el-input
              ><span>期</span>
            </el-form-item>
          </div>
          <div class="from">
            <el-form-item
              label="固定资产科目"
              label-width="100px"
              prop="fixedAssetsSubject2"
            >
              <el-input
                v-model="temp.fixedAssetsSubject2"
                autocomplete="off"
                class="int"
              >
              </el-input>
              <i class="el-icon-folder-add aa" @click="select1"></i>
            </el-form-item>
            <el-form-item
              label="累计折旧科目:"
              label-width="170px"
              prop="accumulatedDepreciationSubject2"
            >
              <el-input
                v-model="temp.accumulatedDepreciationSubject2"
                autocomplete="off"
                class="int"
              >
              </el-input>
              <i class="el-icon-folder-add aa" @click="select2"></i>
            </el-form-item>
            <el-form-item
              label="折旧费用科目"
              label-width="140px"
              prop="depreciationExpenseSubject2"
            >
              <el-input
                v-model="temp.depreciationExpenseSubject2"
                autocomplete="off"
                class="int"
              >
              </el-input>
              <i class="el-icon-folder-add aa" @click="select3"></i>
              <span class="pointer" @click="defaultHandle">设为默认</span>
            </el-form-item>
          </div>
          <span>原值、净值、累计折旧</span>
          <div class="xian"></div>
          <div class="from">
            <el-form-item
              label="原值:"
              prop="originalValue"
              label-width="110px"
            >
              <el-input class="int" v-model="temp.originalValue" @change="yuan">
              </el-input>
            </el-form-item>
          </div>
          <div class="from">
            <el-form-item
              label="残值率:"
              prop="residualValueRate"
              label-width="110px"
            >
              <el-input
                class="int"
                v-model.number="temp.residualValueRate"
                @change="lv"
              >
              </el-input
              >%
            </el-form-item>
            <el-form-item
              label="预计残值:"
              prop="estimatedResidualValue"
              label-width="100px"
            >
              <el-input
                class="int"
                disabled
                v-model.number="temp.estimatedResidualValue"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="from">
            <el-form-item
              label="减值准备:"
              prop="provisionImpairment"
              label-width="110px"
            >
              <el-input
                class="int"
                v-model.number="temp.provisionImpairment"
                @change="jian"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="已折旧期间:"
              prop="depreciatedPeriod"
              label-width="120px"
            >
              <el-input
                class="int"
                @change="zhejiu"
                v-model.number="temp.depreciatedPeriod"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="from">
            <el-form-item
              label="期初累计折旧:"
              prop="initialDepreciation"
              label-width="110px"
            >
              <el-input
                class="int"
                v-model.number="temp.initialDepreciation"
                @change="qi"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="期初净值:"
              prop="openingNetValue"
              label-width="120px"
            >
              <el-input
                class="int"
                disabled
                v-model.number="temp.openingNetValue"
              >
              </el-input>
            </el-form-item>
          </div>
          <el-form-item
            label="月折旧:"
            prop="monthlyDepreciation"
            label-width="110px"
          >
            <el-input class="int" v-model.number="temp.monthlyDepreciation">
            </el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm2(temp)">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <div v-if="aa">
      <BillVoucherTemplatea :msgData="msg" @getData="fn"></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import {
  GetList,
  GetListPageByType,
  cardList,
  cancel,
  classify,
  increase,
  getById,
  addSubjectId,
  defaultAssetSubjectList,
  modification,
  batchDelete,
} from "@/api/acc/FixedAssets/Card";
import BillVoucherTemplatea from "../Setup/BillVoucherTemplatea";
export default {
  name: "Card",
  components: { BillVoucherTemplatea },
  data() {
    return {
      selectedTableList: [],
      moreVisible: false,
      json_fields: {
        编码: "assetsNumber",
        名称: "assetsName",
        类别: "assetsType",
        部门: "department",
        开始使用日期: "usageDate",
        原值: "originalValue",
        备注: "33",
        状态: "state",
        折旧方法: {
          field: "depreciationMethod",
          callback: (val) => {
            let str = "";
            val === "1" ? (str = "平均年限法") : (str = "不提折旧");
            return val;
          },
        },
        预计使用期限: "estimatedServiceLife",
        预计残值率: "estimatedResidualValue",
        固定资产科目: "22",
        累计折旧科目: "22",
        折旧费用分摊科目: "22",
        资产原值: "originalValue",
        减值准备: "provisionImpairment",
        已折旧期间数: "22",
        期初累计折旧: "22",
        期末累计折旧: "22",
        期末净值: "22",
        月折旧: "monthlyDepreciation",
        期初净值: "openingNetValue",
        残值: "residualValueRate",
        清理期间: "clearDate",
      },
      reveal: false,
      reveall: false,
      why: null,
      msgData: null,
      aa: false,
      msg: null,
      defaultList: [
        { assetSubjectType: 1, subjectId: "" },
        { assetSubjectType: 2, subjectId: "" },
        { assetSubjectType: 3, subjectId: "" },
      ],
      temp: {
        subjectCode: null,
        accumulatedDepreciationSubject: null, //累计折旧科目id
        accumulatedDepreciationSubject2: null, //累计折旧科目
        assetsName: null, //资产名称
        assetsNumber: null, //资产编码
        assetsType: null, //资产类别id
        assetsType2: null, //资产类别id
        clearDate: null, //	string($date)清除日期
        clientId: null, //	integer($int64)客户公司id
        department: null, //	integer($int64)使用部门id
        department2: null, //
        depreciatedPeriod: 0, //	integer($int32)z已折旧期间
        depreciationExpenseSubject: null, //	integer($int64)折旧费用科目id
        depreciationExpenseSubject2: null, //string折旧费用科目
        depreciationMethod: null, //	integer($int32)折旧方式(1: 平均年限法,2: 不提折扣)
        estimatedResidualValue: 0, //	number预计残值
        estimatedServiceLife: null, //	integer($int32)预计使用期限
        fixedAssetsSubject: null, //	integer($int64)固定资产科目id
        fixedAssetsSubject2: null,
        id: null, //	integer($int64)
        importPeriod: null, //	string录入期间
        initialDepreciation: 0, //	number期初折旧
        monthlyDepreciation: 0, //	number月折旧
        openingNetValue: 0, //	number期初净值
        originalValue: 0, //	number原值
        provisionImpairment: 0, //	number减值准备
        quantity: null, //	integer($int32)数量
        remarks: null, //string备注
        residualValueRate: 0, //	number($double)残值率
        usageDate: null, //	string($date)开始使用日期
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      arrList: [],
      value: null,
      value1: null,
      value2: null,
      value3: 1,
      conditione: 1,
      arr: [],
      list: [],
      condition: "",
      content: "",
      ta: null,
      defaultProps: {
        label: "name", // 作为对应节点的名字显示
        children: "children", // 指定子树为节点对象的某个属性值
      },
      arrdate: {
        label: "value", // 作为对应节点的名字显示
        children: "children", // 指定子树为节点对象的某个属性值
      },
      tableKey: 1,
    };
  },
  computed: {},
  created() {
    this.GetListTypeData();
    this.GetListType();
    this.temp.importPeriod = this.$store.getters.childrenData.setNowPeriod;
  },
  activated() {
    this.getDefaultList();
    this.updateList();
  },
  deactivated() {
    this.$bus.$off("getCard");
  },
  methods: {
    GetListType() {
      cardList(this.condition, this.content).then((res) => {
        this.arrList = res.data.data;
      });
    },
    GetListTypeData() {
      GetListPageByType().then((res) => {
        this.arr = res.data.data.object;
      });
      GetList().then((res) => {
        this.list = res.data.data;
      });
    },
    //显示隐藏

    // 树形控件事件
    typeHandleNodeClick(e) {
      const name = e.name.split("_")[1];
      console.log(name);
      cardList(3, name).then((res) => {
        this.arrList = res.data.data;
      });
    },
    // 部门事件
    departHandleNodeClick(e) {
      cardList(4, e.value).then((res) => {
        this.arrList = res.data.data;
      });
    },
    // 获取前过滤条件
    wuu(condition) {
      this.conditione = condition;
    },
    wu(department) {
      console.log(department);
      this.temp.department = department.id;
      this.temp.department2 = department.value;
    },
    zhe(depreciationMethod) {
      this.temp.depreciationMethod = depreciationMethod;
    },
    zi(val) {
      console.log(val);
      const data = this.temp;
      data.assetsType = val.id;
      data.assetsType2 = val.name;
      data.estimatedServiceLife = val.estimatedServiceLife * 12;
      data.residualValueRate = val.residualValueRate;
      data.accumulatedDepreciationSubject = val.accumulatedDepreciationSubject;
      data.accumulatedDepreciationSubject2 =
        val.accumulatedDepreciationSubject2;
      data.fixedAssetsSubject = val.fixedAssetsSubject;
      data.fixedAssetsSubject2 = val.fixedAssetsSubject2;
    },
    // 查看
    frist(e) {
      console.log(e);
      // this.arrData = JSON.parse(JSON.stringify(e))
      this.arrData = e;
      console.log(this.arrData);
      if (this.arrData.depreciationMethod == 2) {
        this.value = 2;
      } else {
        this.value = 1;
      }
      this.dialogFormVisible1 = true;
    },
    // 搜索
    search() {
      this.ta = null;
      (this.reveal = false), (this.reveall = true);
      this.ta = this.input;
      if (this.conditione == 1) {
        this.why = "编码";
      }
      if (this.conditione == 2) {
        this.why = "名称";
      }
      if (this.conditione == 3) {
        this.why = "类别";
      }
      if (this.conditione == 4) {
        this.why = "部门";
      }
      if (this.conditione == 5) {
        this.why = "折旧方法";
      }
      cardList(this.conditione, this.input).then((res) => {
        console.log(res.data.data);
        this.arrList = res.data.data;
      });
    },
    // 删除
    remove(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cancel(e).then((res) => {
          this.updateList();
        });
      });
    },
    remove1(e) {
      cancel(e.id).then((res) => {
        this.GetListType();
      });
      this.dialogFormVisible1 = false;
    },
    async getDefaultList() {
      const { data } = await defaultAssetSubjectList();
      data.data.forEach((item) => {
        if (item.assetSubjectType === 1) {
          this.temp.fixedAssetsSubject2 = item.subject;
          this.temp.fixedAssetsSubject = item.subjectId;
        }
        if (item.assetSubjectType === 2) {
          this.temp.accumulatedDepreciationSubject2 = item.subject;
          this.temp.accumulatedDepreciationSubject = item.subjectId;
        }
        if (item.assetSubjectType === 3) {
          this.temp.depreciationExpenseSubject2 = item.subject;
          this.temp.depreciationExpenseSubject = item.subjectId;
        }
      });
    },
    // 新增按钮
    async add() {
      this.dialogFormVisible = true;
    },

    // 修改按钮
    async compile(row) {
      const { data } = await getById(row.id);
      setTimeout(() => {
        this.$bus.$emit("getCard", data.data);
      }, 500);
    },
    //固定资产科目
    select1() {
      this.msg = 1;
      this.aa = true;
    },
    //累计折旧科目
    select2() {
      this.msg = 0;
      this.aa = true;
    },
    //折旧费用科目
    select3() {
      this.msg = 2;
      this.aa = true;
    },
    // 父子组件传值
    fn(e, a, b) {
      this.aa = e;
      console.log(a);
      if (b == 1) {
        //固定资产科目
        if (a == undefined) {
          this.temp.fixedAssetsSubject2 = this.temp.fixedAssetsSubject2;
        } else {
          this.temp.fixedAssetsSubject2 = a.subjectName;
          this.temp.fixedAssetsSubject = a.id;
        }
      }
      if (b == 0) {
        // 累计折旧科目
        if (a == undefined) {
          this.temp.accumulatedDepreciationSubject2 =
            this.temp.accumulatedDepreciationSubject2;
        } else {
          this.temp.accumulatedDepreciationSubject2 = a.subjectName;
          this.temp.accumulatedDepreciationSubject = a.id;
        }
      }
      if (b == 2) {
        //折旧费用科目
        if (a == undefined) {
          this.temp.depreciationExpenseSubject2 =
            this.temp.depreciationExpenseSubject2;
        } else {
          this.temp.depreciationExpenseSubject2 = a.subjectName;
          this.temp.depreciationExpenseSubject = a.id;
        }
      }
    },
    // 计算
    yuan(e) {
      if (
        this.temp.originalValue - this.temp.provisionImpairment <
        this.temp.initialDepreciation
      ) {
        this.$message.error("期初累计折旧 不能大于 原值-减值准备");
      }
      // 预计残值
      this.temp.estimatedResidualValue =
        e * (this.temp.residualValueRate / 100);
      this.temp.estimatedResidualValue =
        this.temp.estimatedResidualValue.toFixed(2);
      // 期初净值
      this.temp.openingNetValue = (
        e -
        this.temp.provisionImpairment -
        this.temp.initialDepreciation
      ).toFixed(2);
      if (!this.temp.provisionImpairment) {
        this.temp.monthlyDepreciation = (
          (e - e * (this.temp.residualValueRate / 100)) /
          this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
      if (!this.temp.residualValueRate) {
        this.temp.monthlyDepreciation = (
          (e - this.temp.provisionImpairment) /
          this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
      if (this.temp.provisionImpairment && this.temp.residualValueRate) {
        this.temp.monthlyDepreciation = (
          (e -
            e * (this.temp.residualValueRate / 100) -
            this.temp.provisionImpairment) /
          this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
    },
    lv(e) {
      this.temp.estimatedResidualValue = (
        this.temp.originalValue *
        (e / 100)
      ).toFixed(2);
      if (!this.temp.provisionImpairment) {
        this.temp.monthlyDepreciation = (
          this.temp.originalValue -
          (this.temp.originalValue * (e / 100)) / this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }

      if (this.temp.provisionImpairment && e) {
        this.temp.monthlyDepreciation = (
          (this.temp.originalValue -
            this.temp.originalValue * (e / 100) -
            this.temp.provisionImpairment) /
          this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
    },
    jian(e) {
      if (
        this.temp.originalValue - this.temp.provisionImpairment <
        this.temp.initialDepreciation
      ) {
        this.$message.error("期初累计折旧 不能大于 原值-减值准备");
      }
      this.temp.openingNetValue = (
        this.temp.originalValue -
        e -
        this.temp.initialDepreciation
      ).toFixed(2);
      if (!this.temp.residualValueRate) {
        this.temp.monthlyDepreciation = (
          (this.temp.originalValue - e) /
          this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }

      if (this.temp.residualValueRate && e) {
        this.temp.monthlyDepreciation = (
          (this.temp.originalValue -
            this.temp.originalValue * (this.temp.residualValueRate / 100) -
            e) /
          this.temp.estimatedServiceLife
        ).toFixed(2);
        this.zhejiu();
      }
    },
    zhejiu() {
      this.temp.initialDepreciation =
        this.temp.monthlyDepreciation * this.temp.depreciatedPeriod;
      this.temp.openingNetValue =
        this.temp.originalValue -
        this.temp.initialDepreciation -
        this.temp.provisionImpairment;
    },
    qi(e) {
      if (this.temp.originalValue - this.temp.provisionImpairment < e) {
        this.$message.error("期初累计折旧 不能大于 原值-减值准备");
        this.temp.openingNetValue =
          this.temp.originalValue - this.temp.provisionImpairment - e;
      } else {
        this.temp.openingNetValue =
          this.temp.originalValue - this.temp.provisionImpairment - e;
      }
    },
    // 取消
    cancel() {
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
      // this.$nextTick(() => {
      //   this.$refs.temp.resetFields();
      // });
    },
    // 新增确定
    confirm2(e) {
      increase(e).then((res) => {
        if (res.data.retCode !== 200)
          return this.$message.error(res.data.message);
        this.dialogFormVisible = false;
        this.updateList();
        return this.$message.success("添加成功");
      });
    },
    defaultHandle() {
      const first = this.temp.fixedAssetsSubject;
      const second = this.temp.accumulatedDepreciationSubject;
      const third = this.temp.depreciationExpenseSubject;
      this.defaultList[0].subjectId = first && first;
      this.defaultList[1].subjectId = second && second;
      this.defaultList[2].subjectId = third && third;
      addSubjectId(this.defaultList).then((res) => {
        if (res.data.retCode === 200) return this.$message.success("设置成功");
      });
    },
    updateList() {
      this.GetListType();
    },
    handleSelectionChange(val) {
      this.selectedTableList = val.map((item) => item.id);
    },
    onSubmit() {
      this.moreVisible = false;
      this.GetListType();
    },
    delList() {
      if (!this.selectedTableList.length)
        return this.$message.warning("请选择你要删除的卡片！");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchDelete(this.selectedTableList).then((res) => {
            if (res.data.retCode === 200) {
              this.updateList();
              return this.$message.success("删除成功");
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.header {
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px;
}

.item {
  width: 270px;
  height: 300px;
  border: 1px solid #ccc;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  height: 100%;
}

.footer-a {
  overflow: auto;
  width: 84%;
}

.item-a {
  width: 100%;
  height: 30px;
  background: #ccc;
  color: rgba(43, 43, 43, 0.637);
  font-weight: 700;
  line-height: 30px;
  text-indent: 20px;
}

.aa {
  margin-left: 10px;
  cursor: pointer;
}

.aa:hover {
  color: rgb(167, 167, 167);
}

.int {
  width: 150px;
}

.from {
  display: flex;
}

.xian {
  width: 99%;
  height: 2px;
  background: #ccc;
  margin: 7px 0;
}

.dialog-footer {
  display: flex;
  justify-content: right;
}

.frist {
  cursor: pointer;
}

.frist:hover {
  color: #ccc;
}
</style>