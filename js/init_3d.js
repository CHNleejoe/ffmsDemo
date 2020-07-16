var map = null;
var VecLayer = null;
var screenPixel_ = []
    // 鹰眼组件
var scaleNum = ''
var resourceData = [],
    weatherData = []
window.onload = init
    // 测距或者侧面积类型
var calcType = ''
var clickFunc,
    wmsLayer,
    new_wmsLayer;



var container = document.getElementById('popup');
var content = document.getElementById('popup-content');


function renderWeather(map) {
    var rightListContent = document.getElementById('resourseList')
    innerHtml = ''


    let url = 'http://192.168.3.69:8095/forestfire/getWeather'
    axios.get(url)
        .then(response => {
            weatherData = response.data

            weatherData.map(item => {
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
        })
}

function renderResource(map) {
    let url = 'http://192.168.3.186:8095/forestfire/getFireProtection'
    var rightListContent = document.getElementById('resourseList')
        // rightListContent.innerHTML = ''
    axios.get(url)
        .then(response => {
            resourceData = response.data

            let iconFeatrueList = []
            resourceData.map(item => {
                //实例化Vector要素，通过矢量图层添加到地图容器中


                iconFeature.setStyle(createLabelStyle(item.icon));
                iconFeatrueList.push(iconFeature)
            })


            map.addLayer(iconLayer);
        })
}

//定义三维视图的主要类
var webGlobe;
//定义地形图层类
var terrainlayer;

//加载三维视图
function init() {
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    webGlobe = new Cesium.WebSceneControl('mapGrid', { terrainExaggeration: 1, infoBox: true, });
    add()
    webGlobe.showPosition('coordinate_location');
    renderChart()
    setInterval(() => {
        renderWeather(map)
    }, 20000);
    renderWeather(map)
    initBaseStation()
    var options = {};

    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
    options.defaultResetView = Cesium.Cartographic(114.271851, 22.505400, 600.0)
        // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    options.enableCompass = true;
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    options.enableZoomControls = true;
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    options.enableDistanceLegend = true;
    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    options.enableCompassOuterRing = true;



    CesiumNavigation.umd(webGlobe.viewer, options);
}

function add() {
    remove();
    if (webGlobe) {
        //添加MapGIS发布的地形图层,场景索引,图层render索引
        terrainlayer = webGlobe.append('http://192.168.3.53:6163/igs/rest/g3d/dem_q', {});
        var Options = {
            destination: Cesium.Cartesian3.fromDegrees(114.271851, 22.505400, 3000.0),
            duration: 3,
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-10),
                roll: 0.0
            }
        };
        webGlobe.viewer.camera.flyTo(Options);
        tdLayer = webGlobe.appendTDTuMap({
            //天地图经纬度数据
            url: 'http://t0.tianditu.com/DataServer?T=vec_c&X={x}&Y={y}&L={l}',
            //开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
            token: "9c157e9585486c02edf817d2ecbc7752",
            //地图类型 'vec'矢量 'img'影像 'ter'地形
            type: "img"
        });
        //服务地址
        wmsLayer = webGlobe.appendWMSTile("http://192.168.3.53:6163/igs/rest/ogc/doc/grid50_q/WMSServer",
            "grid50_q", {});
        wmsLayer.alpha = 0.2;
        wmsLayer.brightness = 2.0;
        webGlobe.viewer.scene.imageryLayers.raise(wmsLayer);
        // setInterval(function() {
        //     console.log(12312321)

        //     new_wmsLayer = webGlobe.appendWMSTile("http://192.168.3.53:6163/igs/rest/ogc/doc/grid50_q/WMSServer",
        //         "grid50_q", {});
        //     new_wmsLayer.alpha = 0.0;
        //     new_wmsLayer.brightness = 2.0;
        //     webGlobe.viewer.scene.imageryLayers.raise(new_wmsLayer);
        //     setTimeout(function() {
        //         webGlobe.viewer.scene.imageryLayers.remove(wmsLayer);
        //         wmsLayer = new_wmsLayer;
        //         wmsLayer.alpha = 0.2
        //     }, 10000)

        // }, 30000)

        setInterval(function() {
            let url = 'http://192.168.3.53:8095/forestfire/calc'
            axios.get(url)
                .then(response => {

                })
        }, 30000)
        addLabel()
    }
}

function remove() {
    if (terrainlayer) {
        //删除添加的地形图层
        webGlobe.deleteTerrain();
    }
}

function init3d() {
    renderChart()

    /********地图创建 */
    //地图范围
    var extent = [834431.640800001, 2504856.1291, 838231.640800001, 2508856.1291];
    var center = ol.extent.getCenter(extent);
    //投影坐标系
    var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent });
    //瓦片的显示名称
    var title_name = "MapGIS IGS TileLayer";
    //瓦片地图的名称
    var TileName = "ygjzy";

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


    /******** 地图创建 end***********/

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
        // map.on('click', clickFunc);

    $('.ol-zoom-out').text('-')


};

// 插件的显示控制
function controlsDispaly(evt) {
    let itemId = evt.target.id
    let flag = true
    if (itemId && itemId != 'visualControl') {
        stopAllCalc()
        removeEntities()
        $('.visual-tool').hide()
    } else if (itemId) {
        stopAllCalc()
    }

    switch (itemId) {

        case 'visualControl':
            {
                console.log($('.visual-tool').css('display'))
                if ($('.visual-tool').css('display') != 'none') {
                    $('.visual-tool').hide()
                    removeEntities()

                } else {
                    $('.visual-tool').show()
                }
            }
            break;
        case 'distanceCalcControl':
            {
                if (!measureLengthToolFlag) {
                    lengthMeasure()
                } else {
                    stopLengthMeasure()
                }
            }
            break;
        case 'areaCalcControl':
            {
                if (!measureAreaToolFlag) {
                    areaMeasure()
                } else {
                    stopAreaMeasure()
                }
            }
            break;
        case 'triangulationControl':
            {
                if (!triangulationToolFlag) {
                    triangulationMeasure()
                } else {
                    stopTriangulationMeasure()
                }
            }
            break;
        case 'slopeControl':
            {
                if (!measureSlopeToolFlag) {
                    measureSlope()
                } else {
                    stopMeasureslope()
                }
            }
            break;
        case 'gridControl':
            {
                window.location.href = 'index.html'
            }
            break;
        case 'resourcesControl':
            {
                window.location.href = 'resource.html'
            }
            break;
        case 'baseStationControl':
            {
                initSector()
            }
            break;
        case 'zbControl':
            {
                north()
            }
            break;


    }

};

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

function north() {
    // Create an initial camera view
    var initialPosition = new Cesium.Cartesian3.fromDegrees(114.271851, 22.505400, 3000.0);
    var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0, -10, 0);
    var homeCameraView = {
        destination: initialPosition,
        orientation: {
            heading: initialOrientation.heading,
            pitch: initialOrientation.pitch,
            roll: initialOrientation.roll
        }
    };
    var viewer = webGlobe.viewer;
    // Set the initial view
    viewer.scene.camera.setView(homeCameraView);

    // Add some camera flight animation options
    homeCameraView.duration = 1.0;
    homeCameraView.maximumHeight = 2000;
    homeCameraView.pitchAdjustHeight = 2000;
    homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
    // Override the default home button
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(e) {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
    });

}