var map = null;
var VecLayer = null;
var screenPixel_ = []
    // 鹰眼组件
var scaleNum = ''
var resourceData = [],
    weatherData = []
window.onload = initGrid
    // 测距或者侧面积类型
var calcType = ''
var clickFunc;


var overviewMapControl = {}
    //实例化鼠标位置控件（MousePosition）
var mousePositionControl = new ol.control.MousePosition({
    //坐标格式
    coordinateFormat: ol.coordinate.createStringXY(4),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: 'EPSG:4326',
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: 'custom-mouse-position',
    //显示鼠标位置信息的目标容器
    target: document.getElementById('mouse-position'),
    //未定义坐标的标记
    undefinedHTML: '&nbsp;'
});

// 比例尺
var scaleLineControl = new ol.control.ScaleLine({
    //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
    units: "degrees"
});

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');

/**
 * 在地图容器中创建一个Overlay
 */
var popup = new ol.Overlay(
    /** @type {olx.OverlayOptions} */
    ({
        //要转换成overlay的HTML元素
        element: container,
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
var createLabelStyle = function(type) {
    var src = 'imgs/mhq.png'
        // type == 'XXX'?src = 'imgs/mhq.png':''

    type == 'YYY' ? src = 'imgs/xsc.png' : ''
    type == 'ZZZ' ? src = 'imgs/xfs.png' : ''

    return new ol.style.Style({
        /**{olx.style.IconOptions}类型*/
        image: new ol.style.Icon(
            ({
                anchor: [0.5, 60],
                anchorOrigin: 'top-right',
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                offsetOrigin: 'top-right',
                // offset:[0,10],
                // 图标缩放比例
                scale: 0.2,
                //透明度
                opacity: 0.8,
                //图标的url
                src
            })
        )
    });
}

function renderWeather(map) {
    var rightListContent = document.getElementById('resourseList')
    innerHtml = ''


    let url = 'http://192.168.3.69:8095/forestfire/getWeather'
    axios.get(url)
        .then(response => {
            weatherData = response.data

            let weatherFeatrueList = []
            weatherData.map(item => {
                //实例化Vector要素，通过矢量图层添加到地图容器中
                var weatherFeature = new ol.Feature({
                    geometry: new ol.geom.Point([item.longitude, item.latitude]),
                    properties: {
                        ...item
                    },
                });

                weatherFeature.setStyle(createLabelStyle(''));
                weatherFeatrueList.push(weatherFeature)
                innerHtml += `
                <div class="wea-list-item">
                    <div class="wea-list-name">${item.weatherStationName}</div>
                    <div class="wea-list-p">经度：${item.longitude}</div>
                    <div class="wea-list-p">纬度：${item.latitude}</div>
                    <div class="wea-list-box">
                        <div class="wea-list-flex-1">温度：${item.airTemperature}℃</div>
                        <div class="wea-list-flex-1">湿度：${item.humidity}%</div>
                    </div>
                    <div class="wea-list-box">
                        <div class="wea-list-flex-1">降雨量：${item.rainFall}ml</div>
                        <div class="wea-list-flex-1">风速：${item.windSpeed}m/s</div>
                    </div>
                </div>
                `
            })
            rightListContent.innerHTML = innerHtml

            //矢量标注的数据源
            var vectorSource = new ol.source.Vector({
                features: weatherFeatrueList,
                crossOrigin: "Anonymous"
            });
            //矢量标注图层
            var weatherLayer = new ol.layer.Vector({
                source: vectorSource,
                zIndex: 5

            });
        })
}

function renderResource(map) {
    let url = 'http://192.168.3.69:8095/forestfire/getFireProtection'
    var rightListContent = document.getElementById('resourseList')
        // rightListContent.innerHTML = ''
    axios.get(url)
        .then(response => {
            resourceData = response.data

            let iconFeatrueList = []
            resourceData.map(item => {
                //实例化Vector要素，通过矢量图层添加到地图容器中
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point([item.longitude, item.latitude]),
                    properties: {
                        ...item
                    }
                });

                iconFeature.setStyle(createLabelStyle(item.icon));
                iconFeatrueList.push(iconFeature)
            })

            //矢量标注的数据源
            var iconSource = new ol.source.Vector({
                features: iconFeatrueList
            });
            //矢量标注图层
            var iconLayer = new ol.layer.Vector({
                source: iconSource,
                zIndex: 3,
                name: '资源数据',
                crossOrigin: "Anonymous"
            });
            map.addLayer(iconLayer);
        })
}


function initGrid() {
    renderChart()
        //地图范围
        // var extent = [834431.640800001, 2504856.1291, 838231.640800001, 2508856.1291];
    var extent = [114.252997933675, 22.6169358861508, 114.290857010902, 22.6536080529234]

    var center = ol.extent.getCenter(extent);
    //投影坐标系
    var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent });
    //瓦片的显示名称
    var title_name = "MapGIS IGS TileLayer";
    //瓦片地图的名称
    var TileName = "ygjz_q";

    TileLayer = new Zondy.Map.TileLayer(title_name, TileName, {
        ip: "192.168.3.53",
        crossOrigin: "Anonymous",

        port: "6163" //访问IGServer的端口号，.net版为6163，Java版为8089
    });
    overviewMapControl = new ol.control.OverviewMap({
        //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）

        className: 'ol-overviewmap ol-custom-overviewmap',
        //鹰眼中加载同坐标系下不同数据源的图层
        layers: [TileLayer],
        //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
        collapseLabel: '\u00BB',
        //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
        label: '\u00AB',
        //初始为展开显示方式
        collapsed: false,
        view: new ol.View({
            center: center,
        }),
    });
    //创建一个地图容器
    map = new ol.Map({
        //目标DIV
        target: 'mapGrid',
        //添加图层到地图容器中
        layers: [TileLayer],
        view: new ol.View({
            center: center,
            projection: projection,
            zoom: 3,
            minZoom: 1,
            maxZoom: 11
        }),
        crossOrigin: "Anonymous",
        //加载控件到地图容器中
        controls: ol.control.defaults({ //地图中默认控件
            /* @type {ol.control.Attribution} */
            attributionOptions: ({
                //地图数据源信息控件是否可收缩,默认为true
                collapsible: true
            })
        }).extend([overviewMapControl, mousePositionControl])
    });



    // 添加pop对象
    map.addOverlay(popup);

    //地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
    $(map.getViewport()).on('mouseout', function() {
        $(helpTooltipElement).addClass('hidden');
    });

    setInterval(() => {
        renderWeather(map)
    }, 20000);
    renderWeather(map)
    renderResource(map)

    /**
     * 为map添加点击事件监听，渲染弹出popup
     */
    clickFunc = function(evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        if (calcType) return
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) { return feature; });
        if (feature) {
            //清空popup的内容容器
            content.innerHTML = '';
            //在popup中加载当前要素的具体信息
            let info = feature.getProperties().properties
            if (!info) {
                popup.setPosition(undefined)
                return
            }
            addFeatrueInfo(info);
            //设置popup的位置
            popup.setPosition([parseFloat(info.longitude), parseFloat(info.latitude)]);
            // return
        } else {
            popup.setPosition(undefined);

        }
    }
    map.on('click', clickFunc);

    /**
     * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
     */
    map.on('pointermove', function(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    $('.ol-zoom-out').text('-')


};

// 插件的显示控制
function controlsDispaly(evt) {
    let itemId = evt.target.id
    var controls = map.getControls()
    popup.setPosition(undefined)
    markPopup.setPosition(undefined)
    let flag = true

    switch (itemId) {
        case 'mousePositionControl':
            {
                controls.forEach(item => {
                    if (item.element.className === 'custom-mouse-position') {
                        map.removeControl(mousePositionControl)
                        flag = false
                    }
                })
                if (flag) map.addControl(mousePositionControl)
            }
            break;
        case 'overviewControl':
            {
                controls.forEach(item => {
                    if (item.element.className === 'ol-overviewmap ol-custom-overviewmap ol-unselectable ol-control') {
                        map.removeControl(overviewMapControl)
                        flag = false
                    }
                })
                if (flag) map.addControl(overviewMapControl)
            }
            break;
        case 'distanceCalcControl':
            {
                if (calcType != 'LineString') {
                    calcType = 'LineString'
                    addInteraction(); //调用加载绘制交互控件方法，添加绘图进行测量
                    map.on('pointermove', pointerMoveHandler); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
                    map.addInteraction(draw);
                    map.addLayer(drawVector);
                    $('.tooltip').removeClass('hidden')

                } else {
                    calcType = ''
                    map.un('pointermove', pointerMoveHandler); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
                    map.removeInteraction(draw);
                    map.removeLayer(drawVector);
                    $('.tooltip').addClass('hidden')
                }
            }
            break;
        case 'areaCalcControl':
            {
                if (calcType != 'Polygon') {
                    calcType = 'Polygon'
                    addInteraction(); //调用加载绘制交互控件方法，添加绘图进行测量
                    map.on('pointermove', pointerMoveHandler); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
                    map.addInteraction(draw);
                    map.addLayer(drawVector);
                    $('.tooltip').removeClass('hidden')

                } else {
                    calcType = ''
                    map.un('pointermove', pointerMoveHandler); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
                    map.removeInteraction(draw);
                    map.removeLayer(drawVector);
                    $('.tooltip').addClass('hidden')
                }
            }
            break;
        case 'scaleControl':
            {
                controls.forEach(item => {
                    if (item.element.className === 'ol-scale-line ol-unselectable') {
                        map.removeControl(scaleLineControl)
                        flag = false
                    }
                })
                if (flag) {
                    map.addControl(scaleLineControl)
                    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    var element = document.querySelector('.ol-scale-line-inner')

                    var callback = function(records) {
                        records.map(function(record) {
                            if ((parseFloat($(record.target).html()) / 40) != scaleNum) {
                                $(record.target).html(parseFloat($(record.target).html()) / 40 + 'km')
                                scaleNum = parseFloat($(record.target).html()) / 40
                            }

                        });
                    };

                    var mo = new MutationObserver(callback);

                    var option = {
                        'childList': true,
                        'subtree': true
                    };

                    mo.observe(element, option);
                }

            }
            break;
        case 'resourcesControl':
            {
                // $('#mapGrid').hide()
                // $('#mapResource').show()
                window.location.href = 'test.html'
            }
            break;
        case 'swControl':
            {
                window.location.href = '3D.html'
            }
            break;
        case 'markControl':
            {
                if (!hasAddLayerFlag) {
                    hasAddLayerFlag = true;
                    map.addOverlay(markPopup);
                    map.addLayer(markLayer);
                }
                addMarkLabel()
                markPopup.setPosition(undefined)
                $('#markTextarea').val('')
            }
            break;
        case 'gridControl':
            {
                window.location.href = 'index.html'
            }
            break;
        case 'layersControl':
            {
                $('.layerControl').css('display') != 'block' ? $('.layerControl').show() : $('.layerControl').hide()

                if (layer && layer.length != 0) {
                    layer = [];
                    //图层名称数组
                    layerName = [];
                    //图层可见属性数组
                    layerVisibility = [];
                } else {
                    //加载图层列表数据
                    loadLayersControl(map, "layerTree");
                }

            }
            break;
    }

};

/**
 * 动态创建popup的具体内容
 * @param {string} title
 */
function addFeatrueInfo(info) {
    var renderList = [
        { class: 'markerInfo', label: '', attr: 'name' },
        { class: 'markerText', label: '经度：', attr: 'longitude' },
        { class: 'markerText', label: '纬度：', attr: 'latitude' },
        { class: 'markerText', label: '位置信息：', attr: 'positionInfo' },
        { class: 'markerText', label: '备注：', attr: 'remark' },
    ]
    renderList.map(item => {
        var elementDiv = document.createElement('div');
        elementDiv.className = item.class;
        setInnerText(elementDiv, item.label + (item.attr == '' ? '' : info[item.attr]));
        content.appendChild(elementDiv);
    })
}
/**
 * 动态设置元素文本内容（兼容）
 */
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

function renderChart() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },

        series: [{
            name: '林火风险分布',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                // position: 'inside'
                formatter: '{b}\n{d}%'
            },
            color: [
                '#970325',
                '#B44516',
                '#E3D046',
                '#0C00BF',
                '#66B445',
            ],
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: true
            },
            data: [
                { value: 1548, name: '极高风险' },
                { value: 928, name: '较高风险' },
                { value: 701, name: '高风险' },
                { value: 120, name: '较低风险' },
                { value: 266, name: '低风险' }
            ]
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}