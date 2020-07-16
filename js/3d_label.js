//在JS脚本开发中使用严格模式，及时捕获一些可能导致编程错误的ECMAScript行为
'use strict';
//定义三维视图的主要类

var labelIcon;
var labelArray = [{
    lng: 114.2649836,
    lat: 22.6186595,
    height: 5,
    labelName: '气象站A',
    mark: '靠城镇的气象站'
}, {
    lng: 114.2821907,
    lat: 22.6203143,
    height: 0,
    labelName: '气象站B',
    mark: '靠城镇的气象站'
}, {
    lng: 114.2652325,
    lat: 22.6417734,
    height: 331,
    labelName: '气象站C',
    mark: '靠城镇的气象站'
}, {
    lng: 114.2875043,
    lat: 22.6552343,
    height: 0,
    labelName: '气象站D',
    mark: '靠城镇的气象站'
}, {
    lng: 114.2632250,
    lat: 22.6545652,
    height: 0,
    labelName: '气象站E',
    mark: '靠城镇的气象站'
}, {
    lng: 114.2686,
    lat: 22.6280,
    height: 511,
    labelName: 'huodian ',
    mark: '靠城镇的气象站'
}]

var firelist = [{
    lng: 114.2686,
    lat: 22.6375,
    height: 312,
    labelName: '灭火器',
    mark: '灭火器',
    type: 'XXX'
}, {
    lng: 114.2778,
    lat: 22.6355,
    height: 333,
    labelName: '消防栓',
    mark: '消防栓',
    type: 'ZZZ'
}, {
    lng: 114.2826,
    lat: 22.6376,
    height: 316,
    labelName: '蓄水池',
    mark: '蓄水池',
    type: 'YYY'
}, {
    lng: 114.2786,
    lat: 22.6260,
    height: 25,
    labelName: '灭火器',
    mark: '灭火器',
    type: 'XXX'
}, {
    lng: 114.2628,
    lat: 22.6202,
    height: 9,
    labelName: '消防栓',
    mark: '消防栓',
    type: 'ZZZ'
}, {
    lng: 114.2821,
    lat: 22.6195,
    height: 0,
    labelName: '蓄水池',
    mark: '蓄水池',
    type: 'YYY'
}]

//添加图文标注
function addLabel() {
    remove();
    // webGlobe.appendModel('model', '../model/qxz/model.gltf', 114.2649836, 22.6186595, 5, 100);
    // webGlobe.appendModel('model', '../model/qxz/model.gltf', 114.2821907, 22.6203143, 0, 100);
    // webGlobe.appendModel('model', '../model/qxz/model.gltf', 114.2652325, 22.6417734, 331, 100);
    // webGlobe.appendModel('model', '../model/qxz/model.gltf', 114.2875043, 22.6552343, 0, 100);
    // webGlobe.appendModel('model', '../model/qxz/model.gltf', 114.2632250, 22.6545652, 0, 100);
    // return
    labelArray.map(item => {
        webGlobe.appendModel('model', '../model/qxz/model.gltf', item.lng, item.lat, item.height - 50, 50);
        return
    })
    firelist.map(item => {
        //位置
        var position = Cesium.Cartesian3.fromDegrees(item.lng, item.lat, item.height);
        var image = 'imgs/mhq.png'
            // type == 'XXX'?image = 'imgs/mhq.png':''

        item.type == 'YYY' ? image = 'imgs/xsc.png' : ''
        item.type == 'ZZZ' ? image = 'imgs/xfs.png' : ''
            //图片对象
        var billboardGraphics = new Cesium.BillboardGraphics({
            image,
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
            text: item.labelName,
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
        labelIcon = webGlobe.appendLabelIconComm(item.labelName, item.mark, position, billboardGraphics, labelGraphics);

    })
}
//删除图文标注
function remove() {
    if (labelIcon) {
        webGlobe.removeEntity(labelIcon);
    }

}