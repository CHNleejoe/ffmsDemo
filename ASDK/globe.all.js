/// <reference path="../demos/SceneLaunch/SceneLaunchFun_test.htm" />
/**
 * 地球支持事件类型
 * @readonly
 * @enum {String}
*/
var EventType = {
    Initialize: "initialize",

    FinishedAnalyze: "finishedAnalyze",
    FinishedDraw: "finishedDraw",
    PickLabel: "pickLabel",
    PickModel: "pickModel",
    LButtonDblClk: "leftDbClick",
    LButtonDown: "leftMouseDown",
    LButtonUp: "leftMouseUp",

    MouseMove: "mouseMove",
    MouseWheel: "mouseWheel",
    KeyDown: "keyDown",
    KeyUp: "keyUp",

    MButtonDown: "mButtonDown",
    MButtonUp: "mButtonUp",

    Jumped: "jumped",
    PickElement: "pickElement",

    RButtonDblClk: "rightDbClick",
    RButtonDown: "rightMouseDown",
    RButtonUp: "rightMouseUp",
    CreationComplete: "creationComplete",

    FinishedAddDoc: "finishedAddDoc",
    FinishedLoadCache: "finishedLoadCache"
};
/**
 * 鼠标事件的枚举值
 * @readonly
 * @enum {String}
 */
var MouseType = {
    Pan: "pan",
    ZoomInByRect: "zoomInByRect",
    ZoomOutByRect: "zoomOutByRect"
};
/**
 * 缓存类型，如果需要生成缓存，将bin目录下的WebCacheCfg.xml文件type设为1，数据库缓存type值对应为2，不缓存type值对应为0
 * @readonly 
 * @enum {Int}
*/
var CachesType = {
    ImageCache: 1,
    DBcache: 2,
    NullCache: 0
};
/**
 * 图层类型
 * @readonly 
 * @enum {Int}
*/
var CachesLayerType = {
    Covering: 0,
    Terrain: 2,
    Model: 3,
    Label: 4
};
 /**
    * 获取ocx路径
     * @returns {string}
    */
    this.GetAppPath = function () {
        this.assertOCX();
        return this._ocxObj.object.GetAppPath();
    };

/**
* 当前进行的分析类别,主要为地形分析的各个小类
 * @readonly 
* @enum {Int}
*/
var AnalyseType = {
    Null: "",
    //洪水淹没分析
    FLoodAnalyze: 1,
    //填挖方分析
    CutFill: 2,
    //可视域分析
    ViewShed: 3,
    //单点地形参数查询分析
    PointQuery: 4,
    //两点通视性分析
    Visible: 5,
    //坡度分析
    Slope: 6,
    //坡向分析
    Aspect: 7
};
/**
* 进行的分析类别，主要为六大类别
 * @readonly 
* @enum {Int}
*/
var EnumCommToolType = {
    Unknown: 0,
    //地形分析
    TerrainAnalyze: 1,
    //爆炸演示分析
    BombShow: 2,
    //日照分析
    SunLight: 3,
    //剖切面分析
    TerrainCut: 4,
    //模型编辑分析
    ModelEdit: 5,
    //量算分析
    Measure: 6
};
/**
 * 图层的状态
 * @readonly 
 * @enum {Int}
*/
var EnumLayerState = {
    StateDelete: 1,
    StateAppend: 2,
    StateVisble: 3,
    StateUnVisble: 4,
    StateActive: 5
};
/**
 * 绘制二维元素的绘制方式的枚举类
 * 0:线型，1:矩形, 2:多边形, 3:圆形
 * @readonly 
 * @enum {Int}
 */
