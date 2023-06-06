<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1 class="">录凭证功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>录凭证功能介绍及如何使用</h2>
          <h2 id="first">一、介绍</h2>
          <p class="a3">
            <span>
              录凭证功能是手动根据原始单据直接在这里制作记账凭证。在凭证录入功能中，系统提供了一些功能以方便高效快捷地输入记账凭证。
            </span>
          </p>
          <h2 id="second">二、如何使用</h2>
          <h2 class="childTit" id="f">（一）凭证要素说明</h2>
          <p class="a3">
            进账簿后，点击【录凭证】按钮，进入录凭证界面，凭证上的八大要素请参考以下说明。
          </p>
          <img src="@/assets/images/entervoucher.png" alt="" />
          <h3>
            <span>1.凭证字号</span>
          </h3>
          <p class="a3">
            <span
              >凭证字默认为记，如需新增凭证字，可点击【设置】菜单【基础设置】下的【凭证字】操作新增；凭证号系统是按凭证日期已有的凭证号加一进行填充。
            </span>
          </p>
          <h3>
            <span>2.凭证日期</span>
          </h3>
          <p class="a3">
            <span
              >凭证日期默认为当前账期的最后一天，凭证日期可以填写为之后账期的日期但是不能填写为已结账期间的日期。
            </span>
          </p>
          <h3>
            <span>3.附单据</span>
          </h3>
          <p class="a3">
            <span
              >凭证上可以录入原始单据的张数，在录凭证界面的右上方填写附单据多少张即可，如果不想填写也可以不填写则默认0张。
            </span>
          </p>
          <h3>
            <span>4.摘要</span>
          </h3>
          <p class="a3">
            <span
              >根据凭证发生的业务内容在摘要中填写简要的说明，可以设置常用摘要库，鼠标移动到分录行上，鼠标点击摘要列下灰色的摘要按钮，在凭证摘要库弹窗中填写摘要内容后，点击【保存】按钮后关闭弹窗，鼠标点击到摘要填写框中，点击键盘上的“↓”键选择设置的常用摘要后按键盘上的回车键即可成功选择。
            </span>
          </p>
          <h3>
            <span>5.会计科目</span>
          </h3>
          <p class="a3">
            <span
              >鼠标点击到会计科目的填写框中，可以输入科目编码或者科目名称快速选择对应的科目；辅助核算需要先选择好对应的科目后，再在科目下输入对应的辅助核算编码或辅助核算名称快速找到对应的辅助核算名称。
            </span>
          </p>
          <h3>
            <span>6.金额</span>
          </h3>
          <p class="a3">
            <span
              >一条分录的金额最大可以填写到亿，一条分录超过十亿的金额，需要分为两条分录金额进行录入；负数金额录入时输入负号即可，负数会显示为红色金额。
            </span>
          </p>
          <h3>
            <span>7.分录行</span>
          </h3>
          <p class="a3">
            <span
              >系统默认一张凭证是四条分录，如需新增或插入分录行，鼠标移动到分录行，点击左边的“+”增加分录行，即可在这一行分录的上方新增一行分录，如需删除分录行，点击“X”删除分录行，即可删除选择的这一行分录。
            </span>
          </p>
          <h3>
            <span>8.制单人 </span>
          </h3>
          <p class="a3">
            <span
              >凭证上的制单人默认是按当前职员在账无忧系统上的职员名称来显示的，如果需要修改，可以修改职员名称后再操作录入凭证。
            </span>
          </p>
          <h2 class="childTit" id="s">（二）新增凭证</h2>
          <p class="a3">
            <span
              >进入账簿后点击【录凭证】，进入录凭证的新增凭证界面。选择凭证字号与凭证日期，在摘要栏中录入摘要，在会计科目栏中录入科目，填写好对应的金额后可在凭证右上角填入附单据的张数。录凭证页面的左上角与右下角分别都有【保存并新增】和【保存】按钮，都可以用来保存凭证的。点击【保存并新增】按钮，系统会保存当前录入的凭证并跳转到新的一张空白凭证界面用来新增下一张凭证；点击【保存】按钮，系统会直接保存当前页面的凭证。
            </span>
          </p>
          <img src="@/assets/images/add.png" alt="" />
          <h2 class="childTit" id="t">（三）快捷录入方法</h2>
          <p class="a3">
            <span
              >系统提供使用键盘快捷键来快速录入凭证的方法，快速保存凭证及录入凭证分录。鼠标移到录凭证界面附单据上方的键盘图标，即可看到对应的快捷键按钮对应的快速操作指令，根据对应的快捷键操作即可快捷录入。
            </span>
          </p>
          <img src="@/assets/images/keys.png" alt="" />
          <h2 class="childTit" id="fo">（四）保存为凭证模板</h2>
          <p class="a3">
            <span
              >进账簿后点击【录凭证】按钮，进入录凭证界面，录入需要保存为凭证模板的凭证后，点击【更多】下的【保存为凭证模板】按钮，在新增模板的弹窗中选择模板类别，填写模板名称，选择是否需要在模板中保存当前凭证上的金额和当前凭证上科目选择的核算项目到当前模板中保存，需要则勾选不需要则不勾选，设置完成后，点击【保存】按钮即可。</span
            >
          </p>
          <img src="@/assets/images/savetemp.png" alt="" />
          <h2 class="childTit" id="fi">（五）从模板生成凭证</h2>
          <p class="a3">
            <span
              >进账簿后点击【录凭证】按钮，进入录凭证界面，点击【更多】下的【从模板生成凭证】按钮，在选择模板的弹窗中，双击需要的模板名称或者单击需要的模板名称后点击【确定】按钮，即可按选择的模板内容填入对应的凭证数据。</span
            >
          </p>
          <img src="@/assets/images/getvoucher.png" alt="" />
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
        { id: "#f", title: "（一）凭证要素说明" },
        { id: "#s", title: "（二）保存凭证" },
        { id: "#t", title: "（三）快捷录入方法" },
        { id: "#fo", title: "（四）保存为凭证模板" },
        { id: "#fi", title: "（五）从模板生成凭证" },
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
