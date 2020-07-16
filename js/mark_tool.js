//矢量标注的数据源
var markSource = new ol.source.Vector({
    crossOrigin: "Anonymous"

});
//矢量标注图层
var markLayer = new ol.layer.Vector({
    source: markSource,
    zIndex: 5,
    lNameDisplay: '标注与绘图'
});

var dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148]
};
var loading = 0;
var loaded = 0;

var exportButton = document.getElementById('export-pdf');
var hasAddLayerFlag = false,
    markType = false;
/**
 * 在地图容器中创建一个Overlay
 */
var markContainer = document.getElementById('markPopup');
var markContent = document.getElementById('markPopupContent');
var markPopup = new ol.Overlay(
    /** @type {olx.OverlayOptions} */
    ({
        //要转换成overlay的HTML元素
        element: markContainer,
        //当前窗口可见
        autoPan: true,
        //Popup放置的位置
        positioning: 'bottom-center',
        //是否应该停止事件传播到地图窗口
        stopEvent: true,
        autoPanAnimation: {
            //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
            duration: 250
        }
    }));

/**
 * 创建矢量标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
var createMarkLabelStyle = function(feature, text) {
    return new ol.style.Style({
        image: new ol.style.Icon(
            /** @type {olx.style.IconOptions} */
            ({
                anchor: [0.5, 250],
                anchorOrigin: 'top-right',
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                offsetOrigin: 'top-right',
                // offset:[0,10],
                //图标缩放比例
                scale: 0.1,
                //透明度
                opacity: 0.9,
                //图标的url
                src: 'imgs/mark.png'
            })),
        text: new ol.style.Text({
            //位置
            textAlign: 'center',
            //基准线
            textBaseline: 'middle',
            //文字样式
            font: 'normal 14px 微软雅黑',
            //文本内容
            text: text,
            //文本填充样式（即文字颜色）
            fill: new ol.style.Fill({ color: '#aa3300' }),
            stroke: new ol.style.Stroke({ color: '#ffcc33', width: 1 })
        })
    });
}

// 添加标注事件
var markFunc = function(evt) {
    //鼠标单击点坐标
    var point = evt.coordinate;
    //添加一个新的标注（矢量要素）
    // addMarkFeatrue(point, 'text');
    markPopup.setPosition(point)
        // $('#markSubmit').un('click', addMarkFeatrue);
    $('#markSubmit').on('click', addMarkFeatrue);
}

function addMarkLabel() {
    if (markType) {
        markType = false
        map.on('click', clickFunc);
        map.un('click', markFunc);
        $('.ToolLib').hide()
    } else {
        markType = true
        map.un('click', clickFunc);
        //为地图容器添加单击事件监听
        map.on('click', markFunc);
        $('.ToolLib').show()
        exportButton.addEventListener('click', exportPDF, false);
    }

}

/**
 * 添加一个新的标注（矢量要素）
 * @param {ol.Coordinate} coordinate 坐标点
 */
function addMarkFeatrue() {
    var coordinate = markPopup.getPosition(),
        text = $('#markTextarea').val();
    if (!coordinate) return
    console.log(coordinate, text)
        //新建一个要素 ol.Feature
    var newFeature = new ol.Feature({
        //几何信息
        geometry: new ol.geom.Point(coordinate),
        //名称属性
        name: '标注点'
    });
    //设置要素的样式
    newFeature.setStyle(createMarkLabelStyle(newFeature, text));
    //将新要素添加到数据源中
    markSource.addFeature(newFeature);
    markPopup.setPosition(undefined);
    $('#markTextarea').val('');
}
var exportPDF = function() {

    exportButton.disabled = true;
    document.body.style.cursor = 'progress';

    var format = document.getElementById('format').value;
    var resolution = document.getElementById('resolution').value;
    var dim = dims[format];
    var width = Math.round(dim[0] * resolution / 25.4);
    var height = Math.round(dim[1] * resolution / 25.4);
    var size = /** @type {ol.Size} */ (map.getSize());
    var extent = map.getView().calculateExtent(size);

    map.once('postcompose', function(event) {
        var canvas = event.context.canvas;
        console.log('canvas')
        var data = canvas.toDataURL('image/jpeg');
        var pdf = new jsPDF('landscape', undefined, format);
        pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
        pdf.save('map.pdf');

    });

    map.setSize([width, height]);
    map.getView().fit(extent, /** @type {ol.Size} */ (map.getSize()));
    map.renderSync();
    exportButton.disabled = false;
    document.body.style.cursor = 'auto';

}