var Enum2DShapeType = {
    TypeLine: 0,
    TypeRect: 1,
    TypePolygon: 2,
    TypeCircle: 3
};
/**
 * 绘制二维元素的绘制线的枚举类
 * 0:实线,1:折线,2:点线,3:折线点
 * @readonly 
 * @enum {Int}
*/
var Enum2DLineType = {
    TypeSolid: 0,
    TypePolyLine: 1,
    TypePointLine: 2,
    TypePolyLinePoint: 3
};
/**
* 绘制三维元素的绘制方式的枚举类
 * @readonly 
* @enum {Int}
*/
var Enum3DShapeType = {
    Type3DPoint: 0,
    Type3DLine: 1,
    TypeSurface: 2
};
/**
* 地图文档的类型
 * @readonly 
* @enum {Int}
*/
var DocType = {
    TypeDoc: 0,
    TypeRaster: 1,
    TypeG3D: 2,
    TypeLayer: 3,
    TypeOGCwmts: 4
};
/**
* 天地图叠加图层的类型
 * @readonly 
* @enum {String}
*/
var EnumTDTType = {
    Vector: "vec",
    VectorAno: "cva",
    Raster: "ims",
    RasterAno: "cia",
    Terrain: "ter",
};
/**
* 模型显示的特效类型
 * @readonly 
* @enum {Int}
*/
var EnumModelDispType = {
    Flash: 1,
    Highlight: 2,
    Translucence: 3
};
/**
* 三维切割类型
 * @readonly 
* @enum {Int}
*/
var EnumMdlCutType = {
    MdlCut_SurByLin: 0,//根据线创建面
    MdlCut_SurByXYZ: 1,//平面切割
    MdlCut_SurByAB: 2,//任意面切割
    MdlCut_Cyliner: 3,//圆柱体切割
    MdlCut_Box: 4,//长方体切割
    MdlCut_Pipe: 5,//隧道模拟切割
    MdlCut_EntityByLin: 6//根据折线创建体
};
/**
* 事件处理类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Event = function () {
    /**
    * events listener functions  
    * @type {Array.<Hashtable>}
    */
    this.listeners = {};
    /**
    * list of support application events 
    * @type {Array.<String>}
    */
    this.eventTypes = [];
    /**
    * 绘图监听器
    * @type {Array.<Hashtable>}
    */
    this.drawListeners = {};
    /**
    * 派发事件
    * @param {EventType} type 事件类型
    * @param {Object} args 事件传入参数
    */
    this.dispatchEvent = function (type, args) {
        if (!type) return;
        var listeners = this.listeners[type];
        // fast path
        if (listeners && listeners.length > 0) {
            for (var i = 0; i < listeners.length; i++) {
                var callback = listeners[i];
                // bind the context to callback.obj
                if (callback) {
                    if (callback.func.apply(callback.obj, args) === false) {
                        break;
                    }
                }
            }
        }
    };
    /**
    * 添加事件类型
    * @param {EventType} type 事件类型
    */
    this.addEventType = function (type) {
        if (!this.listeners[type]) {
            this.eventTypes.push(type);
            this.listeners[type] = [];
        }
    };
    /**
    * 移除事件类型
    * @param {EventType} type 事件类型
    */
    this.removeListeners = function (type) {
        if (type && this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    };
    /**
    * 注册事件
    * @param {EventType} type 事件类型
    * @param {Function} func 函数
    * @param {object} 对象
    */
    this.register = function (type, func, obj) {
        if ((func != null) && this.eventTypes.indexOf(type) > -1) {
            if (obj == null) {
                obj = window;
            }
            var listeners = this.listeners[type];
            listeners.push({ obj: obj, func: func });
        }
    };
    /**
    * 反注册事件
    * @param {EventType} type 事件类型
    * @param {Function} func 函数
    * @param {object} 对象
    */
    this.unregister = function (type, func, obj) {
        if (obj == null) {
            obj = window;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                if ((listeners[i] && listeners[i].obj == obj) && listeners[i].func == func) {
                    listeners.splice(i, 1);
                    i--;
                    if (listeners && (listeners.length > 0)) continue;
                    break;
                }
            }
        }
    };
};
/**
* @classdesc 
* 三维球核心类，直接与三维地球交互的主要接口都在该类中<br/>
* {@link Globe#addEventListener|addEventListener} 事件绑定方法,
* {@link Globe#removeEventListener|removeEventListener} 注销方法 
* 
* @example
*  var globe = new Globe();
*  globe.load(function(){
*      console.log('load success');
*   });
*  globe.addEventListener(EventType.MouseWheel, function () {
*      console.log(arguements);
*  });
* 
* @author 创建者:姚志武 2014-04-28
* @class
*/
var Globe = function () {
    var downUrl = "../Zondy Earth Professional.exe"; //如果机器没有安装控件，指定控件的下载地址
    var style = "left:0px;top:0px;width:100%;height:100%;position:absolute;z-index:0;";

    /**
    * 导航条是否显示标志位
    * @type {boolean}
    */
    this._isNavigateVisible = true;
    /**
    * 状态栏是否显示标志位
    * @type {boolean}
    */
    this._isPlantUIStateVisible = true;
    /**
    * 调试坐标系是否显示标志位
    * @type {boolean}
    */
    this._isDebugGrid = false;
    /**
    * 格网是否显示标志位
    * @type {boolean}
    */
    this._isGridNet = false;

    /**
    * 插件元素对象
    * @type {Object}
    */
    this._ocxObj = null;

    /**
    * 文档对象信息,对应对象为ClassLib.js中的MapDocObj，这里使用数组保存
    * @type {Array.<MapDocObj>}
    */
    this._docObj = [];
    /**
    * 网络叠加图层,两个属性：id和name，例如：天地图或谷歌图,这里使用数组
    * @type {Object}
    */
    this._overMapObj = [];
    /**
    * 添加的kml或gml数据,三个两个属性：id、name、类型，类型分为kml和gml,这里使用数组
    * @type {Object}
    */
    this._xmlLayerObj = [];
    /**
    * 用于存放绘制的图形要素返回的id,便于删除操作,每个要素由id和pnts组成
    * @type {Array.<string>}
    */
    this._drawElements = [];
    /**
    * 当前正在绘制二维要素的点集
    * @type {string}
    */
    this.currentElePnts = "";
    /**
    * 用于存放绘制的三维图形要素返回的id,便于删除操作
    * @type {Array.<string>}
    */
    this._draw3DElements = [];
    /**
    * 用于存放动画漫游的集合，每个漫游由name和id组成，name自定义，id为返回值
    * @type {Array.<string>}
    */
    this._animFlyElements = [];
    /**
    * 当前正在进行的分析类别
    * @type {AnalyseType}
    */
    this._analyseOper = "";
    /**
    * 当前分析得到的结果
    * @type {string}
    */
    this._analyseInfo = null;
    /**
    * 相关事件的数组
    * @type {Event}
    */
    this._events = null;
    /**
    * Globe对象的加载方法，主要进行控件相关事件的初始化操作
    * @param {function}
    */
    this.load = function (callbackFun) {
        if (new Util().isIE) {

            //对事件信息进行初始化操作
            if (!this._events) {
                this._events = new Event();

                for (var t in EventType) { //添加事件类型
                    this._events.addEventType(EventType[t]);
                }
            }
            var globe = this;
            window._MapGIS_EarthControl_OnLoad = function (obj) {
                var ocx = document.getElementById('MapGIS_EarthControl');
                if (ocx && ocx.object) { //初始化注册插件事件
                    ocx.onreadystatechange = null;

                    var ocxEventType = ["FinishedAnalyze", "FinishedDraw", "PickLabel", "PickModel", "KeyDown",
                        "KeyUp", "MouseMove", "MouseWheel", "MButtonDown", "MButtonUp", "Jumped", "PickElement",
                        "LButtonDblClk", "LButtonDown", "LButtonUp", "RButtonDblClk", "RButtonDown", "RButtonUp",
                        "FinishedAddDoc", "FinishedLoadCache"];
                    for (var i = 0; i < ocxEventType.length; i++) {
                        (function (eventName) {
                            var fn = function () {
                                var fun = "_on" + eventName;
                                globe[fun].apply(globe, arguments);
                            };
                            ocx.attachEvent ? ocx.attachEvent(eventName, fn) : ocx.addEventListener(eventName, fn);
                        })(ocxEventType[i]);
                    }

                    ocx.attachEvent ? ocx.attachEvent('Initialized', function () {
                        globe._onCreationComplete(arguments);
                    }) : ocx.addEventListener('Initialized', function () {
                        globe._onCreationComplete(arguments);
                    });

                    if (callbackFun) {
                        callbackFun(ocx.globeObj);
                    }
                }
                else {
                    alert("未能获取到插件对象,请确保插件已安装或已启用!");
                }
                window._MapGIS_EarthControl_OnLoad = null;
            }
            // 修改说明：根据页面中是否存在MapGIS_EarthControl来判断是否重新写入插件
            // 修改人：姚志武 2014-04-30
            if (document.getElementById('MapGIS_EarthControl') != null)
                window._MapGIS_EarthControl_OnLoad();
            else
                document.write('<object onreadystatechange="_MapGIS_EarthControl_OnLoad()" id = "MapGIS_EarthControl" codebase="' + downUrl + '" classid = "clsid:56D6E862-F22D-41EF-B517-F2255A4250CB" style="' + style + '"/>');

            this._ocxObj = document.getElementById('MapGIS_EarthControl');
        }
        else {
            document.write('<div style="font-size: 48px;color: red;text-align: center;margin-top: 30px;">抱歉,三维地球控件只支持IE浏览器!</div>');
        }
    };
    /**
     * @private 
     * 验证ocx控件是否正常
     */
    this.assertOCX = function () {
        if (!(this._ocxObj && this._ocxObj.object)) {
            throw new exception('activeX控件加载失败，不能正常调用');
        }
    }
    /**
    * 获取插件版本号
    * @returns {string}
    */
    this.getVersionNumber = function () {
        this.assertOCX();
        return this._ocxObj.object.GetVersionNumber();
    };
    /**
    * 获取插件的相关信息,弹出Windows控件
    */
    this.showAboutBox = function () {
        this.assertOCX();
        this._ocxObj.object.AboutBox();
    };
    /**
    * 添加屏幕绘制对象
    * @param {string} keyName 当前叠加对象id
    * @param {string} imgPath 图片具体地址
    * @param {float} x 叠加要素的x
    * @param {float} y 叠加要素的y
    * @param {float} scaleX 叠加要素x方向的缩放比例
    * @param {float} scaleY 叠加要素y方向的缩放比例
    */
    this.addOverlay = function (keyName, imgPath, x, y, scaleX, scaleY) {
        this.assertOCX();
        this._ocxObj.object.AddOverlay(keyName, imgPath, x, y, scaleX, scaleY);
    };
    /**
    * 通过名称移除屏幕绘制对象，对应addOverlay方法 
    * @param {string} keyName 当前叠加对象id
    */
    this.removeOverlayByName = function (keyName) {
        this.assertOCX();
        this._ocxObj.object.RemoveOverlay(keyName);
    };
    /**
    * 根据服务名称获取指定的doc
    * @param {string} name 地图服务名称
    * @return {MapDocObj} 返回地图服务对象，没有则返回null
    */
    this.getDocByName = function (name) {
        for (var x = 0; x < this._docObj.length; x++) {
            if (this._docObj[x].name === name)
                return this._docObj[x];
        }
        return null;
    };
    /**
    * 加载地图文档,方法内部根据服务不同进行添加，其中type为EnumerVar.js中的DocType
    * 目前主要支持普通地图服务（动态裁图）、瓦片、三维服务、OGC的WMTS，后期进行扩展
    * @param {string} name 地图服务名称
    * @param {string} ip 服务访问时的ip值
    * @param {string} port 服务访问时的端口号
    * @param {DocType} type 服务类型
    * @param {string} state 起始加载时的状态信息，为json结构，目前包括的参数有如下
    * visible:一开始加载时是否可见
    * terrainUrl：依附的地形层地址
    * renderRange:额外的范围
    * handleUrl:文档指定一个转发地址
    * 例如：'{"terrainUrl":"http://192.168.10.204:6163/igs/rest/g3d/hainan/0", 
    *       "renderRange":{"xMax":111.31025093083733,"xMin":108.600917597504,
    *                      "yMax":20.1665453036538,"yMin":17.457211970320465},
    *       "visible":true}'
    * @return {string} 返回添加服务后返回的id，添加失败则返回-1
    */
    this.addDoc = function (name, ip, port, type, state) {
        this.assertOCX();
        //处理有中文字符的情况
        var nameIE = encodeURIComponent(name);
        //可以添加同名的文档的。但是记录的id不一样
        if (this._ocxObj && this._ocxObj.object && name && ip && port) {
            var u = "";
            //根据文档类型构建不同的url
            if (type === DocType.TypeG3D)
                u = 'http://' + ip + ':' + port + '/igs/rest/g3d/' + nameIE;
            else if (type === DocType.TypeDoc || type === DocType.TypeRaster)
                u = 'http://' + ip + ':' + port + '/igs/rest/ims/' + nameIE;
            else if (type === DocType.TypeOGCwmts) {
                u = 'http://' + ip + ':' + port + '/igs/rest/ogc/' + nameIE;
            } else
                return -1;
            var id = -1;
            if (state)
                id = this._ocxObj.object.AppendEx(u, state);
            else
                id = this._ocxObj.object.Append(u);
            if (id > 0) {
                var docObj = new MapDocObj();
                docObj.url = u;
                docObj.id = id;
                docObj.name = name;
                docObj.ip = ip;
                docObj.port = port;
                docObj.type = type;
                this._docObj.push(docObj);
                return id;
            }
        }
        return -1;
    };
    /**
    * 根据发布的文档模型图层添加模型数据
    * @param {string} name 发布的三维地图文档
    * @param {string} layerRenderIndex 模型的图层索引
    * @param {string} ip IP地址
    * @param {string} port 端口号
    * @return {string} 返回添加服务后返回模型的id，添加失败则返回-1
    */
    this.appendGeomByUrl = function (gdbpurl, layerRenderIndex, ip, port) {
        this.assertOCX();
        //处理有中文字符的情况
        // var url = 'http://' + ip + ':' + port + '/igs/rest/g3d/GetDataByURL?gdbp=' + encodeURIComponent(gdbpurl) + "&keepgeometry=true";
        //根据URL加载数据库中的整个三维简单要素类
        var url = 'http://' + ip + ':' + port + '/igs/rest/g3d/GetDataByURL?gdbp=' + encodeURIComponent(gdbpurl) + "&keepgeometry=true";
        //var url = 'http://' + ip + ':' + port + '/igs/rest/g3d/GetDataByURL?name=' + encodeURIComponent(name) + '&layerindex=' + layerRenderIndex + '&keepgeometry=true&id=1';
        return this._ocxObj.object.AppendGeomByUrl(url);
    };
    /**
    * 设置指定场景地图的可见性
    * @param {string} id 添加完场景地图后的返回值
    * @param {boolean} isShow true或者false，表示是否可见
    */
    this.setSceneMapVisible = function (id, isShow) {
        this.assertOCX();
        if (isShow === false)
            this._ocxObj.object.SetSceneState(id, -1, EnumLayerState.StateUnVisble);
        else
            this._ocxObj.object.SetSceneState(id, -1, EnumLayerState.StateVisble);
    };
    /**
    * 添加二维服务中的图层，可以设置查询参数对象
    * @param {string} ip 服务访问时的ip值
    * @param {string} port 服务访问时的端口号
    * @param {MapDocQuery} mapDocQuery 查询参数，使用MapDocQuery.js中的对象
    * @return {int} 返回添加服务后返回的id，添加失败则返回-1
    */
    this.addLayer2DByQuery = function (ip, port, mapDocQuery) {
        this.assertOCX();
        if (mapDocQuery instanceof MapDocQuery) {
            //构建查询url
            var querystring = 'query?guid=' + Math.random();
            //构建查询参数
            if (mapDocQuery.geometryType && mapDocQuery.geometry) {
                //这里可以进行进一步的参数验证
                querystring += '&geometryType=' + mapDocQuery.geometryType + '&geometry=' + mapDocQuery.geometry;
            }
            if (mapDocQuery.where)
                querystring += '&where=' + mapDocQuery.where;
            if (mapDocQuery.objectIds)
                querystring += '&objectIds=' + mapDocQuery.objectIds;
            if (mapDocQuery.pageCount)
                querystring += '&pageCount=' + mapDocQuery.pageCount;

            var url = "http://" + ip + ":" + port + "/igs/rest/mrfs/docs/" + mapDocQuery.docName +
                "/" + mapDocQuery.mapIndex + "/" + mapDocQuery.layerID + "/" + querystring;
            var id = this._ocxObj.object.Append(url);
            if (id > 0) {
                var docObj = new MapDocObj();
                docObj.url = url;
                docObj.id = id;
                docObj.name = url;
                docObj.type = DocType.TypeLayer;
                this._docObj.push(docObj);
                return id;
            }
        }
    };
    /**
    * 删除地图服务通过服务名称
    * @param {string} name 地图服务名称
    * @return {boolean} 删除成功返回true，失败返回false
    */
    this.removeDocByName = function (name) {
        var doc = this.getDocByName(name);
        if (!doc)
            return false;
        return this.removeDocById(doc.id);
    };
    /**
    * 删除地图文档,参数为添加完文档后的返回值
    * @param {int} id 关于参数的具体描述
    * @return {boolean} 删除成功返回true，失败返回false
    */
    this.removeDocById = function (id) {
        this.assertOCX();
        var index = -1;
        for (var x = 0; x < this._docObj.length; x++) {
            if (this._docObj[x].id === id) {
                index = x;
            }
        }
        //存在数组中
        if (index > -1) {
            var ret = this._ocxObj.object.Remove(id);
            if (ret > -1) {
                this._docObj.splice(index, 1); //数组中删除
                return true;
            }
        }
    };
    /**
    * 删除所有的地图服务
    */
    this.removeAllDoc = function () {
        this.removeAll();
        this._docObj = [];
    };
    /**
    * 添加天地图，网络地图只能添加一种
    * @param {EnumTDTType} tdtType 天地图的类型
    * @return {string} 添加完服务后返回的id值，失败则返回-1
    */
    this.addTianditu = function (tdtType) {
        this.assertOCX();
        //如果存在该网络地图，则直接返回，即统一网络图不能重复添加
        if (this.getOverMapIDByName(tdtType) !== -1)
            return -1;
        var id = -1;
        if (tdtType)
            id = this._ocxObj.object.Append("http://tdt/getwmts?" + tdtType);
        else
            id = this._ocxObj.object.Append("http://tdt/GetMap");
        if (id > 0) {
            this._overMapObj.push({ id: id, name: tdtType });
            return id;
        }
    };
    /**
    * 添加谷歌图，网络地图只能添加一种
    * @return {string} 添加完服务后返回的id值，失败则返回-1
    */
    this.addGoogleMap = function (googleType) {
        this.assertOCX();
        //如果存在该网络地图，则直接返回，即统一网络图不能重复添加
        if (this.getOverMapIDByName(googleType) !== -1)
            return -1;
        var id = this._ocxObj.object.Append("http://google/GetMap");
        if (id > 0) {
            this._overMapObj.push({ id: id, name: googleType });
            return id;
        }
    };

    /**
    * 根据网络地图名称获取添加后返回的id
    * @param {string} name 网络地图的name
    * @return {int} 返回叠加网络地图的id
    */
    this.getOverMapIDByName = function (name) {
        for (var i = 0; i < this._overMapObj.length; i++) {
            if (this._overMapObj[i].name === name)
                return this._overMapObj[i].id;
        }
        return -1;
    };
    /**
    * 删除网络叠加地图
    * @param {int} id 地图id
    * @returns {boolean} 成功true,失败false
    */
    this.removeOverMap = function (id) {
        this.assertOCX();
        //查看是否存在此网络地图
        var overMapObj = [];
        for (var x = 0; x < this._overMapObj.length; x++) {
            if (this._overMapObj[x].id !== id)
                overMapObj.push(this._overMapObj[x]);
        }
        if (overMapObj.length < this._overMapObj.length) {
            this._ocxObj.object.Remove(id);
            this._overMapObj = overMapObj;
            return true;
        }
        else
            return false;
    };
    /**
    * 删除网络叠加地图,通过名称
    * @param {string} name 地图名
    * @returns {boolean} 删除结果
    */
    this.removeOverMapByName = function (name) {
        if (this.getOverMapIDByName(name) === -1)
            return false;
        return this.removeOverMap(this.getOverMapIDByName(name));
    };
    /**
    * 删除所有的网络叠加图层
    * @returns {boolean} 删除结果
    */
    this.removeAllOverMap = function () {
        for (var x = 0; x < this._overMapObj.length; x++) {
            this._ocxObj.object.Remove(this._overMapObj[x].id);
        }
        this._overMapObj = [];
        return true;
    };
    /**
    * 对函数进行描述说明
    * @param {string} name 网络叠加地图的名称
    * @param {boolean} isShow 图层是否显示
    * @returns {int} 成功返回值大于0
    */
    this.setOverMapShowHide = function (name, isShow) {
        //通过名称获取网络叠加图的id
        var id = this.getOverMapIDByName(name);
        if (id > 0) {
            if (isShow === false)
                this.setSceneState(id, 0, EnumLayerState.StateUnVisble);
            else
                this.setSceneState(id, 0, EnumLayerState.StateVisble);
        }
    }
    /**
    * 删除指定的地图数据
    * @param {string} id 添加完数据后的返回值
    * @return {string} 移除成功后的返回值，失败则返回-1
    */
    this.removeMap = function (id) {
        this.assertOCX();
        return this._ocxObj.object.Remove(id);
    };
    /**
    * 添加覆盖图
    * @param {string} name 地图服务名,或者id值
    * @param {string} url 图片对应的url，可以是某个地图服务的出图url
    * @param {float} xmin 范围的xmin
    * @param {float} ymin 范围的ymin
    * @param {float} ymin 范围的zmin
    * @param {float} xmax 范围的xmax
    * @param {float} ymax 范围的ymax
    * @param {float} ymax 范围的zmax
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.addCovering = function (name, url, xmin, ymin, zmin, xmax, ymax, zmax) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null)
            return this._ocxObj.object.AppendCovering2(doc.id, url, xmin, ymin, zmin, xmax, ymax, zmax);
        else
            return this._ocxObj.object.AppendCovering2(name, url, xmin, ymin, zmin, xmax, ymax, zmax);
    };
    ////////////////////////////////////////////////////////////////////////////////////
    /**
    * 添加气泡
    * @param {Bubble} bubble 具体标注类：参照LabelNew.js进行相关的设置
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.addBubble = function (bubble) {
        this.assertOCX();
        //首先判断输出参数是否正确
        if (bubble instanceof Bubble) {
            return this._ocxObj.object.AppendBubble(
                bubble.text,
                bubble.x,
                bubble.y,
                bubble.z,
                bubble.sElevation,
                bubble.fontname,
                bubble.fontsize,
                bubble.fontcolor,
                bubble.opacity,
                bubble.bgColor,
                bubble.bdColor,
                bubble.width,
                bubble.height,
                bubble.scale,
                bubble.attribute
            );
        }
        return -1;
    };
    /**
    * 添加普通的标注
    * @param {Label} label 具体标注类：参照LabelNew.js进行相关的设置
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.addLabel = function (label) {
        this.assertOCX();
        //首先判断输出参数是否正确
        if (label instanceof Label) {
            return this._ocxObj.object.AppendLabel(
                label.text,
                label.x,
                label.y,
                label.z,
                label.sElevation,
                label.fontname,
                label.fontsize,
                label.fontcolor,
                label.iconScale,
                label.farDist,
                label.nearDist,
                label.attribute
            );
        }
        return -1;
    };
    /**
    * 添加带图标的标注
    * @param {LabelIcon} labelIcon 具体标注类：参照LabelNew.js进行相关的设置
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.addLabelIcon = function (labelIcon) {
        this.assertOCX();
        //首先判断输出参数是否正确
        if (labelIcon instanceof LabelIcon) {
            return this._ocxObj.object.AppendLabelIcon(
                labelIcon.text,
                labelIcon.x,
                labelIcon.y,
                labelIcon.z,
                labelIcon.sElevation,
                labelIcon.fontname,
                labelIcon.fontsize,
                labelIcon.fontcolor,
                labelIcon.iconUrl,
                labelIcon.iconXScale,
                labelIcon.iconYScale,
                labelIcon.farDist,
                labelIcon.nearDist,
                labelIcon.txtPos,
                labelIcon.attribute
            );
        }
        return -1;
    };
	/**
	* 添加带图标的标注(新增）
	*@param{string} oper 操作类型 "Add" "Delete"
    *@param {string} info 标注信息参数
	*1、添加标注info信息： var info = "{\"fontname\":\"宋体\",\"type\":\"labelicon\",\"text\":\"测试注记\",\"textpos\":7,\"enabledepth\":1,\"pos\":{\"x\":20,\"y\":23,\"z\":21},\"scale\":{\"x\":0.8,\"y\":0.8},\"fontsize\":10,\"colorvalue\":{\"alpha\":255,\"red\":128,\"green\":128,\"blue\":128},\"iconurl\":\"D:\\\\箭头.png\"}";
	* enabledepth参数设置文字是否遮挡，1为遮挡，0为不遮挡
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.addLabelIconNew = function (oper,info) {
        this.assertOCX();
        return this._ocxObj.object.LabelManger(oper, info);
    };
	
    /**
    * 该函数的目的是为了解决大坐标Label位置精度不够的问题。在显示的时候，
    * 根据注记本身的位置，和其LabelSet父节点的位置算偏移作为计算标准，减少误差。
    * @param {LabelIcon} labelIcon LabelIcon类，带图标的标注对象
    * @param {float} nodeX 注记父节点位置的x坐标
    * @param {float} nodeY 注记父节点位置的y坐标
    * @param {float} nodeZ 注记父节点位置的z坐标
    * @param {int} lblOff 图标标注相对于拾取位置的偏移，默认传参数，
    *                        从左上角、正上角、右上角、正左、正中、正右、左下角、正下角、右下角分别对应1-8的枚举值。
    * @returns {string}
    */
    this.addLabelIconByPick = function (labelIcon, nodeX, nodeY, nodeZ, lblOff) {
        this.assertOCX();
        //首先判断输出参数是否正确
        if (labelIcon instanceof LabelIcon) {
            return this._ocxObj.object.AppendLabelIconByPick(labelIcon.text, labelIcon.x, labelIcon.y, labelIcon.z, nodeX, nodeY, nodeZ,
                labelIcon.sElevation, labelIcon.fontname, labelIcon.fontsize,
                labelIcon.fontcolor, labelIcon.iconUrl, labelIcon.iconXScale, labelIcon.iconYScale,
                labelIcon.farDist, labelIcon.nearDist, labelIcon.txtPos, lblOff, labelIcon.attribute);
        }
        return "";
    };
    /**
    * 添加ToolTip
    * @param {ToolTip} toolTip 具体标注类：参照LabelNew.js进行相关的设置
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.addToolTip = function (toolTip) {
        this.assertOCX();
        //首先判断输出参数是否正确
        if (toolTip instanceof ToolTip) {
            return this._ocxObj.object.AppendToolTip(
                toolTip.text,
                toolTip.x,
                toolTip.y,
                toolTip.z,
                toolTip.sElevation,
                toolTip.bdColor,
                toolTip.width,
                toolTip.height,
                toolTip.attribute
            );
        }
        return -1;
    };
    /**
    * 添加能返回ToolTip位置的接口
    * @param {ToolTip} toolTip 具体标注类：参照LabelNew.js进行相关的设置
    * @return {string} 添加成功后的返回值，失败则返回-1
    */
    this.GetLabelPos = function (tootipname) {
        this.assertOCX();
        return this._ocxObj.object.GetLabelPos(tootipname);
    }
    /**
    * 移除指定的标注
    * @param {string} labelName 添加完标注后的返回值
    */
    this.removeLabelByName = function (labelName) {
        this.assertOCX();
        this._ocxObj.object.RemoveLabel(labelName);
    };
    /**
    * 移除所有的标注
    */
    this.removeAllLabel = function () {
        this.assertOCX();
        this._ocxObj.object.RemoveLabelAll();
    };
    ////////////////////////////////////////////////////////////////////////////////////
    /**
    * 计算两点间的距离
    * @param {float} bx 第一个点的x
    * @param {float} by 第一个点的y
    * @param {float} bz 第一个点的z
    * @param {float} ex 第二个点的x
    * @param {float} ey 第二个点的y
    * @param {float} ez 第二个点的z
    * @param {int} type 量测方式 0:地表距离 1:直接距离
    * @return {float} 返回计算结果，计算失败返回-1
    */
    this.calXYLength = function (bx, by, bz, ex, ey, ez, type) {
        this.assertOCX();
        return this._ocxObj.object.CalcLineLength(bx, by, bz, ex, ey, ez, type);
    };
    /**
    * 计算多点构成多边形的面积
    * @param {string} pnts 点的字符串集合,参数格式="100,30,0;101,30,0;102,30,0;102.5,31,0"
    * @param {int} model 0表示计算表面积，1表示计算投影面积
    * @return {float} 返回计算结果，计算失败返回-1
    */
    this.calPolygonArea = function (pnts, model) {
        this.assertOCX();
        if (model)
            return this._ocxObj.object.CalcPolygonSurfaceArea(pnts, model);
        else
            return this._ocxObj.object.CalcPolygonSurfaceArea(pnts, 0);
    };
    /**
    * 由坐标点和绘制方案添加图形要素
    * @param {string} pnts 参数格式="108.60,18.50;108.75,18.90;109.30,19.70;109.50,19.20"
    * @param {DrawInfo} drawInfo 二维绘制对象
    * @return {string} 返回绘制成功过后返回的id值，失败则返回-1
    */
    this.addGraphic = function (pnts, drawInfo) {
        this.assertOCX();
        if (drawInfo instanceof DrawInfo) {
            return this._ocxObj.object.DrawElement(drawInfo.shapeType, pnts, drawInfo.bdColor, drawInfo.fillColor,
                drawInfo.transparence, drawInfo.linWid, drawInfo.lineType);
        }
        return -1;
    };
    /**
    * 添加一个点到三维地球上
    * @param {float} x 经度
    * @param {float} y 纬度
    * @param {float} radio 关于参数的具体描述，默认为0.1（经纬度）
    * @param {DrawInfo} drawInfo 二维绘制对象，默认为红色圆形
    * @return {Object|Number} 关于返回值的具体描述
    */
    this.addPoint = function (x, y, radio, drawInfo) {
        if (!radio)
            radio = 0.1;
        if (!drawInfo) {
            drawInfo = new DrawInfo();
            //设置绘制类型：TypeLine = 0,TypeRect = 1,TypePolygon = 2,TypeCircle = 3,
            drawInfo.shapeType = 3;
            //uint
            drawInfo.bdColor = 0xffff0000;
            //uint
            drawInfo.fillColor = 0xffff0000;
            //透明度的值
            drawInfo.transparence = 1;
            //线的宽度
            drawInfo.linWid = 1;
            //线的类型：TypeSolid = 0,TypePolyLine = 1,TypePointLine = 2,TypePolyLinePoint = 3
            drawInfo.lineType = 0;
        }
        //构建点集
        var pnts = (x - radio / 2.0).toString() + "," + (y + radio / 2.0).toString() + ";"
            + (x + radio / 2.0).toString() + "," + (y - radio / 2.0).toString();
        return this.addGraphic(pnts, drawInfo);
    };
    /**
    *动画漫游接口
    *@param{string} type 动画操作类型
    * Add 添加；Delete 删除;DeleteAll 删除全部;Load 加载动画漫游配置文件（.acx）;Play 播放; Pause 暂停; Stop 停止; Update 更新;
    *@param {object} info 动画json结构参数
    *this._ocxObj.object.AnimationFly();
    *@return 成功返回添加的动画名称
    *  Add添加示例：
    *  var infoJSON = {"movementparameter" : {"speed" : 1.0, "turnspeed" : 2.0, "timelength" : 2.0, "isloop" : 0},
    *  "modelparameter" : {"scale" : {"x" : 1.0, "y" : 1.0,"z" : 1.0 },"modelheight" : 5.0,"modelname" :"警车.Region"},
    *  "trackcartoontype" : 3,
    *  "pntarray" : [ {"x":25,"y":22,"z":20 }, {"x":60, "y":56, "z":20 }, { "x":125,  "y":112,"z":20} ]
    *  };
    *  var info= JSON.stringify(infoJSON);
    *  var animationName=globe.animationFly("Add", info);
    *  Load加载示例：
    *  var path = JSON.stringify({ "path": "F://长沙演示系统配置文件//管廊漫游.acx" });
    *  var animationName = globe.animationFly("Load", path);
    *  Update更新示例，包括漫游速度，漫游角度等（相机角度无法初始化设置，只能更新，详见以下示例）:
    *  var view = JSON.stringify({ "Name": JSON.parse(ZKanimation.replace(/\n/g, "")).Name, "ViewState":{"PitchAnge":-24, "Angle": 90} });     
    *  globe.animationFly("Update", view);
    *  Delete删除示例：
    *  globe.animationFly("Delete", animationName);
    */

    this.animationFly = function (type, info) {
        this.assertOCX();
        return this._ocxObj.object.AnimationFly(type, info);

    }
    /**
    *视频投放的接口
    *@param{string} oper 操作类型 "Add","Pause","Play""Get","Reset","Save","Load","Get",Add不返回名字，指定的路径就是名字
    *"Pause" "Play""Get",info 传名字,"Save","Load" info传路径
    *@param {string} info 分析的json结构参数
    *示例
    *       var info = JSON.stringify({"videopath":\"D:\\11.avi","name":"prjname"});//prjname 自定义名字
    *       var projectionInfo=globe.projectionVideo("Add",info);
    *   
    *      globe.projectionVideo("Delete", projectionInfo);
    *
    *      string info = JSON.stringify({"videopath":"D:\\11.avi","isloop":true,"screentilt":30,"screenfov":60,"camdirhori":60,"camdirverti":60,"camposition":{"x\":1.0, \"y\":1.0,\"z\":1.0 },"clipplane":60,"isdrawbound":true,"videopos":2});
    *      globe.projectionVideo("Update", info);
    *
    *      var projectionInfo= globe.projectionVideo("Load",JSON.stringify({"Path":"D:\\view.pcx"}));
    *      globe.projectionVideo("Delete",JSON.stringify({ "name": JSON.parse(projectionInfo).name[0] }));
    */
    this.projectionVideo = function (oper, info) {
        this.assertOCX();
        return this._ocxObj.object.ProjectionVideo(oper, info);
    }
    /*图片投放的接口
     *@param{string} oper 操作类型 "Add","Delete"
     *@param {string} info 分析参数的json字符串
     *示例：globe.pictureProject("Add", JSON.stringify({"picturepath":"D:\\鸭子003.png","name":"prjname"});
     */
    this.pictureProject = function (oper, info) {
        this.assertOCX();
        return this._ocxObj.object.PictureProject(oper, info);
    }
    /*颜色投放的接口
    *@param{string} oper 操作类型 "Add","Delete"
    *@param {string} info 分析参数的json字符串
    *示例：globe.pictureProject("Add", JSON.stringify({"colorvalue":{"red":190,"green":226,"blue":249,"alpha":255},"name":"prjname"});
    */
    this.colorProject = function (oper, info) {
        this.assertOCX();
        return this._ocxObj.object.ColorProject(oper, info);
    }
    /**
    *最新的三维分析接口，包括坑基开挖和模型可视域分析等功能
     *@param{string} oper 操作类型 "Add" "Delete"
    *@param{string} type 分析类型 1是模型可视域，2是两点通视，3是单体化，4是压平，5是开挖，7天际线
    *@param {string} info 分析的json结构参数
    *1、单体化高亮设置参数
    * var info="{\"maxscenez\":229,\"transparence\":10,\"layerindex\":[3],\"sddentity\":" + docID1.ToString() + ",\"reg\":[{\"type\": \"polygon\",\"nelen\": 1,\"ne\": [5],\"dots\":[	{\"x\":102043.42,\"y\":15814.51},{\"x\":102043.42,\"y\":15697.74},{\"x\":102198.63,\"y\":15697.74},{\"x\":102198.63,\"y\":15814.51},{\"x\":102043.42,\"y\":15814.51}]}]}";
    *2、动态模型可视域分析参数
    *  var info =  "{ \"centerpos\" : {  \"x\" : 12, \"y\" : 12, \"z\" : 5 },  \"viewpos\" : {\"x\" : 12.0,  \"y\" : 12.0, \"z\" : 5.0 },\"viewradius\" : 10.0" +
    *          ",\"horizontangle\" : 20.0, \"verticalangle\" : 30.0,\"pitchangle\": 60.0,\"azimuthangle\":22,\"dyisloop\": true,\"dyspeed\":10.0" +
    *          " ,\"isdynamic\" : true,\"dypointlist\" : [{\"x\" : 30,\"y\" : 22, \"z\" : 20 }, { \"x\" : 66, \"y\" : 56, \"z\" : 20 }, {  \"x\" : 129,\"y\" : 112, \"z\" : 20} ]" +
    *         ", \"modelparameter\" : {\"scale\" : {\"x\" : 1.0, \"y\" : 1.0,\"z\" : 2.0 },\"modelheight\" : 5.0,\"modelname\" :\"C:\\\\Program Files\\\\Zondy Earth Professional\\\\Bin\\\\media\\\\PathFlyEdit\\\\models\\\\警车.Region\""+
    *         ",\"modelheaddir\":{\"x\":0, \"y\":0,\"z\":1.0},\"modelfacedir\":{\"x\":1,\"y\":0,\"z\":1}}}";
    *3、坑基开挖分析参数
    *@param {string} layerIndex 开挖图层所在的layerenderindex
    *@param {string} docID1 添加的文档返回的ID
    *var info=string info = "{\"maxscenez\":229,\"createbox\":0,\"layerindex\":[4],\"sddentity\":\"" + docID1.ToString() + "\",\"pointarray\" : [ { \"x\" : 569834,  \"y\" : 4754963  }, {\"x\" : 572186, \"y\" :  4754963}, { \"x\" : 572186,\"y\" :4750024 }, { \"x\" : 569834, \"y\" : 4750024 },{\"x\" : 569834,\"y\" : 4754963 }],\"symbolinfo\":{\"fillclr\" : 9,\"patid\" : 30000012,\"transparent\":100}}";
    *4、两点通视参数var info = "{\"maxscenez\":20,\"observedot\" : {\"x\" : 48.0, \"y\" : 60.0,\"z\" : 21.0},\"targetdot\" : {\"x\" : 48.0, \"y\" : 100.0,\"z\" : 21.0}}";
    *5、压平处理
    * var info= "{\"maxscenez\":20,\"height\":430,\"reg\":[{\"type\": \"polygon\",\"nelen\": 1,\"ne\": [5],\"dots\":[	{\"x\":-9.26,\"y\":31.7},{\"x\":13,\"y\":30.74},{\"x\":13,\"y\":7.3},{\"x\":-9.26,\"y\":7.56},{\"x\":-9.26,\"y\":31.7}]}]}";
	*7、天际线参数
     *  string info ="{\"colour\":{\"red\":255,\"green\":0,\"blue\":0,\"alpha\":255}}"
	*8、动态剖切
     *  string info = "{"docid":"1706593469760","renderindex":2,"showside":"right","uesrange3d":0,"camera":{"targetfollow":0,"offset":0},"cutgeometry":{"colors":[1,0,2129432760,397,0],"dots":[{"x":102909,"y":15651.8954167366,"z":229.14501953125},{"x":102909,"y":29990.68654632568,"z":229.14501953125},{"x":102283,"y":29990.68654632568,"z":-82.19181823730469},{"x":102283,"y":15651.8954167366,"z":-82.19181823730469},{"x":102909,"y":15651.8954167366,"z":229.14501953125}],"normals":[{"x":8.432016631834e-312,"y":0,"z":0},{"x":8.43219885526e-312,"y":0,"z":0},{"x":8.434844057037e-312,"y":0,"z":0},{"x":2.1219957915e-314,"y":0,"z":0},{"x":0,"y":0,"z":0}],"pntcount":5,"texturelayerind":0,"texturelayernum":0,"texturepos":null,"topo":[3379537232,13,0,0,23345616,389],"trianglecount":2,"triangles":[0,1,2,0,2,3],"type":"anysurface"},"range3d":{"xmin":100902.17056655884,"ymin":15651.895416736602,"zmin":-82.19181823730469,"xmax":104952.00305175781,"ymax":29990.686546325683,"zmax":229.14501953125}}"
	*9、X射线
	string info ="{\"docid\":\"" + docID1.ToString() + "\",\"renderindex\":2};
    *@return 成功返回对应分析方式的结果名称
    */
    this.analysis = function (oper, type, info) {
        this.assertOCX();
        return this._ocxObj.object.Analysis(oper, type, info);
    }
	
	/**
    *碰撞检测
	*@param {string} info 碰撞检测JSON结构参数：
	*双击放大:var info="{\"doubleclick\":1}"
	*开启碰撞检测：var info="{\"collision\":1}"
	*@return  成功返回大于0的值
    */
    this.setInteractionFactor=function (info){
      this.assertOCX();
      return this._ocxObj.object.SetInteractionFactor(info);
    }
	
    /**
    *模型可视域分析
    *临时模型可视域分析接口，后续如有重新封好的稳定接口，请用最新的
    *@param {string} operType 操作类型
    *@param {string} operPara 操作参数
	*@return  成功返回true
    *@author 创建者:丁和强 2017-05-24
    * string info = "{\"CenterPos\" : { \"X\" : 113,\"Y\" : 91, \"Z\" : 21}, \"ViewPos\" : {\"X\" : 132.0, \"Y\" : 109.0,\"Z\" : 12.0}"
    *                        +", \"ViewRadius\" : 10.0"
    *                       +", \"HorizontAngle\" : 20.0"
    *                      +",\"VerticalAngle\" : 30.0"
    *                        +", \"PitchAngle\" : 60.0"
    *                        +", \"AzimuthAngle\" : 22"
    *                        +", \"DyIsLoop\" : \"true\""
    *                        +",\"DySpeed\" : 10.0"
    *                        +",\"IsDynamic\" : true"
    *                        +", \"DyPntArray\" : [ {\"X\" : 30, \"Y\" : 22, \"Z\" : 20}, { \"x\" : 66,  \"y\" : 56, \"z\" : 20 }, {\"x\" : 129,\"y\" : 112,\"z\" : 20 } ] } ";
    * bool rtn = false;
	* string operType ="Add";                           string operPara = info ; 
	* string operType ="AddDynamicViewshed"; string operPara = speedval ;
	* string operType ="SetBorderHighLigh";     string operPara = name ; //模型比例按照格式 "X,1;Y,2;Z,3"
	* string operType ="Remove";                     string operPara = viewName;
	* string operType ="RemoveAll";                 string operPara = NULL ;
	* string operType ="Get";                           string operPara =  viewName//;
	* string operType ="Set";                           string operPara =  viewName//;
	* string operType ="Save";  	                    string operPara =  savePath//;
	* string operType ="Load";  		                string operPara =  loadPath//;
	* rtn = axWebOcx.ViewshedAnalysis(operType, operPara);
   */
    this.viewshedAnalysis = function (operType, operPara) {
        this.assertOCX();
        return this._ocxObj.object.ViewshedAnalysis(operType, operPara);
    }

    /**
    * 跳转到指定位置
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @param {float} z 位置的z
    * @param {float} dist 距离
    * @param {float} tarHead 高度角俯仰角
    * @param {float} tarTilt 方位角
    */
    this.jumpByPos = function (x, y, z, dist, tarHead, tarTilt) {
        this.assertOCX();
        this._ocxObj.object.Jump(x, y, z, dist, tarHead, tarTilt);
    };
    /**
    * 跳转到指定的模型
    * @param {string} name 地图服务名称
    * @param {int} layerIndex 图层索引
    * @param {int} geomID 模型对应的几何要素id
    */
    this.jumpByModel = function (name, layerIndex, geomID) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null) {
            this._ocxObj.object.Jump2(doc.id, layerIndex, geomID);
        }
    };
    /**
    * 跳转到指定的矩形范围
    * @param {float} minx 矩形范围的minx
    * @param {float} miny 矩形范围的miny
    * @param {float} maxx 矩形范围的maxx
    * @param {float} maxy 矩形范围的maxy
    */
    this.jumpByRect = function (minx, miny, maxx, maxy) {
        this.assertOCX();
        this._ocxObj.object.JumpByRect(minx, miny, maxx, maxy);
    };
    /**
    * 根据经纬度坐标获取笛卡尔坐标系
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @param {float} z 位置的z
    * @return {string} 返回转换后的值，失败则返回-1
    */
    this.convertPosToGeo = function (x, y, z) {
        this.assertOCX();
        return this._ocxObj.object.GetCartesianPosByGeodetic(x, y, z);
    };
    /**
    * 根据笛卡尔坐标系获取经纬度坐标
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @param {float} z 位置的z
    * @return {string} 返回转换后的值，失败则返回-1
    */
    this.convertGeoToPos = function (x, y, z) {
        this.assertOCX();
        return this._ocxObj.object.GetGeodeticPosByCartesian(x, y, z);
    };
    /**
    * 由逻辑位置转换成窗体位置
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @param {float} z 位置的z
    * @return {string} 返回转换后的值，失败则返回-1
    */
    this.convertLpToWp = function (dx, dy, dz) {
        this.assertOCX();
        return this._ocxObj.object.LpToWp(dx, dy, dz);
    };
    /**
    * 由窗体位置转换成逻辑位置
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @return {string} 返回转换后的值，失败则返回-1
    */
    this.convertWpToLp = function (wx, wy) {
        this.assertOCX();
        return this._ocxObj.object.WpToLp(wx, wy);
    };
    /**
    * 由屏幕坐标获取世界坐标,世界坐标是三维里面的，OGRE自定义的一个坐标系。
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @return {string} 返回转换后的值，失败则返回-1
    */
    this.convertScreenToWorldPos = function (x, y) {
        this.assertOCX();
        return this._ocxObj.object.GetWorldPosByScreen(x, y);
    };
    ///////////////////////////////下面为拾取功能的接口///////////////////////////
    /**
    * 开启标注的交互性功能
    */
    this.startPickLabel = function () {
        this.assertOCX();
        this._ocxObj.object.StartPickLabel();
    };
    /**
    * 关闭标注的交互性功能
    */
    this.stopPickLabel = function () {
        this.assertOCX();
        this._ocxObj.object.StopPickLabel();
    };
    /**
    * 开启模型或圖形的交互性功能
    */
    this.startPickTool = function () {
        this.assertOCX();
        this._ocxObj.object.StartPickTool();
    };
    /**
    * 根据屏幕点拾取标注
    * 在场景中添加注记后，相比交互拾取注记，根据屏幕坐标拾取是直接传入屏幕坐标点进行拾取，如果拾取到注记，直接返回出添加注记时传入的属性值。
    * 注意：根据坐标拾取注记传入的坐标和添加注记传入的坐标不是一个坐标系，添加时是地理坐标，拾取时是屏幕坐标
    * @param {number} x 屏幕坐标x值
    * @param {number} y 屏幕坐标y值
    * @return 注记的属性值
    */
    this.pickLabelByXY = function (x, y) {
        this.assertOCX();
        return this._ocxObj.object.PickLabelByXY(x, y);
    }
    /**
    * 关闭模型或圆形的交互性功能
    */
    this.stopPickTool = function () {
        this.assertOCX();
        this._ocxObj.object.StopPickTool();
    };
    ////////////////////////////////////////////////////////////////////////////////////
    /**
    * 删除指定的实体，这里和原生接口保持一致，删除地图可以用removeMap
    * @param {string} entity 对象的返回值id
    * @return {string} 删除成功的返回值id，失败则返回-1
    */
    this.remove = function (entity) {
        this.assertOCX();
        return this._ocxObj.object.Remove(entity);
    };
    /**
    * 删除所有的实体
    * @returns {boolean}
    */
    this.removeAll = function () {
        this.assertOCX();
        return this._ocxObj.object.RemoveAll();
    };
    /**
    * 移除绘制的几何元素
    */
    this.removeAllGraphic = function () {
        this.assertOCX();
        this._ocxObj.object.RemoveAllElement();
        //清空数组中的数据
        this._drawElements = [];
    };
    /**
    * 移除指定的几何元素
    * @param {string} elementName 要素的名称
    * @return {string} 删除成功的返回值id，失败则返回-1
    */
    this.removeGraphicByName = function (elementName) {
        this.assertOCX();
        this._ocxObj.object.RemoveElement(elementName);
        //需要删除指定id的要素
        var elements = [];
        for (var x = 0; x < this._drawElements.length; x++) {
            if (this._drawElements[x].id !== elementName)
                elements.push(this._drawElements[x]);
        }
        if (elements.length < this._drawElements.length) {
            this._drawElements = elements;
        }
    };
    /**
    * 设置绘制的二维元素可见性
    */
    this.setElementVisible = function (eleName, isVisible) {
        this.assertOCX();
        this._ocxObj.object.SetElementVisible(eleName, isVisible);
    };
    /**
    * 返回指定要素id的pnts属性
    * @param {string} elementName 要素的id
    * @return {string} 获取成功的返回值pnts，失败则返回空
    */
    this.getPntsByEleID = function (elementName) {
        for (var x = 0; x < this._drawElements.length; x++) {
            if (this._drawElements[x].id === elementName)
                return this._drawElements[x].pnts;
        }
        return "";
    };
    /**
    * 地图复位操作
    */
    this.reset = function () {
        this.assertOCX();
        this._ocxObj.object.Reset();
    };
    /**
    * 获取摄像机参数
    * @return {string} 返回获取的摄像机信息，失败则返回-1
    */
    this.getCameraInfo = function () {
        this.assertOCX();
        return this._ocxObj.object.GetCamera();
    };
    /**
    * 设置场景的相机参数
    * 对当前场景里的相机进行相关参数调整，远近截面可以影响物体的剪裁以及深度缓存检测
    * 填充模式可以用来选择是实体渲染或者线、点填充，以及一些其他参数
    * @param {string} name 名称
    * @param {float} nearClip 近裁面，设置相机近裁面的距离，当物体离相机距离小于这个值时会被剪裁掉
    * @param {float} farClip 远裁面，设置相机远裁面的距离，当物体离相机距离小于这个值时会被剪裁掉，
    *                        同时远近裁面的总长度会影响物体的深度检测。
    * @param {float} fov 相机的fov视角，默认为45度
    * @param {Short} detailType 填充模式，1-点填充 2-线框填充 3-实体填充，其效果和按下快捷键g相同
    * @param {Short} projectionType 投影模式，1-透视投影(默认为透视投影，更贴近真实，远处的物体透视后会变小) 0-正交投影(投影后仍保持原有比例)
    * @param {int} bgColor 背景色，从高位到低位分别为ARGB。
    * @param {boolean} CutOutFlag 是否实体裁剪，默认为false
    */
    this.setCameraInfo = function (name, nearClip, farClip, fov, detailType, projectionType, bgColor, CutOutFlag) {
        this.assertOCX();
        return this._ocxObj.object.SetCamera(name, nearClip, farClip, fov, detailType, projectionType, bgColor, CutOutFlag);
    };
    /**
    * 获取视图的位置信息
    * @return {string} 返回视图的信息，失败则返回-1
    */
    this.getViewPos = function () {
        this.assertOCX();
        return this._ocxObj.object.GetViewPos();
    };
    /**
    * 通过位置设置视图
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @param {float} z 位置的zSunLightInfo
    * @param {float} dist 距离
    * @param {float} heading 高度角
    * @param {float} tilt 方位角
    */
    this.setViewPos = function (x, y, z, dist, heading, tilt) {
        this.assertOCX();
        this._ocxObj.object.SetViewPos(x, y, z, dist, heading, tilt);
    };
    /**
    * 获取视图的Rect信息
    * @return {string} 返回视图的Rect信息，失败则返回-1
    */
    this.getViewRect = function () {
        this.assertOCX();
        return this._ocxObj.object.GetViewRect();
    };
    /**
    * 通过矩形设置视图
    * @param {float} minx 矩形范围的minx
    * @param {float} miny 矩形范围的miny
    * @param {float} maxx 矩形范围的maxx
    * @param {float} maxy 矩形范围的maxy
    */
    this.setViewRect = function (minx, miny, maxx, maxy) {
        this.assertOCX();
        this._ocxObj.object.SetViewRect(minx, miny, maxx, maxy);
    };
    /**
    * 通过参数设置全景模型
    * @param {float} x 位置的x
    * @param {float} y 位置的y
    * @param {float} z 位置的z
    * @param {float} dist 距离
    * @param {float} heading 高度角
    * @param {float} tilt 方位角
    * @param {float} minHead 最小可见距离
    * @param {float} maxHead 最大可见距离
    * @param {float} maxTilt 最大方位角
    * @param {float} mintilt 最小方位角
    */
    this.setFullView = function (x, y, z, dist, heading, tilt, minHead, maxHead, maxTilt, mintilt) {
        this.assertOCX();
        this._ocxObj.object.SetFullView(x, y, z, dist, heading, tilt, minHead, maxHead, maxTilt, mintilt);
    };
    /**
    * 退出全景模式
    */
    this.exitFullView = function () {
        this.assertOCX();
        this._ocxObj.object.ExitFullView();
    };
    /**
    * 显示或隐藏导航控件
    * @param {boolean} bShow 导航控件的状态
    */
    this.setNavigateVisible = function (bShow) {
        this._isNavigateVisible = bShow;
        this.assertOCX();
        this._ocxObj.object.ShowNavigateTool(bShow);
    };
    /**
    * 获取导航控件的可见性信息
    * @return {boolean} 获取导航控件的可见性信息
    */
    this.getNavigateVisible = function () {
        return this._isNavigateVisible;
    };
    /**
    * 显示或隐藏状态栏信息
    * @param {boolean} bShow 状态栏的状态
    */
    this.setPlantUIStateVisible = function (bShow) {
        this.assertOCX();
        this._isPlantUIStateVisible = bShow;
        this._ocxObj.object.ShowPlantUIState(bShow);
    };
    /**
    * 获取状态栏的可见性信息
    * @return {boolean} 获取状态栏的可见性信息
    */
    this.getPlantUIStateVisible = function () {
        return this._isPlantUIStateVisible;
    };
    /**
    * 显示或隐藏调试坐标系
    * @param {boolean} bShow 显示或隐藏调试坐标系
    */
    this.setDebugGridVisible = function (bShow) {
        this.assertOCX();
        this._isDebugGrid = bShow;
        this._ocxObj.object.ShowDebugGrid(bShow);
    };
    /**
    * 获取调试坐标系的可见性信息
    * @return {boolean} 获取调试坐标系的可见性信息
    */
    this.getDebugGridVisible = function () {
        return this._isDebugGrid;
    };
    /**
    * 显示或隐藏格网
    * @param {boolean} bShow 显示或隐藏格网
    */
    this.setGridNetVisible = function (bShow) {
        this.assertOCX();
        this._isGridNet = bShow;
        this._ocxObj.object.ShowGridNet(bShow);
    };
    /**
    * 获取格网的可见性信息
    * @return {boolean} 获取格网的可见性信息
    */
    this.getGridNetVisible = function () {
        return this._isGridNet;
    };
    /**
    * 设置实体的透明度,这里是以场景为单位进行设置
    * @param {string} name 地图服务名称
    * @param {string} layerIndex 图层(场景索引)
    * @param {int} TransparentValue 0-100
    * @return {string} 设置成功返回id值，失败则返回-1
    */
    this.setSceneTransparent = function (name, layerIndex, TransparentValue) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null) {
            return this._ocxObj.object.SetScenePropertySet(doc.id, layerIndex, "Transparent:" + TransparentValue);
        }
        return -1;
    };
    /**
    * 设置指定多边形中内容显示
    * @param {string} name 地图服务名称
    * @param {string} layerIndex 图层(场景索引)
    * @param {string} points 多边形点集,x,y;x,y;x,y;x,y.......
    * @return {string} 设置成功返回id值，失败则返回-1
    */
    this.setShowPolygon = function (name, layerIndex, points) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null)
            return this._ocxObj.object.SetScenePropertySet(doc.id, layerIndex, "SetShowPolygon:" + points);
        else
            //doc不存在则将name直接视为id
            return this._ocxObj.object.SetScenePropertySet(name, layerIndex, "SetShowPolygon:" + points);
    };
    /**
    * 设置指定矩形中内容显示
    * @param {string} name 地图服务名称
    * @param {string} layerIndex 图层(场景索引)
    * @param {string} points 矩形范围,xmin,ymin,xmax,ymax
    * @return {string} 设置成功返回id值，失败则返回-1
    */
    this.setShowRect = function (name, layerIndex, points) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null)
            return this._ocxObj.object.SetScenePropertySet(doc.id, layerIndex, "SetShowRange:" + points);
        else
            //doc不存在则将name直接视为id
            return this._ocxObj.object.SetScenePropertySet(name, layerIndex, "SetShowRange:" + points);
    };
    /**
    * 设置图层置顶
    * @param {string} name 地图服务名称
    * @param {string} layerIndex 图层(场景索引)
    * @return {string} 设置成功返回id值，失败则返回-1
    */
    this.setLayerToTop = function (name, layerIndex) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null)
            return this._ocxObj.object.SetScenePropertySet(doc.id, layerIndex, "SetLayer2Top:true");
        else
            //doc不存在则将name直接视为id
            return this._ocxObj.object.SetScenePropertySet(name, layerIndex, "SetLayer2Top:true");
    };
    /**
    * 设置图层优先级
    * @param {string} name 地图服务名称
    * @param {string} layerIndex 图层(场景索引)
    * @param {Short} value 0-16优先级的值
    * @return {string} 设置成功返回id值，失败则返回-1
    */
    this.setLayerPriority = function (name, layerIndex, value) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null)
            return this._ocxObj.object.SetScenePropertySet(doc.id, layerIndex, "SetLayerPriority:" + value);
        else
            //doc不存在则将name直接视为id
            return this._ocxObj.object.SetScenePropertySet(name, layerIndex, "SetLayerPriority:" + value);
    };
    /**
    * 设置指定多边形中内容显示
    * @param {int} id 地图服务id
    * @param {string} layerIndex 图层(场景索引)
    * @param {string} points 多边形点集,x,y;x,y;x,y;x,y.......
    * @return {string} 设置成功返回id值，失败则返回-1    
    */
    this.setShowPolygonByid = function (docid, layerIndex, points) {
        this.assertOCX();
        if (docid) {
            return this._ocxObj.object.SetScenePropertySet(docid, layerIndex, "SetShowPolygon:" + points);
        }
    };
    /**
    * 获取场景节点
    * 获取模型对应的场景操作节点
    * @param {int} docId 添加的文档索引值，Append的返回值
    * @param {int} renderIndex 模型所在的图层渲染索引值
    * @param {boolean} hasChild 是否有子节点
    * @param {int} geomID 模型id
    * @returns {object} 场景操作节点，IScene3DNode类型，可以对应使用闪烁、高亮等操作 
    */
    this.getSceneNode = function (docId, renderIndex, hasChild, geomID) {
        this.assertOCX();
        return this._ocxObj.object.GetSceneNode(docId, renderIndex, hasChild, geomID);
    }
    /**
    * 获取图层属性
    * @param {int} id 地图服务id
    * @param {string} layerIndex 图层(场景索引)
    * @param {string} propertyname “DisplayScale”第三个参数传这个的时候，
    *                表示获取显示比，返回float类型的字符串，"IsVisible"表示获取是否可见，0和1的字符串
    *                "Range3D"表示获取场景的范围
    * @return {string} 返回属性的内容
    */
    this.getSceneProperty = function (docid, layerIndex, propertyname) {
        this.assertOCX();
        if (docid) {
            return this._ocxObj.object.GetSceneProperty(docid, layerIndex, propertyname);
        }
        return -1;
    };
    /**
    * 开始绘制图形接口
    * @param {DrawInfo} drawInfo 绘制过程中需要输入的绘画参数
    */
    this.startDrawTool = function (drawInfo) {
        this.assertOCX();
        if (drawInfo instanceof DrawInfo) {
            this._ocxObj.object.StartDrawTool(drawInfo.shapeType, drawInfo.bdColor, drawInfo.fillColor,
                drawInfo.transparence, drawInfo.linWid, drawInfo.lineType);
        }
    };
    /**
    * 停止绘制工具
    * @return {string} 返回最新绘制的要素id值，停止失败则返回""
    */
    this.stopDrawTool = function () {
        this.assertOCX();
        return this._ocxObj.object.StopDrawTool();
    };
    /**
    * 绘制三维点线面
    * @param {Draw3DElementInfo} draw3DElementInfo 三维要素绘制需要的绘制对象
    * @return {string} 返回三维要素对象的id，失败则返回""
    */
    this.draw3DElement = function (draw3DElementInfo) {
        this.assertOCX();
        if (draw3DElementInfo instanceof Draw3DElementInfo) {
            var id = this._ocxObj.object.Draw3DElement(
                draw3DElementInfo.type,
                draw3DElementInfo.pnts,
                "libID:" + draw3DElementInfo.libID +
                ",symID:" + draw3DElementInfo.symID +
                ",fillClr:" + draw3DElementInfo.fillClr +
                ",transparent:" + draw3DElementInfo.transparent +
                ",scale:" + draw3DElementInfo.scale,
                draw3DElementInfo.att
            );
            if (id > 0)
                this._draw3DElements.push(id);
            return id;
        }
        return "";
    };
    /**
    * 删除三维点线面
    * @param {string} id 三维要素的id
    */
    this.remove3DElement = function (id) {
        this.assertOCX();
        return this._ocxObj.object.Remove3DElement(id);
    };
    /**
    * 设置绘制的三维元素可见性
    */
    this.set3DElementVisible = function (geomID, isVisible) {
        this.assertOCX();
        this._ocxObj.object.Set3DElementVisible(geomID, isVisible);
    };
    /**
    * 删除所有的三维图形要素
    */
    this.removeAll3DElement = function () {
        for (var i = 0; i < this._draw3DElements.length; i++) {
            this._ocxObj.object.Remove3DElement(this._draw3DElements[i]);
        }
        this._draw3DElements = [];
    };
    /**
    * 开启工具的接口
    * @param {ToolInfo} toolInfo 具体工具的对象
    */
    this.startAnalyzeTool = function (toolInfo) {
        this.assertOCX();
        //这里根据对象的类型来决定进行哪种分析
        var jsonInfo = new Util().toJSON(toolInfo);
        //地形分析部分=包括洪水淹没分析、填挖方分析、可视域分析、单点地形参数查询分析、两点通视性分析、坡度分析、坡向分析
        if (toolInfo instanceof FLoodAnalyzeInfo
            || toolInfo instanceof CutFillInfo
            || toolInfo instanceof ViewShedInfo
            || toolInfo instanceof DynamicViewShedInfo
            || toolInfo instanceof PointQueryInfo
            || toolInfo instanceof VisibleInfo
            || toolInfo instanceof SlopeInfo
            || toolInfo instanceof AspectInfo) {
            this._ocxObj.object.StartTool(EnumCommToolType.TerrainAnalyze, jsonInfo);
        }
            //爆炸效果演示分析
        else if (toolInfo instanceof BombInfo) {
            this._ocxObj.object.StartTool(EnumCommToolType.BombShow, jsonInfo);
        }
            //日照分析
        else if (toolInfo instanceof SunLightInfo) {
            this._ocxObj.object.StartTool(EnumCommToolType.SunLight, jsonInfo);
        }
            //地形剖切剖面图分析
        else if (toolInfo instanceof TerSectInfo) {
            this._ocxObj.object.StartTool(EnumCommToolType.TerrainCut, jsonInfo);
        }
            //模型编辑分析
        else if (toolInfo instanceof ModelInfo) {
            this._ocxObj.object.StartTool(EnumCommToolType.ModelEdit, jsonInfo);
        }
            //量算工具
        else if (toolInfo instanceof MeasureInfo) {
            this._ocxObj.object.StartTool(EnumCommToolType.Measure, jsonInfo);
        }
    };
    /**
    * 停止工具的接口
    * @param {EnumCommToolType} enumCommToolType 工具对应的数字
    */
    this.stopAnalyzeTool = function (enumCommToolType) {
        this.assertOCX();
        this._ocxObj.object.StopTool(enumCommToolType);
    };
    /**
    * 获取当前进行的分析类别
    * @return {AnalyseType} 获取当前进行的分析类别
    */
    this.getAnalyseType = function () {
        return this._analyseOper;
    };
    /**
    * 设置当前进行的分析类别
    * @param {AnalyseType} value 分析对象
    */
    this.setAnalyseType = function (value) {
        this._analyseOper = value;
    };
    /**
    * 获取当前分析得到的结果
    * @return {string} 获取当前分析得到的结果
    */
    this.getAnalyseInfo = function () {
        return this._analyseInfo;
    };
    /**
    * 设置当前分析得到的结果
    * @param {string} value 分析时的过程值
    */
    this.setAnalyseInfo = function (value) {
        this._analyseInfo = value;
    };
    /**
    * 清空缓存数据
    * @return {boolean} 清除成功则返回true，失败返回false
    */
    this.clearCacheData = function () {
        this.assertOCX();
        return this._ocxObj.object.ClearCacheData();
    };
    /**
    * 获取拾取的高精度坐标，返回值以分号区分会返回两个坐标值,这里的xy指的是屏幕坐标，可以通过鼠标事件中的参数获取
    * @param {int} x 屏幕坐标x
    * @param {int} y 屏幕坐标y
    * @return {string} 成功则返回得到的坐标，失败返回空false
    */
    this.getPickUpGeoPos = function (x, y) {
        this.assertOCX();
        return this._ocxObj.object.GetPickUpGeoPos(x, y);
    }
    //-----------------------------------------------------------------------------
    //下面为自定义扩展方法
    //-----------------------------------------------------------------------------
    /**
    * 是否允许用户与三维球进行交互
    * @return {boolean} true表示用户可以操作三维球，false表示用户无法操作三维球
    */
    this.enableInputObject = function (flag) {
        this.assertOCX();
        this._ocxObj.object.EnableInputObject(flag);
    };
    /**
    * 获取地球显示模式 1为球面模式 2为平面模式
    * @function 
    * @returns {1|2} 
    */
    this.getViewMode = function () {
        this.assertOCX();
        return this._ocxObj.object.Mode;
    }
    /**
     * 转到球体模式
     * @param {boolean} refreshData
    */
    this.goToGlobeMode = function (refreshData) {
        this.assertOCX();
        this._ocxObj.object.Mode = 1;
        if (refreshData === true) {
            var ret = this.removeAll();
            //这里跳转以后重新加载一次数据
            var tempDoc = [];
            for (var i = 0; i < this._docObj.length; i++) {
                var docObj = new MapDocObj();
                docObj.url = this._docObj[i].url;
                docObj.id = this._docObj[i].id;
                docObj.name = this._docObj[i].name;
                docObj.ip = this._docObj[i].ip;
                docObj.port = this._docObj[i].port;
                docObj.type = this._docObj[i].type;
                if (this.removeDocById(docObj.id) > 0) {
                    tempDoc.push(docObj);
                }
            }
            this._docObj = [];
            for (var i = 0; i < tempDoc.length; i++) {
                var id = this.addDoc(tempDoc[i].name, tempDoc[i].ip, tempDoc[i].port, tempDoc[i].type);
                if (id === -1) {
                    console.log('转为球面模式时，重新添加文档数据' + tempDoc[i].name + "失败");
                }
            }
        }
    };
    /**
    * 转到地表模式
    * @param {boolean} refreshData
    */
    this.goToSurfaceMode = function (refreshData) {
        this.assertOCX();
        this._ocxObj.object.Mode = 2;
        if (refreshData === true) {
            //var ret = this.removeAll();
            //这里跳转以后重新加载一次数据
            var tempDoc = [];
            for (var i = 0; i < this._docObj.length; i++) {
                var docObj = new MapDocObj();
                docObj.url = this._docObj[i].url;
                docObj.id = this._docObj[i].id;
                docObj.name = this._docObj[i].name;
                docObj.ip = this._docObj[i].ip;
                docObj.port = this._docObj[i].port;
                docObj.type = this._docObj[i].type;
                if (this.removeDocById(docObj.id) > 0) {
                    tempDoc.push(docObj);
                }
            }
            this._docObj = [];
            for (var i = 0; i < tempDoc.length; i++) {
                var id = this.addDoc(tempDoc[i].name, tempDoc[i].ip, tempDoc[i].port, tempDoc[i].type);
                if (id === -1) {
                    console.log('转为地表模式时，重新添加文档数据' + tempDoc[i].name + "失败");
                }
            }
        }
    };
    /**
    * 设置场景的状态,这个是原生方法
    * @param {int} sddEntity 实体的id
    * @param {int} layerIndex 图层的id
    * @param {EnumLayerState} state 场景状态值
    * @return {boolean} 设置失败则返回false
    */
    this.setSceneState = function (sddEntity, layerIndex, state) {
        this.assertOCX();
        return this._ocxObj.object.SetSceneState(sddEntity, layerIndex, state);
    };
    /**
    * 设置图层状态
    * @param {int} name 地图服务的id值
    * @param {int} layerIdx 图层的id
    * @param {EnumLayerState} state 图层状态值
    * @return {boolean} 设置失败则返回false
    */
    this.setLayerState = function (name, layerIdx, state) {
        this.assertOCX();
        //保证该name所对应服务存在
        var doc = this.getDocByName(name);
        if (doc != null) {
            return this._ocxObj.object.SetSceneState(doc.id, layerIdx, state);
        }
        return false;
    };
    /**
    * 开启路径漫游编辑功能
    */
    this.startPathNavEdit = function () {
        this.assertOCX();
        this._ocxObj.object.ExcuteTool("路径漫游", "路径编辑");

    };
    /**
    * 开启路径漫游演示功能
    */
    this.startPathNavShow = function () {
        this.assertOCX();
        this._ocxObj.object.ExcuteTool("路径漫游", "路径漫游");
    };
    /**
    * 放大
    * @param {float} v 缩放比例值
    */
    this.zoomIn = function (v) {
        this.zoom(v, 0.7);
    };
    /**
    * 缩小
    * @param {float} v 缩放比例值
    */
    this.zoomOut = function (v) {
        this.zoom(v, 1.3);
    };
    /**
    * 缩放操作,内部方法
    */    this.zoom = function (v, h) {
        this.assertOCX();
        var camera = JSON.parse(this._ocxObj.object.GetViewPos());
        //var camera = this._ocxObj.object.GetViewPos().split(",");
        if (camera.length != undefined || camera.length != null || camera.length != "") {
            if (v && typeof v === "number") h = 1 / v;
            if (this._ocxObj.object.Mode === 2)
                this._ocxObj.object.SetViewPos(camera.postion.x, camera.postion.y, camera.postion.z, camera.dist * h, camera.azimuth, camera.tilt);
                //this._ocxObj.object.SetViewPos(camera[0], camera[1], camera[2] * h, camera[3], camera[4], camera[5]);
            else
                this._ocxObj.object.SetViewPos(camera.postion.x, camera.postion.y, camera.postion.z, camera.dist*h, camera.azimuth * h, camera.tilt);
            //this._ocxObj.object.SetViewPos(camera[0], camera[1], camera[2], camera[3] * h, camera[4], camera[5]);
        }
    };
    /**
    * 创建路径漫游（建议用动画漫游功能替代）
    * 根据路径文件创建路径漫游
    * @param {string} json字符串 详细结构请见示例
    * @param {boolean} isUseTerrainHei 路径漫游是否依赖于地形
    * @param {string} meshName 第三人称漫游下面看到的模型名称，如果传入模型名表示创建的为第三人称的路径漫游，传入空字符串为第一人称漫游
    * @param {string} scales 可以设置比例 地形漫游时需要设置z向比例，模型漫游如果模型设置了比例漫游时也需要设置比例;比如 Scale:1,1,1
    * @returns {boolean}  成功返回true
    * @example 
    * createpathfly调用方法没变，第一个参数信息改变:
    * string json;
    *  第一种用法：pathtype为1表示传pat文件所在路径，path传路径坐在路径；
    *   json = "{\"pathtype\":1,\"path\":\"D:\\\\md.pat\"}";
    *  第二种用法：pathtype为2，表示传漫游点的参数，degreearound飞机在路线的水平夹角 degreepitch飞机的俯仰  degreeslope飞机的倾斜
    *   json = "{\"pathtype\":2,\"pntarray\":" +
    *           "[" +
    *               "{\"x\":114.860542,\"y\":133.347794,\"z\":21,\"degreearound\":0,\"degreepitch\":0,\"degreeslope\":0,\"speed\":5}," +
    *              "{\"x\":97.565277,\"y\":112.695557,\"z\":21,\"degreearound\":0,\"degreepitch\":0,\"degreeslope\":0,\"speed\":5}," +
    *             "{\"x\":91.447388,\"y\":91.894272,\"z\":21,\"degreearound\":0,\"degreepitch\":0,\"degreeslope\":0,\"speed\":5}," +
    *            "{\"x\":78.022453,\"y\":73.426132,\"z\":21,\"degreearound\":0,\"degreepitch\":0,\"degreeslope\":0,\"speed\":5}" +
    *      "]}";
    *   globe.createPathFly(json, true, "PathEdit_飞机1.mesh", "Scale:1,1,1");
    */
    this.createPathFly = function (json, isUseTerrainHei, meshName, scales) {
        this.assertOCX();
        this._ocxObj.object.CreatePathFly(json, isUseTerrainHei, meshName, scales);
    };
    /**
    * 删除路径漫游
    * @returns {boolean} 成功返回true
    */
    this.deletePathFly = function () {
        this.assertOCX();
        this._ocxObj.object.DeletePathFly();
    };
    /**
    * 由动画名称获取指定漫游的id
    * @param {string} name 动画的名称
    * @return {string} 获取对应动画的id，没有则返回-1
    */
    this.getAnimFlyByName = function (name) {
        for (var x = 0; x < this._animFlyElements.length; x++) {
            if (this._animFlyElements[x].name === name)
                return this._animFlyElements[x].id;
        }
        return -1;
    };
    /**
    * 创建动画
    * @param {string} name 用于标识该动画的名称，唯一主键
    * @param {string} meshFile 模型文件，例如：robot.mesh，默认提供的机器人模型
    * @param {string} actName 动画演示方式，例如：Walk，这个参数需要参考模型文件
    * @param {string} nodesInfo 节点值,例如="110.059515,18.856396,1200.000000,100;110.063326,18.865021,1200.000000,100;"
    *                             节点值分别为：经度、纬度、高程，第四个值可以理解为行走速率，默认100
    * @param {boolean} isUseTerrainHei 是否随地形变化
    * @param {float} camOffset 相机相对位置
    * @return {string} 返回动画创建成功的返回值，失败返回-1
    */
    this.createAnimFly = function (name, meshFile, actName, nodesInfo, isUseTerrainHei, camOffset) {
        //先检验是否包含该name的动画
        if (this.getAnimFlyByName(name) > 0)
            return -1;
        this.assertOCX();
        var id = this._ocxObj.object.CreateAnimFly(meshFile, actName, nodesInfo, isUseTerrainHei, camOffset);
        if (id > 0) {
            this._animFlyElements.push({ name: name, id: id });
            return id;
        }
    };
    /**
    * 操作某个动画
    * @param {string} name 动画的名称
    * @param {EnumFlyOperType} type 动画的类别
    * @return {string} 设置失败则返回-1
    */
    this.controlAnimFlyByName = function (name, type) {
        this.assertOCX();
        for (var x = 0; x < this._animFlyElements.length; x++) {
            if (this._animFlyElements[x].name === name) {
                return this._ocxObj.object.SetAnimFlyOper(this._animFlyElements[x].id, type);
            }
        }
        return -1;
    };
    /**
    * 所有动画使用同一操作
    * @param {EnumFlyOperType} type 动画的类别
    */
    this.controlAllAnimFly = function (type) {
        this.assertOCX();
        for (var x = 0; x < this._animFlyElements.length; x++) {
            this._ocxObj.object.SetAnimFlyOper(this._animFlyElements[x].id, type);
        }
    };
    /**
    * 删除指定name的动画
    * @param {string} name 动画的名称
    * @return {boolean} 删除操作是否成功的返回值
    */
    this.removeAnimFlyByName = function (name) {
        this.assertOCX();
        //重新申明一个数组存放非name的对象
        var animFlyElements = [];
        var id = -1;
        for (var x = 0; x < this._animFlyElements.length; x++) {
            if (this._animFlyElements[x].name != name) {
                animFlyElements.push(this._animFlyElements[x]);
            }
            else
                id = this._animFlyElements[x].id;
        }
        if (animFlyElements.length < this._animFlyElements.length && id > 0) {
            var flag = this._ocxObj.object.DeleteAnimFly(id);
            //删除成功则重新设置动画数组，并返回1
            if (flag) {
                this._animFlyElements = animFlyElements;
                return true;
            }
        }
        return false;
    };
    /**
    * 删除所有动画
    */
    this.removeAllAnimFly = function () {
        this.assertOCX();
        for (var x = 0; x < this._animFlyElements.length; x++) {
            this._ocxObj.object.DeleteAnimFly(this._animFlyElements[x].id);
        }
        this._animFlyElements = [];
    };
    /**
    * 设置动画的参数
    * @param {Unit} keyIndex 动画添加后的返回值
    * @param {string} argName 参数（目前可以设置为IsKeepCamera）
    * @param {string} args 暂无意义关于参数的具体描述
    */
    this.setAnimFlyParam = function (keyIndex, argName, args) {
        this.assertOCX();
        this._ocxObj.object.SetAnimFlyParam(keyIndex, argName, args);
    };

    /**
    *开始视频录制
    * @param {string} path 视频的输出路径，必须包含后缀名.avi
    * @param {int} width 视频宽度
    * @param {int} height 视频长度
    * @param {number} speed 视频播放速率
    * @returns {boolean} 是否开始
    */
    this.beginRecVideo = function (path, width, height, speed) {
        this.assertOCX();
        return this._ocxObj.object.BeginRecVideo(path, width, height, speed);
    };
    /**
    * 停止录制视频
    */
    this.endRecVideo = function () {
        this.assertOCX();
        this._ocxObj.object.EndRecVideo();
    };
    /**
    * 根据设置的图像信息照相
    * @param {string} filePath 图片的导出完整路径，必须加上后缀名.bmp
    * @param {float} width 图像宽度
    * @param {float} height 图像长度
    * @param {int} unit 图像的单位(PIXEL 0,INCH 1,CENT 2,MILL 3)
    * @param {string} resoultionType 像素单位(像素/英寸、像素/厘米)
    * @param {int} dpi 图像的像素
    * @param {boolean} isShowOverlay 是否showOverlay
    * @param {boolean} isViewNow 是否马上预览图片
    * @return {boolean} 成功返回true，失败则为false
    * @example 
    * var result = globe.outPutImage("C:\\11.jpg", 256, 256, 0, 0, 150, false, false);
    */
    this.outPutImage = function (filePath, width, height, unit, resoultionType, dpi, isShowOverlay, isViewNow) {
        this.assertOCX();
        return this._ocxObj.object.OutImage(filePath, width, height, unit, resoultionType, dpi, isShowOverlay, isViewNow);
    };
    /**
    * 由x、y坐标获取地形数据上的高程值
    * @param {float} x 经度
    * @param {float} y 纬度
    * @return {float} 返回高程值
    */
    this.getTerrainEle = function (x, y) {
        this.assertOCX();
        return this._ocxObj.object.GetTerrainHei(x, y);
    };
    /**
    * 设置缓存类型
    * @param {CachesType} cachesType 缓存类型
    */
    this.setCachesType = function (cachesType) {
        this.assertOCX();
        this._ocxObj.object.SetCachesType(cachesType);
    };
    /**
    * 设置指定图层类型的缓存大小
    * @param {CachesLayerType} type 图层的类型
    * @param {int} size 缓存大小，默认为100
    */
    this.setCacheSize = function (type, size) {
        this.assertOCX();
        this._ocxObj.object.SetMaxLayerCacheSz(type, size);
    };
    /**
    * 自动旋转移动
    * @param {float} x 沿维度运动的速度
    * @param {float} y 沿经度运动的速度
    * @param {float} rotate 旋转的速度
    */
    this.beginAutoPlay = function (x, y, rotate) {
        this.assertOCX();
        this._ocxObj.object.AutoPlay(x, y, rotate);
    };
    /**
    * 转发请求就是因为有的访问不到IGS，需要一个转发页面才能访问IGS，
    * 在IGS的链接串前面加上转发的字符串。
    * 另外，也可以在配置文件里面设置转发配置，Handler.xml
    * @param {boolean} isUsed 是否启用
    * @param {string} handleUrl 设置后的转发url
    */
    this.setUrlHandler = function (isUsed, handleUrl) {
        this.assertOCX();
        this._ocxObj.object.SetUrlHandler(isUsed, handleUrl);
    };
    //------------------模型特效显示部分-------------------------------------------
    /**
    * 设置指定模型的特效显示
    * @param {string} model 拾取模型得到的字符串
    * @param {int} dispType 1:闪烁 2:高亮 3:半透明
    * @param {boolean} clearLast 是否清除上一次的高亮显示。默认得true。
    * @returns {boolean} 操作是否成功
    */
    this.startModelDiplay = function (model, dispType, clearLast) {
        this.assertOCX();
        if (clearLast === false)
            this._ocxObj.object.StartCustomDisplay(model, dispType, false);
        else
            this._ocxObj.object.StartCustomDisplay(model, dispType, true);
    };
    /**
    * 停止所有模型的特效显示
    */
    this.stopModelDisplayAll = function () {
        this.assertOCX();
        this._ocxObj.object.StopCustomDisplayAll();
    };
    /**
    * 停止指定模型的特效显示
    * @param {string} model 拾取模型得到的字符串
    */
    this.stopModelDisplay = function (model) {
        this.assertOCX();
        this._ocxObj.object.StopCustomDisplay(model);
    };
    //-----------------------------------------------------------------------------
    //加载KML和GML的功能部分
    /**
    * 添加KML数据到三维地球上
    * @param {string} url 可以使客户端上指定文件路径或能够获取数据的网络地址
    * @param {string} dispName 暂无实际意义
    * @return {string} 返回该数据的唯一标示符
    */
    this.appendKMLByURL = function (url, dispName) {
        this.assertOCX();
        var result = this._ocxObj.object.AppendKMLByURL(url, dispName);
        this._xmlLayerObj.push({ id: result, name: dispName, type: 'kml' });
        return result;
    };
    /**
    * 添加KML数据到三维地球上
    * @param {string} url 一个完整的kml文件内容
    * @param {string} dispName 暂无实际意义
    * @return {string} 返回该数据的唯一标示符
    */
    this.appendKMLByXML = function (xml, dispName) {
        this.assertOCX();
        var result = this._ocxObj.object.AppendKMLByXML(xml, dispName);
        this._xmlLayerObj.push({ id: result, name: dispName, type: 'kml' });
        return result;

    };
    /**
    * 添加GML数据到三维地球上
    * @param {string} url 可以使客户端上指定文件路径或能够获取数据的网络地址
    * @param {string} dispName 暂无实际意义
    * @return {string} 返回该数据的唯一标示符
    */
    this.appendGMLByURL = function (url, dispName) {
        this.assertOCX();
        var result = this._ocxObj.object.AppendGMLByURL(url, dispName);
        this._xmlLayerObj.push({ id: result, name: dispName, type: 'gml' });
        return result;
    };
    /**
    * 添加GML数据到三维地球上
    * @param {string} url 一个完整的gml文件内容
    * @param {string} dispName 暂无实际意义
    * @return {string} 返回该数据的唯一标示符
    */
    this.appendGMLByXML = function (xml, dispName) {
        this.assertOCX();
        var result = this._ocxObj.object.AppendGMLByXML(xml, dispName);
        this._xmlLayerObj.push({ id: result, name: dispName, type: 'gml' });
        return result;
    };
    /**
    * 删除指定类型名称的（gml或kml）数据图层：传入添加数据时写入的dispName
    */
    this.removeXMLByName = function (dispName) {
        this.assertOCX();
        var layerObj = [];
        for (var x = 0; x < this._xmlLayerObj.length; x++) {
            if (this._xmlLayerObj[x].name !== dispName)
                layerObj.push(this._overMapObj[x]);
            else
                this._ocxObj.object.RemoveXMLByName(this._xmlLayerObj[x].id);
        }
        this._xmlLayerObj = layerObj;
    };
    /**
    * 删除指定类型的（gml或kml）数据图层
    *@param {string} type 类型 gml或kml
    */
    this.removeXMLByType = function (type) {
        this.assertOCX();
        var layerObj = [];
        for (var x = 0; x < this._xmlLayerObj.length; x++) {
            if (this._xmlLayerObj[x].type !== type)
                layerObj.push(this._overMapObj[x]);
            else
                this._ocxObj.object.RemoveXMLByName(this._xmlLayerObj[x].id);
        }
        this._xmlLayerObj = layerObj;
    };
    /**
    * 删除所有添加的gml和kml数据图层
    */
    this.removeAllXMLLayer = function () {
        this.assertOCX();
        for (var x = 0; x < this._xmlLayerObj.length; x++) {
            this._ocxObj.object.RemoveXMLByName(this._xmlLayerObj[x].id);
        }
        this._xmlLayerObj = [];
    };
    //------------------场景视窗调节功能部分---------------------------------------
    /**
    * 设置环境光
    * @param {int} color 环境光颜色，为32位整型，从高位到低位每八位分别表示ARGB
    */
    this.setEnvLight = function (color) {
        this.assertOCX();
        this._ocxObj.object.SetEnvLight(color);
    };
    /**
    * 获取环境光:color 环境光颜色，为32位整型，从高位到低位每八位分别表示ARGB
    * @returns {int} 环境光颜色
    */
    this.getEnvLight = function () {
        this.assertOCX();
        return this._ocxObj.object.GetEnvLight();
    };
    /**
    * 设置天空盒信息
    * @param {boolean} startFlag TRUE:启用天空盒 FALSE:不启用天空盒，只有启用天空盒时后面的参数才有效
    * @param {string} materialName 设置天空盒使用的材质
    * @param {float} xRotate 绕x轴的旋转
    * @param {float} yRotate 绕y轴的旋转
    * @param {float} zRotate 绕z轴的旋转
    */
    this.setSky = function (startFlag, materialName, xRotate, yRotate, zRotate) {
        this.assertOCX();
        this._ocxObj.object.SetSky(startFlag, materialName, xRotate, yRotate, zRotate);
    };
    /**
    * 获取天空盒信息
    * @returns {string}
    */
    this.getSky = function () {
        this.assertOCX();
        return this._ocxObj.object.GetSky();
    };
    /**
    * 设置场景雾参数
    * @param {Short} mode 雾模式，0-NONE 1-EXP 2-EXP2 3-LINER，为0时表示没有任何雾效果，设置后面的参数也无效
    * @param {int} color 颜色，为32位整型，从高位到低位每八位分别表示ARGB
    * @param {float} density 浓度
    * @param {float} start 开始值，只在线性模式下有效
    * @param {float} end 结束值，只在线性模式下有效
    */
    this.setFog = function (mode, color, density, start, end) {
        this.assertOCX();
        this._ocxObj.object.SetFog(mode, color, density, start, end);
    };
    /**
    * 获取雾效参数
     * @returns {string}
    */
    this.getFog = function () {
        this.assertOCX();
        return this._ocxObj.object.GetFog();
    };
    /**
    * 保存场景视窗的相关参数到配置文件
    * 对场景设置了环境光、天空盒、雾效以及相机参数后，默认是不会保存到配置文件的，需要
    * 调用本函数保存到配置文件，下次预览场景时会达到修改后的效果。
    */
    this.saveEnvParam = function () {
        this.assertOCX();
        this._ocxObj.object.SaveEnvParam();
    };
    //------------------三维切割相关方法场景视窗调节功能部分-----------------------
    /**
    * 构建一个XYZ形式的辅助平面，Geomtry对象以添加至globe
    * @param {string} range3D 场景的全范围，格式为：xmin，ymin，zmin，xmax， ymax，zmax
    * @param {string} type 基础平面类型，X、Y或Z，取值为：x、y、z
    * @param {float} cutvalue 切割界限值
    * @returns {int} 返回绘制的图形id,失败小于1
    */
    this.createXYZSurface = function (range3D, type, cutvalue) {
        if (range3D.split(',').length !== 6)
            return 0;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_SurByXYZ, range3D,
            "axis:" + type + ";leftvalue:" + cutvalue + ";rightvalue:" + cutvalue, "");

        var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 25600, \"fillclr\" : 25600," +
            "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 0, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
            "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };
    /**
    * @callback Globe~workflowSuccess
    * @param {object} data 成功返回数据
    */
    /**
    * @callback Globe~workflowError
    * @param {object} xhr 失败返回xmlHttpRequest对象
    */
    /**
    * 执行平面方式切割模型
    * @param {string} orgSFClsStr 被切割的要素类GDBP URL
    * @param {string} leftSFClsStr 切割后左边要素类GDBP URL
    * @param {string} rightSFClsStr 切割后右边要素类GDBP URL
    * @param {x|y|z} type 切割类型，x,y,z 
    * @param {float} leftValue 切面左边线
    * @param {float} rigthValue 切面右边线
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip 服务器ip 缺省为localhost
    * @param {int} port 服务器端口 缺省为6163
    */
    this.exeCutByXYZSurface = function (orgSFClsStr, leftSFClsStr, rightSFClsStr, type, leftValue, rigthValue, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('leftSFClsStr', leftSFClsStr);
        map.add('rightSFClsStr', rightSFClsStr);
        map.add('type', type);
        map.add('leftValue', leftValue);
        map.add('rigthValue', rigthValue);
        this.exeWorkflow(ip, port, 600322, map.map, successCallback, errorCallback);
    };
    /**
    * 通过a、b两个向量构建一个切割平面，Geomtry对象以添加至globe
    * @param {string} range3D 场景的全范围，格式为：xmin，ymin，zmin，xmax， ymax，zmax
    * @param {float} aValue 构建面使用的a，a向量的角度，取值为：0-360
    * @param {float} bvalue 构建面使用的b，b向量的角度，取值为：0-360
    * @returns {int} 返回绘制的图形id,失败小于1
    */
    this.createABSurface = function (range3D, aValue, bvalue) {
        if (range3D.split(',').length !== 6)
            return 0;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_SurByAB, range3D,
            "avalue:" + aValue + ";bvalue:" + bvalue, "");

        var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 25600, \"fillclr\" : 25600," +
            "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 0, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
            "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };
    /**
    * 执行任意平面切割模型
    * @param {string} orgSFClsStr 被切割简单要素类GDBP URL 
    * @param {string} leftSFClsStr 切割后左边要素类GDBP URL
    * @param {string} rightSFClsStr 切割后右边要素类GDBP URL
    * @param {int} alphaValue a法向量，0-360
    * @param {int} beltaValue b法向量，0-360
    * @param {string} scaleValue 显示比例，格式 x:y:z
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip IGS服务ip 缺省为localhost
    * @param {int} port IGS服务端口 缺省为6163
    */
    this.exeCutByABSurface = function (orgSFClsStr, leftSFClsStr, rightSFClsStr, alphaValue, beltaValue, scaleValue, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('leftSFClsStr', leftSFClsStr);
        map.add('rightSFClsStr', rightSFClsStr);
        map.add('AValue', alphaValue);
        map.add('BValue', beltaValue);
        map.add('scale', scaleValue);
        this.exeWorkflow(ip, port, 600321, map.map, successCallback, errorCallback);
    };
    /**
    * 创建一个圆柱体，Geomtry对象以添加至globe
    * @param {string} range3D 场景的全范围，格式为：xmin，ymin，zmin，xmax， ymax，zmax
    * @param {string} type 基础平面类型，X、Y或Z，取值为：x、y、z
    * @param {float} centerA 圆柱体的面的坐标，视情况而定：x、y；y、z；x、z
    * @param {float} centerB 圆柱体的面的坐标，视情况而定：x、y；y、z；x、z
    * @param {float} radius 圆柱体的半径
    * @returns {int} 返回绘制的图形id,失败小于1
    */
    this.createCyliner = function (range3D, type, centerA, centerB, radius) {
        if (range3D.split(',').length !== 6)
            return 0;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_Cyliner, range3D,
            "axis:" + type + ";radius:" + radius + ";xcenter:" + centerA + ";ycenter:" + centerB, "");

        var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 25600, \"fillclr\" : 25600," +
            "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 0, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
            "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };
    /**
    * 执行圆柱体方式切割模型
    
    * @param {string} orgSFClsStr 被切割简单要素类GDBP URL
    * @param {string} leftSFClsStr 切割后左边要素类GDBP URL
    * @param {string} rightSFClsStr 切割后右边要素类GDBP URL
    * @param {string} type 平面类型，分别在XOY、XOZ、YOZ三个平面基础上，输入值分别为：Z、Y、X
    * @param {float} centerX 圆柱体中心点X坐标
    * @param {float} centerY 圆柱体中心点Y坐标
    * @param {float} centerZ 圆柱体中心点Z坐标
    * @param {float} radius 圆柱体半径
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip IGS服务ip 缺省为localhost
    * @param {int} port IGS服务端口 缺省为6163
    */
    this.exeCutByCyliner = function (orgSFClsStr, leftSFClsStr, rightSFClsStr, type, centerX, centerY, centerZ, radius, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('leftSFClsStr', leftSFClsStr);
        map.add('rightSFClsStr', rightSFClsStr);
        map.add('type', type);
        map.add('centerX', centerX);
        map.add('centerY', centerY);
        map.add('centerZ', centerZ);
        map.add('radius', radius);
        this.exeWorkflow(ip, port, 600325, map.map, successCallback, errorCallback);
    };
    /**
    * 创建一个长方体圆柱体，Geomtry对象以添加至globe
    * @param {string} range3D 场景的全范围，格式为：xmin，ymin，zmin，xmax， ymax，zmax
    * @param {string} type 基础平面类型，X、Y或Z，取值为：x、y、z
    * @param {float} centerX 长方体的x坐标
    * @param {float} centerY 长方体的y坐标
    * @param {float} centerZ 长方体的z坐标
    * @param {float} len 长方体的长
    * @param {float} wid 长方体的宽
    * @return {int} 返回绘制的图形id,失败小于1
    */
    this.createBox = function (range3D, type, centerX, centerY, centerZ, len, wid) {
        if (range3D.split(',').length !== 6)
            return 0;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_Box, range3D,
            "axis:" + type + ";xcenter:" + centerX + ";ycenter:" + centerY + ";zcenter:" + centerZ
            + ";length:" + len + ";width:" + wid, "");

        var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 25600, \"fillclr\" : 25600," +
            "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 0, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
            "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };
    /**
    * 执行长方体方式切割模型
    * @param {string} orgSFClsStr 被切割简单要素类GDBP URL
    * @param {string} leftSFClsStr 切割后左边要素类GDBP URL
    * @param {string} rightSFClsStr 切割后右边要素类GDBP URL
    * @param {string} type 平面类型，分别在XOY、XOZ、YOZ三个平面基础上，输入值分别为：Z、Y、X
    * @param {float} centerX 长方体中心点X坐标
    * @param {float} centerY 长方体中心点Y坐标
    * @param {float} centerZ 长方体中心点Z坐标
    * @param {float} length 长方体的长
    * @param {float} width 长方体的宽
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip IGS服务ip 缺省为localhost
    * @param {int} port IGS服务端口 缺省为6163
    */
    this.exeCutByBox = function (orgSFClsStr, leftSFClsStr, rightSFClsStr, type, centerX, centerY, centerZ, length, width, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('leftSFClsStr', leftSFClsStr);
        map.add('rightSFClsStr', rightSFClsStr);
        map.add('type', type);
        map.add('centerX', centerX);
        map.add('centerY', centerY);
        map.add('centerZ', centerZ);
        map.add('length', length);
        map.add('width', width);
        this.exeWorkflow(ip, port, 600326, map.map, successCallback, errorCallback);
    };
    /**
    * 创建一个隧道几何体，Geomtry对象以添加至globe
    * @param {string} range3D 场景的全范围，格式为：xmin，ymin，zmin，xmax， ymax，zmax
    * @param {string} secType 隧道横截面的形状，圆形、对边形或拱形，取值为：circle、polygon或arch
    * @param {string} pnts 隧道基准线的点集，格式：x1,y1,z1;x2,y2,z2;x3,y3,z3.....
    * @param {float} radius 圆形：半径；多边形：外接圆半径；拱形：上面圆弧的半径
    * @param {int} secNum 圆形：圈的边数；多边形：多边形的边数；拱形：圆弧的边数
    * @param {float} depth 隧道的深度
    * @param {float} length 类型为拱形时有效，表示多边形的长
    * @param {float} height 类型为拱形时有效，表示多边形的高
    * @return {int} 返回绘制的图形id,失败小于1
    */
    this.createPipe = function (range3D, secType, pnts, radius, secNum, depth, length, height) {
        if (range3D.split(',').length !== 6)
            return null;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_Pipe, range3D,
            "secType:" + secType + ";radius:" + radius + ";secNum:" + secNum +
            ";depth:" + depth + ";length:" + length + ";height:" + height + ";", pnts);
        var infoJson = "{\"fillclr\" : 5, \"type\":\"surfaceinfo\"}";

        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };
    /**
    * 执行隧道方式切割模型
    * @param {string} orgSFClsStr 被切割简单要素类GDBP URL
    * @param {string} leftSFClsStr 切割后左边要素类GDBP URL
    * @param {string} rightSFClsStr 切割后右边要素类GDBP URL
    * @param {string} pnts 隧道经过的点集，二维点，格式为：x1,y1;x2,y2;x3,y3......
    * @param {circle|polygon|arch} type 隧道的类型，圆形，多边形或拱形，分别对应参数：circle、polygon、arch
    * @param {float} radius 圆形：半径，多边形：外接圆半径，拱形：拱形半径
    * @param {int} number 圆形：段数，多边形：多边形边数，拱形：段数
    * @param {float} depth 隧道的深度
    * @param {float} length 当选择拱形时有效：表示矩形的长度
    * @param {float} height 当选择拱形时有效：表示矩形的高度
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip IGS服务ip 缺省为localhost
    * @param {int} port IGS服务端口 缺省为6163
    */
    this.exeCutByPipe = function (orgSFClsStr, leftSFClsStr, rightSFClsStr, pnts, type, radius, number, depth, length, height, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('leftSFClsStr', leftSFClsStr);
        map.add('rightSFClsStr', rightSFClsStr);
        map.add('pnts', pnts);
        map.add('type', type);
        map.add('radius', radius);
        map.add('number', number);
        map.add('depth', depth);
        map.add('length', length);
        map.add('height', height);
        this.exeWorkflow(ip, port, 600327, map.map, successCallback, errorCallback);
    };
    /**
    * 执行工作流
    * @param {string} ip IGS服务ip
    * @param {int} port IGS服务端口
    * @param {int} flowId 工作流流程的编号
    * @param {Array<WFKeyValue>} keyvalueArray 工作流执行参数数组对象 
    * @param {function} successCallback 成功回调
    * @param {function} errorCallback 失败回调
    */
    this.exeWorkflow = function (ip, port, flowId, keyvalueArray, successCallback, errorCallback) {
        ip = ip || 'localhost';
        port = port || '6163';
        var url = 'http://' + ip + ":" + port + "/igs/rest/mrfws/execute/" + flowId + "?f=json";
        var postData = new Util().toJSON(keyvalueArray);
        if (window.XDomainRequest && !/MSIE 10.0/.test(window.navigator.userAgent)) {
            var xdr = new window.XDomainRequest();
            xdr.onload = function () { var json = $.parseJSON(this.responseText); successCallback && successCallback(json); };
            xdr.onerror = function () { errorCallback && errorCallback(xdr); };
            xdr.open("post", url);
            xdr.send(postData);
        } else {
            $.support.cors = true;
            $.ajax({
                url: url,
                type: 'post',
                data: postData,
                dataType: 'json',
                success: function (data) {
                    successCallback && successCallback(data);
                },
                error: function (xhr) {
                    errorCallback && errorCallback(xhr);
                }
            });
        }
    };

    /**
    * 根据线创建垂直曲面，Geomtry对象以添加至globe
    * @param {string} range3D 场景的全范围，格式为：xmin,ymin,zmin,xmax,ymax,zmax
    * @param {string} pnts 构成线的点集，格式：x1,y1,z1;x2,y2,z2;x3,y3,z3.....
    * @returns {int} 返回绘制的图形id,失败小于1
    */
    this.createCutSurByLin = function (range3D, pnts) {
        if (range3D.split(',').length !== 6)
            return 0;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_SurByLin, range3D, "", pnts);
        var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 16256, \"fillclr\" : 25600," +
            "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 1, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
            "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };

    /**
    *根据折线创建封闭体
    *@param {string} range3D 场景的全范围，格式为：xmin,ymin,zmin,xmax,ymax,zmax
    *@param {float} height 高度
    *@param {float} depth 深度
    *@param {string} pnts 构成线的点集，格式：x1,y1,z1;x2,y2,z2;x3,y3,z3.....,注意一定要收尾封闭，即第一个点和最后一个点相同
    *@returns {int} 返回绘制的图形id,失败小于1
    */
    this.createCutEntityByLin = function (range3D, height, depth, pnts) {
        if (range3D.split(',').length !== 6)
            return 0;
        //使用插件内部的方法获取点集
        var geo = this._ocxObj.object.CreateCutGeomtry(EnumMdlCutType.MdlCut_EntityByLin,
            range3D,
            "height:" + height + ";depth:" + depth,
            pnts);
        var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 25600, \"fillclr\" : 25600," +
            "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 0, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
            "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
        if (geo)
            return this._ocxObj.object.AppendGeom(geo, infoJson);
        return -1;
    };

    /**
    * 构造面切割
    * @param {string} orgSFClsStr 被切割的三维简单要素类
    * @param {string} points x1,y1,z1;x2,y2,z2;x3,y3,z3
    * @param {string} lineSFClsStr 导入线要素类GDBP url
    * @param {float} angleX x旋转角度
    * @param {float} angleY y旋转角度
    * @param {boolean} closeLine 是否封闭折线来构造体
    * @param {float} depth 深度
    * @param {boolean} saveModal 是否保存切割后的模型，默认不保存
    * @param {string} resultModalClsPrefix 保存结果模型类的前缀，不填则为默认前缀
    * @param {boolean} saveSection 是否保存切割后的剖面，默认不保存
    * @param {string} resultSectionClsPrefix 保存结果剖面类的前缀，不填则为默认前缀
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip IGS服务ip 缺省为localhost
    * @param {int} port IGS服务端口 缺省为6163
    */
    this.exeCutByVerticalSur = function (orgSFClsStr, points, lineSFClsStr, angleX, angleY, closeLine, depth, saveModal, resultModalClsPrefix, saveSection, resultSectionClsPrefix, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('points', points);
        map.add('lineSFClsStr', lineSFClsStr);
        map.add('angleX', angleX);
        map.add('angleY', angleY);
        map.add('closeLine', closeLine);
        map.add('depth', depth);
        map.add('saveModal', saveModal);
        map.add('resultModalClsPrefix', resultModalClsPrefix);
        map.add('saveSection', saveSection);
        map.add('resultSectionClsPrefix', resultSectionClsPrefix);
        this.exeWorkflow(ip, port, 600329, map.map, successCallback, errorCallback);
    };
    /**
    * 多平面批量切割模型
    * @param {string} orgSFClsStr 被切割简单要素类路径
    * @param {string} types 平面类型，分别在XOY、XOZ、YOZ三个平面基础上，输入值分别为：Z、Y、X，批量方式则输入多个并有半角逗号隔开,比如:X,Z,Y
    * @param {string} leftValues 平面左边线的值,批量方式则输入多个并有半角逗号隔开,比如:20,20
    * @param {string} rigthValues 平面右边线的值,批量方式则输入多个并有半角逗号隔开,比如:20,20
    * @param {boolean} saveModal 是否保存切割后的模型，默认保存
    * @param {string} resultModalClsPrefix 保存结果模型类的前缀，不填则为默认前缀
    * @param {boolean} saveSection 是否保存切割后的剖面，默认不保存
    * @param {string} resultSectionClsPrefix 保存结果剖面类的前缀，不填则为默认前缀
    * @param {Globe~workflowSuccess} successCallback 成功回调
    * @param {Globe~workflowError} errorCallback 失败回调
    * @param {string} ip IGS服务ip 缺省为localhost
    * @param {int} port IGS服务端口 缺省为6163
    */
    this.exeCutByMultiXYZSurface = function (orgSFClsStr, types, leftValues, rigthValues, saveModal, resultModalClsPrefix, saveSection, resultSectionClsPrefix, successCallback, errorCallback, ip, port) {
        var map = new WFKeyValueMap();
        map.add('orgSFClsStr', orgSFClsStr);
        map.add('types', types);
        map.add('leftValues', leftValues);
        map.add('rigthValues', rigthValues);
        map.add('saveModal', saveModal);
        map.add('resultModalClsPrefix', resultModalClsPrefix);
        map.add('saveSection', saveSection);
        map.add('resultSectionClsPrefix', resultSectionClsPrefix);
        this.exeWorkflow(ip, port, 600328, map.map, successCallback, errorCallback);
    };
    /**
    * 执行功能插件
    * @param {string} toolIn 需要调用的插件所在的插件功能组
    * @param {string} func 需要调用的插件功能项名称
    */
    this.executeTool = function (toolIn, func) {
        this.assertOCX();
        this._ocxObj.object.ExcuteTool(toolIn, func);
    };

    /**
    * 设置图层的显示比例,这里是以场景为单位进行设置
     * @param {string} id 地图服务ID
    * @param {string} layerIndex 图层(场景索引)
    * @param {string} RatioValue "Scale:x,y,z"
    * @return {string} 设置成功返回id值，失败则返回-1
    */
    this.setSceneRatio = function (id, layerIndex, RatioValue) {
        this.assertOCX();
        return this._ocxObj.object.SetScenePropertySet(id, layerIndex, RatioValue);

    };
    /**
   * 设置图层的显示位置,这里是以场景为单位进行设置
   * @param {string} id 地图服务ID
   * @param {string} layerIndex 图层(场景索引)
   * @param {string} Position "Position:x,y,z"
   * @return {string} 设置成功返回id值，失败则返回-1
   */
    this.setScenePosition = function (id, layerIndex, Position) {
        this.assertOCX();
        return this._ocxObj.object.SetScenePropertySet(id, layerIndex, Position);
    };
    /**
   * 设置图层的旋转角度,这里是以场景为单位进行设置
   * @param {string} id 地图服务ID
   * @param {string} layerIndex 图层(场景索引)
   * @param {string} RotateValue "Rotate:0,0,1,20"代表以Z轴为中心旋转20度
   * @return {string} 设置成功返回id值，失败则返回-1
   */
    this.setSceneRotate = function (id, layerIndex, RotateValue) {
        this.assertOCX();
        return this._ocxObj.object.SetScenePropertySet(id, layerIndex, RotateValue);
    };
    /**
    * 折现延伸到包围盒;绘制切割面，交互获取点序列之后，可以通过该函数将折线延伸至包围盒
    * @param {string} range 包围盒范围
    * @param {string} ctrlLine 折线序列点
    * @returns {string} 返回的是延伸后的点序列
    * @example 
    * var info = "{\"pntarray\":[{\"x\":97.16172790527344,\"y\":153.72537231445312,\"z\":21},{\"x\":135.30307006835937,\"y\":111.13523864746094,\"z\":21},{\"x\":57.720,\"y\":57.09,\"z\":21}],\"range\":axWebOcx.GetSceneProperty(docID1, 0, "Range3D")}";
    * string extPnt = axWebOcx.CommMath("ExtendFoldLinToBoxF", info);
    */
    this.commMath = function (oper, info) {
        this.assertOCX();
        return this._ocxObj.object.CommMath(oper, info);
    };

    //-----------------------------------------------------------------------------
    /**
    * 缓存预加载功能
    * @param {Long} sddEntity 地图文档添加完成以后的事件
    * @param {int} layerIndex 预加载的图层，-1表示预加载所有图层
    * @param {int} startlvl 开始级数
    * @param {int} endlvl   结束级数
    * @returns {boolean} 操作结果
    */
    this.preLoadCache = function (sddEntity, layerIndex, startlvl, endlvl) {
        this.assertOCX();
        return this._ocxObj.object.PreLoadCache(sddEntity, layerIndex, startlvl, endlvl);
    };
    //-----------------------------------------------------------------------------
    /**
    * 注册事件
    * @param {EventType} type 事件类型
    * @param {Function} callback 函数
    * @param {object} obj 对象
    */
    this.addEventListener = function (type, callback, obj) {
        this._events.register(type, callback, obj);
    };
    /**
    * 反注册事件
    * @param {EventType} type 事件类型
    * @param {Function} callback 函数
    */
    this.removeEventListener = function (type, callback) {
        this._events.unregister(type, callback);
    };
    /**
    * 分析完成的事件
    * @event Globe#FinishedAnalyze
    * @type {EventType}
    */
    /**
    * 触发分析完成的事件
    * @fires FinishedAnalyze
    * @private 
    */
    this._onFinishedAnalyze = function () {
        this._events.dispatchEvent(EventType.FinishedAnalyze, arguments);
        //这里将最新分析得到的结果对象更新到全局变量中
        if (arguments[0]) {
            //将json转为FLoodAnalyzeInfo对象
            var object = new Util().evalJSON(arguments[0]);
            //将json转为FLoodAnalyzeInfo对象
            var info = new Util().convertObjectToAnalyseTypeInfo(object);
            this.setAnalyseInfo(info);
        }
    };
    /**
    * 绘制完成的事件
    * @event Globe#FinishedDraw
    * @type {EventType}
    */
    /**
    * 触发绘制完成的事件
    * @files Globe#FinishedDraw
    * @private
    */
    this._onFinishedDraw = function () {
        //绘制完成以后存放当前正在绘制要素的坐标
        this.currentElePnts = arguments[0];
        this._events.dispatchEvent(EventType.FinishedDraw, arguments);
    };
    /**
    * 拾取标注完成的事件
    * @event Globe#PickLabel
    * @type {EventType}
    */
    /**
    * 触发拾取标注完成的事件
    * @files Globe#PickLabel
    * @private 
    */
    this._onPickLabel = function () {
        this._events.dispatchEvent(EventType.PickLabel, arguments);
    };
    /**
    * 拾取模型完成的事件
    * @event Globe#PickModel
    * @type {EventType}
    */
    /**
    * 触发拾取模型完成的事件
    * @fires Globe#PickModel
    * @private 
    */
    this._onPickModel = function () {
        this._events.dispatchEvent(EventType.PickModel, arguments);
    };

    //下面四种事件没有响应
    /**
    * 键盘按下的事件
    * @event Globe#KeyDown
    * @type {EventType}
    */
    /**
    * 键盘按下的事件
    * @fires Globe#KeyDown
    * @private 
    */
    this._onKeyDown = function () {
        this._events.dispatchEvent(EventType.KeyDown, arguments);
    };
    /**
    * 键盘释放的事件
    * @event Globe#KeyUp
    * @type {EventType}
    */
    /**
    * 触发键盘释放的事件
    * @fires Globe#KeyUp
    * @private 
    */
    this._onKeyUp = function () {
        this._events.dispatchEvent(EventType.KeyUp, arguments);
    };
    /**
    * 鼠标移动的事件
    * @event Globe#MouseMove
    * @type {EventType}
    */
    /**
    * 触发鼠标移动的事件
    * @fires Globe#MouseMove
    * @private 
    */
    this._onMouseMove = function () {
        this._events.dispatchEvent(EventType.MouseMove, arguments);
    };
    /**
    * 鼠标滑轮滚动的事件
    * @event Globe#MouseWheel
    * @type {EventType}
    */
    /**
    * 触发鼠标滑轮滚动的事件
    * @fires Globe#MouseWheel
    * @private 
    */
    this._onMouseWheel = function () {
        this._events.dispatchEvent(EventType.MouseWheel, arguments);
    };
    /**
    * 鼠标中键up
    * @event Globe#MButtonDown
    * @type {EventType}
    */
    /**
    * 触发鼠标中键up
    * @fires Globe#MButtonDown
    * @private 
    */
    this._onMButtonDown = function () {
        this._events.dispatchEvent(EventType.MButtonDown, arguments);
    };
    /**
    * 鼠标中键down
    * @event Globe#MButtonUp
    * @type {EventType}
    */
    /**
    * 触发鼠标中键down
    * @fires Globe#MButtonUp
    * @private 
    */
    this._onMButtonUp = function () {
        this._events.dispatchEvent(EventType.MButtonUp, arguments);
    };
    /**
    * 范围改变的事件
    * @event Globe#Jumped
    * @type {EventType}
    */
    /**
    * 触发范围改变的事件
    * @fires Globe#Jumped
    * @private 
    */
    this._onJumped = function () {
        this._events.dispatchEvent(EventType.Jumped, arguments);
    };
    /**
    * 拾取二维图形
    * @event Globe#PickElement
    * @type {EventType}
    */
    /**
    * 触发拾取二维图形
    * @fires Globe#PickElement
    * @private 
    */
    this._onPickElement = function () {
        this._events.dispatchEvent(EventType.PickElement, arguments);
    };
    /**
    * 左键双击完成的事件
    * @event Globe#LButtonDblClk
    * @type {EventType}
    */
    /**
    * 触发左键双击完成的事件
    * @fires Globe#LButtonDblClk
    * @private 
    */
    this._onLButtonDblClk = function () {
        this._events.dispatchEvent(EventType.LButtonDblClk, arguments);
    };
    /**
    * 左键按下完成的事件
    * @event Globe#LButtonDown
    * @type {EventType}
     * @property {int} flag
     * @property {int} x 屏幕坐标x
     * @property {int} y 屏幕坐标y
     * @property {float} dx 地理坐标x
     * @property {float} dy 地理坐标y
     * @property {float} dz 地理坐标z
    */
    /**
    * 触发左键按下完成的事件
    * @fires Globe#LButtonDown
    * @private 
    */
    this._onLButtonDown = function () {
        this._events.dispatchEvent(EventType.LButtonDown, arguments);
    };
    /**
    * 左键释放完成的事件
    * @event Globe#LButtonUp
    * @type {EventType}
    */
    /**
    * 触发左键释放完成的事件
    * @fires Globe#LButtonUp
    * @private 
    */
    this._onLButtonUp = function () {
        this._events.dispatchEvent(EventType.LButtonUp, arguments);
    };
    /**
    * 右键双击完成的事件
    * @event Globe#RButtonDblClk
    * @type {EventType}
    */
    /**
    * 触发右键双击完成的事件
    * @fires Globe#RButtonDblClk
    * @private 
    */
    this._onRButtonDblClk = function () {
        this._events.dispatchEvent(EventType.RButtonDblClk, arguments);
    };
    /**
    * 右键按下完成的事件
    * @event Globe#RButtonDown
    * @type {EventType}
    */
    /**
    * 触发右键按下完成的事件
    * @fires Globe#RButtonDown
    * @private 
    */
    this._onRButtonDown = function () {
        this._events.dispatchEvent(EventType.RButtonDown, arguments);
    };
    /**
    * 右键释放完成的事件
    * @event Globe#RButtonUp
    * @type {EventType}
    */
    /**
    * 右键释放完成的事件
    * @fires Globe#RButtonUp
    * @private 
    */
    this._onRButtonUp = function () {
        this._events.dispatchEvent(EventType.RButtonUp, arguments);
    };
    /**
    * 文档加载完成后的回调
    * @event Globe#FinishedAddDoc
    * @type {EventType}
    */
    /**
    * 文档加载完成后的回调
    * @fires Globe#FinishedAddDoc
    * @private 
    */
    this._onFinishedAddDoc = function () {
        this._events.dispatchEvent(EventType.FinishedAddDoc, arguments);
    };
    /**
    * 缓存加载完成事件
    * @event Globe#FinishedLoadCache
    * @type {EventType}
    */
    /**
    * 缓存加载完成事件
    * @fires Globe#FinishedLoadCache
    * @private 
    */
    this._onFinishedLoadCache = function () {
        this._events.dispatchEvent(EventType.FinishedLoadCache, arguments);
    };
    /**
    * 插件正常加载完毕
    * @event Globe#CreationComplete
    * @type {EventType}
    */
    /**
    * 触发插件正常加载完毕
    * @fires Globe#CreationComplete
    * @private 
    */
    // 修改历史：1
    // 1.修改人：赵前军 2014-4-17
    // 修改问题：解决在浏览三维球时，不能及时显示当前状态条的问题
    this._onCreationComplete = function () {
        // 修改说明：因为三维插件浏览模式设置必须是在插件已经正常加载完毕才可以生效，
        //           所以在地球插件加载完毕的回调中设置当前状态条               
        // 修改人：赵前军 2014-4-17
        this.setPlantUIStateVisible(true);
        this._events.dispatchEvent(EventType.CreationComplete, arguments);
    };

    /**
    * 设置超时时间
    * @param {long} timeout 超时时间，单位毫秒  
    * @returns {int} 0失败 1成功 -1表示不超时
    */
    this.setTimeOut = function (timeout) {
        this.assertOCX();
        return this._ocxObj.object.SetTimeOut(timeout);
    };

    /**
    * 获取地形是否加载完成标识
    * @returns {boolean} false未完成，true完成 
    */
    this.isTerrainLoaded = function () {
        this.assertOCX();
        return this._ocxObj.object.IsTerrainLoaded();
    };
    /**
    * 三维要素查询
    * @param {G3DDocQuery} g3DDocQuery 查询参数
    * @param {requestSuccessCallback} successCallback 查询成功回调函数,添加回调第三个附加参数返回layerIndex
    * @param {requestErrorCallback} errorCallback 查询失败回调函数
    * @param {string} type 请求方式支持两种get、post
    */
    this.queryG3DFeature = function (g3DDocQuery, successCallback, errorCallback, type) {
        var o = g3DDocQuery;
        if (!g3DDocQuery) {
            alert("调用queryG3DFeature，查询参数g3DDocQuery不能为空");
            return;
        }
        var querystring;
        if (o.gdbp) {
            querystring = 'gdbp=' + o.gdbp;
        } else {
            querystring = 'docName=' + o.docName + '&layerindex=' + o.layerIndex;
        }
        //构建查询参数
        if (o.geometryType && o.geometry) {
            //这里可以进行进一步的参数验证
            querystring += '&geometryType=' + o.geometryType + '&geometry=' + o.geometry;
        }
        querystring += '&f=json'; //只能是json格式
        if (o.where)
            querystring += '&where=' + o.where;
        if (o.objectIds)
            querystring += '&objectIds=' + o.objectIds;
        if (o.structs)
            querystring += '&structs=' + o.structs;
        if (o.page)
            querystring += '&page=' + o.page;
        if (o.pageCount)
            querystring += '&pageCount=' + o.pageCount;
        if (o.rule)
            querystring += '&rule=' + o.rule;
		if (o.rtnLabel)
            querystring += '&rtnLabel=' + o.rtnLabel;
        var url = 'http://' + o.serverIp + ':' + o.serverPort + '/igs/rest/g3d/getFeature';
        var postData = null;
        if (type && type.toLowerCase() === 'post') {
            postData = querystring;
        } else {
            url = url + "?" + querystring;
        }
        Util.corsAjax(url, type, postData, function (res, code) {
            successCallback && successCallback(res, code, o.layerIndex);
        }, errorCallback, 'json', this.proxy);
    };
    this.setSceneNode = function (info) {
        this.assertOCX();
       this._ocxObj.object.SetSceneNode(info);
    }
    /**
     * 模型上拾取
     * @param {Point3D} point3d 
     * @param {PickModelParam} param 
     */
    this.pickModel = function (point3d, param) {
        var query = new G3DDocQuery();
        $.extend(query, param);
        //query.geometryType = "Point3D";
        //query.geometry = point3d.x + "," + point3d.y + "," + point3d.z + ",0.0001";
        query.structs = '{"IncludeAttribute":true,"IncludeGeometry":true,"IncludeWebGraphic":false}';
        query.pageCount = 1;
        query.objectIds = 1;
        var self = this;
        this.queryG3DFeature(query,
            function (res) {
                if (res && res.SFEleArray && res.SFEleArray[0] && res.SFEleArray[0].fGeom) {
                    var geom = res.SFEleArray[0].fGeom;
                    var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 16256, \"fillclr\" : 25600," +
     "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 1, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
     "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
                    if (geom.SurfaceGeom || geom.EntityGeom) {
                        var surFeature2obj = function (surfeature) {
                            var surface = new G3DSurfaceObject();
                            surface.pntcount = surfeature.points.length;
                            surface.dots = surfeature.points;
                            surface.trianglecount = surfeature.triangles.length / 3;
                            surface.triangles = surfeature.triangles;
                            surface.texturelayernum = surface.texturelayerind = 0;
                            surface.colors = surfeature.colors;
                            surface.texturepos = null;
                            surface.topo = surfeature.topos;
                            surface.normals = surfeature.normalVectors;
                            return surface;
                        }
                        var object = new G3DGeometryObject();
                        object.items = [];
                        if (geom.SurfaceGeom) {
                            object.type = geom.SurfaceGeom.length === 1 ? "anysurface" : "multisurface";
                            for (var i = 0; i < geom.SurfaceGeom.length; i++) {
                                object.items.push(surFeature2obj(geom.SurfaceGeom[i]));
                            }
                        } else if (geom.EntityGeom) {
                            object.type = "multisurface";
                            for (var i = 0; i < geom.EntityGeom.length; i++) {
                                var entity = geom.EntityGeom[i];
                                for (var j = 0; j < entity.surfaces.length; j++) {
                                    object.items.push(surFeature2obj(entity.surfaces[j]));
                                }
                            }
                            object.count = object.items.length;
                        }
                        self.appendGeom(new Util().toJSON(object), infoJson);
                    }
                }
            },
            function () {
                console && console.log('查询要素失败');
            }, 'post');
    }
    /**
     * 获取文档信息
     * @param {string} serverIp
     * @param {string} serverPort
     * @param {requestSuccessCallback} successCallback 成功回调
     * @param {requestErrorCallback} errorCallback 失败回调
     */
    this.getDocList = function (serverIp, serverPort, successCallback, errorCallback) {
        serverIp = serverIp || "127.0.0.1";
        serverPort = serverPort || 6163;
        var url = 'http://' + serverIp + ':' + serverPort + '/igs/rest/g3d/GetDocList';
        Util.corsAjax(url, 'get', null, successCallback, errorCallback, 'json', this.proxy);
    }
    /**
     * 获取文档信息
     * @param {string} docName 文档名
     * @param {requestSuccessCallback} successCallback 成功回调
     * @param {requestErrorCallback} errorCallback 失败回调
     * @param {string} serverIp IGS服务IP
     * @param {int} serverPort IGS服务端口
     */
    this.getDocInfo = function (docName, successCallback, errorCallback, serverIp, serverPort) {
        serverIp = serverIp || "127.0.0.1";
        serverPort = serverPort || 6163;
        var url = 'http://' + serverIp + ':' + serverPort + '/igs/rest/g3d/' + docName + '/GetDocInfo?f=json';
        Util.corsAjax(url, 'get', null, successCallback, errorCallback, 'json', this.proxy);
    }
    /**
     * 高亮要素
     * @param {string} docName 地图文档名
     * @param {int} docId 地图文档加载到球后返回id
     * @param {int} layerIndex 图层在地图文档场景中索引
     * @param {int|Array<int>} fid 要素id
     * @param {string} serverIp IGS服务ip 
     * @param {port} serverPort IGS服务port
     * @returns {} 
     */
    this.highlightFeature = function (docName, docId, layerIndex, fid, serverIp, serverPort) {
        var globe = this;
        serverIp = serverIp || '127.0.0.1';
        serverPort = serverPort || 6163;
        this.getDocInfo(docName,
            function (res) {
                var renderIndex = null;
                if (res && res.sceneInfos && res.sceneInfos[0] && res.sceneInfos[0].layers) {
                    for (var i = 0; i < res.sceneInfos[0].layers.length; i++) {
                        if (res.sceneInfos[0].layers[i].layerIndex === parseInt(layerIndex)) {
                            renderIndex = res.sceneInfos[0].layers[i].layerRenderIndex;
                            break;
                        }
                    }
                }
                if (renderIndex != null) {
                    if ($.isArray(fid)) {
                        for (var j = 0; j < fid.length; j++) {
                            globe.startModelDiplay("LayerIndex:" + renderIndex + ",ObjID:" + fid[j] + ",SddHandle:" + docId, 2, true);
                        }
                    } else {
                        globe.startModelDiplay("LayerIndex:" + renderIndex + ",ObjID:" + fid + ",SddHandle:" + docId, 2, true);
                    }
                }
            },
            null, serverIp, serverPort);
    };
    /**
     * 球上添加三维实体
     * @param {string} geom 模型结构序列化后的json字符串
     * @param {string} infoJson 模型样式的json字符串
     * @returns {int} geomID
     */
    this.appendGeom = function (geom, infoJson) {
        this.assertOCX();
        return this._ocxObj.object.AppendGeom(geom, infoJson);
    };
    /**
     * 创建只有侧面和底面的包围盒
     * @param {string} pnts 用于创建包围盒的边界点
     * @param {number} height 包围盒底端高度值
     * @returns {string} 返回构建的模型序列化后的json字符串
     * @example
     * 	var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 16256, \"fillclr\" : 25600," +
     *      "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 1, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
     *      "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
     *  var pnts = "569834.187500,4750024.000000,556.700012; 572186.062500,4751432.500000,556.700012;"
     * 	   + "574184.500000,4754963.500000,556.700012; 569808.125000,4756204.000000,556.700012;"
     * 	   + "569834.187500,4750024.000000,556.700012";
     *  var geom = globe.createBoxBy2Sides(pnts, 200);
     *  var geomID = globe.appendGeom(geom, infoJson);
     */
    this.createBoxBy2Sides = function (pnts, height) {
        this.assertOCX();
        return this._ocxObj.object.CreateBox(pnts, height);
    };
    /**
     * 按步长加密线上点
     * @param {string} pnts 需要加密的点序列，应该传入二维点，传入三维点也只加密xy方向
     * @param {number} depth 加密步长
     * @returns {string} 返回加密后的点序列xy，无z
     * @example
     *  var infoJson = "{ \"ang\" : 0.0, \"endclr\" : 16256, \"fillclr\" : 25600," +
     *      "\"fillmode\" : 0, \"fullpatflg\" : 0, \"libID\" : 1, \"outpenw\" : 0.0, \"ovprnt\" : 3, " +
     *      "\"patID\" : -1, \"patclr\" : 0, \"pathei\" : 0.0, \"patwid\" : 0.0,  \"type\" : \"reginfo\"}";
     * 	var pnts = "569834.187500,4750024.000000; 572186.062500,4751432.500000;"
     * 	  + "574184.500000,4754963.500000; 569808.125000,4756204.000000;"
     * 	  + "569834.187500,4750024.000000";
     *  var newPnts = globe.genDenseLine(pnts, 10);
     *  var geomID = globe.appendGeom(geom, infoJson);
     */
    this.genDenseLine = function (pnts, depth) {
        return this._ocxObj.object.GenDenseLine(pnts, depth);
    };
    /**
     * 添加粒子特效
     * @param {string} info 粒子信息参数
     * @returns {string} 返回所添加粒子的名称，更新粒子状态需要该名称 
     * @example 
     * 	//articletype 0烟花 1 烟雾 2降雨 3喷泉 4 降雪 5自定义粒子
     *  //postion 位置 scale比例
     *  var info = "{\"particletype\":0,\"postion\":{\"x\":0,\"y\":0,\"z\":13},\"scale\":{\"x\":1,\"y\":1,\"z\":1},\"emitter\":{\"emissionrate\":5000,\"angle\":50,\"postion\":{\"x\":0,\"y\":0,\"z\":13},\"direction\":{\"x\":-1.2,\"y\":01,\"z\":1}}}";
     *  globe.addParticle(info);
     */
    this.addParticle = function (info) {
        this.assertOCX();
        return this._ocxObj.object.AddParticle(info);
    }
    /**
    * 水面元素管理（2017年11月后最新的客户端）
    * @param {string} oper "Add" 添加 "Delete"删除 "SetVisible" 设置水面是否可见 "Load" 加载配置文件（.wcx）"Save" 保存配置文件
    * @param {string} info 添加水面元素信息json字符串
    * @example 
    * var info = "{\"name\":\"watereffect0\",\"visible\":1,\"globe\":0,\"pntarray\" : [ { \"x\" : 64,  \"y\" : 74 ,\"z\":0 }, {\"x\" : 85, \"y\": 69,\"z\":0 }, { \"x\" : 86,\"y\" :71,\"z\":0 }"+
    *          ", { \"x\" : 89, \"y\" : 70 ,\"z\":0 },{\"x\" : 88,\"y\" : 68 ,\"z\":0 },{\"x\" : 84,\"y\" : 64 ,\"z\":0 },{\"x\" : 63,\"y\" : 69 ,\"z\":0 },{\"x\" : 64,\"y\" : 74 ,\"z\":0 }]}";
    *globe.waterEffectManager("Add",info);
    *globe.waterEffectManager("SetVisible",JSON.stringify({"name":JSON.parse(waterName).name,"visible":0}));//不可见
    *axWebOcx.WaterEffectManager("Delete", waterName);
    *string info = "{\"path\":\"D:\\\\water0.wcx\"}";
    *waterName = axWebOcx.WaterEffectManager("Load", info);
    *string info = "{\"path\":\"D:\\\\water0.wcx\"}";
    *axWebOcx.WaterEffectManager("Save", info);
    */
    this.waterEffectManager = function (oper, info) {
        this.assertOCX();
        return this._ocxObj.object.WaterEffectManager(oper, info);
    }
    /**
     * 添加水面元素（2017年11月之前客户端）
     * @param {string} infoJson 添加水面元素信息
     * @param {int} index 添加水面元素的索引，调用指定索引值，更新水面状态需要索引
     * @returns {long} 返回所添加水面元素的sdd 
     * @example 
     *   var index = 1;
     *   var infojson ="{\"postion\":{\"x\":93840.54,\"y\":8193.62,\"z\":50},\"bebisible\":false,\"wide\":60,\"height\":160}";
     *   var docID1 = globe.addWaterElement(infojson , index);
     */
    this.addWaterElement = function (infoJson, index) {
        this.assertOCX();
        return this._ocxObj.object.AddWaterElement(infoJson, index);
        this._ocxObj.object.Reset();
    }
    /**
     * 更新水面元素状态 更新可见、不可见、删除三种状态
     * @param {long} sdd 所添加水面的sdd
     * @param {int} index 添加水面元素是的索引
     * @param {int} opType 更新状态1删除，3可见，4不可见
     * @returns {int} 1更新成功，0更新失败
     * @example 
     *  globe.UpdateWaterElement(docID1, 1, 4); 
     */
    this.updateWaterElement = function (sdd, index, opType) {
        return this._ocxObj.object.UpdateWaterElement(sdd, index, opType);
    }
    /**
     * 根据所添加粒子名称更新粒子状态 更新可见、不可见、删除三种状态
     * @param {string} particleName 粒子名称
     * @param {number} opType 更新状态 1删除，3可见，4不可见
     * @returns {int} 1更新成功，0更新失败
     * @example 
     *  globe.UpdateParticle(element,4);
     */
    this.updateParticle = function (particleName, opType) {
        return this._ocxObj.object.UpdateParticle(particleName, opType);
    }
    /**
   * 获取ocx路径
    * @returns {string}
   */
    this.GetAppPath = function () {
        this.assertOCX();
        return this._ocxObj.object.GetAppPath();
    };
    /**
     * 获取客户端缓存路径
     * @returns {string} 返回客户端缓存路径
     */
    this.getCachePath = function () {
        return this._ocxObj.object.GetCachePath();
    }
    /**
     * 设置客户端缓存路径
     * @param {string} path 缓存路径
     * @returns {int} 1成功，0失败
     */
    this.setCachePath = function (path) {
        return this._ocxObj.object.SetCachePath(path);
    }

    /**
     * 设置当前抗锯齿值
     * @param {number} value 抗锯齿值
     * @returns {int} 0失败 1成功
     */
    this.setFsaaCurrentValue = function (value) {
        return this._ocxObj.object.SetFsaaCurrentValue(value);
    }
    /**
     * 获取抗锯齿参数信息
     * @returns {string} 
     */
    this.getFsaaInfo = function () {
        return this._ocxObj.object.GetFsaaInfo();
    }
    /**
     * 设置立体显示类型
     * @param {int} type 立体显示类型 0不开启  1开启 
     * @returns {int} 0失败 1成功
     */
    this.setStereoType = function (type) {
        return this._ocxObj.object.SetStereoType(type);
    }
    /**
     * 获取立体显示模式
     * @returns {int} 立体显示模式 0不开启  1开启
     */
    this.getStereoType = function () {
        return this._ocxObj.object.GetStereoType();
    }

    /**
     * 创建指定的场景投影
     * @param {string} name 场景投影名字
     * @param {int} type 场景投影类型
     * @param {string} path 场景投影文件
     * @returns {int} 0失败  1成功
     */
    this.createSceneProjector = function (name, type, path) {
        return this._ocxObj.object.CreateSceneProjector(name, type, path);
    }

    /**
     * 删除指定的场景投影
     * @param {string} name 场景投影名字
     * @returns {int} 0失败  1成功
     */
    this.deleteSceneProjector = function (name) {
        return this._ocxObj.object.DeleteSceneProjector(name);
    }

    /**
     * 开始播放场景投影中的视频
     * @param {string} name 场景投影名字
     * @returns {int} 0失败  1成功
     */
    this.playSPVideo = function (name) {
        return this._ocxObj.object.PlaySPVideo(name);
    }

    /**
     * 暂停场景投影中的视频
     * @param {string} name 场景投影名字
     * @returns {int} 0失败  1成功
     */
    this.pauseSPVideo = function (name) {
        return this._ocxObj.object.PauseSPVideo(name);
    }
    /**
     * 是否循环播放指定的场景投影中的视频
     * @param {string} name 场景投影名字
     * @param {boolean} isLoop 是否循环播放
     * @returns {int} 0失败  1成功
     */
    this.setSPVideoIsLoop = function (name, isLoop) {
        return this._ocxObj.object.SetSPVideoIsLoop(name, isLoop);
    }
    /**
     * 获取场景投影听相机参数
     * @param {string} name 
     * @returns {string} 场景投影听相机参数
     */
    this.getProjCameraInf = function (name) {
        return this._ocxObj.object.GetProjCameraInf(name);
    }

    /**
     * 复位场景投影中的视频
     * @param {string} name 场景投影名字 
     * @returns {int}  0失败 1成功
     */
    this.resetSPVideo = function (name) {
        return this._ocxObj.object.ResetSPVideo(name);
    }

    /**
     * 设置场景投影中视频的垂直视角
     * @param {string} name 场景投影名字
     * @param {number} screenFov 垂直视角
     * @returns {int} 0失败 1成功 
     */
    this.setSPScreenFov = function (name, screenFov) {
        return this._ocxObj.object.SetSPScreenFov(name, screenFov);
    }

    /**
     * 设置场景投影中视频的水平视角
     * @param {string} name 场景投影名字
     * @param {number} screenTilt 水平视角
     * @returns {int} 0失败 1成功 
     */
    this.setSPScreenTilt = function (name, screenTilt) {
        return this._ocxObj.object.SetSPScreenTilt(name, screenTilt);
    }

    /**
     * 设置场景投影中相机水平角(方位角)
     * @param {string} name 场景投影名字
     * @param {number} camDirHori 水平角（方位角）
     * @returns {int} 0失败 1成功
     */
    this.setSPCamDirHori = function (name, camDirHori) {
        return this._ocxObj.object.SetSPCamDirHori(name, camDirHori);
    }

    /**
     * 设置场景投影中相机垂直角(俯仰角)
     * @param {string} name 场景投影名字
     * @param {number} camDirVerti 垂直角(俯仰角)
     * @returns {int} 0失败 1成功
     */
    this.setSPCamDirVerti = function (name, camDirVerti) {
        return this._ocxObj.object.SetSPCamDirVerti(name, camDirVerti);
    }

    /**
     * 设置场景投影中相机位置
     * @param {string} name 场景投影名字
     * @param {number} posX 相机X坐标
     * @param {number} posY 相机Y坐标
     * @param {number} posZ 相机Z坐标
     * @returns {int} 0失败 1成功
     */
    this.setSPCamPosition = function (name, posX, posY, posZ) {
        return this._ocxObj.object.SetSPCamPosition(name, posX, posY, posZ);
    }

    /**
     * 设置场景投影中裁剪面（场景投影距离）
     * @param {string} name 场景投影名字
     * @param {number} clipPlane 裁剪距离
     * @returns {int} 0失败 1成功
     */
    this.setSPClipPlane = function (name, clipPlane) {
        return this._ocxObj.object.SetSPClipPlane(name, clipPlane);
    }
    /**
     * 获取场景投影裁剪距离
     * @param {string} name 场景投影名字
     * @returns {number} 裁剪距离（投影距离）
     */
    this.getSPClipPlane = function (name) {
        return this._ocxObj.object.GetSPClipPlane(name);
    }

    /**
     * 设置场景投影中是否绘制边框
     * @param {string} name 场景投影名字
     * @param {boolean} isDraw 是否绘制边框
     * @returns {int} 0失败 1成功
     */
    this.setSPDrawBound = function (name, isDraw) {
        return this._ocxObj.object.SetSPDrawBound(name, isDraw);
    }
    /**
     * 获取场景投影是否绘制边框
     * @param {string} name 场景投影名字
     * @returns {boolean} 是否绘制边框
     */
    this.isSPDrawBound = function (name) {
        return this._ocxObj.object.IsSPDrawBound(name);
    }
    /**
     * 获取视频总帧数
     * @param {string} name 场景投影名称
     * @returns {number} 视频总帧数
     */
    this.getSPVideoFrameNum = function (name) {
        return this._ocxObj.object.GetSPVideoFrameNum(name);
    }

    /**
     * 设置场景投影视频当前位置
     * @param {string} name 场景投影名称
     * @returns {number} 视频当前位置
     */
    this.getSPVideoCurrentPos = function (name) {
        return this._ocxObj.object.GetSPVideoCurrentPos(name);
    }
    /**
     * 设置场景投影中视频播放的位置
     * @param {string} name 场景投影名字
     * @param {number} pos 视频位置
     * @returns {int} 0失败 1成功
     */
    this.setSPVideoPos = function (name, pos) {
        return this._ocxObj.object.SetSPVideoPos(name, pos);
    }
    /**
     * 通过文件加载场景投影
     * @param {string} filePath 文件路径
     * @returns {string} 加载后场景投影列表
     */
    this.loadSPFromFile = function (filePath) {
        return this._ocxObj.object.LoadSPFromFile(filePath);
    }
    /**
     * 保存场景投影到文件
     * @param {string} path 文件路径
     * @returns {boolean} 成功true  失败false
     */
    this.saveSPToFile = function (filePath) {
        return this._ocxObj.object.SaveSPToFile(filePath);
    }
    /**
     * 设置立体显示模式
     * @param {number} mode 立体显示模式
     * @returns {int} 0失败 1成功
     * @example 
     *      0,   // 非立体显示
     *      1,   // 红青立体显示
     *      2,   // 黄蓝立体显示
     *      3,   // 双输出轴外模式: 适用于两台有偏振过滤器的投影仪或头带显示器
     *      4,   // 垂直交错模式
     *      5,   // 水平交错模式
     *      6,   // 棋盘交错（水平垂直同时交错模式）
     *      7,   // 垂直平铺 上下两个
     *      8,   // 水平平铺 左右两个
     *      9,   // 四缓存主动立体 快门眼镜模式
     */
    this.setStereoMode = function (mode) {
        return this._ocxObj.object.SetStereoMode(mode);
    }
    /**
     * 获取立体显示模式
     * @returns {number} 立体显示模式
     * @example 
     *      0,	 // 非立体显示	
     * 		1,   // 红青立体显示		
     * 		2,   // 黄蓝立体显示
     * 		3,   // 双输出轴外模式: 适用于两台有偏振过滤器的投影仪或头带显示器
     * 		4,   // 垂直交错模式
     * 		5,   // 水平交错模式
     * 		6,   // 棋盘交错（水平垂直同时交错模式）
     * 		7,	 // 垂直平铺 上下两个
     * 		8,	 // 水平平铺 左右两个
     * 		9,   // 四缓存主动立体 快门眼镜模式
     */
    this.getStereoMode = function () {
        return this._ocxObj.object.GetStereoMode();
    }
    /**
     * 设置视间距
     * @param {number} space 视间距
     * @returns {void}
     */
    this.setEyesSpacing = function (space) {
        return this._ocxObj.object.SetEyesSpacing(space);
    }
    /**
     * 获取视间距
     * @returns {number} 视间距
     */
    this.getEyesSpacing = function () {
        return this._ocxObj.object.GetEyesSpacing();
    }

    /**
     * 设置立体显示焦距
     * @param {number} length 焦距
     * @returns {void} 
     */
    this.setFocalLength = function (length) {
        return this._ocxObj.object.SetFocalLength(length);
    }

    /**
     * 获取立体显示焦距
     * @returns {number} 返回立体显示焦距
     */
    this.getFocalLength = function () {
        return this._ocxObj.object.GetFocalLength();
    }
    /**
    * 卷帘功能
    * @param {string}info= "{\"sddentity\":" + docID.toString() + ",\"ison\":1,\"layerindex\":1,\"leftpostion\":0,\"rightpostion\":100,\"toppostion\":0,\"bottompostion\":50}";
    */
    this.rollingScreen = function (info) {
        this.assertOCX();
        return this._ocxObj.object.RollingScreen(info);
    }
    /**
     * 查询区，为单体化做准备
     * @param gdbp {string} 二维区图层gdbpUrl
     * @param point2d {Point2D}
     * @param nearDistance {number} 查询模糊距离，默认0.00001
     * @param serverIp {string} 服务ip，默认127.0.0.1
     * @param serverPort {number} 服务端口，默认6163
     * @param callback {function} 回调返回 Array<Polygon>
     */
    this.queryPolygons = function (gdbp, point2d, nearDistance, serverIp, serverPort, callback) {
        var query = new G3DDocQuery();
        query.structs = '{"IncludeAttribute":true,"IncludeGeometry":true,"IncludeWebGraphic":false}';
        query.gdbp = gdbp;
        query.geometryType = "point";
        nearDistance = nearDistance || 0.0001;
        query.geometry = point2d.x + "," + point2d.y + "," + nearDistance;
        if (serverIp) query.serverIp = serverIp;
        if (serverPort) query.serverPort = serverPort;
        var feature2Polygon = function (reg) {
            var rings = reg.Rings;
            var polygon = { type: "polygon" };
            polygon.nelen = rings.length;
            polygon.ne = [];
            polygon.dots = [];
            for (var j = 0; j < rings.length; j++) {
                var lineCount = 0;
                for (var k = 0; k < rings[j].Arcs.length; k++) {
                    var dots = rings[j].Arcs[k].Dots;
                    for (var l = 0; l < dots.length; l++) {
                        lineCount++;
                        polygon.dots.push({ x: dots[l].x, y: dots[l].y });
                    }
                }
                polygon.ne.push(lineCount);
            }
            return polygon;
        }
        this.queryG3DFeature(query, function (res) {
            if (res && res.SFEleArray && res.SFEleArray.length > 0) {
                for (var i = 0; i < res.SFEleArray.length; i++) {
                    if (res.SFEleArray[i].fGeom && res.SFEleArray[i].fGeom.RegGeom) {
                        var regGeom = res.SFEleArray[i].fGeom.RegGeom;
                        var regCount = regGeom.length;
                        var polygons = [];
                        if (regCount === 1) {
                            var polygon = feature2Polygon(regGeom[0]);
                            polygons.push(polygon);
                        } if (regCount > 1) {

                            for (var x = 0; x < regCount; x++) {
                                polygons.push(feature2Polygon(regGeom.RegGeom[x]));
                            }
                        }
                        callback && callback(polygons, res.SFEleArray);
                    }
                }
            }
        }, function () {
            console && console.log('查询要素失败');
        }, 'post');
    }

    /**
     * 单体化
     * @param {number} maxSenceZ 
     * @param {number} projectorType 
     * @param {number} transparence 
     * @param {Array<Polygon>} polygons 
     * @returns {} 
     */
    this.polygonProjector = function (maxSenceZ, projectorType, transparence, polygons) {
        maxSenceZ = maxSenceZ || 200;
        projectorType = projectorType || 1;
        transparence = transparence || 50;
        var param = {
            maxSenceZ: maxSenceZ,
            projectorType: projectorType,
            transparence: transparence,
            polygon: polygons
        };
        return this._ocxObj.object.PolygonProjector('Add', new Util().toJSON(param));
    }

    /**
     * 删除所有
     * @returns {} 
     */
    this.deleteAllPolygonProjector = function () {
        return this._ocxObj.object.PolygonProjector('DeleteAll', '');
    }
};
/**
* Util工具类,方法不对外使用
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Util = function () {

    this.isIE = /(Trident)|(Edge)/.test(navigator.userAgent);

    var escape = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };
    var hasOwn = Object.prototype.hasOwnProperty;

    this.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
        if (o === null) {
            return 'null';
        }

        var pairs, k, name, val, type = typeof (o);

        if (type === 'undefined') {
            return undefined;
        }
        if (type === 'number' || type === 'boolean') {
            return String(o);
        }
        if (type === 'string') {
            return this.quoteString(o);
        }
        if (typeof o.toJSON === 'function') {
            return this.toJSON(o.toJSON());
        }
        if (type === 'date') {
            var month = o.getUTCMonth() + 1,
				day = o.getUTCDate(),
				year = o.getUTCFullYear(),
				hours = o.getUTCHours(),
				minutes = o.getUTCMinutes(),
				seconds = o.getUTCSeconds(),
				milli = o.getUTCMilliseconds();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (milli < 100) {
                milli = '0' + milli;
            }
            if (milli < 10) {
                milli = '0' + milli;
            }
            return '"' + year + '-' + month + '-' + day + 'T' +
				hours + ':' + minutes + ':' + seconds +
				'.' + milli + 'Z"';
        }

        pairs = [];

        if (typeof o === 'Array') {
            for (k = 0; k < o.length; k++) {
                pairs.push(this.toJSON(o[k]) || 'null');
            }
            return '[' + pairs.join(',') + ']';
        }
        if (typeof o === 'object') {
            for (k in o) {
                if (hasOwn.call(o, k)) {
                    type = typeof k;
                    if (type === 'number') {
                        name = '"' + k + '"';
                    } else if (type === 'string') {
                        name = this.quoteString(k);
                    } else {
                        continue;
                    }
                    type = typeof o[k];

                    if (type !== 'function' && type !== 'undefined') {
                        val = this.toJSON(o[k]);
                        pairs.push(name + ':' + val);
                    }
                }
            }
            return '{' + pairs.join(',') + '}';
        }
    };
    this.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
        return eval('(' + str + ')');
    };
    this.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
        var filtered =
			str
			.replace(/\\["\\\/bfnrtu]/g, '@')
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
			.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval('(' + str + ')');
        }
        throw new SyntaxError('Error parsing JSON, source is not valid.');
    };
    this.quoteString = function (str) {
        if (str.match(escape)) {
            return '"' + str.replace(escape, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + str + '"';
    };
    //将object对象转换成地形分析的专用类:FLoodAnalyzeInfo、CutFillInfo、ViewShedInfo、PointQueryInfo、VisibleInfo、SlopeInfo、AspectInfo
    this.convertObjectToAnalyseTypeInfo = function (object) {
        if (object == null)
            return null;
        var info = null;
        switch (object.type) {
            case 1:
                {
                    info = new FLoodAnalyzeInfo();
                    info.type = object.type;
                    info.connectivity = object.connectivity; //考虑连通性标识
                    info.startpos = object.startpos; //开始选择起点
                    info.startreg = object.startreg; //开始选择淹没区
                    info.height = object.height; //当前高程
                    info.alpha = object.alpha; //透明度(0-1.0之间有效)
                    info.max = object.max; //高程最大值
                    info.min = object.min; //高程最小值    
                    info.regzoom = object.regzoom; //淹没区域扩大倍数        
                    info.floodclr = object.floodclr; //淹没区域颜色 
                    return info;
                }
            case 2:
                {
                    info = new CutFillInfo();
                    info.type = object.type;
                    info.startreg = object.startreg; //开始选择区范围
                    info.height = object.height; //当前高程
                    info.min = object.min; //高程最小值
                    info.max = object.max; //高程最大值
                    info.cutclr = object.cutclr; //挖的颜色
                    info.fillclr = object.fillclr; //填的颜色
                    info.nocutfillclr = object.nocutfillclr; //不填不挖的颜色
                    info.surfacearea = object.surfacearea; //表面积
                    info.fillvolume = object.fillvolume; //填充体积
                    info.cutVolume = object.cutVolume; //挖出体积
                    return info;
                }
            case 3:
                {
                    info = new ViewShedInfo();
                    info.type = object.type;
                    info.startpos = object.startpos; //开始选择起点
                    info.startreg = object.startreg; //开始选择分析区
                    info.height = object.height; //观察点高程
                    info.alpha = object.alpha; //透明度(0-1.0之间有效)
                    info.viewclr = object.viewclr; //可视域颜色
                    info.shedclr = object.shedclr; //非可视域颜色
                    return info;
                }
            case 4:
                {
                    info = new PointQueryInfo();
                    info.type = object.type;
                    info.pos = new Point3D(object.pos.x, object.pos.y, object.pos.z); //当前点三维坐标
                    info.longitude = object.longitude; //经度
                    info.latitude = object.latitude; //纬度
                    info.height = object.height; //高程
                    info.slope = object.slope; //坡度
                    info.aspect = object.aspect; //坡向
                    return info;
                }
            case 5:
                {
                    info = new VisibleInfo();
                    info.type = object.type;
                    return info;
                }
            case 6:
                {
                    info = new SlopeInfo();
                    info.type = object.type;
                    return info;
                }
            case 7:
                {
                    info = new AspectInfo();
                    info.type = object.type;
                    return info;
                }
        }
    };
};

/**
 * 发送跨域ajax请求
 * @param {string} url 请求地址
 * @param {string} type 请求方式get、post
 * @param {Object} postData post请求内容
 * @param {requestSuccessCallback} successCallback 查询成功回调函数
 * @param {requestErrorCallback} errorCallback 查询失败回调函数
 * @param {string} dataType 请求返回数据类型
 * @param {string} proxy 如果使用代理，给定代理地址
*/
Util.corsAjax = function (url, type, postData, successCallback, errorCallback, dataType, proxy) {
    dataType = dataType || 'json';
    if (proxy) {
        url = proxy + "?request=" + encodeURIComponent(url);
        var param = {
            url: url,
            type: type,
            dataType: dataType,
            success: function (res, code) {
                successCallback && successCallback(res, code);
            },
            error: function (xhr) {
                errorCallback && errorCallback(xhr);
            }
        };
        if (type.toLowerCase() === 'post') {
            param.data = postData;
        }
        $.ajax(param);
        return;
    }

    type = type || "get";
    if (window.XDomainRequest && !/MSIE 10.0/.test(window.navigator.userAgent)) {
        var xdr = new window.XDomainRequest();
        xdr.onload = function () {
            var res = dataType === 'json' ? $.parseJSON(this.responseText) : this.responseText;
            successCallback && successCallback(res);
        };
        xdr.onerror = function () {
            errorCallback && errorCallback(xdr);
        };
        xdr.open(type, url);
        if (type.toLowerCase() === 'post') {
            xdr.send(postData);
        } else {
            xdr.send();
        }
    } else {
        $.support.cors = true;
        var param = {
            url: url,
            type: type,
            dataType: dataType,
            success: function (res, code) {
                successCallback && successCallback(res, code);
            },
            error: function (xhr) {
                errorCallback && errorCallback(xhr);
            }
        };
        if (type.toLowerCase() === 'post') {
            param.data = postData;
        }
        $.ajax(param);
    }
}

