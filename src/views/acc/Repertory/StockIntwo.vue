<template>
  <div class="app">
    <div>
      <el-button @click="btn">返回</el-button>
    </div>

    <div>
      <div>
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="库存单据制单人:">
            <el-radio-group v-model="temp.inventoryCreator">
              <el-radio :label="1">指定用户</el-radio><br />
              <el-radio :label="2">当前登录用户</el-radio>
            </el-radio-group>
            <el-input v-model="arr.otherUser" class="intt"></el-input>
          </el-form-item>
          <div class="header">
            提取对应期间库存单据对应科目有借方发生的凭证自动生成入库单
          </div>
          <el-form-item label="提取期间：:">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="temp.inventoryStartDate"
              type="date"
              placeholder="提取期间"
            >
            </el-date-picker>
            <span class="bb">提取对应期间凭证数据</span>
          </el-form-item>
          <el-form-item label="原材料出入库单对应科目:">
            <div class="dis">
              <div class="diss">
                <div v-for="(v, index) in list1" :key="v.index" class="div">
                  <el-input v-model="obj1[index]" class="int"></el-input>
                  <i class="el-icon-folder-add span" @click="one(index)"></i>
                  <i @click="AddList1" class="el-icon-plus span"></i>
                  <i
                    v-if="aa1"
                    @click="del1(index)"
                    class="el-icon-close span"
                  ></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="产品出入库单对应科目:">
            <div class="dis">
              <div class="diss">
                <div v-for="(v, index) in list2" :key="v.index" class="div">
                  <el-input v-model="obj2[index]" class="int"></el-input>
                  <i class="el-icon-folder-add span" @click="two(index)"></i>
                  <i @click="AddList2" class="el-icon-plus span"></i>
                  <i
                    v-if="aa2"
                    @click="del2(index)"
                    class="el-icon-close span"
                  ></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="周转材料出入库单对应科目:">
            <div class="dis">
              <div class="diss">
                <div v-for="(v, index) in list3" :key="v.index" class="div">
                  <el-input v-model="obj3[index]" class="int"></el-input>
                  <i class="el-icon-folder-add span" @click="three(index)"></i>
                  <i @click="AddList3" class="el-icon-plus span"></i>
                  <i
                    v-if="aa3"
                    @click="del3(index)"
                    class="el-icon-close span"
                  ></i>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div>
          <el-button type="primary" class="btnn">重新启用</el-button>
          <el-button type="primary" @click="save" class="btn">保存</el-button>
        </div> -->

    <div v-if="aa">
      <BillVoucherTemplatea :msgData="msg" @getData="fn"></BillVoucherTemplatea>
    </div>
  </div>
</template>

