<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1 class="">在线会计基础设置功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>在线会计基础设置功能介绍及如何使用</h2>
          <h2 id="first">一、介绍</h2>
          <p class="a3">
            <span>
              一个账套由若干个子系统构成，这些子系统共享公用的基础信息。在使用在线会计的过程中，可根据本单位的实际情况和业务要求，设置企业基础信息资料。
            </span>
          </p>
          <h2 id="second">二、如何使用</h2>
          <h2 class="childTit" id="f">（一）凭证字</h2>
          <p class="a3">
            进账套后，点击【设置】→【凭证字】，可查看到系统有预设“记”字凭证，也可以点击右上角【新增】，设置需要的凭证字名称（如收、付、转等），打印标题，设置是否默认，设置好后点击【保存】即可，后期录入凭证即可选择新的凭证字。
          </p>
          <p class="a3">
            注：新增后如果不需要，在未使用的情况下可以在界面点击X的符号删除，点击笔的符号可支持修改。
          </p>
          <img src="@/assets/images/voucherword.png" alt="" />
          <h2 class="childTit" id="s">（二）科目</h2>
          <p class="a3">
            <span
              >进账簿后，打开【设置】→【科目】，如果是系统新建账套，会根据选择的会计制度自动预设一套科目，如果是导入的账套，则是根据原软件科目显示。如果已有科目不满足需求，也可以新增、修改或删除。
            </span>
          </p>
          <img src="@/assets/images/subject.png" alt="" />
          <h2 class="childTit" id="t">（三）币别</h2>
          <p class="a3">
            <span
              >进入账套后点击【设置】→【币别】，系统有预设人民币为本位币（暂不支持更改），点击右上角的【新增】，可根据需要录入新的币别编码、币别名称和汇率。在币别显示界面可以点击笔的符号修改币别信息，点击X的符号可删除未使用过的币别。
            </span>
          </p>
          <p class="a3">
            注：新增币别汇率可设置为当期期初汇率，后期无需在此手动更改，可通过期末调汇模块自动调汇。
          </p>
          <h2 class="childTit" id="fo">（四）辅助核算</h2>
          <p class="a3">
            <span
              >辅助核算是对账务处理的一种补充，辅助核算只要修改会计科目属性即可，辅助核算更加自由不用按照科目编码规则去增加。如某账套会计科目编码方案是4-2-2-2-2，此编码方案限制了账套的二级明细科目最多有99个，但“应收账款”科目要根据客户设置明细科目，随着客户的增多，明细科目可能超过100个，这样原有的科目编码方案就难以满足要求。假如调整会计科目编码方案，二级长度增至三位甚至更长，势必造成其他科目下的二级科目也要使用三位或更长的科目编码，这样总体效率会降低；如果使用“应收账款”科目设置辅助核算，就可以新增更多明细，而且可以多个科目同时挂同一个辅助核算，就无需两个科目都分别新增明细科目，同一明细只需新增一次，比如应收账款和预收账款可同时设置“客户'辅助核算。
            </span>
          </p>
          <h2 class="childTit" id="fi">（五）现金流量初始金额</h2>
          <p class="a3">
            <span
              >【现金流量表初始金额】表示【标准现金流量表】在账套启用期间的初始金额，可根据录入的财务初始余额数据自动生成也可以在启用期间手动录入。</span
            >
          </p>
          <h2 class="childTit" id="si">（六）科目现金流量项目</h2>
          <p class="a3">
            <span
              >科目现金流量项目是当前账套中每个科目对于标准现金流量表对应的取数项目设置。</span
            >
          </p>
          <h2 class="childTit" id="se">（七）凭证模板</h2>
          <p class="a3">
            <span
              >可在录凭证界面新增凭证模板，便于录入凭证的时候直接选择需要的凭证模板，能较快的完成录入凭证。系统预设有一些凭证模板，如果需要新增，可点击【录凭证】在录凭证界面手动录入需要的摘要内容、分录科目、金额后点击【更多】→【从模板生成凭证】在新增模板界面选择模板类别，录入模板名称，可根据需要勾选上保存金额，如果科目有挂辅助核算可以勾选上保存核算项目后点击【保存】，然后就可以在【设置】→【凭证模板】界面查看新增的模板。</span
            >
          </p>
          <h2 class="childTit" id="ei">（八）票据凭证模板</h2>
          <p class="a3">
            <span
              >票据凭证模板是对于智能记账模块导入票据后按照一定规则生成凭证的模板。</span
            >
          </p>
          <h2 class="childTit" id="ni">（九）套打模板</h2>
          <p class="a3">
            <span
              >套打模板是对于打印凭证或账簿选择套打方式时可供选择的模板，如果系统里面预设的套打模板不符合需求，可将自定义设计好的套打模板导入系统，点击【设置】→【套打模板】再点击右上角【导入模板】，选择好类别，文件、名称和编码等后点击【确定】，然后在套打打印时即可选择到对应模板，自定义设置有误也可以选择对应模板后删除，预设模板不支持删除。</span
            >
          </p>
          <h2 class="childTit" id="te">（十）操作日志</h2>
          <p class="a3">
            <span
              >操作日志用于记录和查询在账套中操作的内容。可进入账套后点击【设置】→【操作日志】在界面可设置日志时间范围、用户、选择操作内容或者是手动输入内容，点击刷新按钮查询，如果需要把查询到的日志打印或者是导出，可以点击右上角的打印或是导出的按钮操作。</span
            >
          </p>
          <h2 class="childTit" id="el">（十一）凭证回收站</h2>
          <p class="a3">
            <span
              >如果误删凭证后，想要恢复或者是想查询之前删除的凭证，可进入账套后点击【设置】→【凭证回收站】可以进入凭证回收站显示的界面，设置好筛选条件找到被删除的凭证，然后点击右边的【恢复】或勾选多张凭证右上角【批量恢复】。如果需要彻底删除，可直接在凭证右边点击【删除】或勾选多张凭证后右上角点击【批量删除】，删除后不可恢复，请谨慎操作！</span
            >
          </p>
          <img src="@/assets/images/recycle.png" alt="" />
        </div>
      </el-col>
      <el-col :span="4" class="area fixed">
        <div class="mao-list">
          <span
            v-for="item in mao"
            :key="item.id"
            class="item"
            @click="maodian(item.id)"
            >{{ item.title }}</span
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mao: [
        { id: "#first", title: "一、介绍" },
        { id: "#second", title: "二、如何使用" },
        { id: "#f", title: "（一）凭证字" },
        { id: "#s", title: "（二）科目" },
        { id: "#t", title: "（三）币别" },
        { id: "#fo", title: "（四）辅助核算" },
        { id: "#fi", title: "（五）现金流量初始金额" },
        { id: "#si", title: "（六）科目现金流量项目" },
        { id: "#se", title: "（七）凭证模板" },
        { id: "#ei", title: "（八）票据凭证模板" },
        { id: "#ni", title: "（九）套打模板" },
        { id: "#te", title: "（十）操作日志" },
        { id: "#el", title: "（十一）凭证回收站" },
      ],
    };
  },
  methods: {
    maodian(type) {
      document.querySelector(type).scrollIntoView({
        behavior: "auto", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
        block: "start", // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
        inline: "start", // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.fixed {
  position: fixed;
  right: 280px;
}
.errPage-container {
  background-color: #f8f8f8;
}
h1 {
  display: inline-block;
  vertical-align: middle;
  line-height: 70px;
  cursor: pointer;
  font-size: 20px;
  width: 890px;
  overflow: hidden;
}
h2 {
  margin-top: 24px;
  font-size: 22px;
  color: #303030;
  line-height: 34px;
}
h3 {
  font-size: 18px;
  line-height: 42px;
  margin: 0;
}
.title {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 #ced7de;
  z-index: 999;
}
.area {
  padding: 20px;
  margin-top: 80px;
  margin-right: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(32, 26, 26, 0.1);
}
.a3 {
  text-align: justify;
  margin: 5px 0;
  font-size: 15px;
}
img {
  width: 100%;
}
.mao-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .item {
    margin: 5px 0;
    cursor: pointer;
  }
}
</style>
