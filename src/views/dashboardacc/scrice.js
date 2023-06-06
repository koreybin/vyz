export const add = function(){
    let box=document.getElementById("box");
    box.onmousedown=function(e){
        let oEvent=e||event;
        //鼠标点击盒子的位置
        let x=oEvent.clientX-box.offsetLeft;
        let y=oEvent.clientY-box.offsetTop;
        document.onmousemove=function(e){
            let oEvent=e||event;
            //盒子到浏览器的左边距、上边距
            let left=oEvent.clientX-x;
            let top=oEvent.clientY-y;
            let maxW=document.documentElement.clientWidth-box.offsetWidth;
            let maxH=document.documentElement.clientHeight-box.offsetHeight;
            if(left<0)left=0;
            if(top<0)top=0;
            if(left>maxW)left=maxW;
            if(top>maxH)top=maxH;
            box.style.left=left+"px";
            box.style.top=top+"px";
        }
    }
    box.onmouseup=function(){
        document.onmousemove=null;
    }
}