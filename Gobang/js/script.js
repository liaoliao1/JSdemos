var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
var over=false;

var chessBoard=[];
//赢法数组
var wins=[];
//赢法统计数组
var myWin=[];
var computerWin=[];

for(var i=0;i<15;i++){
    chessBoard[i]=[];
    for(var j=0;j<15;j++){
        chessBoard[i][j]=0;
    }
}

for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}
var count=0;
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){
    for(var j=0;j<15;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j][count]=true;
        }
        count++;
    }
}
for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}
for(var i=4;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i-k][j+k][count]=true;
        }
        count++;
    }
}
console.log(count);
for(var i=0;i<count;i++){
    myWin[i]=0;
    computerWin[i]=0;
}

context.strokeStyle="#BF";
var logo=new Image();
logo.src="./timg1.jpg";
logo.onload=function(){
    // context.globalAlpha=0.8;
    context.drawImage(logo,0,0,450,450);
    drawChessBoard();
    
}


var drawChessBoard=function(){
for(var i=0;i<15;i++){
    context.moveTo(15,15+30*i);
    context.lineTo(435,15+30*i);
    context.stroke();
    context.moveTo(15+30*i,15);
    context.lineTo(15+30*i,435);
    context.stroke();
}}

var oneStep=function(i,j,me){
    context.beginPath();
    context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
    context.closePath();
    var gradient=context.createRadialGradient(15+30*i,15+30*j,13,15+30*i,15+30*j,0);
    if(me){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#d1d1d1");
        gradient.addColorStop(1,"#f9f9f9");
    }
    context.fillStyle=gradient;
    context.fill();
}

chess.onclick=function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x=e.offsetX;
    var y=e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if(chessBoard[i][j]==0){
        oneStep(i,j,me);
        chessBoard[i][j]=1;
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k]=6;
                if(myWin[k]==5){
                    window.alert("你赢了！");
                    over=true;
                }
            }
        }
        if(!over){
            me=!me;
            computerAI();
        }
    }
}

var computerAI=function(){
    var myScore=[];
    var computerScore=[];
    var max=0;
    var u=0;
    var v=0;

    for(var i=0;i<15;i++){
        myScore[i]=[];
        computerScore[i]=[];
        for(var j=0;j<15;j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j]==0){
            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                if(myWin[k]==1){
                    myScore[i][j]+=200;
                }else if(myWin[k]==2){
                    myScore[i][j]+=400;
                }else if(myWin[k]==3){
                    myScore[i][j]+=800;
                }else if(myWin[k]==4){
                    myScore[i][j]+=1000;
                }
               
                if(computerWin[k]==1){
                    computerScore[i][j]+=220;
                }else if(computerWin[k]==2){
                    computerScore[i][j]+=450;
                }else if(computerWin[k]==3){
                    computerScore[i][j]+=820;
                }else if(computerWin[k]==4){
                    computerScore[i][j]+=5000;
                }
            }
        }
    }
        if(myScore[i][j]!==0){
        console.log(myScore[i][j]);}
        if(computerScore[i][j]!==0){
        console.log(computerScore[i][j]);}
            if(myScore[i][j]>max){
                max=myScore[i][j];
                u=i;
                v=j;
            }else if(myScore[i][j]==max){
                if(computerScore[i][j]>computerScore[u][v]){
                    u=i;
                    v=j;
                }
            }
            // if(computerScore[i][j]>max){
            //     max=computerScore[i][j];
            //     u=i;
            //     v=j;
            // }else if(computerScore[i][j]==max){
            //     if(myScore[i][j]>myScore[u][v]){
            //         u=i;
            //         v=j;
            //     }
            // }
        }
    }
    console.log("computer落子位置："+"("+u+","+v+")");
    oneStep(u,v,false);
    chessBoard[u][v]=2;

    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
            if(computerWin[k]==5){
                window.alert("computer赢了！");
                over=true;
            }
        }
    }
    if(!over){
        me=!me;
    }
}