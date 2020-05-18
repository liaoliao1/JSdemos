var MAX_Width = document.body.clientWidth
var MAX_Height = document.body.clientHeight
var radius = 6
var showTimes = 0
var balls = []
marginLeft = MAX_Width * 0.2
marginTop = MAX_Height * 0.3

window.onload = function () {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext("2d")
    canvas.width = MAX_Width
    canvas.height = MAX_Height
    showTimes = getShowTimes()

    setInterval(function () {
        update()
        render(context)
        console.log(balls.length);
    }, 50)
}
//更新时间、添加小球
function update() {
    var nextShowTimes = getShowTimes()
    var nextHours = parseInt(nextShowTimes / 3600)
    var nextMinutes = parseInt((nextShowTimes - 3600 * nextHours) / 60)
    var nextSeconds = parseInt(nextShowTimes % 60)
    var hours = parseInt(showTimes / 3600)
    var minutes = parseInt((showTimes - 3600 * hours) / 60)
    var seconds = parseInt(showTimes % 60)

    if (nextSeconds != seconds) {
        if (parseInt(hours / 10) != parseInt(nextHours / 10)) {
            addBalls(marginLeft + 0 * (radius + 1), marginTop + 0, parseInt(nextHours % 10))
        }
        if (parseInt(hours % 10) != parseInt(nextHours % 10)) {
            addBalls(marginLeft + 15 * (radius + 1), marginTop + 0, parseInt(nextHours % 10))
        }
        if (parseInt(minutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(marginLeft + 45 * (radius + 1), marginTop + 0, parseInt(nextMinutes % 10))
        }
        if (parseInt(minutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(marginLeft + 60 * (radius + 1), marginTop + 0, parseInt(nextMinutes % 10))
        }
        if (parseInt(seconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(marginLeft + 90 * (radius + 1), marginTop + 0, parseInt(nextSeconds % 10))
        }
        if (parseInt(seconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(marginLeft + 105 * (radius + 1), marginTop + 0, parseInt(nextSeconds % 10))
        }
        showTimes = nextShowTimes
    }

    updateBalls()
}
//更新小球位置
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].g
        if (balls[i].y >= MAX_Height - balls[i].r) {
            balls[i].y = MAX_Height - balls[i].r
            balls[i].vy = -balls[i].vy * 0.7
        }
    }
    //删除多余小球
    var index = 0
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + balls[i].r > 0 && balls[i].x - balls[i].r < MAX_Width) {
            balls[index++] = balls[i]
        }
    }
    while (balls.length > Math.min(300, index)) {
        balls.pop()
    }
}
//添加小球
function addBalls(x, y, num) {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 7; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + 2 * (radius + 1) * j + radius + 1,
                    y: y + 2 * (radius + 1) * i + radius + 1,
                    r: 10,
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 100)) * 4,
                    vy: -5,
                    color: rgb()
                }
                balls.push(aBall)
            }
        }
    }
}
//十六进制颜色随机
function color16() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
//随机颜色
function rgb() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
//得到当前时间
function getShowTimes() {
    var cur = new Date()
    var rest = cur.getHours() * 3600 + cur.getMinutes() * 60 + cur.getSeconds()
    return rest
}
//绘制圆点表示时间
function render(cxt) {
    cxt.clearRect(0, 0, MAX_Width, MAX_Height)
    var hours = parseInt(showTimes / 3600)
    var minutes = parseInt((showTimes - 3600 * hours) / 60)
    var seconds = parseInt(showTimes % 60)
    renderDigit(marginLeft + 0, marginTop + 0, parseInt(hours / 10), cxt)
    renderDigit(marginLeft + 15 * (radius + 1), marginTop + 0, parseInt(hours % 10), cxt)
    renderDigit(marginLeft + 30 * (radius + 1), marginTop + 0, 10, cxt)
    renderDigit(marginLeft + 45 * (radius + 1), marginTop + 0, parseInt(minutes / 10), cxt)
    renderDigit(marginLeft + 60 * (radius + 1), marginTop + 0, parseInt(minutes % 10), cxt)
    renderDigit(marginLeft + 75 * (radius + 1), marginTop + 0, 10, cxt)
    renderDigit(marginLeft + 90 * (radius + 1), marginTop + 0, parseInt(seconds / 10), cxt)
    renderDigit(marginLeft + 105 * (radius + 1), marginTop + 0, parseInt(seconds % 10), cxt)
    //绘制小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color
        cxt.beginPath()
        cxt.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI)
        cxt.fill()
    }
}
//绘制数字
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "#0066FF"
    var target = digit[num]
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 7; j++) {
            if (target[i][j] == 1) {
                cxt.beginPath()
                cxt.arc(x + 2 * (radius + 1) * j + radius + 1, y + 2 * (radius + 1) * i + radius + 1, radius, 0, 2 * Math.PI, false)
                cxt.fill()
            }
        }
    }
}