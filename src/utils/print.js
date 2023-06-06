// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'
// import axios from 'axios' //把pdf传给后台
// import qs from 'qs'//需要转换 用JOSN.stringify()不行
// export default {
//     install(Vue, options) {
//         Vue.prototype.getPdf = function (dom) {
//             html2Canvas(document.getElementById(dom), {
//                 allowTaint: true
//             }).then(function (canvas) {
//                 let contentWidth = canvas.width
//                 let contentHeight = canvas.height
//                 //一页pdf显示html页面生成的canvas高度;
//                 let pageHeight = contentWidth / 595.28 * 841.89
//                 //未生成pdf的html页面高度
//                 let leftHeight = contentHeight
//                 //页面偏移
//                 let position = 0
//                 //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//                 let imgWidth = 595.28
//                 let imgHeight = 592.28 / contentWidth * contentHeight
//                 let pageData = canvas.toDataURL('image/jpeg', 1.0)
//                 // 三个参数，第一个方向，第二个尺寸，第三个尺寸格式
//                 let PDF = new JsPDF('', 'pt', 'a4')
//                 //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//                 //当内容未超过pdf一页显示的范围，无需分页
//                 if (leftHeight < pageHeight) {
//                     PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//                 } else {
//                     while (leftHeight > 0) {
//                         PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//                         leftHeight -= pageHeight
//                         position -= 841.89
//                         //避免添加空白页
//                         if (leftHeight > 0) {
//                             PDF.addPage()
//                         }
//                     }
//                 }
//                 PDF.save('content.pdf')
//                 var index = parent.layer.getFrameIndex(window.name) //先得到当前iframe层的索引
//                 parent.layer.close(index) //再执行关闭
//                 parent.layer.msg('导出成功', {
//                     icon: 1
//                 })
//                 // var instance = axios.create({
//                 //     timeout: 10000,
//                 //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
//                 // })
//                 // instance.post('api/file/savepdf', qs.stringify({
//                 //     //output输出文件流，PDF.output('datauristring')输出base64文件流。
//                 //     file: PDF.output('datauristring')//base64的文件流
//                 // }))
//                 //     .then(function (response) {
//                 //         window.open('api/file/showpdf/' + response.data.data.uri)//在新的窗口打开
//                 //         // let dom=document.createElement('a');
//                 //         // dom.setAttribute('href',axios.defaults.baseURL+'/file/showpdf/'+response.data.data.uri);
//                 //         // dom.setAttribute('target','_blank');
//                 //         // dom.click();//模拟新的窗口打开
//                 //     })
//                 //     .catch(function (error) {
//                 //     })
//             })
//         }
//     }

// }
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const downloadPDF = page => {
    html2canvas(page).then(function (canvas) {
        canvas2PDF(canvas)
    })
}

const canvas2PDF = canvas => {
    let contentWidth = canvas.width
    let contentHeight = canvas.height

    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    let imgWidth = 595.28
    let imgHeight = 592.28 / contentWidth * contentHeight

    // 第一个参数： l：横向  p：纵向
    // 第二个参数：测量单位（"pt"，"mm", "cm", "m", "in" or "px"）
    let pdf = new jsPDF("p", "pt")

    pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        0,
        0,
        imgWidth,
        imgHeight
    )

    pdf.save("导出.pdf")
};

