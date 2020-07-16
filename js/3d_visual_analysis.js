// 使用严格模式
'use strict';
//定义三维视图的主要类
var webGlobe;
var visualAllPoint = new Array();
var visualLine;
var visualEntity;
var visualResultLine = [];

/*绘制线*/
function interactionDraw() {
    removeEntities();
    var pointArray = new Array();
    //注册事件
    webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {
        //屏幕坐标转笛卡尔坐标
        var cartesian = webGlobe.viewer.getCartesian3Position(e.position, cartesian);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        pointArray.push(lng);
        visualAllPoint.push(lng);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        pointArray.push(lat);
        visualAllPoint.push(lat);
        //模型高度
        var height = cartographic.height;
        pointArray.push(height);
        visualAllPoint.push(height);
        //添加点
        if (pointArray.length > 3) {
            visualLine = webGlobe.appendLine('不贴地线', pointArray, 2, Cesium.Color.GREEN, true, {});
            pointArray = new Array();
            pointArray.push(lng);
            pointArray.push(lat);
            pointArray.push(height);
            webGlobe.viewer.entities.removeById('moveline');
        }
        if (visualAllPoint.length >= 6) {
            webGlobe.unRegisterMouseEvent('LEFT_CLICK');
            webGlobe.unRegisterMouseEvent('MOUSE_MOVE');
            // webGlobe.unRegisterMouseEvent('RIGHT_CLICK');
        }
        console.log('pointArray', pointArray);
        console.log('visualAllPoint', visualAllPoint);
    });
    webGlobe.registerMouseEvent('MOUSE_MOVE', function(e) {
        webGlobe.viewer.entities.removeById('moveline');
        if (pointArray.length < 3) {
            return;
        }
        var cartesian = webGlobe.viewer.getCartesian3Position(e.endPosition, cartesian);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var height = cartographic.height;
        var firstPosition = Cesium.Cartesian3.fromDegrees(pointArray[0], pointArray[1], pointArray[2]);
        var movePosition = Cesium.Cartesian3.fromDegrees(lng, lat, height);
        var redBox = webGlobe.viewer.entities.add({
            id: 'moveline',
            polyline: {
                positions: [firstPosition, movePosition],
                width: 2,
                material: Cesium.Color.YELLOW
            }
        });
    });
    // webGlobe.registerMouseEvent('RIGHT_CLICK', function(e) {
    //     // webGlobe.viewer.entities.removeAll();
    //     if (visualAllPoint.length > 3) {
    //         webGlobe.appendLine('不贴地线', visualAllPoint, 2, new Cesium.Color(1, 0, 0, 0.8), true, {});
    //     }
    //     pointArray = new Array();
    //     visualAllPoint = new Array();
    //     webGlobe.unRegisterMouseEvent('LEFT_CLICK');
    //     webGlobe.unRegisterMouseEvent('MOUSE_MOVE');
    //     webGlobe.unRegisterMouseEvent('RIGHT_CLICK');
    // });
}

/*绘制结果回调函数*/
function getDrawResult(entity) {
    if (entity) {
        var ptype = entity.pType;
    }
}

/*移除绘制图形 */
function removeEntities() {
    visualAllPoint = new Array();
    webGlobe.unRegisterMouseEvent('LEFT_CLICK');
    webGlobe.unRegisterMouseEvent('MOUSE_MOVE');
    // webGlobe.unRegisterMouseEvent('RIGHT_CLICK');
    webGlobe.viewer.entities.remove(visualLine);
    webGlobe.viewer.entities.remove(visualEntity);
    visualResultLine.map(item => {
        webGlobe.viewer.entities.remove(item);

    })

}
// 方法定义 lat,lng 
function GetDistance(lat1, lng1, h1, lat2, lng2, h2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10;
    // s = Math.sqrt(Math.pow(s, 2) + Math.pow(Math.abs(h1 - h2), 2), 2)
    return s;
}