//////////下面是地形分析相关///////////////////////////////////////////////////////////
// 地形分析类型枚举
//UNKNOW = 0,
// 洪水淹没演示
//FLOOOD_ANALYZE = 1,
// 填挖方计算
//CUTFILL_ANALYZE = 2,
// 可视域分析
//VIEWSHED_ANALYZE = 3,
// 单点地形参数查询
//POINT_QUERY = 4,
// 两点通视性判断
//VISIBLE_ANALYZE = 5,
// 坡度分析
//SLOPE_ANALYZE = 6,
// 坡向分析
//ASPECT_ANALYZE = 7,
// 等高线显示
//SECLIN_SHOW = 8,
// 坡度坡向分层设色
//COLORTABLE_SET = 9,

//修改说明:球控件结构同步，包括洪水淹没，填挖方，可视域分析
//修改人:wujunhui 2016-04-08
/**
* 洪水淹没分析参数类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var FLoodAnalyzeInfo = function () {
    /**
    * 考虑连通性标识
    * @type {0|1}
    */
    this.connectivity = 1;
    /**
    * 开始选择起点
    * @type {0|1}
    */
    this.bstartpos = 0;
    /**
    * 开始选择淹没区
    * @type {0|1}
    */
    this.bstartreg = 0;
    /**
    * 透明度(0-1.0之间有效)
    * @type {double}
    */
    this.alpha = 0.5;
    /**
    * 当前高程
    * @type {Double}
    */
    this.height = 0;
    /**
    * 高程最大值
    * @type {Double}
    */
    this.max = 0;
    /**
    * 高程最小值
    * @type {Double}
    */
    this.min = 0;
    /**
    * 淹没区域扩大倍数 
    * @type {Double}
    */
    this.regzoom = 1;
    /**
    * 淹没区域颜色
    * @type {Unit}
    */
    this.floodclr = 255;
    /**
    * 分析对应编号
    * @type {Int}
    */
    this.showbillboard = true;
    /**
     * 数据模式，1用户输入，0交互,当前仅此次用户输入
     * @type {Int}
     */
    this.datatype = 1;
    /**
     * 区域起点
     * @type {double}
     */
    this.startpos = {};
    /**
     * 区域起点x
     * @type {double}
     */
    this.startpos.x = 0;
    /**
    * 区域起点y
    * @type {double}
    */
    this.startpos.y = 0;
    /**
     * 区域起点z
     * @type {double}
     */
    this.startpos.z = 0;
    /**
    * 区域终点
    * @type {double}
    */
    this.endpos = {};
    /**
    * 区域终点x
    * @type {double}
    */
    this.endpos.x = 0;
    /**
    * 区域终点x
    * @type {double}
    */
    this.endpos.y = 0;
    /**
    * 区域终点x
    * @type {double}
    */
    this.endpos.z = 0;
    /**
     * 观察点
     * @type {double}
     */
    this.observepos = {};
    /**
     * 观察点x
     * @type {double}
     */
    this.observepos.x = 0;
    /**
    * 观察点y
    * @type {double}
    */
    this.observepos.y = 0;
    /**
    * 观察点z
    * @type {double}
    */
    this.observepos.z = 0;
};

