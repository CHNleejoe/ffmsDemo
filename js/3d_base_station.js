// 使用严格模式
'use strict';
//定义三维视图的主要类
var sectorList = [],
    sectorPointList = [],
    sectorLineList = [],
    initSectorStart = false;

var baseStationPoint = {
        longitude: 114.2683,
        latitude: 22.6312,
        height: 685
    },
    baseStationYuanPoint = {
        longitude: 114.2616,
        latitude: 22.6277,
        height: 160
    },
    firePoint = {
        longitude: 114.2685,
        latitude: 22.6289,
        height: 481
    }
var sectorTimer,
    times = 0;

//定义队列
function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue; //入队
    this.dequeue = dequeue; //出队
    this.front = front; //查看队首元素
    this.back = back; //查看队尾元素
    this.toString = toString; //显示队列所有元素
    this.clear = clear; //清空当前队列
    this.empty = empty; //判断当前队列是否为空
}

//向队列末尾添加一个元素，直接调用 push 方法即可
function enqueue(element) {
    this.dataStore.push(element);
}

//删除队列首的元素，可以利用 JS 数组中的 shift 方法
function dequeue() {
    if (this.empty()) return 'This queue is empty';
    else this.dataStore.shift();
}

//我们通过判断 dataStore 的长度就可知道队列是否为空
function empty() {
    if (this.dataStore.length == 0) return true;
    else return false;
}

//查看队首元素，直接返回数组首个元素即可
function front() {
    if (this.empty()) return 'This queue is empty';
    else return this.dataStore[0];
}

//读取队列尾的元素
function back() {
    if (this.empty()) return 'This queue is empty';
    else return this.dataStore[this.dataStore.length - 1];
}

//查看对了所有元素，我这里采用数组的 join 方法实现
function toString() {
    return this.dataStore.join('\n');
}

//清空当前队列，也很简单，我们直接将 dataStore 数值清空即可
function clear() {
    delete this.dataStore;
    this.dataStor = [];
}

//初始化基站
function initBaseStation(point) {
    // baseStationPoint.longitude = 114.2666
    // baseStationPoint.latitude = 22.6298
    // baseStationPoint.height = 484
    webGlobe.appendModel('model', '../model/basestation/model.gltf', baseStationPoint.longitude, baseStationPoint.latitude, 655, 50);

    return
    if (!point) point = baseStationPoint
        //位置
    var position = Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.height);
    //图片对象
    var billboardGraphics = new Cesium.BillboardGraphics({
        image: "../imgs/mark.png",
        width: 20,
        height: 20,
        opacity: '0.1',
        //随远近缩放
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e5, 3.0, 1.5e7, 0.5),
        //随远近隐藏
        translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
    });
    //文本对象
    var labelGraphics = new Cesium.LabelGraphics({
        text: '基站',
        font: "8pt 宋体",
        fillColor: Cesium.Color.WHITE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        horizontalOrigin: Cesium.HorizontalOrigin.BOTTOM,
        //随远近缩放
        pixelOffset: new Cesium.Cartesian2(0.0, -6), //x,y方向偏移 相对于屏幕
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
        //随远近隐藏
        translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
    });
    //添加图标注记
    labelIcon = webGlobe.appendLabelIconComm('基站', '基站', position, billboardGraphics, labelGraphics);

}

//初始化扇形
function initSector() {
    if (initSectorStart) return
    initSectorStart = true
    var _baseStationYuanPoint = baseStationYuanPoint,
        _baseStationPoint = baseStationPoint;
    var ang = 1
    for (let i = 0; i < 15; i += ang) {
        var nextPoint = rotatedPointByAngle(_baseStationYuanPoint, _baseStationPoint, i + ang)
            // drawBaseStation2PointLine(nextPoint, i / ang)
        drwaLineBy2Point(baseStationPoint, nextPoint, i / ang)
    }

    sectorTimer = setInterval(function() {
        // console.log('sectorPointList', sectorPointList)
        times += 1
        var lastLine = sectorList.shift()
        sectorPointList.shift()
        var lastSectortLines = sectorLineList.shift()
            // console.log(lastSectortLines, sectorLineList)
        if (lastSectortLines) {
            // console.log('lastSectortLines', lastSectortLines)
            lastSectortLines.map(item => {
                webGlobe.removeEntity(item)
            })
        } else {
            clearInterval(sectorTimer)
        }

        var nextPoint = rotatedPointByAngle(sectorPointList[sectorPointList.length - 1], _baseStationPoint, ang)
            // drawBaseStation2PointLine(nextPoint, -1)
        drwaLineBy2Point(baseStationPoint, nextPoint, -1)
        if ((firePoint.longitude >= sectorPointList[12].longitude && firePoint.longitude <= nextPoint.longitude)) {
            alert('有火情,请注意！')
            renderFirePoint()
            clearInterval(sectorTimer)
        }

    }, 400)
}


//position_A绕position_B逆时针旋转angle度（角度）得到新点
function rotatedPointByAngle(position_A, position_B, angle) {
    angle = Math.PI / 180 * angle
    var new_x = (position_A.longitude - position_B.longitude) * Math.cos(angle) - (position_A.latitude - position_B.latitude) * Math.sin(angle) + position_B.longitude
    var new_y = (position_A.longitude - position_B.longitude) * Math.sin(angle) + (position_A.latitude - position_B.latitude) * Math.cos(angle) + position_B.latitude
    return {
        longitude: new_x,
        latitude: new_y,
        height: position_A.height
    }
}

