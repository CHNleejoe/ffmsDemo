var map = null;
var VecLayer = null;
var screenPixel_ = []
var scaleNum = ''

// 测距或者测面积类型
var calcType = ''

// 图层选择功能数据
var iconLayer = null,
    hasRunResourceFunc = false,
    queryClickData = true;

// 时间次数计数（计算气象图层替换时间
var timesNum = 0;

// map on 函数
var clickFunc;
// 获取popup元素
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');

window.onload = initGrid

// 鹰眼组件
var overviewMapControl = {}
    // ol.lang.setCode("zh-CN")
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

// 定时启动计算网格
setInterval(function() {
    let url = 'http://192.168.3.53:8095/forestfire/calc'
    axios.get(url)
        .then(response => {

        })
}, 30000)


/**
 * 在地图容器中创建一个Overlay--网格和气象站数据
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
    var src = 'imgs/qxz.png'

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
                scale: 0.1,
                //透明度
                opacity: 0.8,
                //图标的url
                src
            })
        )
    });
}

// 获取并渲染气象资源数据
function renderResource(map) {
    if (hasRunResourceFunc) return
    hasRunResourceFunc = true
    var rightListContent = document.getElementById('resourseList')
    innerHtml = ''
        // console.log(timesNum, ":", new Date(), layerName)

    let url = 'http://192.168.3.69:8095/forestfire/getWeather'
    axios.get(url)
        .then(response => {
            resourceData = response.data

            let iconFeatrueList = []
            resourceData.map(item => {
                //实例化Vector要素，通过矢量图层添加到地图容器中
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point([parseFloat(item.longitude), parseFloat(item.latitude)]),
                    properties: {
                        ...item
                    },
                });

                iconFeature.setStyle(createLabelStyle(item.icon));
                iconFeatrueList.push(iconFeature)
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
                features: iconFeatrueList,
                crossOrigin: "Anonymous"
            });
            //矢量标注图层
            iconLayer = new ol.layer.Vector({
                source: vectorSource,
                zIndex: 5,
                lNameDisplay: '气象数据'
            });
            loadLayersControl(map, "layerTree");

            layerName.map((item, index) => {
                if (item == '气象数据') {
                    iconLayer.setVisible(layerVisibility[index])
                    map.removeLayer(layer[index])
                    layer[index] = iconLayer
                }
                // console.log(timesNum, ":", new Date(), layerName, layer)
            })
            map.addLayer(iconLayer);
            hasRunResourceFunc = false
            timesNum++

        })
}

function initGrid() {

    let that = this;
    //地图范围
    var extent = [114.252997933675, 22.6169358861508, 114.290857010902, 22.6536080529234]
        //投影坐标系
    var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent });
    //中心点
    var center = ol.extent.getCenter(extent);
    //图层显示名称
    var gdbps = ['GDBP://MapGisLocal/grid_q/sfcls/grid50_q'];

    var title_name = "MapGIS IGS TileLayer";
    //瓦片地图的名称
    var TileName = "ygjz_q";

    TileLayer = new Zondy.Map.TileLayer(title_name, TileName, {
        ip: "192.168.3.53",
        crossOrigin: "Anonymous",
        lNameDisplay: '影像图',
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
                collapsible: false
            })

        }).extend([overviewMapControl, mousePositionControl])
    });

    renderResource(map)
        // 定时刷新气象和专题图数据
    setInterval(function() {
        renderResource(map)
        updateTheme()
    }, 10000)
    renderChart()

    var oper, themesInfoArr;
    //初始化地图文档图层对象
    var docLayer = new Zondy.Map.Doc("MapGIS IGS MapDocLayer", "grid50_q", {
        ip: "192.168.3.53",
        port: "6163", //访问IGServer的端口号，.net版为6163，Java版为8089
        zIndex: 5,
        opacity: 0.6,
        crossOrigin: "Anonymous",
        lNameDisplay: '网格图层'
    });

    var docLayer_1 = new Zondy.Map.Doc("MapGIS IGS MapDocLayer", "grid50_q", {
        ip: "192.168.3.53",
        port: "6163", //访问IGServer的端口号，.net版为6163，Java版为8089
        zIndex: 5,
        opacity: 0.6,
        crossOrigin: "Anonymous",
        lNameDisplay: '气象插值数据'
    });

    // 将地图文档图层加载到地图中
    map.addLayer(docLayer);
    // map.addLayer(docLayer_1);
    // 初始化专题图服务类
    oper = new Zondy.Service.ThemeOper();
    oper.ip = "192.168.3.53";
    oper.port = "6163";
    oper.crossOrigin = "Anonymous";
    oper.guid = docLayer.getSource().guid;
    createTheme()

    //创建网格专题图
    function createTheme() {
        //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
        themesInfoArr = [];
        themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
        //设置图层名层
        themesInfoArr[0].LayerName = "grid50";
        //初始化指定图层的专题图信息对象，之后再给该数组赋值
        themesInfoArr[0].ThemeArr = [];
        //实例化CUniqueTheme类
        themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CUniqueTheme();
        themesInfoArr[0].ThemeArr[0].Name = "单值专题图";
        //指定为单值的专题图
        themesInfoArr[0].ThemeArr[0].IsBaseTheme = true;
        themesInfoArr[0].ThemeArr[0].Visible = true;
        themesInfoArr[0].ThemeArr[0].GeoInfoType = "Reg";
        themesInfoArr[0].ThemeArr[0].Expression = "fireLevel";

        //未分段值的图形信息设置
        themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo();
        themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = "未分类";
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo = new Zondy.Object.Theme.CRegInfo();
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Ovprnt = true;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Angle = 0;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.EndClr = 0;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillClr = 2;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillMode = 0;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FullPatFlg = true;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatClr = 45;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatHeight = 5;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatWidth = 5;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatID = 0;
        themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.OutPenW = 1;

        //每段专题绘制信息
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr = [];
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0] = new Zondy.Object.Theme.CUniqueThemeInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Value = "1";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Caption = "低风险";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].IsVisible = true;
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo.FillClr = 271;

        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1] = new Zondy.Object.Theme.CUniqueThemeInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].Value = "2";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].Caption = "较低风险";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].IsVisible = true;
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].RegInfo = new Zondy.Object.Theme.CRegInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].RegInfo.FillClr = 616;

        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[2] = new Zondy.Object.Theme.CUniqueThemeInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[2].Value = "3";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[2].Caption = "高风险";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[2].IsVisible = true;
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[2].RegInfo = new Zondy.Object.Theme.CRegInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[2].RegInfo.FillClr = 153;

        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[3] = new Zondy.Object.Theme.CUniqueThemeInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[3].Value = "4";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[3].Caption = "较高风险";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[3].IsVisible = true;
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[3].RegInfo = new Zondy.Object.Theme.CRegInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[3].RegInfo.FillClr = 91;

        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[4] = new Zondy.Object.Theme.CUniqueThemeInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[4].Value = "5";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[4].Caption = "极高风险";
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[4].IsVisible = true;
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[4].RegInfo = new Zondy.Object.Theme.CRegInfo();
        themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[4].RegInfo.FillClr = 6;

        //给指定地图文档指定图层添加专题图
        oper.addThemesInfo("grid50_q", "0", themesInfoArr, onUniqueTheme);
    }
    //更新专题图
    function updateTheme() {
        oper.removeThemesInfo("grid50_q", "0", onAddTheme);
    }

    function onAddTheme(flg) {
        return createTheme()
    }
    //调用专题图成服务功后的回调
    function onUniqueTheme(flg) {
        if (flg) {
            //刷新地图，即重新加载生成专题图后的地图文档
            docLayer.refresh();
        } else {
            return false;
        }
    }

    /************     图层测试      ************** */

    // 添加pop对象
    map.addOverlay(popup);

    //创建一个用于查询的点形状
    var pointObj;
    clickFunc = function(evt) {
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
            addFeatrueInfo(info, 2);
            //设置popup的位置
            popup.setPosition([parseFloat(info.longitude), parseFloat(info.latitude)]);
            // return
        } else {
            if (!queryClickData) {
                popup.setPosition(undefined)
                return
            }
            var screenPixel = evt.coordinate,
                clickFeature = null,
                clickLayer = null;
            pointObj = new Zondy.Object.Point2D(screenPixel[0], screenPixel[1]);
            //设置查询点的搜索半径
            pointObj.nearDis = 0.00001;
            screenPixel_ = screenPixel
            queryByPnt()
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

    // 查询地图msv对象的要素信息
    function queryByPnt() {
        //显示进度条

        // startPressBar();
        // $('#resultShow').tabs('select', 1);
        //初始化查询结构对象，设置查询结构包含几何信息
        var queryStruct = new Zondy.Service.QueryFeatureStruct();
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true;
        //是否包含属性信息
        queryStruct.IncludeAttribute = true;
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false;
        //指定查询规则
        var rule = new Zondy.Service.QueryFeatureRule({
            //是否将要素的可见性计算在内
            EnableDisplayCondition: false,
            //是否完全包含
            MustInside: false,
            //是否仅比较要素的外包矩形
            CompareRectOnly: false,
            //是否相交
            Intersect: true
        });
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryByLayerParameter(gdbps, {
            geometry: pointObj,
            resultFormat: "json",
            rule: rule,
            struct: queryStruct
        });
        //设置查询分页号
        queryParam.pageIndex = 0;
        //设置查询要素数目
        queryParam.recordNumber = 200000;
        //实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
            ip: "192.168.3.53",
            crossOrigin: "Anonymous",
            port: "6163" //访问IGServer的端口号，.net版为6163，Java版为8089
        });
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(querySuccess, queryError, "POST");
    }
    //查询失败回调
    function queryError(e) {
        //停止进度条
        console.error('err')
            // stopPressBar();
    }
    //查询成功回调
    function querySuccess(result) {
        var format = new Zondy.Format.PolygonJSON();
        //将MapGIS要素JSON反序列化为ol.Feature类型数组
        var features = format.read(result);
        //示例标注点北京市的信息对象
        if (result.SFEleArray) {
            //未定义popup位置
            console.log(features)

            popup.setPosition(undefined);
            //失去焦点
            // closer.blur();
            var beijing = screenPixel_;

            var featuerInfo = {
                geo: beijing,
                att: {
                    //标注信息的标题内容
                    title: "林火风险等级",
                    //标注内容简介
                    fireLevel: features[0].values_.values_.fireLevel,
                    x: features[0].values_.geometry.flatCoordinates[0],
                    y: features[0].values_.geometry.flatCoordinates[1],
                }
            }

            //清空popup的内容容器
            content.innerHTML = '';
            //在popup中加载当前要素的具体信息
            addFeatrueInfo(featuerInfo, 1);
            if (popup.getPosition() == undefined) {
                //设置popup的位置
                popup.setPosition(featuerInfo.geo);
            }
        } else {
            //未定义popup位置
            popup.setPosition(undefined);
            //失去焦点
            // closer.blur();
        }
    }
};