/**
* 填挖方分析参数类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var CutFillInfo = function () {
    /**
    * 分析对应编号
    * @type {Int}
    */
    this.type = 2;
    /**
    * 数据模式，1用户输入，0交互,当前仅此次用户输入
    * @type {Int}
    */
    this.datatype = 1;
    /**
     * 区域起点
     * @type {object}
     */
    this.startpos = {};
    /**
     * 区域起点x
     * @type {double}
     */
    this.startpos.x = 0;
    /**
     * 区域起点y
     * @type {double}
     */
    this.startpos.y = 0;
    /**
     * 区域起点z
     * @type {double}
     */
    this.startpos.z = 0;
    /**
    * 区域结束
    * @type {}
    */
    this.endpos = {};
    /**
    * 区域结束x
    * @type {double}
    */
    this.endpos.x = 0;
    /**
    * 区域结束y
    * @type {double}
    */
    this.endpos.y = 0;
    /**
    * 区域结束z
    * @type {double}
    */
    this.endpos.z = 0;
    /**
    * 高度
    * @type {double}
    */
    this.height = 1;
    /**
    * 挖区域颜色
    * @type {uint}
    */
    this.cutclr = 255;
    /**
    * 填区域颜色
    * @type {uint}
    */
    this.fillclr = 0;
    /**
    * 不挖不填区域颜色
    * @type {uint}
    */
    this.nocutfillClr = 100;
    /**
    * 交互获取分析标识
    * @type {boolean}
    */
    this.bstartreg = true;
};
/**
* 可视域分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var ViewShedInfo = function () {
    /**
    * 开始选择起点
    * @type {0|1}
    */
    this.bstartpos = 0;
    /**
    * 开始选择分析区
    * @type {0|1}
    */
    this.bstartreg = 0;
    /**
    * 分析对应编号
    * @type {Int}
    */
    //this.type = 3;
    /**
    * 数据模式，1用户输入，0交互,当前仅此次用户输入
    * @type {Int}
    */
    this.datatype = 1;
    /**
     * 观察点
     * @type {double}
     */
    this.observepos = {};
    /**
     * 观察点x
     * @type {double}
     */
    this.observepos.x = 0;
    /**
    * 观察点y
    * @type {double}
    */
    this.observepos.y = 0;
    /**
    * 观察点z
    * @type {double}
    */
    this.observepos.z = 0;
    /**
    * 分析区域起点
    * @type {double}
    */
    this.startpos = {};
    /**
    * 分析区域起点x
    * @type {double}
    */
    this.startpos.x = 0;
    /**
    * 分析区域起点y
    * @type {double}
    */
    this.startpos.y = 0;
    /**
    * 分析区域起点z
    * @type {double}
    */
    this.startpos.z = 0;
    /**
    * 分析区域终点
    * @type {double}
    */
    this.endpos = {};
    /**
    * 分析区域终点x
    * @type {double}
    */
    this.endpos.x = 0;
    /**
    * 分析区域终点y
    * @type {double}
    */
    this.endpos.y = 0;
    /**
    * 分析区域终点z
    * @type {double}
    */
    this.endpos.z = 0;
    /**
     * 观察点高度
     * @type {double}
     */
    this.height = 1;
    /**
     * 透明度 0-1之间
     * @type {double}
     */
    this.alpha = .5;
    /**
     * 可视域颜色
     * @type {uint}
     */
    this.viewclr = 100;
    /**
    * 非可视域颜色
    * @type {uint}
    */
    this.shedclr = 200;
};
/**
 * 动态可视域分析结构
 * @constructor 
 */
