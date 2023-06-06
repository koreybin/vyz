<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <div class="select-list">
        <div class="select-line">
          <div>
            <label class="select-line-tit">新增日期：</label>
            <span class="select_line_con">
              <span class="select_item">今天</span>
              <span class="select_item">近七天</span>
              <span class="select_item">本月</span>
              <span class="select_item">自定义</span>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              >
              </el-date-picker>
            </span>
          </div>
          <div>
            <label class="select-line-tit">纳税性质：</label>
            <span class="select_line_con">
              <span class="select_item">一般纳税人</span>
              <span class="select_item">小规模纳税人</span>
            </span>
          </div>
        </div>
        <div class="select-line">
          <div>
            <label class="select-line-tit">派工岗位：</label>
            <span class="select_line_con">
              <el-select size="mini">
                <el-option label="未派工" :value="1"></el-option>
                <el-option label="已派工" :value="2"></el-option>
              </el-select>
              <span class="select_item">全部</span>
              <el-select size="mini">
                <el-option label="客户经理（代账）" :value="1"></el-option>
                <el-option label="记账员" :value="2"></el-option>
                <el-option label="报税员" :value="3"></el-option>
                <el-option label="开票员" :value="4"></el-option>
              </el-select>
            </span>
          </div>
          <div>
            <label class="select-line-tit">状态：</label>
            <span class="select_line_con">
              <span class="select_item">未建账</span>
              <span class="select_item">已建账</span>
              <span class="select_item">待建账</span>
            </span>
          </div>
        </div>
        <div class="select-line">
          <div>
            <label class="select-line-tit">代账类型：</label>
            <span class="select_line_con">
              <span class="select_item">记账+报税</span>
              <span class="select_item">只记账</span>
              <span class="select_item">只报税</span>
            </span>
          </div>
          <div>
            <label class="select-line-tit">跟进记录：</label>
            <span class="select_line_con">
              <el-select size="mini">
                <el-option label="续费跟进" :value="1"></el-option>
                <el-option label="档案移交清册" :value="2"></el-option>
              </el-select>
              <el-input size="mini" style="width: 200px">
                <el-button slot="append" icon="el-icon-search"></el-button
              ></el-input>
            </span>
          </div>
        </div>
        <div class="select-line">
          <div>
            <label class="select-line-tit">派工日期：</label>
            <span class="select_line_con">
              <span class="select_item">今天</span>
              <span class="select_item">近七天</span>
              <span class="select_item">本月</span>
              <span class="select_item">自定义</span>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              >
              </el-date-picker>
            </span>
          </div>
        </div>
      </div> -->
      <el-row>
        <div class="big-a">
          <div class="big-aa pig">
            <div class="aa-a kai">
              <div class="aa-a-a">签约日期</div>
              <div class="shai">今天</div>
              <div class="shai">近七天</div>
              <div class="shai">本月</div>
              <div class="shai">本年</div>
              <div class="shai">自定义：</div>
            </div>
          </div>
          <div class="big-aa">
            <div class="aa-b kai">
              <div class="yewu">业务员：</div>
              <el-input
                v-model="yewu"
                style="width: 300px"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>
      </el-row>

      <el-row :span="20">
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 300px"
          class="filter-item"
          :placeholder="$t('userobj.searchflag')"
        >
        </el-input>

        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          @click="handleFilter"
        >
          {{ $t("table.search") }}
        </el-button>

        <div class="filter-item-right">
          <el-button size="mini" type="primary" @click="aplayloss()"
            >{{ $t("clientobj.aplayloss") }}
          </el-button>

          <el-button
            style="margin-left: 10px"
            size="mini"
            @click="handleCreate"
            type="primary"
            icon="el-icon-edit"
            >{{ $t("table.add") }}
          </el-button>
        </div>
      </el-row>
      <el-row>
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
          height="550"
        >
          <!-- <el-table-column width="30px" :label="$t('clientobj.id')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>

      </el-table-column> -->

          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column
            width="300px"
            align="center"
            :label="$t('clientobj.clientName')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.clientName }}</span>
              <span>{{ scope.row.clientNo }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150px" :label="$t('clientobj.manager')">
            <template slot-scope="scope">
              <span>{{ scope.row.manager }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" :label="$t('clientobj.taxNature')">
            <template slot-scope="scope">
              <span>{{ scope.row.taxNature }}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="140px"
            align="center"
            :label="$t('clientobj.isTaxControlPlate')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.isTaxControlPlate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="160px"
            align="center"
            :label="$t('clientobj.contactsPhone')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.contactsPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="324px"
            align="center"
            :label="$t('clientobj.addressId')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.addressId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200px"
            align="center"
            :label="$t('clientobj.remark')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            :label="$t('table.actions')"
            width="250"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate(scope.row)">{{
                $t("clientobj.secontract")
              }}</el-button>
              <el-button size="mini" @click="handleDelete(scope.row)"
                >{{ $t("clientobj.sefield") }}
              </el-button>
              <el-button size="mini" @click="handleDelete(scope.row)"
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
      </el-row>

      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="客户信息">
            <el-form
              ref="dataForm"
              :rules="rules"
              :model="temp"
              label-width="310px"
              height="550px"
            >
              <el-row style="line-height: 30px; padding-top: 15px">
                <el-col :span="3"> 客户名称</el-col>
                <el-col :span="9">
                  <el-input
                    v-model="temp.clientName"
                    class="classinputx"
                  ></el-input>
                </el-col>

                <el-col :span="3">服务类型</el-col>
                <el-col :span="9">
                  <el-select v-model="temp.serviceType" placeholder="请选择">
                    <el-option
                      v-for="item in optionsfwlx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <div
                    style="height: 450px; overflow: scroll; margin-top: 10px"
                  >
                    <div class="con1" id="con1">
                      <el-row>
                        <el-col :span="3"> 客户编号</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.clientNo"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="3">成立日期</el-col>
                        <el-col :span="9">
                          <el-date-picker
                            class="classmarg"
                            v-model="temp.establishData"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">统一信用代码</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.onlyCreditCode"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="3">所属行业</el-col>
                        <el-col :span="9">
                          <el-select
                            v-model="temp.industryId"
                            class="classmarg"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in optionssshy"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">法人代表</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.legalRepresentative"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="3">法人身份证号</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.corporateIdCard"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">客户来源</el-col>
                        <el-col :span="9"
                          ><el-select
                            v-model="temp.customersSource"
                            class="classmarg"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in optionskhly"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option> </el-select
                        ></el-col>
                        <el-col :span="3">服务开始期</el-col>
                        <el-col :span="9">
                          <el-date-picker
                            class="classmarg"
                            v-model="temp.serviceStartData"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="3">记账开始期</el-col>
                        <el-col :span="9"
                          ><el-date-picker
                            class="classmarg"
                            v-model="temp.accountStartData"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker
                        ></el-col>
                        <el-col :span="3">开始收款时间</el-col>
                        <el-col :span="9"
                          ><el-date-picker
                            class="classmarg"
                            v-model="temp.collectionDays"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">备注</el-col>
                        <el-col :span="21">
                          <el-input
                            class="classinputx"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="temp.remark"
                          >
                          </el-input>
                        </el-col>
                      </el-row>
                    </div>

                    <div class="con2" id="con2">
                      <el-row>
                        <el-col :span="3">联系人</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.contacts.contactsName"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="6"
                          ><el-input
                            v-model="temp.contacts.contactsPhone"
                            placeholder="手机"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="6"
                          ><el-input
                            v-model="temp.contacts.contactPosition"
                            placeholder="职位"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">办公电话</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.officePhone"
                            placeholder="办公电话"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="6"
                          ><el-input
                            v-model="temp.email"
                            placeholder="邮箱"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                        <el-col :span="6"
                          ><el-input
                            v-model="temp.qq"
                            placeholder="QQ"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">省市区</el-col>
                        <el-col :span="9">
                          <el-cascader
                            class="classmarg"
                            expand-trigger="hover"
                            :options="optionsshengshiqu"
                            v-model="temp.addressId"
                            @change="handleChange"
                          >
                          </el-cascader>
                        </el-col>
                        <el-col :span="3">详细地址</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.detailedAddress"
                            placeholder="详细地址"
                            class="classinputx"
                          ></el-input
                        ></el-col>
                      </el-row>
                    </div>

                    <div class="con3" id="con3">
                      <el-row>
                        <el-col :span="3">纳税性质</el-col>
                        <el-col :span="9">
                          <el-select
                            v-model="temp.taxNature"
                            class="classmarg"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in optionsnsxz"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="3">纳税识别号</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.taxIdentificationCode"
                            class="classinputx"
                            placeholder="纳税识别号"
                          ></el-input
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">纳税区域</el-col>
                        <el-col :span="9">
                          <el-cascader
                            class="classmarg"
                            expand-trigger="hover"
                            :options="optionsnsqu"
                            v-model="temp.taxAreaId"
                            @change="handleChange"
                          >
                          </el-cascader>
                        </el-col>
                        <el-col :span="3">所属税务局</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.inlandRevenue"
                            class="classinputx"
                            placeholder="所属税务局"
                          ></el-input
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">实名(网报)账号</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.account"
                            class="classinputx"
                            placeholder="实名(网报)账号"
                          ></el-input>
                        </el-col>
                        <el-col :span="3">实名(网报)密码</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.password"
                            class="classinputx"
                            placeholder="实名(网报)密码"
                          ></el-input
                        ></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">税号登录手机</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.taxPhone"
                            class="classinputx"
                            placeholder="税号登录手机"
                          ></el-input>
                        </el-col>
                        <el-col :span="3">税号登录密码</el-col>
                        <el-col :span="9"
                          ><el-input
                            v-model="temp.taxPassword"
                            class="classinputx"
                            placeholder="税号登录密码"
                          ></el-input
                        ></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="3">个税申报密码</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.taxDeclarationPwd"
                            class="classinputx"
                            placeholder="个税申报密码"
                          ></el-input>
                        </el-col>
                        <el-col :span="3">是否有税控盘</el-col>
                        <el-col :span="9">
                          <el-select
                            v-model="temp.isTaxControlPlate"
                            class="classmarg"
                            placeholder="请选择"
                          >
                            <el-option label="有" value="1"> </el-option>
                            <el-option label="无" value="0"> </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="3">个税实名账号</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.personalTaxAccount"
                            class="classinputx"
                            placeholder="个税实名账号"
                          ></el-input>
                        </el-col>
                        <el-col :span="3">个税实名密码</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.personalTaxPwd"
                            class="classinputx"
                            placeholder="个税实名密码"
                          ></el-input>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">社保账号</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.socialSecurityAccount"
                            class="classinputx"
                            placeholder="社保账号"
                          ></el-input>
                        </el-col>
                        <el-col :span="3">社保密码</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.socialSecurityPwd"
                            class="classinputx"
                            placeholder="社保密码"
                          ></el-input>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">公积金账号</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.accumulationFundAccount"
                            class="classinputx"
                            placeholder="公积金账号"
                          ></el-input>
                        </el-col>
                        <el-col :span="3">公积金密码</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.accumulationFundPwd"
                            class="classinputx"
                            placeholder="公积金密码"
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="3">备注</el-col>
                        <el-col :span="21">
                          <el-input
                            class="classinputx"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="temp.taxRemark"
                          >
                          </el-input>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">核定税种</el-col>
                        <el-col :span="21"> </el-col>
                      </el-row>
                    </div>

                    <div class="con4" id="con4">
                      <el-row>
                        <el-col :span="3">合同信息</el-col>
                        <el-col :span="21"> </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">服务项目</el-col>
                        <el-col :span="9">
                          <el-select
                            v-model="temp.serviceItem"
                            class="classmarg"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in optionsfwxm"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="3"> 合同编号 </el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.contractNo"
                            class="classinputx"
                            placeholder="合同编号"
                          ></el-input>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">签约日期</el-col>
                        <el-col :span="9">
                          <el-date-picker
                            class="classmarg"
                            v-model="temp.signUpDate"
                            type="date"
                            placeholder="签约日期"
                          >
                          </el-date-picker>
                        </el-col>
                        <el-col :span="3"> 业务员 </el-col>
                        <el-col :span="9"> </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">服务成本</el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.costAccounting"
                            class="classinputx"
                            placeholder="服务成本"
                          ></el-input>
                        </el-col>
                        <el-col :span="3"> 其他成本 </el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.otherCost"
                            class="classinputx"
                            placeholder="其他成本"
                          ></el-input>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">收款方式</el-col>
                        <el-col :span="9">
                          <el-select
                            v-model="valueskfs"
                            class="classmarg"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in optionsskfs"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="3"> 合同金额 </el-col>
                        <el-col :span="9">
                          <el-input
                            v-model="temp.totalMoney"
                            class="classinputx"
                            placeholder="合同金额"
                          ></el-input>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="3">备注</el-col>
                        <el-col :span="21">
                          <el-input
                            type="textarea"
                            class="classinputx"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="temp.contractRemark"
                          >
                          </el-input>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>

                <el-col :span="4">
                  <div style="height: 450px" class="step">
                    <el-steps direction="vertical" :active="activ">
                      <el-step
                        title="基本资料 1"
                        @click.native="miaodin(1)"
                      ></el-step>
                      <el-step
                        title="联系方式 2"
                        @click.native="miaodin(2)"
                      ></el-step>
                      <el-step
                        title="税务资料 3"
                        @click.native="miaodin(3)"
                        description=""
                      ></el-step>
                      <el-step
                        title="合同信息 4"
                        @click.native="miaodin(4)"
                        description=""
                      ></el-step>
                    </el-steps>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{
            $t("table.cancel")
          }}</el-button>
          <el-button
            v-if="dialogStatus == 'create'"
            type="primary"
            @click="createData"
            >{{ $t("table.confirm") }}
          </el-button>
          <el-button v-else type="primary" @click="updateData">{{
            $t("table.confirm")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from "@/components/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import hightsisearch from "./hightsisearch.vue";
import { getlistClientData, addclient } from "@/api/client";
import { getArea } from "@/api/rcdistract";

import { getlistPartData } from "@/api/syspar";

export default {
  components: { hightsisearch },
  name: "custom",
  directives: {
    waves,
  },
  data() {
    return {
      yewu: "",
      value1: "",
      pageNum: 1,
      pageSize: 10,
      listQuery: {
        // orgId:this.orgid,
        clientCreateDate: "2021-01-01",
      },

      listLoading: true,
      tableKey: 0,
      list: null,
      total: null,
      multipleSelection: [],
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogFormVisible: false,
      dialogStatus: "",

      optionsfwlx: null,
      optionssshy: null,
      optionskhly: null,
      optionsfwxm: null,
      optionsnsxz: [
        { value: "1", label: "一般纳税人" },
        { value: "2", label: "小规模" },
      ],
      optionsskfs: null,

      valueskfs: "",

      activ: 1,
      optionsshengshiqu: null,
      optionsnsqu: null,

      temp: {
        account: "",
        accountStartData: "",
        accumulationFundAccount: "",
        accumulationFundPwd: "",
        addressId: [],
        clientName: "",
        clientNo: "",
        collectionDays: "",
        contacts: [
          {
            account: "",
            clientId: 0,
            contactPosition: "",
            contactsName: "",
            contactsPhone: 0,
            createBy: 0,
            createTime: null,
            id: 0,
            isDeleted: 0,
            updateBy: 0,
            updateTime: null,
          },
        ],
        contractNo: "",
        contractRemark: "",
        corporateIdCard: "",
        costAccounting: 0,
        customersSource: "",
        detailedAddress: "",
        discountedPrice: 0,
        email: "",
        endDate: "",
        establishData: "",
        id: null,
        industryId: null,
        inlandRevenue: "",
        isTaxControlPlate: null,
        ledgerPay: null,
        legalRepresentative: "",
        monthPay: null,
        officePhone: null,
        onlyCreditCode: "",
        otherCost: null,
        password: "",
        personalTaxAccount: "",
        personalTaxPwd: "",
        qq: "",
        realMonthPrice: null,
        remark: "",
        sendMonth: "",
        serviceItem: null,
        serviceStartData: "",
        serviceType: "",
        signUpDate: "",
        socialSecurityAccount: "",
        socialSecurityPwd: "",
        startDate: "",
        taxAreaId: [],
        taxDeclarationPwd: "",
        taxIdentificationCode: "",
        taxNature: null,
        taxPassword: "",
        taxPhone: null,
        taxRemark: "",
        taxesList: [
          {
            clientId: 0,
            createBy: 0,
            createTime: null,
            id: 0,
            isDeleted: 0,
            taxCategoriesId: 0,
            taxDeadline: 0,
            updateBy: 0,
            updateTime: null,
          },
        ],
        totalMoney: null,
        userId: 0,
      },
      rules: {
        clientName: [
          { required: true, message: "客户名称不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.getListclient();
  },
  methods: {
    handleUpdate(scope) {
      this.$router.push({ name: "Contract" }); //params: { text: scope.row }
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getListclient();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getListclient();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getListclient();
    },
    getListclient() {
      //   this.listLoading = true;
      //   getlistClientData(this.listQuery, this.pageNum, this.pageSize).then(
      //     (response) => {
      //       this.list = response.data.data.object;
      //       this.total = response.data.data.totalCount;
      this.listLoading = false;
      //     }
      //   );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    aplayloss() {
      console.log(this.multipleSelection);
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;

      this.showparm(1);
      this.showparm(4);
      this.showparm(5);
      this.showparm(10);
      this.showparm(12);
      this.getshengshiqu();

      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          console.log(this.temp);

          addclient(this.temp).then(() => {
            // this.getList()
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    updateData() {},

    showparm(pid) {
      getlistPartData(pid).then((response) => {
        var newdata = [];
        for (var i = 0; i < response.data.data.length; i++) {
          var value = response.data.data[i].id;
          var label = response.data.data[i].dataValue;

          var newitemdata = { value, label };
          newdata.push(newitemdata);
        }

        if (pid == 1) {
          this.optionsfwlx = newdata;
        } else if (pid == 4) {
          this.optionssshy = newdata;
        } else if (pid == 5) {
          this.optionskhly = newdata;
        } else if (pid == 10) {
          this.optionsfwxm = newdata;
        } else if (pid == 12) {
          this.optionsskfs = newdata;
        }

        this.listLoading = false;
      });
    },
    getshengshiqu() {
      getArea().then((response) => {
        const data1 = response.data.data[0].children;

        var newdata = [];

        for (var i = 0; i < data1.length; i++) {
          var value = data1[i].id;
          var label = data1[i].district;
          var children1 = data1[i].children;

          var children = [];

          for (var j = 0; j < children1.length; j++) {
            var value2 = children1[j].id;
            var label2 = children1[j].district;
            var children2 = children1[j].children;
            var childrena2 = [];

            for (var k = 0; k < children2.length; k++) {
              var value3 = children2[k].id;
              var label3 = children2[k].district;
              var newchide2 = { value3, label3 };
              childrena2.push(newchide2);
            }

            var chailre = { value2, label2, childrena2 };
            children.push(chailre);
          }

          var newitemdata = { value, label, children };
          newdata.push(newitemdata);
        }

        let data3 = JSON.stringify(newdata)
          .replace(/label2/g, "label")
          .replace(/value2/g, "value")
          .replace(/label3/g, "label")
          .replace(/value3/g, "value");

        let data2 = JSON.stringify(newdata)
          .replace(/label2/g, "label")
          .replace(/value2/g, "value")
          .replace(/label3/g, "label")
          .replace(/value3/g, "value")
          .replace(/childrena2/g, "children");

        this.optionsshengshiqu = JSON.parse(data2);

        this.optionsnsqu = JSON.parse(data3);
      });
    },

    handleChange(value) {
      console.log(value);
    },

    miaodin(index) {
      this.activ = index;
      console.log("距离", this.activ);
      document.querySelector("#con" + index).scrollIntoView({
        behavior: "smooth", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: "start", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        inline: "start", // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
    },
  },
};
</script>
<style>
</style>