<template>
  <div class="errPage-container">
    <el-row class="title">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple-dark">
          <h1 class="">新手指引导入客户功能介绍及如何使用</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="area" :span="12" :offset="4">
        <div class="grid-content bg-purple">
          <h2>新手指引导入客户功能介绍及如何使用</h2>
          <h2 id="first">一、介绍</h2>
          <p class="a3">
            <span>
              需要先导入客户或新增合同才可以使用其他各项功能。无论是给自己的公司记账还是给多家公司服务，都是需要将公司名称或合同资料先在客户管理中维护好。合同信息只能单个新增，所以建议操作导入客户，会更方便更便捷的对大量客户数据进行导入，可以节约更多时间
            </span>
          </p>
          <h2 id="second">二、如何使用</h2>
          <p class="a3">
            导入客户分为两种方式，一种是单个新增客户，另一种是批量新增导入客户。第一种方式适用于只需要新增一两个客户的情况；第二种方式适用于之前服务多家客户或新增了多个客户，客户信息都需要批量导入账无忧系统中的情况。
            <br />/注：单个新增客户，系统会根据客户的服务类型来同步新增对应的客户合同，合同的具体内容还需要手动填写补充；批量新增导入客户则可以在表格中维护好合同信息一起导入，如表格中未维护合同信息系统同样会根据客户的服务类型来同步新增对应的客户合同，合同的具体内容需要手动填写补充。
          </p>
          <h2 class="childTit" id="f">（一）设置岗位</h2>
          <p class="a3">
            登录账无忧，点击【系统设置】→【岗位】，进入岗位界面，可以看到系统上有预设不同的岗位名称，可查看不同的岗位名称对应的所属服务和岗位职能描述以及这个岗位的成员列表，支持新增岗位，删除岗位和授权不同岗位权限。
          </p>
          <h3>
            <span>1.新增岗位</span>
          </h3>
          <p class="a3">
            在岗位界面，点击右上方的【新增】按钮，在新增岗位的弹窗中填写好岗位名称，所属服务按岗位的实际情况来勾选（如果不属于系统上可勾选的这两个服务，不勾选即可），岗位职能描述根据岗位的实际职能来简单描述即可，在岗位成员处点击【+选择岗位成员】按钮，可以选择属于这个岗位的人员（如果还未新增职员，在后续新增职员的界面选择职员的所属岗位即可），填写完成点击【确定】按钮，提示“新增岗位成功”即可。
          </p>
          <h3>
            <span>2.删除岗位</span>
          </h3>
          <p class="a3">
            在岗位界面，勾选错误设置的岗位名称，点击右上方的【删除】按钮，提示“删除岗位成功”即可。
          </p>
          <h3>
            <span>3.授权岗位权限</span>
          </h3>
          <p class="a3">
            岗位权限是设置对应岗位的操作权限，不同的岗位可设置不同的操作权限。通过岗位权限设置可提高权限设置效率，方便统一对某一岗位的权限进行批量设置。<br />在岗位权限界面的左边可以选择不同的岗位设置岗位权限，选择好要设置的岗位，再勾选需要给这个岗位的权限，显示蓝色的勾选则表示给这个岗位的职员赋予操作这个按钮的权限，不勾选则这个岗位的职员没有操作这个按钮的权限，设置完成后，点击【保存】按钮，查看弹窗内容检查设置的权限无误后，点击【确定】按钮提示“保存成功”即可。
          </p>
          <h2 class="childTit" id="s">（二）设置部门职员</h2>
          <p class="a3">
            <span
              >登录账无忧，点击【系统设置】→【部门职员】，进入部门职员界面，在部门职员界面左边显示的是公司部门的组织架构，可以新增删除修改禁用部门信息，在界面中心显示的是职员信息，可以新增删除修改职员信息以及其他操作。
            </span>
          </p>
          <h3>
            <span>1.新增部门</span>
          </h3>
          <p class="a3">
            在部门职员界面点击左下角的【新增部门】按钮，在新增部门的弹窗中选择要新增部门的上级部门，然后填写好新增的部门名称，点击【确定】按钮。
          </p>
          <h3>
            <span>2.修改部门</span>
          </h3>
          <p class="a3">
            在部门职员界面，在左边组织架构部门中找到需要修改的部门，鼠标移到部门名称上点击名称后显示的“笔”的图标，在编辑部门的弹窗中，修改好部门名称后，点击【确定】按钮即可。
          </p>
          <h2 class="childTit" id="t">（三）设置其他权限</h2>
          <p class="a3">
            普通职员在账无忧系统中只能看见派工给自己负责的客户，如果有特殊情况需要查看其它同事或其它部门的客户，可操作授权查看他人客户，后续不需要查看了也可以删除这个授权。点击【系统设置】→【权限】，进入权限界面，点击【授权查看他人客户】，在授权查看他人客户界面点击右上角的【新增】。
          </p>
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
        { id: "#f", title: "（一）设置岗位" },
        { id: "#s", title: "（二）设置部门职员" },
        { id: "#t", title: "（三）设置其他权限" },
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