var DynamicViewShedInfo = function () {
    /**
     * 分析对应编号
     * @type {int}
     */
    this.type = 10;
    /**
     * 开始动态可视域分析演示
     * @type {bool}
     */
    this.startanalyze = true;
    /**
     * 视距
     * @type {double}
     */
    this.sightdistance = 2e3;
    /**
     * 视角（0-90度）
     * @type {int}
     */
    this.angleofview = 180;
    /**
     * 动态分析时演示速度，两帧之间的间隔
     * @type {double}
     */
    this.speed = 10;
    /**
     * 观察点之间分段数
     * @type {int}
     */
    this.segmentnum = 10;
    /**
    * 数据模式，1用户输入，0交互,当前仅此次用户输入
    * @type {Int}
    */
    this.datatype = 1;
    /**
     * 动态可视域分析点列表
     * @type {array<Point3D>}
     */
    this.pntArray = new Array();
    this.alpha = 1;
};
/**
* 单点地形参数查询分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var PointQueryInfo = function () {
    /**
    * 分析对应编号
    * @type {Int}
    */
    this.type = 4;
    /**
    * 当前点三维坐标
    * @type {Point3D}
    */
    this.pos = new Point3D(0, 0, 0);
    /**
    * 经度
    * @type {Double}
    */
    this.longitude = 0;
    /**
    * 纬度
    * @type {Double}
    */
    this.latitude = 0;
    /**
    * 高程
    * @type {Double}
    */
    this.height = 0;
    /**
    * 坡度
    * @type {Double}
    */
    this.slope = 0;
    /**
    * 坡向
    * @type {Double}
    */
    this.aspect = 0;
};