<script>
import { GetList, getPeriod } from "@/api/acc/Repertory/InventorySettings";
import BillVoucherTemplatea from "../Setup/BillVoucherTemplatea";
export default {
  components: { BillVoucherTemplatea },
  data() {
    return {
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

      radio: "1",
      msgData: "",
      aa: false,
      msg: "",
      arr: [],
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
      obj1: { a: {} },
      obj2: { a: {} },
      obj3: { a: {} },
      list1: [{}],
      list2: [{}],
      list3: [{}],
    };
  },
  created() {
    this.get();
   
  },
  methods: {
    get() {
      GetList().then((res) => {
        this.arr = res.data.data;
        // console.log(this.arr);
        this.temp.id = this.arr.id;

        for (var i = 0; i < this.arr.rawMaterialSubject.length; i++) {
          if (this.arr.rawMaterialSubject.length < 2) {
          } else {
            this.list1.push({});
          }
          this.obj1[i] = this.arr.rawMaterialSubject[i].subjectName;
          this.temp.rawMaterialSubject[i] =
            this.arr.rawMaterialSubject[i].subjectId;
        }
        if (this.arr.rawMaterialSubject.length > 1) {
          this.list1.pop();
        }

        for (var i = 0; i < this.arr.revolvingMaterialsSubject.length; i++) {
          if (this.arr.revolvingMaterialsSubject.length < 2) {
          } else {
            this.list2.push({});
          }
          this.obj2[i] = this.arr.revolvingMaterialsSubject[i].subjectName;
          this.temp.revolvingMaterialsSubject[i] =
            this.arr.revolvingMaterialsSubject[i].subjectId;
        }
        if (this.arr.revolvingMaterialsSubject.length > 1) {
          this.list2.pop();
        }
        for (var i = 0; i < this.arr.productSubject.length; i++) {
          if (this.arr.productSubject.length < 2) {
          } else {
            this.list3.push({});
          }
          this.obj3[i] = this.arr.productSubject[i].subjectName;
          this.temp.productSubject[i] = this.arr.productSubject[i].subjectId;
        }
        if (this.arr.productSubject.length > 1) {
          this.list3.pop();
        }

        this.obj3[this.andAdd1] =
          this.arr.rawMaterialSubject[this.andAdd1].subjectName;
        // console.log(this.arr.rawMaterialSubject[this.andAdd1].subjectName);
        this.temp.rawMaterialSubject[this.andAdd1] =
          this.arr.rawMaterialSubject[this.andAdd1].subjectId;
        this.obj2[this.andAdd2] =
          this.arr.revolvingMaterialsSubject[this.andAdd2].subjectName;
        this.temp.revolvingMaterialsSubject[this.andAdd2] =
          this.arr.revolvingMaterialsSubject[this.andAdd2].subjectId;
        this.obj3[this.andAdd3] =
          this.arr.productSubject[this.andAdd3].subjectName;
        this.temp.productSubject[this.andAdd3] =
          this.arr.productSubject[this.andAdd3].subjectId;
        if (this.list1.length > 1) {
          this.aa1 = true;
        } else {
          this.aa1 = false;
        }
        if (this.list2.length > 1) {
          this.aa2 = true;
        } else {
          this.aa2 = false;
        }
        if (this.list3.length > 1) {
          this.aa3 = true;
        } else {
          this.aa3 = false;
        }
      });
    },
    AddList1() {
      this.list1.push({});

      if (this.list1.length > 1) {
        this.aa1 = true;
      } else {
        this.aa1 = false;
      }
    },
    AddList2() {
      this.list2.push({});
      if (this.list2.length > 1) {
        this.aa2 = true;
      } else {
        this.aa2 = false;
      }
    },
    AddList3() {
      this.list3.push({});
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
      if (this.andAdd1 == 0) {
        this.$message({
          showClose: true,
          message: "这个不能删除哦",
          type: "warning",
        });
      } else {
        this.obj1[this.andAdd1] = "";
        this.temp.rawMaterialSubject[this.andAdd1] = "";
        this.temp.rawMaterialSubject.splice(index, 1);
        this.list1.splice(index, 1);
      }

      if (this.list1.length == 1) {
        this.aa1 = false;
      }
    },
    del2(index) {
      this.andAdd2 = index;
      if (this.andAdd2 == 0) {
        this.$message({
          showClose: true,
          message: "这个不能删除哦",
          type: "warning",
        });
      } else {
        this.obj2[this.andAdd2] = "";
        this.temp.revolvingMaterialsSubject[this.andAdd2] = "";
        this.temp.revolvingMaterialsSubject.splice(index, 1);
        this.list2.splice(index, 1);
      }
      if (this.list2.length == 1) {
        this.aa2 = false;
      }
    },
    del3(index) {
      this.andAdd3 = index;
      if (this.andAdd3 == 0) {
        this.$message({
          showClose: true,
          message: "这个不能删除哦",
          type: "warning",
        });
      } else {
        this.obj3[this.andAdd3] = "";
        this.temp.productSubject[this.andAdd3] = "";
        this.temp.productSubject.splice(index, 1);
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
      if (b == 1) {
        if (a == undefined) {
          this.obj1[this.andAdd1] = this.obj1[this.andAdd1];
        } else {
          this.obj1[this.andAdd1] = a.subjectName;
          this.temp.rawMaterialSubject[this.andAdd1] = a.id;
          //   this.temp.fixedAssetsSubject = a.id;
        }
      }
      if (b == 2) {
        if (a == undefined) {
          this.obj2[this.andAdd2] = this.obj2[this.andAdd2];
        } else {
          this.obj2[this.andAdd2] = a.subjectName;
          this.temp.revolvingMaterialsSubject[this.andAdd2] = a.id;
          //   this.temp.fixedAssetsSubject = a.id;
        }
      }
      if (b == 3) {
        if (a == undefined) {
          this.obj3[this.andAdd3] = this.obj3[this.andAdd3];
        } else {
          this.obj3[this.andAdd3] = a.subjectName;
          this.temp.productSubject[this.andAdd3] = a.id;
          //   this.temp.fixedAssetsSubject = a.id;
        }
      }
    },

    // 返回
    btn() {
      this.$emit("getData", false);
    },
  },
};
</script>

<style scoped>
.app {
  display: flex;
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
</style>