function requestDrawLineIsVisual() {
    let _visualAllPoint = JSON.parse(JSON.stringify(visualAllPoint));
    if (!_visualAllPoint.length || _visualAllPoint.length == 0) return

    var point_1 = _visualAllPoint.splice(3),
        point_0 = _visualAllPoint;


    let num = 100,
        pl_x = [],
        pl_y = [],
        pl_height = [],
        lon = [],
        lat = [],
        height_lerp = [],
        height_tile = [],
        pArray = [];

    point_0 = {
        longitude: point_0[0],
        latitude: point_0[1],
        height: point_0[2],
    }
    point_1 = {
        longitude: point_1[0],
        latitude: point_1[1],
        height: point_1[2],
    }
    var length_ping = GetDistance(point_0.longitude, point_0.latitude, point_0.height, point_1.longitude, point_1.latitude, point_1.height)
    var length_h = Math.abs(point_0.height - point_1.height);
    var length = Math.sqrt(Math.pow(length_ping, 2) + Math.pow(length_h, 2));

    num = parseInt(length / 2)
    num > 10000 ? num = 10000 : ''
    var gap = 1.0 / num

    console.log(point_0, point_1, gap)
        // var rad1 = Cesium.Cartographic.fromCartesian(point_0);
        // var rad2 = Cesium.Cartographic.fromCartesian(point_1);
    var rad1 = point_0
    var rad2 = point_1
    var degree1 = { longitude: rad1.longitude / (Math.PI * 180), latitude: rad1.latitude / (Math.PI * 180), height: rad1.height };
    var degree2 = { longitude: rad2.longitude / (Math.PI * 180), latitude: rad2.latitude / (Math.PI * 180), height: rad2.height };

    for (var i = 0; i < num; i++) {
        // Cesium.Cartesian3(pl_x[i], pl_y[i], pl_height[i]);
        //插值经纬度数组 和 插值高程数组、切片实际高程数组
        lon[i] = Cesium.Math.lerp(rad1.longitude, rad2.longitude, gap * (i + 1));
        lat[i] = Cesium.Math.lerp(rad1.latitude, rad2.latitude, gap * (i + 1));
        height_lerp[i] = rad1.height - (rad1.height - rad2.height) * gap * (i + 1);
        pArray[i] = [lon[i], lat[i], height_lerp[i]];

        var carto = new Cesium.Cartographic.fromDegrees(lon[i], lat[i]);　　 //输入经纬度
        // var h1=viewer.scene.globe.getHeight(carto)
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

                };
            } else {
                //先假后真 为出点
                if ((hl - ht) >= 0) {
                    var obj = { 'points': [pArray[i - 1], pArray[i]], 'index': i, type: 'out' }
                    objArray.push(obj);
                }
            };
        }
    }
    webGlobe.viewer.entities.remove(visualEntity);
    console.log(num, length_ping)
    visualEntity = webGlobe.viewer.entities.add({
        label: {
            name: 'tongshifenxi',
            show: false,
            showBackground: true,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            font: '14px monospace',
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(15, -10)
        }
    });
    var position = visualAllPoint.slice(3)
    position = Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2]);
    visualEntity.position = position;
    visualEntity.label.show = true;
    /**根据经纬度计算出距离**/

    console.log(objArray);
    var text =
        '起点坐标: ' + ('   (' + rad1.longitude) + '\u00B0' + ',' + (rad1.latitude) + '\u00B0' + ',' + rad1.height + ')' +
        '\n终点坐标: ' + ('   (' + rad2.longitude) + '\u00B0' + ',' + (rad2.latitude) + '\u00B0' + ',' + rad2.height + ')' +
        '\n垂直距离: ' + '   ' + length_h +
        '\n水平距离: ' + '   ' + length_ping +
        '\n空间距离: ' + '   ' + length +
        '\n是否可视: ' + '   ' + (objArray.length > 0 ? '否' : '是');
    visualEntity.label.text = text;
    if (objArray.length == 0) {

    } else {
        webGlobe.removeEntity(visualLine);
        // objArray.map((temp, index) => {
        // if (index == 0) {
        //     var model = webGlobe.appendLine('不贴地线', [
        //         point_0.longitude, point_0.latitude, point_0.height,
        //         temp.points[1][0], temp.points[1][1], temp.points[1][2]
        //     ], 2, Cesium.Color.GREEN, true, {});
        // } else if (index % 2 == 1) {
        //     var model = webGlobe.appendLine('不贴地线', [
        //         objArray[index - 1].points[1][0], objArray[index - 1].points[1][1], objArray[index - 1].points[1][2],
        //         temp.points[1][0], temp.points[1][1], temp.points[1][2]
        //     ], 2, Cesium.Color.RED, true, {});
        // } else if (index % 2 == 0) {
        //     var model = webGlobe.appendLine('不贴地线', [
        //         objArray[index - 1].points[1][0], objArray[index - 1].points[1][1], objArray[index - 1].points[1][2],
        //         temp.points[1][0], temp.points[1][1], temp.points[1][2]
        //     ], 2, Cesium.Color.GREEN, true, {});

        // }
        //     visualResultLine.push(model)
        // })
        var model = webGlobe.appendLine('不贴地线', [
            point_0.longitude, point_0.latitude, point_0.height,
            objArray[0].points[0][0], objArray[0].points[0][1], objArray[0].points[0][2],
        ], 2, Cesium.Color.GREEN, true, {});
        visualResultLine.push(model)
        model = webGlobe.appendLine('不贴地线', [
            objArray[0].points[0][0], objArray[0].points[0][1], objArray[0].points[0][2],
            point_1.longitude, point_1.latitude, point_1.height,
        ], 2, Cesium.Color.RED, true, {});
        visualResultLine.push(model)

    }


}