/**
* 两点通视性分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var VisibleInfo = function () {
    /**
    * 分析对应编号
    * @type {Int}
    */
    this.type = 5;
};

/**
* 坡度分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var SlopeInfo = function () {
    /**
    * 分析对应编号
    * @type {Int}
    */
    this.type = 6;
};

/**
* 坡向分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var AspectInfo = function () {
    /**
    * 分析对应编号
    * @type {Int}
    */
    this.type = 7;
};
//////////以上是地形分析相关///////////////////////////////////////////////////////////


/**
* 爆炸效果演示分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var BombInfo = function () {
    /**
    * 工具的启动方式 type为0时,除isallscene有效外，其他参数均无效;反之相反
    * TOOL_START  0     启动工具
    * TOOL_SETINFO  1  设置参数
    * TOOL_APPLY  2    应用
    * TOOL_RESET  3    复位
    * @type {Int}
    */
    this.type = 1;
    /**
    * 爆炸方式,0=任意爆炸;1=整体爆炸;2=沿轴向爆炸;
    * @type {Int}
    */
    this.bombtype = 0;
    /**
    * 轴向，1=x轴;2=y轴;3=z轴;-1=x轴反向;-2=y轴反向;-3=z轴反向
    * @type {Int}
    */
    this.axistype = 3;
    /**
    * 爆炸距离
    * @type {Double}
    */
    this.expdis = 50.0;
    /**
    * 爆炸帧数
    * @type {Int}
    */
    this.frame = 30;
    /**
    * 爆炸范围比例
    * @type {Double}
    */
    this.radioscale = 0.75;
    /**
     * 1爆炸当前活动图层,0爆炸整个场景
     * @type {Int}
     */
    this.bomrange = 1;
    /**
    * 是否是整个场景爆炸，为flase为当前活动图层爆炸
    * @type {bool}
    */
    this.isallscene = true;
};