// 插件的显示控制
function controlsDispaly(evt) {
    let itemId = evt.target.id
    var controls = map.getControls()
    let flag = true
    popup.setPosition(undefined)
    markPopup.setPosition(undefined)

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
                window.location.href = 'resource.html'
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
        case 'layersControl':
            {
                $('.layerControl').css('display') != 'block' ? $('.layerControl').show() : $('.layerControl').hide()
                    //加载图层列表数据
                if (!hasRunResourceFunc) {
                    layer = []
                    layerName = []
                    layerVisibility = []
                }
                loadLayersControl(map, "layerTree");

            }
            break;
    }

};

function renderFireLevel(info, item) {
    if (item.attr !== 'fireLevel') {
        return info.att[item.attr]
    }
    var word = ''
    info.att[item.attr] == 1 ? word = '低风险' : ''
    info.att[item.attr] == 2 ? word = '较低风险' : ''
    info.att[item.attr] == 3 ? word = '高风险' : ''
    info.att[item.attr] == 4 ? word = '较高风险' : ''
    info.att[item.attr] == 5 ? word = '极高风险' : ''
    return word
}
/**
 * 动态创建popup的具体内容
 * @param {string} title
 */
function addFeatrueInfo(info, type) {
    var renderList = []
    if (type == 1) {
        renderList = [
            { class: 'markerInfo', label: '林火网格风险等级', attr: '' },
            { class: 'markerText', label: '经度：', attr: 'x' },
            { class: 'markerText', label: '纬度：', attr: 'y' },
            { class: 'markerText', label: '林火风险等级：', attr: "fireLevel" },
        ]
    } else if (type == 2) {
        renderList = [
            { class: 'markerInfo', label: '气象数据', attr: '' },
            { class: 'markerText', label: '气象站名称：', attr: 'weatherStationName' },
            { class: 'markerText', label: '经度：', attr: 'longitude' },
            { class: 'markerText', label: '纬度：', attr: 'latitude' },
            { class: 'markerText', label: '温度：', attr: "airTemperature", unit: '℃' },
            { class: 'markerText', label: '湿度：', attr: "humidity", unit: '%' },
            { class: 'markerText', label: '降雨量：', attr: "rainFall", unit: 'ml' },
            { class: 'markerText', label: '风速：', attr: "windSpeed", unit: 'm/s' },
        ]
    }
    renderList.map(item => {
        var elementDiv = document.createElement('div');
        elementDiv.className = item.class;
        if (type == 1) {
            setInnerText(elementDiv, item.label + (item.attr == '' ? '' : renderFireLevel(info, item)));
        } else {
            setInnerText(elementDiv, item.label + (item.attr == '' ? '' : (info[item.attr] + (item.unit ? item.unit : ''))));
        }
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
        color: [
            '#970325',
            '#B44516',
            '#E3D046',
            '#0C00BF',
            '#66B445',
        ],
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
            emphasis: {
                label: {
                    show: true,
                    fontSize: '24',
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