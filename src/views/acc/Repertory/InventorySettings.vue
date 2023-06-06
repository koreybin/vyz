<template>
  <div class="app">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      class="tab"
    >
      <el-tab-pane class="tabb" label="用户管理" name="first">
        <div>
          <div class="header">
            用途：设置库存启用期间。系统根据设置的库存单据对应科目提取对应凭证自动生成库存单据。
          </div>
          <div>
            <el-form ref="form" :model="form" label-width="200px">
              <el-form-item label="设置库存启用期:">
                <el-input
                  v-model="temp.inventoryStartDate"
                  disabled
                  class="int"
                ></el-input>
                <span class="bb">设置库存从哪期开始使用</span>
              </el-form-item>
              <el-form-item label="原材料出入库单对应科目:">
                <div class="dis">
                  <div class="diss">
                    <div v-for="(v, index) in list1" :key="v.index" class="div">
                      <el-input v-model="v.subjectName" class="int"></el-input>
                      <i
                        class="el-icon-folder-add span"
                        @click="one(index)"
                      ></i>
                      <i @click="AddList1(index)" class="el-icon-plus span"></i>
                      <i
                        v-if="aa1"
                        @click="del1(index)"
                        class="el-icon-close span"
                      ></i>
                    </div>
                  </div>
                  <span class="bb">根据所设科目凭证自动生成原材料出入库单</span>
                </div>
              </el-form-item>
              <el-form-item label="产品出入库单对应科目:">
                <div class="dis">
                  <div class="diss">
                    <div v-for="(v, index) in list2" :key="v.index" class="div">
                      <el-input v-model="v.subjectName" class="int"></el-input>
                      <i
                        class="el-icon-folder-add span"
                        @click="two(index)"
                      ></i>
                      <i @click="AddList2(index)" class="el-icon-plus span"></i>
                      <i
                        v-if="aa2"
                        @click="del2(index)"
                        class="el-icon-close span"
                      ></i>
                    </div>
                  </div>
                  <span class="bb">根据所设科目凭证自动生成产品出入库单</span>
                </div>
              </el-form-item>
              <el-form-item label="周转材料出入库单对应科目:">
                <div class="dis">
                  <div class="diss">
                    <div v-for="(v, index) in list3" :key="v.index" class="div">
                      <el-input v-model="v.subjectName" class="int"></el-input>
                      <i
                        class="el-icon-folder-add span"
                        @click="three(index)"
                      ></i>
                      <i @click="AddList3(index)" class="el-icon-plus span"></i>
                      <i
                        v-if="aa3"
                        @click="del3(index)"
                        class="el-icon-close span"
                      ></i>
                    </div>
                  </div>
                  <span class="bb"
                    >根据所设科目凭证自动生成周转材料出入库单</span
                  >
                </div>
              </el-form-item>
              <el-form-item label="库存单据制单人:">
                <el-radio-group v-model="temp.inventoryCreator">
                  <el-radio :label="1">指定用户</el-radio><br />
                  <el-radio :label="2">当前登录用户</el-radio>
                </el-radio-group>
                <el-input v-model="temp.otherUser" class="intt"></el-input>
                <span class="bb"
                  >支持设置指定制单人为具体人员，未设置具体人员时取空</span
                >
              </el-form-item>
            </el-form>
            <div>
              提示：启用库存要求库存单据对应科目必须启用“存货”辅助核算，如库存科目是明细科目核算，请点击<a
                class="a"
                >明细科目转辅助核算</a
              >系统会先备份账套再进行科目数据转换！
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="save" class="btn" v-if="isOpen"
            >保存</el-button
          >
          <el-button type="primary" class="btnn" v-if="isOpen"
            >重新启用</el-button
          >
          <el-button type="primary" class="btnn" @click="save" v-if="!isOpen"
            >保存</el-button
          >
          <el-button type="primary" class="btn" @click="save" v-if="!isOpen"
            >启用库存</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="配置管理"
        name="second"
        v-if="isOpen"
        style="width: 1400px"
      >
        <div style="float: right">
          <el-button type="primary" class="btnn">重算初始数据</el-button>
          <el-button type="primary" class="btn">保存</el-button>
          <el-button type="primary" class="btn">导出</el-button>
          <el-button type="primary" class="btn" @click="leadingInVisible = true"
            >导入</el-button
          >
        </div>
        <div>
          <el-table :key="tableKey" :data="arrList">
            <el-table-column width="100" align="center" label="存货编码">
              <template slot-scope="scope">
                <span class="frist">{{ scope.row.inventoryCode }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100" align="center" label="存货名称">
              <template slot-scope="scope">
                <span class="frist">{{ scope.row.inventoryName }}</span>
              </template> </el-table-column
            ><el-table-column width="100" align="center" label="规格型号">
              <template slot-scope="scope">
                <span class="frist">{{ scope.row.specification }}</span>
              </template> </el-table-column
            ><el-table-column width="100" align="center" label="单位">
              <template slot-scope="scope">
                <span class="frist">{{ scope.row.unit }}</span>
              </template> </el-table-column
            ><el-table-column width="100" align="center" label="初始数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.initialQuantity"></el-input>
              </template>
            </el-table-column>
            <el-table-column width="100" align="center" label="初始金额">
              <template slot-scope="scope">
                <el-input v-model="scope.row.initialAccount"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
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
        </div>

        <el-dialog title="导入" width="30%" :visible.sync="leadingInVisible">
          <div>
            <label>选择导入的文件：</label>
            <el-upload
              class="upload-demo"
              ref="upload"
              :multiple="false"
              action="void"
              :http-request="customUpload"
              :before-upload="beforeUploadFile"
              :auto-upload="false"
            >
              <el-button slot="trigger" type="primary">选择文件</el-button>
            </el-upload>
            <p>说明：导入文件整体覆盖更新数据</p>
          </div>
          <div slot="footer" class="dialog-footer">
            <a style="float: left" @click="download">下载导入模板</a>
            <el-button @click="leadingInVisible = false">取 消</el-button>
            <el-button type="primary" @click="leadingIn">导 入</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>

    <div v-if="aa">
      <BillVoucherTemplatea :msgData="msg" @getData="fn"></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import {
  GetList,
  getPeriod,
  setting,
  downloadModel,
  getSettingState,
  importFile,
  initial,
} from "@/api/acc/Repertory/InventorySettings";
import BillVoucherTemplatea from "../Setup/BillVoucherTemplatea";
export default {
  name: "InventorySettings",
  components: { BillVoucherTemplatea },
  data() {
    return {
      leadingInVisible: false,
      temp: {
        createBy: "", //当前(创建)登录用户
        id: "",
        inventoryCreator: 1, //库存单据制单人(1:指定用户,2:当前登录用户)
        inventoryStartDate: "", //设置库存启用期间
        otherUser: "", //库存单据制单人指定用户
        productSubject: [],
        rawMaterialSubject: [],
        revolvingMaterialsSubject: [],
      },
      arrList: [],
      radio: "1",
      msgData: "",
      aa: false,
      msg: "",
      temp: [],
      add1: "",
      add2: "",
      add3: "",
      andAdd1: 0,
      andAdd2: 0,
      andAdd3: 0,
      aa1: false,
      aa2: false,
      aa3: false,
      form: {},
      list1: [],
      list2: [],
      list3: [],
      activeName: "first",
      tableKey: 1,
      isOpen: false,
      field: "",
      fileType: ["xls", "xlsx"],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  created() {
    this.get();
    getSettingState().then((res) => {
      if (res.data.retCode === 200) {
        this.isOpen = true;
        this.getInitList();
      } else this.isOpen = false;
    });
  },
  methods: {
    download() {
      downloadModel()
        .then((res) => {
          console.log(res);
          const fileName = "模板文件";
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", fileName + ".xlsx");
          document.body.appendChild(link);
          link.click();
          // 下载完成移除元素
          // document.body.removeChild(link)
          // 释放掉blob对象
          // window.URL.revokeObjectURL(url)
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    getInitList() {
      initial(this.listQuery.pageNum, this.listQuery.pageSize).then((res) => {
        this.arrList = res.data.data.object;
        this.total = res.data.data.totalCount;
      });
    },
    get() {
      GetList().then((res) => {
        this.temp = res.data.data;
        this.temp.inventoryStartDate =
          this.$store.getters.childrenData.setNowPeriod;
        if (this.temp.rawMaterialSubject) {
          this.temp.rawMaterialSubject.forEach((item) => {
            this.list1.push(item);
          });
        } else {
          this.list1 = [{}];
        }
        if (this.temp.revolvingMaterialsSubject) {
          this.temp.revolvingMaterialsSubject.forEach((item) => {
            this.list2.push(item);
          });
        } else {
          this.list2 = [{}];
        }
        if (this.temp.productSubject) {
          this.temp.productSubject.forEach((item) => {
            this.list3.push(item);
          });
        } else {
          this.list3 = [{}];
        }
      });
    },
    AddList1(index) {
      this.list1.splice(index + 1, 0, {});
      if (this.list1.length > 1) {
        this.aa1 = true;
      } else {
        this.aa1 = false;
      }
    },
    AddList2(index) {
      this.list2.splice(index + 1, 0, {});
      if (this.list2.length > 1) {
        this.aa2 = true;
      } else {
        this.aa2 = false;
      }
    },
    AddList3(index) {
      this.list3.splice(index + 1, 0, {});
      if (this.list3.length > 1) {
        this.aa3 = true;
      } else {
        this.aa3 = false;
      }
    },
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    // 删除
    del1(index) {
      this.andAdd1 = index;
      if (index == 0) {
        this.$message({
          showClose: true,
          message: "这个不能删除哦",
          type: "warning",
        });
      } else {
        this.list1.splice(index, 1);
      }

      if (this.list1.length == 1) {
        this.aa1 = false;
      }
    },
    del2(index) {
      this.andAdd2 = index;
      if (index == 0) {
        this.$message({
          showClose: true,
          message: "这个不能删除哦",
          type: "warning",
        });
      } else {
        this.list2.splice(index, 1);
      }
      if (this.list2.length == 1) {
        this.aa2 = false;
      }
    },
    del3(index) {
      this.andAdd3 = index;
      if (index == 0) {
        this.$message({
          showClose: true,
          message: "这个不能删除哦",
          type: "warning",
        });
      } else {
        this.list3.splice(index, 1);
      }

      if (this.list3.length == 1) {
        this.aa3 = false;
      }
    },
    // 组件传值
    one(index) {
      //   console.log(index);
      this.andAdd1 = index;
      this.msg = 1;
      this.aa = true;
    },
    two(index) {
      this.andAdd2 = index;
      this.msg = 2;
      this.aa = true;
    },
    three(index) {
      this.andAdd3 = index;
      this.msg = 3;
      this.aa = true;
    },
    fn(e, a, b) {
      this.aa = e;
      console.log(a);
      if (b == 1) {
        if (a) {
          this.list1[this.andAdd1].subjectId = a.id;
          this.list1[this.andAdd1].subjectName = a.otherSubjectName;
          //   this.temp.fixedAssetsSubject = a.id;
        }
      }
      if (b == 2) {
        if (a) {
          this.list2[this.andAdd2].subjectId = a.id;
          this.list2[this.andAdd2].subjectName = a.otherSubjectName;
          //   this.temp.fixedAssetsSubject = a.id;
        }
      }
      if (b == 3) {
        if (a) {
          this.list3[this.andAdd3].subjectId = a.id;
          this.list3[this.andAdd3].subjectName = a.otherSubjectName;
          //   this.temp.fixedAssetsSubject = a.id;
        }
      }
    },
    // 保存
    save() {
      const list1 = this.list1.map((item) => item.subjectId);
      const list2 = this.list2.map((item) => item.subjectId);
      const list3 = this.list3.map((item) => item.subjectId);
      this.temp.rawMaterialSubject = list1 ? list1 : [null];
      this.temp.revolvingMaterialsSubject = list2 ? list2 : [null];
      this.temp.productSubject = list3 ? list3 : [null];
      setting(this.temp).then((res) => {
        if (res.data.message == "成功") {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    beforeUploadFile(file) {
      const FileExt = file.name.replace(/.+\./, "").toLowerCase();
      if (this.fileType.includes(FileExt)) {
        return true;
      } else {
        this.$message.error("上传文件格式不正确!");
        return false;
      }
    },
    customUpload(file) {
      this.field = file.file;
    },
    leadingIn() {
      this.$refs.upload.submit();
      let fd = new FormData();
      fd.append("File", this.field);
      importFile(fd).then((response) => {
        console.log(response.data);
        // this.GetList();
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getInitList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getInitList();
    },
  },
};
</script>

<style scoped>
.app {
  display: flex;
}
.btn {
  width: 100px;
  height: 40px;
}
.btnn {
  width: 120px;
  height: 40px;
}
.tab {
  margin-left: 20px;
}
.header {
  margin-bottom: 20px;
}
.int {
  width: 300px;
}
.span {
  font-size: 20px;
  cursor: pointer;
}
.span:hover {
  color: #ccc;
}
.div {
  margin-bottom: 10px;
}
.dis {
  display: flex;
}
.diss {
  flex-direction: column;
}
span {
  margin-left: 30px;
}
.bb {
  color: rgb(143, 139, 139);
}
.intt {
  width: 150px;
}
.a {
  font-size: 20px;
  margin-right: 10px;
  margin-left: 10px;
  color: #3dbaff;
}
.a:hover {
  text-decoration: underline;
}
.tabb {
  display: flex;
}
.footer {
  margin-left: 300px;
}
</style>