/**
* 日照分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var SunLightInfo = function () {
    /**
    * 工具的启动方式
    * TOOL_START  0     启动工具
    * TOOL_SETINFO  1  设置参数
    * TOOL_APPLY  2    应用
    * TOOL_RESET  3    复位
    * @type {Int}
    */
    this.type = 1;
    /**
    * 时区设置，相对与格林威治标准时间的时间差，如北京时区设置为-8*60.
    * @type {Double}
    */
    this.timedif = -8 * 60;
    /**
    * 使用环境光标识
    * @type {bool}
    */
    this.isuseambient = false;
    /**
    * 启用平面模式标识
    * @type {bool}
    */
    this.isplanemode = false;
    /**
    * 高度角(0~90度]
    * @type {Int}
    */
    this.altitudeangle = 30;
    /**
    * 方位角(-180~180度]
    * @type {Int}
    */
    this.azimuthangle = 30;

    /**
    *经纬度(默认为北京经纬度)
    *@type{Int}
    */
    this.locallat = 42.898739;
    this.locallon = 108.864518;

    /**
    * 年
    * @type {int}
    */
    this.year = 0;
    /**
    * 月
    * @type {int}
    */
    this.month = 0;
    /**
    * 天
    * @type {int}
    */
    this.day = 0;
    /**
    * 小时
    * @type {int}
    */
    this.hour = 0;
    /**
    * 分钟
    * @type {int}
    */
    this.minute = 0;
    /**
    * 秒钟
    * @type {int}
    */
    this.second = 0;
    /**
    * 星期
    * @type {int}
    */
    this.dayofweek = 0;
};

