var finalheight = 200; //最后的高度
var he = 200; //初始高度
var dragable = false;//默认不可拖拽
var oldY = '';//记录第一次的鼠标位置
var startDrag = function(event){
dragable = true;
var e=event?event:window.event;
oldY = e.pageY; //记录第一次的鼠标位置
};
var unDrop = function(){
dragable = false;
window.event? window.event.cancelBubble = true : e.stopPropagation();
};
var endDrop = function(){
if(dragable){
finalheight = he;
dragable = false;
};
};
document.onmouseup=function(){
endDrop();
};
document.onmousemove=function(event){
if(dragable){
var e=event?event:window.event;
box = document.getElementById('moveBarBox');
console.log(box);
he =  e.pageY - oldY  + parseInt(finalheight);
//鼠标的位移 + div的最后高度 = div的新高度
//向上拉  he =  oldY - e.pageY  + parseInt(finalheight);
//向下拉  he =  e.pageY - oldY  + parseInt(finalheight);
if(dragable){
if(he<120 || he==120){//div最低高度
box.style.height = '120px';he  = '120';return;
}
if(he>400 || he==400){//div最高高度
box.style.height = '400px';he  = '400';
return;
}
box.style.height = he + 'px';
};
};
};