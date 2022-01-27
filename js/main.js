// canvas에 마우스를 올리면 감지하도록
// canvas는 처음에 비어있음. 무언가를 표시하기 위해선
// 어떤 스크립트가 랜더링 컨텍스트에 접근하여 그리도록 할 필요가 있음
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
// 색 넣어주기
const colors = document.getElementsByClassName("jsColor");
// 브러쉬 굵기 
const range = document.querySelector('.jsRange');
// paint or fill
const mode = document.querySelector('#jsMode');
// save
const save = document.querySelector('#jsSave');
//지우개
const clear = document.querySelector(".jsClear");
//----------------------------------------------------------------------//
//변수지정
//지우개 만들기
ctx.globalCompositeOperation = 'destination-out';
const CANVAS_SIZE =800;
const DEFAULT_COLOR = '#2c2c2c';
//canvas의 width & height값
//=> html default값으로 넣으면 굳이 필요할까..?
//=> NO, js에서 꼭 명시해줘야 함
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

//context의 default 설정
ctx.lineWidth = 3;
ctx.fillStlye = DEFAULT_COLOR;
ctx.strokeStyle =DEFAULT_COLOR;

// 이 구간 이해 안감
let painting =false;
let filling = false;
//----------------------------------------------------------------//
/* function*/
function onMouseMove(event){
  
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y)
    ctx.stroke(); 
    //🤍stroke 검색해보기
  }

}

function startpainting(){
  painting = true;
}

function stopPainting(){
  painting=false;
}

function handleColor(event){
   const color = event.target.style.backgroundColor;
  // ctx.fillStyle=color;
  ctx.strokeStyle =color;
  ctx.fillStyle = color;
  // 지우개 사용 후 color로 전환
  ctx.globalCompositeOperation = 'source-over'
 
}

function brushRangeSetting(event){
  const range =event.target.value;
  ctx.lineWidth =range;
}

function paintOrFill(){ //🤍
  if(filling === true){
    filling = false;
    mode.innerText = 'Fill';
  }else{
    filling=true;
    mode.innerText='Paint';
    
  }
}

function canvasFill(){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); // x,y,width,height;
  }
}

function mouseRightClick(event){
  event.preventDefault();

}

function saveClick(){
  const link = document.createElement('a');
  link.download = 'download🖌️.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}

function eraserClick(event){
 
  const remove = event.target.value;
  ctx.lineWidth = remove;
  ctx.globalCompositeOperation ='destination-out'
}

//------------------------------------------------------------//
// 총체적으로 출력
/* 🤍onMouseMove(마우스 좌표)
=> mousemove - 마우스가 움직일 때
: 여기에서 모든 마우스의 움직임을 감지하고 움직임을 따라가는 라인(path)을 만들어야함
: painting을 할 땐 path 그리는게 필요 X
: painting을 하지 않을 때만 path를 원함
  즉, 클릭하지 않고 떠다니는 건 path를 만들겠다는 것
: 시작점에서부터 끝낼때까지 라인을 만들기 위해 클릭하길 기다리는
: path를 만드는건 기본적으로 선(line)의 시작점을 생성하겠다는 뜻임
(그래야 그림이 그려지니까)
=> 사용 함수 : beginPath / moveTo(path의 시작점을 x,y로 옮기도록)
             : lineTo(x,y)- 현재의 sub-path에서 마지막 지점을 특정좌표로 연결
             : stroke 는 lineTo로 이어진 라인을 보이게 만듦

/*🤍StartPainting(그리기 시작) = painting = true
=> mousedown - 마우스를 클릭했을 때
*/

/*🤍StopPainting(그리기 멈춤) painting = false
=> mouseup - canvas 위에 마우스를 올려두었을 때
           - 마우스의 좌표를 확일할 수 있는 방법 필요
=> mouseleave - 마우스가 캔퍼스 밖으로 나갔을 때            
*/
if(canvas){
  canvas.addEventListener("mousemove",onMouseMove);
  canvas.addEventListener("mousedown", startpainting);
  canvas.addEventListener("mouseup",stopPainting);
  canvas.addEventListener("mouserleave",stopPainting);
  canvas.addEventListener("click",canvasFill)
  canvas.addEventListener("contextmenu",mouseRightClick)
}

Array.from(colors).forEach(color =>
color.addEventListener("click", handleColor));


if(range){
  range.addEventListener("input",brushRangeSetting);
}

if(mode){
  mode.addEventListener("click",paintOrFill);
}

if(save){
  save.addEventListener("click",saveClick);
}

if(clear){
  clear.addEventListener("input", eraserClick);
}