/**
* 地形剖切剖面图分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var TerSectInfo = function () {
    /**
    * 工具的启动方式
    * TOOL_START  0     启动工具
    * TOOL_SETINFO  1  设置参数
    * TOOL_APPLY  2    应用
    * TOOL_RESET  3    复位
    * @type {Int}
    */
    this.type = 1;
    /**
    * 切割线颜色
    * @type {Unit}
    */
    this.cutlinclr = 255;
    /**
    * 线宽,大于0有效
    * @type {UInt}
    */
    this.linwidth = 10;
    /**
    * 是否显示剖面
    * @type {0|1}
    */
    this.showsection = 1;
    /**
    * 剖面图模式：0=依线段长度采样高程点，1=平均采样高程点
    * @type {0|1}
    */
    this.state = 0;
    /**
    * 采样点数
    * @type {int}
    */
    this.pntnum = 150;
    /**
    * 切割线颜色
    * @type {Unit}
    */
    this.graphclr = 255;
    /**
    * 剖面线颜色
    * @type {Unit}
    */
    this.graphlinclr = 255;
};

/**
* 模型编辑分析
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var ModelInfo = function () {
    /**
    * 工具的启动方式
    * TOOL_START  0     启动工具
    * TOOL_SETINFO  1  设置参数
    * TOOL_APPLY  2    应用
    * TOOL_RESET  3    复位
    * @type {Int}
    */
    this.type = 1;
    /**
    * 模型拖动参数 0=x轴，1=y轴，2=z轴，3=近裁面
    * @type {Int}
    */
    this.movetype = 3;
    /**
    * 模型旋转参数 0=x轴，1=y轴，2=z轴，3=任意面
    * @type {Int}
    */
    this.rottype = 3;
};

/**
* 测量方式
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var MeasureInfo = function () {
    /**
    * 工具的启动方式
    * TOOL_START  0     启动工具
    * TOOL_SETINFO  1  设置参数
    * TOOL_APPLY  2    应用
    * TOOL_RESET  3    复位
    * @type {Int}
    */
    this.type = 1;
    /**
    * 量算类别
    * 如果是距离量测,0=地表距离,1=直接距离,2=水平距离,3=垂直距离
    * 如果是面积量测,0=圆形面积,1=多边形面积
    * @type {Int}
    */
    this.measuretype = 0;
    /**
    * 工具方式,lengthmeasure 或者 areameasure
    * @type {String}
    */
    this.tooltype = "lengthmeasure";
    /**
    * 交互工具颜色，如果是距离量测，中间连接线显示的颜色;如果是面积量测，为面积量测中间的填充颜色
    * @type {Unit}
    */
    this.color = 255;
};

/**
* 绘图工具
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var DrawInfo = function () {
    /**
    * 设置绘制类型：TypeLine = 0,TypeRect = 1,TypePolygon = 2,TypeCircle = 3
    * @type {Enum2DShapeType}
    */
    this.shapeType = 2;
    /**
    * 背景颜色
    * @type {Unit}
    */
    this.bdColor = 255;
    /**
    * 填充颜色
    * @type {Unit}
    */
    this.fillColor = 100;
    /**
    * 透明度的值 0-1
    * @type {Double}
    */
    this.transparence = 1;
    /**
    * 线的宽度
    * @type {Double}
    */
    this.linWid = 5;
    /**
    * 线的类型：TypeSolid = 0,TypePolyLine = 1,TypePointLine = 2,TypePolyLinePoint = 3
    * @type {Enum2DLineType}
    */
    this.lineType = 0;
};

/**
* 三维绘制传入的类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Draw3DElementInfo = function () {
    /**
    * 设置绘制类型：Type3DPoint: 0,Type3DLine: 1,TypeSurface: 2
    * @type {Enum3DShapeType}
    */
    this.type = 0;
    /**
    * 点字符串,绘制单点：x,y,z，线和面：x,y,z；x,y,z；x,y,z
    * @type {String}
    */
    this.pnts = '';
    /**
    * 默认为0，无需修改
    * @type {String}
    */
    this.libID = '0';
    /**
    * 符号库里面找到相应符号id附上去
    * @type {String}
    */
    this.symID = '10000999';
    /**
    * MapGIS颜色号一致
    * @type {String}
    */
    this.fillClr = '2';
    /**
    * Transparent默认255，表示不透明，0表示全透明
    * @type {Int}
    */
    this.transparent = '255';
    /**
    * 暂无具体含义
    * @type {String}
    */
    this.att = '';


    this.scale = '6|6|6';

};

/**
* 地图服务类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var MapDocObj = function () {
    /**
    * 添加完数据后返回的id
    * @type {String}
    */
    this.id = '';
    /**
    * 地图服务对应服务器IP
    * @type {String}
    */
    this.ip = '';
    /**
    * 地图服务访问使用端口
    * @type {String}
    */
    this.port = '';
    /**
    * 地图服务名称
    * @type {String}
    */
    this.name = '';
    /**
    * 构建的基本url
    * @type {String}
    */
    this.url = '';
    /**
    * 地图服务类型
    * @type {String}
    */
    this.type = '';
};
/**
 * 工作流post传入对象结构
 * @constructor 
 * @param {string} key
 * @param {string} value
 * @author chelsea
 */
var WFKeyValue = function (k, v) {
    /**
     * 工作流参数键名
     * @type {string}
     */
    this.Key = k;
    /**
     * 工作流参数值
     * @type {string}
     */
    this.Value = v;
};
/**
 * 向WFKeyValue对象插入key，value值
 * @param {string} k 
 * @param {string} v 
 */
WFKeyValue.prototype.put = function (k, v) {
    this.Key = k;
    this.Value = v;
};
/**
 * WFKeyValue数组包装对象
 * @returns {} 
 */
var WFKeyValueMap = function () {
    this.map = new Array();
};
/**
 * 向WFKeyValueMap字典中加入WFKeyValue对象
 * @param {WFKeyValue} kv WFKeyValue
 */
WFKeyValueMap.prototype.add = function (k, v) {
    if (k instanceof WFKeyValue) {
        this.map.push(k);
    } else if (typeof k !== "undefined" && typeof v !== "undefined") {
        this.map.push(new WFKeyValue(k, v));
    }
};
/**
 * WFKeyValueMap转换为json字符串
 */
WFKeyValueMap.prototype.toJSON = function () {
    new Util().toJSON(this.map);
};

/**
* 三维文档查询参数
* 必填参数为(docName,layerIndex)或gdbp,其他参数可选
* @author wjh
* @constructor
*/
var G3DDocQuery = function () {

    /**
    * igs服务ip
    * @type {string}
    */
    this.serverIp = "127.0.0.1";
    /**
     * igs服务ip
     * @type {int}
     */
    this.serverPort = 6163;
    /**
    * 三维文档的名称(docName与gdbp参数二选一)
    * @type {string}
    */
    this.docName = '';
    /**
    * 三维图层的gdbpUrl(docName与gdbp参数二选一)
    * @type {string}
    */
    this.gdbp = '';
    /**
    * 图层序号
    * @type {int}
    */
    this.layerIndex = 0;

    /**
    * 几何类型描述,格式:point | circle | rect | line | polygon | Point3D
    * @type {string}
    */
    this.geometryType = '';

    /**
    * 点的集合        
    * 几何约束区域参数，其形式取决于geometryType的值，即取决于几何约束类型
    * point--x,y,[ neardistance],neardistance为可选，即容差，下同
    * Point3D--x,y,z,[neardistance],neardistance为可选，即容差，下同
    * circle--x，y，r 注意在球上执行画圆时由于插件提供的圆为椭圆，给出的点集也是大量离散点，因此这种情况下，依然采用polygon方式执行查询
    * rect--xmin，ymin，xmax，ymax 
    * line--x1,y1,x2,y2,x3,y3…;[neardistance]
    * polygon--x1,y1,x2,y2,x3,y3…第一个点与最后一个点相同
    * @type {string}
    */
    this.geometry = '';

    /**
    * 符合SQL查询规范的任何字符串
    * @type {string}
    */
    this.where = '';

    /**
    * 需要查询的要素Id号,格式：oid1，oid2，oid3
    * @type {string}
    */
    this.objectIds = '';

    /**
    * 指定查询结果的结构，json规范
    *    struct={ IncludeAttribute:true | false, 
    *             IncludeGeometry:true | false, 
    *             IncludeWebGraphic :true |false}
    *    参数不区分大小写，可以省略，默认为IncludeAttribute:true，其他参数均为false
    * @type {json}
    */
    this.structs = '';

    /**
    * 返回的要素分页的页数，默认返回第0页
    * @type {string}
    */
    this.page = '';
    /**
    * 要素结果集每页的记录数量，默认为20条/页
    * @type {string}
    */
    this.pageCount = '';

    /**
    *指定查询规则，Json表示形式
    *    rule={  CompareRectOnly:true | false,
    *            EnableDisplayCondition:true | false,
    *            MustInside : true|false, 
    *            Intersect : true|false }
    *    参数不区分大小写，可以省略
    *    CompareRectOnly表示是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集；
    *    EnableDisplayCondition表示是否将隐藏图层计算在内；
    *    MustInside表示是否完全包含；
    *    Intersect：是否相交
    * @type {json}
    */
    this.rule = '';

    /**
    * 这里查询结果,这里主要是存放查询过程中报错信息
    * @type {string}
    */
    this.queryResult = '未查询';
    this.rtnLabel = false;
};
/**
 * 模型拾取参数对象
 * 必填参数为(docName,layerIndex)或gdbp,其他参数可选
 * @author wjh
 * @constructor
 */
var PickModelParam = function () {

    /**
    * igs服务ip
    * @type {string}
    */
    this.serverIp = "127.0.0.1";
    /**
     * igs服务ip
     * @type {int}
     */
    this.serverPort = 6163;
    /**
    * 三维文档的名称(docName与gdbp参数二选一)
    * @type {string}
    */
    this.docName = '';
    /**
    * 三维图层的gdbpUrl(docName与gdbp参数二选一)
    * @type {string}
    */
    this.gdbp = '';
    /**
    * 图层序号
    * @type {int}
    */
    this.layerIndex = 0;
}

/**
 * 三维要素几何结构类
 * @constructor 
 */
var G3DGeometryObject = function () {
    /**
     * 几何类型：anysurface,multisurface,anyentity,multientity
     * @type {string}
     */
    this.type = "anysurface";
    /**
     * 要素个数
     * @type {int}
     */
    this.count = 1;
    /**
     * 
     * @type {Array<G3DSurfaceObject>}
     */
    this.items = [];
}

var G3DSurfaceObject = function () {
    /**
     * 点个数
     * @type {int}
     */
    this.pntcount = 0;
    /**
     * 三角形个数
     * @type {int}
     */
    this.trianglecount = 0;
    /**
     * @type {int}
     */
    this.texturelayernum = 0;
    /**
     * @type {int}
     */
    this.texturelayerind = 0;
    /**
     * @type {Array<int>}
     */
    this.triangles = [];
    /**
     * @type {Array<int>}
     */
    this.topo = [];
    /**
     * 颜色序列
     * @type {Array<int>}
     */
    this.colors = [];
    /**
     * 法向量序列
     * @type {Array<Point3D>}
     */
    this.normals = [];
    /**
     * 材质位置序列
     * @type {Array<Point2D>}
     */
    this.texturepos = [];
    /**
     * 点序列
     * @type {Array<Point3D>}
     */
    this.dots = [];


}
/**
* Bubble类,带气泡的标注对象
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Bubble = function () {
    /**
    * 标注中的文本
    * @type {String}
    */
    this.text = "";
    /**
    * 标注所处位置的x值
    * @type {Double}
    */
    this.x = 0;
    /**
    * 标注所处位置的y值
    * @type {Double}
    */
    this.y = 0;
    /**
    * 标注所处位置的z值
    * @type {Double}
    */
    this.z = 0;
    /**
    * 标注对应的高程模式 0为绝对高程、1为贴近于地形、2为相对于地表
    * @type {0|1|2}
    */
    this.sElevation = 0;
    /**
    * 标注中的文本的字体
    * @type {String}
    */
    this.fontname = "宋体";
    /**
    * 标注中的文本的字体大小
    * @type {Double}
    */
    this.fontsize = 10;
    /**
    * 标注中的文本的字体颜色
    * @type {Unit}
    */
    this.fontcolor = 0xFF00FFFF;
    /**
    * 标注显示的的透明度值
    * @type {0-1}
    */
    this.opacity = 1;
    /**
    * 标注区域的背景颜色bgColor
    * @type {Unit}
    */
    this.bgColor = 1677786880;
    /**
    * 标注区域的背景颜色bdColor
    * @type {Unit}
    */
    this.bdColor = 0xFF00FFFF;
    /**
    * 标注区域的宽
    * @type {Int}
    */
    this.width = 24;
    /**
    * 标注区域的高
    * @type {Int}
    */
    this.height = 30;
    /**
    * 缩放比例scale
    * @type {Double}
    */
    this.scale = 1;
    /**
    * 标注提供的attribute字段
    * @type {String}
    */
    this.attribute = "AppendBubble";
};

/**
* Label类，普通标注对象
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Label = function () {
    /**
    * 标注中的文本
    * @type {String}
    */
    this.text = "";
    /**
    * 标注所处位置的x值
    * @type {Double}
    */
    this.x = 0;
    /**
    * 标注所处位置的y值
    * @type {Double}
    */
    this.y = 0;
    /**
    * 标注所处位置的z值
    * @type {Double}
    */
    this.z = 0;
    /**
    * 标注对应的高程模式 0为绝对高程、1为贴近于地形、2为相对于地表
    * @type {0|1|2}
    */
    this.sElevation = 0;
    /**
    * 标注中的文本的字体
    * @type {String}
    */
    this.fontname = "隶书";
    /**
    * 标注中的文本的字体大小
    * @type {Double}
    */
    this.fontsize = 10;
    /**
    * 标注中的文本的字体颜色
    * @type {Unit}
    */
    this.fontcolor = 0xFF00FFFF;
    /**
    * 标注对应图标的缩放比例scale
    * @type {Double}
    */
    this.iconScale = 1;
    /**
    * 标注的最远可见距离
    * @type {Double}
    */
    this.farDist = 1e10;
    /**
    * 标注的最近可见距离
    * @type {Double}
    */
    this.nearDist = 1.0;
    /**
    * 标注提供的attribute字段
    * @type {String}
    */
    this.attribute = "AppendLabel";
};

/**
* LabelIcon类，带图标的标注对象
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var LabelIcon = function () {
    /**
    * 标注中的文本
    * @type {String}
    */
    this.text = "";
    /**
    * 标注所处位置的x值
    * @type {Double}
    */
    this.x = 0;
    /**
    * 标注所处位置的y值
    * @type {Double}
    */
    this.y = 0;
    /**
    * 标注所处位置的z值
    * @type {Double}
    */
    this.z = 0;
    /**
    * 标注对应的高程模式 0为绝对高程、1为贴近于地形、2为相对于地表
    * @type {0|1|2}
    */
    this.sElevation = 0;
    /**
    * 标注中的文本的字体
    * @type {String}
    */
    this.fontname = "隶书";
    /**
    * 标注中的文本的字体大小
    * @type {Double}
    */
    this.fontsize = 10;
    /**
    * 标注中的文本的字体颜色
    * @type {Unit}
    */
    this.fontcolor = 0xFF00FFFF;
    /**
    * 图标标注图片的地址，可以是本地图片路径，也可以是网络图片的地址。
    *                         如果是网络地址的话图片会缓存到ocxPath + "webcache\\LabelIcon\\"目录下面
    * @type {String}
    */
    this.iconUrl = "";
    /**
    * 标注对应图标的缩放比例scale:X方向
    * @type {Double}
    */
    this.iconXScale = 1;
    /**
    * 标注对应图标的缩放比例scale:Y方向
    * @type {Double}
    */
    this.iconYScale = 1;
    /**
    * 图标标注的最远可见距离，当摄像机离标注的距离大于该参数时标注不会显示
    * @type {Double}
    */
    this.farDist = 1e10;
    /**
    * 图标标注的最近可见距离，当相机离标注距离小于该参数时标注不会显示，一般设置
    * @type {Double}
    */
    this.nearDist = 1.0;
    /**
    * 图标标注当中文字相对于图片的显示位置，
    *                        从左上角、正上角、右上角、正左、正中、正右、左下角、正下角、右下角分别对应-8的枚举值。
    * @type {Double}
    */
    this.txtPos = 1;
    /**
    * 其他的属性信息，为字符串类型。当用户调用PickLabel拾取标注时可以得到该属性值
    * @type {String}
    */
    this.attribute = "AppendLabel";
};

/**
* ToolTip类，使用ToolTip的标注对象
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var ToolTip = function () {
    /**
    * 标注中的文本
    * @type {String}
    */
    this.text = "";
    /**
    * 标注所处位置的x值
    * @type {Double}
    */
    this.x = 0;
    /**
    * 标注所处位置的y值
    * @type {Double}
    */
    this.y = 0;
    /**
    * 标注所处位置的z值
    * @type {Double}
    */
    this.z = 0;
    /**
    * 标注对应的高程模式 0为绝对高程、1为贴近于地形、2为相对于地表
    * @type {0|1|2}
    */
    this.sElevation = 0;
    /**
    * 标注区域的背景颜色bgColor
    * @type {Unit}
    */
    this.bdColor = 0xFF00FFFF;
    /**
    * 标注区域的宽
    * @type {Int}
    */
    this.width = 24;
    /**
    * 标注区域的高
    * @type {Int}
    */
    this.height = 30;
    /**
    * 标注提供的attribute字段
    * @type {String}
    */
    this.attribute = "AppendToolTip";
};


/**
 * This callback is displayed as a global member.
 * @callback requestSuccessCallback
 * @param {object} httpMsg
 * @param {string} httpCode
 */
/**
 * This callback is displayed as a global member.
 * @callback requestErrorCallback
 * @param {object} XMLHttpRequest
 */
/**
* 普通二维文档服务数据的查询类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var MapDocQuery = function () {

    /**
    * 查询对应的地图服务,参考ClassLib.js中的MapDocObj对象
    * @type {MapDocObj}
    */
    this.docObj = null;

    /**
    * 地图服务名称
    * @type {String}
    */
    this.docName = '';
    /**
    * 地图在文档下得序号,一般为0
    * @type {Int}
    */
    this.mapIndex = 0;
    /**
    * 图层序号
    * @type {Int}
    */
    this.layerID = 0;

    /**
    * 几何类型描述,格式:point | circle | rect | line | polygon
    * @type {string}
    */
    this.geometryType = '';

    /**
    * 点的集合        
    * 几何约束区域参数，其形式取决于geometryType的值，即取决于几何约束类型
    * point--x,y,[ neardistance],neardistance为可选，即容差，下同
    * circle--x，y，r 注意在球上执行画圆时由于插件提供的圆为椭圆，给出的点集也是大量离散点，因此这种情况下，依然采用polygon方式执行查询
    * rect--xmin，ymin，xmax，ymax 
    * line--x1,y1,x2,y2,x3,y3…;[neardistance]
    * polygon--x1,y1,x2,y2,x3,y3…第一个点与最后一个点相同
    * @type {string}
    */
    this.geometry = '';

    /**
    * 符合SQL查询规范的任何字符串
    * @type {string}
    */
    this.where = '';


    /**
    * 返回结果的序列化形式
    * @type {string}
    */
    this.f = 'json',

    /**
    * 需要查询的要素Id号,格式：oid1，oid2，oid3
    * @type {string}
    */
    this.objectIds = '';

    /**
    * 指定查询结果的结构，json规范
    *    struct={ IncludeAttribute:true | false, 
    *             IncludeGeometry:true | false, 
    *             IncludeWebGraphic :true |false}
    *    参数不区分大小写，可以省略，默认为IncludeAttribute:true，其他参数均为false
    * @type {json}
    */
    this.structs = '';

    /**
    * 返回的要素分页的页数，默认返回第0页
    * @type {string}
    */
    this.page = '';
    /**
    * 要素结果集每页的记录数量，默认为20条/页
    * @type {string}
    */
    this.pageCount = '';

    /**
    *指定查询规则，Json表示形式
    *    rule={  CompareRectOnly:true | false,
    *            EnableDisplayCondition:true | false,
    *            MustInside : true|false, 
    *            Intersect : true|false }
    *    参数不区分大小写，可以省略
    *    CompareRectOnly表示是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集；
    *    EnableDisplayCondition表示是否将隐藏图层计算在内；
    *    MustInside表示是否完全包含；
    *    Intersect：是否相交
    * @type {json}
    */
    this.rule = '';

    /**
    * 这里查询结果,这里主要是存放查询过程中报错信息
    * @type {string}
    */
    this.queryResult = '未查询';
};
/**
 * 查询操作
 * @param successCallback {requestSuccessCallback} 查询成功回调函数
 * @param errorCallback {requestErrorCallback} 查询成功回调函数
 */
MapDocQuery.prototype.beginQuery = function (successCallback, errorCallback) {
    var o = this;
    //检验参数合法性
    if (o.docObj && o.docObj.type != DocType.TypeDoc) {
        o.queryResult = "目标文档不符合查询要求";
        alert(o.queryResult);
        return;
    }
    //如果docName未设置则设置为服务名
    if (!o.docName)
        o.docName = o.docObj.name;
    var queryString = 'query?guid=' + Math.random();
    //构建查询参数
    if (o.geometryType && o.geometry) {
        //这里可以进行进一步的参数验证
        queryString += '&geometryType=' + o.geometryType + '&geometry=' + o.geometry;
    }
    if (o.where)
        queryString += '&where=' + o.where;
    if (o.f)
        queryString += '&f=' + o.f;
    if (o.objectIds)
        queryString += '&objectIds=' + o.objectIds;
    if (o.structs)
        queryString += '&structs=' + o.structs;
    if (o.page)
        queryString += '&page=' + o.page;
    if (o.pageCount)
        queryString += '&pageCount=' + o.pageCount;
    if (o.rule)
        queryString += '&rule=' + o.rule;
    var url = 'http://' + o.docObj.ip + ':' + o.docObj.port + '/igs/rest/mrfs/docs/' + o.docName + '/' + o.mapIndex + '/' + o.layerID + '/' + queryString;
    Util.corsAjax(url, 'get', null, successCallback, errorCallback, 'json', null);
}
/**
* 二维点类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Point2D = function (x, y) {
    this.x = x;
    this.y = y;
};
/**
* 三维点类
* @author 创建者:姚志武 2014-04-25
* @constructor
*/
var Point3D = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