function renderFirePoint() {
    var position = Cesium.Cartesian3.fromDegrees(firePoint.longitude, firePoint.latitude, firePoint.height);
    //图片对象
    var billboardGraphics = new Cesium.BillboardGraphics({
        image: "../imgs/fire.png",
        width: 20,
        height: 20,
        opacity: '0.1',
        //随远近缩放
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e5, 3.0, 1.5e7, 0.5),
        //随远近隐藏
        translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
    });
    //文本对象
    var labelGraphics = new Cesium.LabelGraphics({
        text: '火点',
        font: "8pt 宋体",
        fillColor: Cesium.Color.WHITE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        horizontalOrigin: Cesium.HorizontalOrigin.BOTTOM,
        //随远近缩放
        pixelOffset: new Cesium.Cartesian2(0.0, -6), //x,y方向偏移 相对于屏幕
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
        //随远近隐藏
        translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
    });
    //添加图标注记
    labelIcon = webGlobe.appendLabelIconComm('火点', '火点', position, billboardGraphics, labelGraphics);
}

function drawBaseStation2PointLine(point, i) {

    var arrayp = [baseStationPoint.longitude, baseStationPoint.latitude, baseStationPoint.height,
        point.longitude, point.latitude, point.height
    ];
    //含Z值为true,否则为false
    var isGround = true;
    if (i == -1) {
        sectorList.push(webGlobe.appendLine('不贴地线', arrayp, 2, Cesium.Color.GREEN, isGround, {}));
        sectorPointList.push(point)
        return
    }
    //根据给定点画线
    sectorList[i] = webGlobe.appendLine('不贴地线', arrayp, 2, Cesium.Color.GREEN, isGround, {});
    sectorPointList[i] = point
}

function drwaLineBy2Point(point_0, point_1, _index) {
    let num = 100,
        lon = [],
        lat = [],
        height_lerp = [],
        height_tile = [],
        pArray = [];

    var length_ping = GetDistance(point_0.longitude, point_0.latitude, point_0.height, point_1.longitude, point_1.latitude, point_1.height)
    var length_h = Math.abs(point_0.height - point_1.height);
    var length = Math.sqrt(Math.pow(length_ping, 2) + Math.pow(length_h, 2));

    num = parseInt(length / 4)
    num > 10000 ? num = 10000 : ''
    var gap = 1.0 / num

    var rad1 = point_0
    var rad2 = point_1

    for (var i = 0; i < num; i++) {
        lon[i] = Cesium.Math.lerp(rad1.longitude, rad2.longitude, gap * (i + 1));
        lat[i] = Cesium.Math.lerp(rad1.latitude, rad2.latitude, gap * (i + 1));
        height_lerp[i] = rad1.height - (rad1.height - rad2.height) * gap * (i + 1);
        pArray[i] = [lon[i], lat[i], height_lerp[i]];
        var carto = new Cesium.Cartographic.fromDegrees(lon[i], lat[i]);　　 //输入经纬度
        height_tile[i] = webGlobe.viewer.scene.globe.getHeight(carto)
    }
    var objArray = []
    for (var i = 0; i < num; i++) {
        if (i > 0) {
            var bhl = height_lerp[i - 1];
            var bht = height_tile[i - 1];
            var ht = height_tile[i];
            var hl = height_lerp[i];
            if ((bhl - bht) >= 0) {
                if ((hl - ht) < 0) {
                    //先找到 先真后假 为入点
                    var obj = { 'points': [pArray[i - 1], pArray[i]], 'index': i, type: 'in' }
                    objArray.push(obj);
                    i = num
                };
            } else {
                //先假后真 为出点
                if ((hl - ht) >= 0) {
                    var obj = { 'points': [pArray[i - 1], pArray[i]], 'index': i, type: 'out' }
                    objArray.push(obj);
                    i = num
                }
            };
        }
    }

    sectorPointList.push(point_1)
        // console.warn('in -----'
    if (_index == -1) {
        sectorLineList[14] = []
    } else {
        sectorLineList[_index] = []
    }

    if (objArray.length == 0) {
        var model = webGlobe.appendLine('不贴地线', [
            point_0.longitude, point_0.latitude, point_0.height,
            point_1.longitude, point_1.latitude, point_1.height,
        ], 2, Cesium.Color.GREEN, true, {});

        if (_index == -1) {
            sectorLineList[14].push(model);
        } else {
            sectorLineList[_index].push(model)
        }
    } else {
        var model = webGlobe.appendLine('不贴地线', [
            point_0.longitude, point_0.latitude, point_0.height,
            objArray[0].points[0][0], objArray[0].points[0][1], objArray[0].points[0][2],
        ], 2, Cesium.Color.GREEN, true, {});

        if (_index == -1) {
            sectorLineList[14].push(model);
        } else {
            sectorLineList[_index].push(model)
        }
        model = webGlobe.appendLine('不贴地线', [
            objArray[0].points[0][0], objArray[0].points[0][1], objArray[0].points[0][2],
            point_1.longitude, point_1.latitude, point_1.height,
        ], 2, Cesium.Color.RED, true, {});

        if (_index == -1) {
            sectorLineList[14].push(model);
        } else {
            sectorLineList[_index].push(model)
        }

    }


}