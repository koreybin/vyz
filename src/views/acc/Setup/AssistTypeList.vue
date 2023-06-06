<template>
  <div>

    <el-row span="24">
      <div class="filter-item-right">
        <!-- 添加按钮 -->
        <el-button style="margin-left: 10px;" size="mini" @click="handleCreate" type="primary" icon="el-icon-edit">
          {{ $t('table.add') }} </el-button>
      </div>
    </el-row>

    <el-row span="24">

      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
        highlight-current-row @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>


        <el-table-column align="center" :label="$t('assistditobj.code')">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>

          </template>
        </el-table-column>
        <el-table-column :label="$t('assistditobj.value')">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="pid == '12'" :label="$t('assistditobj.specification')">
          <template slot-scope="scope">
            <span>{{ scope.row.specification }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="pid == '12'" align="center" :label="$t('assistditobj.unit')">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" :label="$t('table.actions')" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button size="mini" @click="handleUpdatez(scope.row)">{{ $t('setobjbut.butuptdate') }}</el-button>
            <!-- 删除按钮 -->
            <el-button size="mini" @click="handleDeletez(scope.row)">{{ $t('setobjbut.butdelete') }} </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="listQuery.page" :page-sizes="[5, 10, 20, 30, 50]" :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>


    <el-dialog append-to-body :title="textMap[dialogStatus3]" :visible.sync="dialogFormVisible3">
      <el-tabs type="border-card">
        <el-tab-pane label="辅助核算">
          <el-form ref="dataForm2" :rules="rules" :model="temp" label-width="310px">
            <el-row>
              <el-col :span="spans.code">
                <el-form-item :label="$t('assistditobj.code')" prop="code">
                  <el-input @blur="judgeNum($event.target.value)" v-model="temp.code"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="spans.value">
                <el-form-item :label="$t('assistditobj.value')" prop="value">
                  <el-input v-model="temp.value"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="pid == '12'">
              <el-col :span="spans.specification">
                <el-form-item :label="$t('assistditobj.specification')" prop="specification">
                  <el-input v-model="temp.specification"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="pid == '12'">
              <el-col :span="spans.unit">
                <el-form-item :label="$t('assistditobj.unit')" prop="unit">
                  <el-input v-model="temp.unit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">{{ $t('table.cancel') }}</el-button>
        <!-- 添加按钮 -->
        <el-button v-if="dialogStatus3 == 'create'" type="primary" @click="createDataz">{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="updateDataass">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
import { GetListPageByType, addsisst, updatesisst, remove } from '@/api/acc/assisttypelist'

export default
  {

    props: ["pid"],
    watch: {
      pid(val, oldVal) {

        this.getListbypost()
      }
    },

    data() {
      return {
        valid: {
          isnumber: false
        },
        list: null,
        // pid:0,
        listLoading: true,
        listQuery:
        {
          pageNum: 1,
          pageSize: 10,
        },
        tableKey: 0,
        total: 0,
        textMap:
        {
          update: '编辑',
          create: '创建'
        },
        dialogFormVisible3: false,
        dialogStatus3: '',
        rules: { code: [{ required: true, message: '编码不能为空', trigger: 'blur' }] },

        temp:
        {
          id: '',
          assistType: 0,
          code: '',
          value: '',
          specification: '',
          unit: '',
        },
        spans:
        {
          code: 10,
          value: 10,
          specification: 10,
          unit: 10,
        },
      }



    },
    created() {
      this.getListbypost()
    },

    methods:
    {
      judgeNum(val) {
        let flag = new RegExp('^[A-z0-9\\u4e00-\\u9fa5]*$').test(val)
        if (!flag) {
          this.$message({
            type: 'warning',
            message: '格式错误,正确格式为数字,不包含空格等',
            duration: 5000,
          })
        } else {
          this.valid.isnumber = true

        }

      },
      getListbypost() {


        this.listLoading = true
        console.log('alala', this.pid);
        console.log('alala', this.listQuery);
        console.log('alala', this.pageNum);
        GetListPageByType(this.pid, this.listQuery.pageNum, this.listQuery.pageSize).then(response => {
          console.log('id', response.data.data)
          this.list = response.data.data.object
          this.total = response.data.data.totalCount
          this.listLoading = false

        })


      },
      //  删除按钮
      handleDeletez(row) {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(row.assistType, row.id).then((res) => {
            if (res.data.message == "成功") {
              this.getListbypost();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
            } else {
              this.$message.error('删除失败,' + res.data.message);
            }
          })
        })

      },
      resetTemp() {
        this.temp.id = 0
        this.temp.assistType = this.pid
        this.temp.code = ''
        this.temp.value = ''
        this.temp.specification = null
        this.temp.unit = null
      },
      //add
      // 添加按钮
      handleCreate() {
        this.dialogFormVisible3 = true
        this.resetTemp()
        this.dialogStatus3 = 'create'


        this.$nextTick(() => {
          this.$refs['dataForm2'].clearValidate()
        })

      },
      //  修改按钮
      handleUpdatez(row) {
        console.log("lala", row);
        this.temp = Object.assign({}, row) // copy obj

        this.dialogStatus3 = 'update'
        this.dialogFormVisible3 = true
        this.$nextTick(() => {
          this.$refs['dataForm2'].clearValidate()
        })

      },


      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
      },


      // 修改确定按钮
      updateDataass() {
        this.dialogFormVisible3 = false
        console.log('ss')
        this.$refs['dataForm2'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)

            updatesisst(tempData).then(() => {

              this.getListbypost()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      // 添加确定
      createDataz() {

        this.$refs['dataForm2'].validate((valid) => {
          if (valid && this.valid.isnumber) {
            const tempData = Object.assign({}, this.temp)
            console.log('123', this.temp)

            addsisst(tempData).then((res) => {
              if (res.data.message == "成功") {

                this.dialogFormVisible3 = false
                this.getListbypost()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加c成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error('添加失败,' + res.data.message);
              }
            })
          } else {
            this.$message.error('填写格式错误，编码只能是数字');

          }
        })

      }

    }

  }
</script>