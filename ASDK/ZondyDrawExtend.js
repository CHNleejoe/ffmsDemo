//========================================================
//      扩展的图形绘制接口
//      包含基本图形和标绘的绘制以及对各种图形的编辑和拖拽
//      创建者:zl
//      2014-08
//========================================================
var ZondyDrawExtend = function ZondyDrawExtend() {
    //用于存放点击的x，y(窗口坐标)
    this.clientScreenX;
    this.clientScreenY;
    //用于存放点击的x，y(逻辑坐标)
    this.clickX;
    this.clickY;
    //用于存放临时绘制的二维图形要素id
    this.tempElement = -1;
    //是否开启了移动功能
    this.isDragElement = "end";
    //当前进行移动图形的点集
    this.points = "";
    //移动图形时临时存储顶点
    this.movePoints = "";
    //当前进行移动的控制点的点集
    this.tempPoints = "";
    //判断是移动图形还是修改图形
    this.oper = "";
    //修改图形时选择顶点之后进入鼠标移动事件
    this.operEnd = "";
   
    //修改图形时距离鼠标点最近的一个顶点的下标
    this.minKey = -1;
    //修改图形时第一次拾取到图形
    this.first = true;
    //修改图形时在顶点处显示圆圈的id
    this.pointId = new Array();
    //修改图形时鼠标点距离所有顶点的最小位置
    this.minDistance =0.1;  //若是经纬度的设置0.1即可  其他可尝试200
    //修改点圆点的大小
    this.cicleRadius = 0.08; //若是经纬度的设置0.08即可 10
    //修改点中间点的大小
    this.centerCircleRadius = 0.08; //若是经纬度的设置0.08即可 其他可尝试10
    //修改点的样式
    this.editDragDrawInfo = null;
    //绘制图形的样式
    this.loc_drawInfo = null;
    //当前图形的类型
    this.loc_graphicType = "";

    /***************操作图片使用到的变量************************/
    this.labelId = "";
    ///<summary>
    ///起始调用的方法
    ///</summary>
    ///<param name="ZondyDrawExtendObj" type="">
    ///1:ZondyDrawExtendObj-当前ZondyDrawExtend的对象
    ///</param>
    ///<param name="editDragInfo" type="">
    ///2:editDragInfo-点击修改时弹出的修改点的样式
    ///</param>
    this.init = function () {
        if (zondy_DrawExtend.editDragDrawInfo == null) {
            zondy_DrawExtend.editDragDrawInfo = new DrawInfo();
            zondy_DrawExtend.editDragDrawInfo.shapeType = 3;
            zondy_DrawExtend.editDragDrawInfo.bdColor = 0xFFDF8F66;
            //uint
            zondy_DrawExtend.editDragDrawInfo.fillColor = 0xFFFFDFBF;
            //透明度的值
            zondy_DrawExtend.editDragDrawInfo.transparence = 1;
            //线的宽度
            zondy_DrawExtend.editDragDrawInfo.linWid = 2;
            //类型 TypeSolid = 0,TypeXRect = 1,TypeXPolygon = 2,typeXCircle = 3,
            zondy_DrawExtend.editDragDrawInfo.lineType = 0;
        }
    };
    ///<summary>
    ///加载监听事件
    ///</summary>
    this.removeDrawEventListener = function () {
        if (zondy_DrawExtend) {
            globe.removeEventListener(EventType.FinishedDraw, zondy_DrawExtend.finishDrawGraphical);
            globe.removeEventListener(EventType.LButtonUp, zondy_DrawExtend.LButtonUpOper);
            //鼠标的MouseMove事件
            globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.MouseMoveOper);
            //拾取二维图形的功能事件
            globe.removeEventListener(EventType.PickElement, zondy_DrawExtend.PickElementOper);
            //拾取标注的的监听事件
            globe.removeEventListener(EventType.PickLabel, zondy_DrawExtend.PickLabelOper);
        }
    }
    ///<summary>
    ///加载监听事件
    ///</summary>
    this.loadDrawEventListener = function (zondy_BasicDraw) {
        if (zondy_DrawExtend) {
            zondy_DrawExtend.removeDrawEventListener();
            zondy_DrawExtend.removeArrowEventLisener();
            //鼠标的LButtonUp事件
            globe.addEventListener(EventType.LButtonUp, zondy_DrawExtend.LButtonUpOper);
            //鼠标的MouseMove事件
            globe.addEventListener(EventType.MouseMove, zondy_DrawExtend.MouseMoveOper);
            //拾取二维图形的功能事件
            globe.addEventListener(EventType.PickElement, zondy_DrawExtend.PickElementOper);
            //拾取标注的的监听事件
            globe.addEventListener(EventType.PickLabel, zondy_DrawExtend.PickLabelOper);
        }
    };
    ///<summary>
    ///根据要素id获取绘制信息
    ///</summary>
    this.getdrawInfoByID = function (elementName) {
        if (globe._drawElements != "") {
            for (var x = 0; x < globe._drawElements.length; x++) {
                if (globe._drawElements[x].id == elementName)
                    return globe._drawElements[x].drawInfo;
            }

        }
        return null;
    };
    ///<summary>
    ///根据要素id获取绘制信息
    ///</summary>
    this.getdrawTypeByID = function (elementName) {
        if (globe._drawElements != "") {
            for (var x = 0; x < globe._drawElements.length; x++) {
                if (globe._drawElements[x].id == elementName)
                    return globe._drawElements[x].graphicType;
            }

        }
        return null;
    };
    ///<summary>
    ///拾取标注的回调函数
    ///</summary>
    ///<param name="attribute" type="">
    ///1:attribute-拾取到的图片的相关参数
    ///</param>
    //不使用alert语句，功能不正常
    //alert("当前移动标注：" + attribute);
    this.PickLabelOper = function (attribute) {
        zondy_DrawExtend.tempElement = labelId;
        zondy_DrawExtend.isDragElement = "startLabel";
        //最终需要关闭拾取功能
        globe.stopPickLabel();
    }
    ///<summary>
    ///拾取图形事件的回调函数
    ///</summary>
    ///<param name="arguments" type="object">
    ///1:arguments-拾取到的图形的相关参数
    ///</param>
    this.PickElementOper = function (arguments) {
        zondy_DrawExtend.tempElement = arguments;
        //这里需要获取当前二维要素最新的构成点集
        zondy_DrawExtend.points = globe.getPntsByEleID(zondy_DrawExtend.tempElement);

        if (zondy_DrawExtend.points != "") {
            zondy_DrawExtend.isDragElement = "startPoint";
        }
        //删除之前根据要素id获取到图形绘制信息
        zondy_DrawExtend.loc_drawInfo = zondy_DrawExtend.getdrawInfoByID(zondy_DrawExtend.tempElement);
        zondy_DrawExtend.loc_graphicType = zondy_DrawExtend.getdrawTypeByID(zondy_DrawExtend.tempElement);
       // alert(zondy_DrawExtend.points + "," + zondy_DrawExtend.loc_drawInfo + ","+zondy_DrawExtend.loc_graphicType);
        //最终需要关闭拾取功能
        globe.stopPickTool();
    };
    ///<summary>
    ///鼠标左键弹起的回调事件
    ///</summary>
    ///<param name="flag" type="">
    ///1:flag-标志符，无意义
    ///</param>
    ///<param name="x" type="">
    ///2:x-鼠标当前位置的坐标
    ///</param>
    ///<param name="y" type="">
    ///3:y-鼠标当前位置的坐标
    ///</param>
    ///<param name="dx" type="">
    ///4:dx-鼠标当前位置的坐标
    ///</param>
    ///<param name="dy" type="">
    ///5:dy-鼠标当前位置的坐标
    ///</param>
    ///<param name="dz" type="">
    ///6:dz-鼠标当前位置的坐标
    ///</param>
    this.LButtonUpOper = function (flag, x, y, dx, dy, dz) {
        if (zondy_DrawExtend.oper === "move") { //移动图形
            if (zondy_DrawExtend.isDragElement === "startPoint") {
                //鼠标一旦弹起就记录下当前点击的xy
                zondy_DrawExtend.clientScreenX = x;
                zondy_DrawExtend.clientScreenY = y;
                zondy_DrawExtend.clickX = dx;
                zondy_DrawExtend.clickY = dy;
                zondy_DrawExtend.isDragElement = "draw";
            } else if (zondy_DrawExtend.isDragElement === "startLabel") {
                //已经选好了最后的位置
                zondy_DrawExtend.isDragElement = "drawLabel";
            } else if (zondy_DrawExtend.isDragElement === "draw") {
                zondy_DrawExtend.points = zondy_DrawExtend.movePoints;
                //已经选好了最后的位置
                if (zondy_DrawExtend.tempElement != -1) {
                    var ele = {
                        id: zondy_DrawExtend.tempElement,
                        pnts: zondy_DrawExtend.points,
                        drawInfo: zondy_DrawExtend.loc_drawInfo,
                        graphicType: zondy_DrawExtend.loc_graphicType
                    };
                    globe._drawElements.push(ele);
                }
                zondy_DrawExtend.isDragElement = "end";
                zondy_DrawExtend.oper = "";
            } else if (zondy_DrawExtend.isDragElement === "drawLabel") {
                //已经选好了最后的位置
                zondy_DrawExtend.isDragElement = "end";
            }
        } else if (zondy_DrawExtend.oper === "update") { //修改图形
            if (zondy_DrawExtend.first === true) {
                //在各个顶点上面显示圆圈
                var pointsArr = null;
                var pnts = "";
                if (zondy_DrawExtend.points != "" && zondy_DrawExtend.points != null) {
                    //添加修改点
                    zondy_DrawExtend.addEditMark();
                    zondy_DrawExtend.first = false;
                }
            } else {
                if (zondy_DrawExtend.isDragElement === "startPoint") {
                    //鼠标一旦弹起就记录下当前点击的xy，并判断修改的是哪一个点
                    if (zondy_DrawExtend.tempPoints != "" && zondy_DrawExtend.tempPoints != null) {
                        zondy_DrawExtend.isDragElement = "draw";
                        var pointsArr = zondy_DrawExtend.tempPoints.split(';');
                        //得到最近的点和下标
                        for (var i = 0; i < pointsArr.length; i++) {
                            var pointXY = pointsArr[i].split(',');
                            var distance = (dx - pointXY[0]) * (dx - pointXY[0]) + (dy - pointXY[1]) * (dy - pointXY[1]);
                            if (zondy_DrawExtend.minDistance > distance) {
                                //  zondy_DrawExtend.minDistance = distance;
                                zondy_DrawExtend.minKey = i;
                            }
                        }
                        if (zondy_DrawExtend.minKey < 0 || zondy_DrawExtend.minKey >= pointsArr.length) {
                            globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.MouseMoveOper);
                            zondy_DrawExtend.isDragElement = "startPoint";
                        } else {
                            zondy_DrawExtend.operEnd = "updateEnd";
                            globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.MouseMoveOper);
                            globe.addEventListener(EventType.MouseMove, zondy_DrawExtend.MouseMoveOper);
                        }

                    }

                } else if (zondy_DrawExtend.isDragElement === "draw") {
                    //已经选好了最后的位置
                    //zondy_DrawExtend.isDragElement = "end";
                    globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.MouseMoveOper);
                    if (zondy_DrawExtend.tempElement != -1) {
                        var ele = {
                            id: zondy_DrawExtend.tempElement,
                            pnts: zondy_DrawExtend.points,
                            drawInfo: zondy_DrawExtend.loc_drawInfo,
                            graphicType: zondy_DrawExtend.loc_graphicType
                        };
                        globe._drawElements.push(ele);
                    }
                    zondy_DrawExtend.addEditMark();
                    //zondy_DrawExtend.minDistance = 99999;
                    zondy_DrawExtend.isDragElement = "startPoint";
                    //zondy_DrawExtend.loc_drawInfo = null;
                    //zondy_DrawExtend.stopDrawGraphic();
                    zondy_DrawExtend.minKey = -1;
                }
            }
        }
    };
    ///<summary>
    ///添加修改点
    ///</summary>
    this.addEditMark = function () {
        var pnts = "";
        for (var i = 0; i < zondy_DrawExtend.pointId.length; i++) { //将所有的点（包括顶点和中间点）删除
            globe.removeGraphicByName(zondy_DrawExtend.pointId[i]);
            zondy_DrawExtend.pointId[i] = "";
        }
        var pointsArr = zondy_DrawExtend.points.split(';');
        var pnts = "";
        //在各个顶点和中间点上显示圆圈
        for (var i = 0, k = 0; i < pointsArr.length; i++, k = k + 2) {
            var pointXY = pointsArr[i].split(','); //取每个顶点的正负0.05处画圆
            var xx1 = parseFloat(pointXY[0]) - zondy_DrawExtend.cicleRadius;
            var yy1 = parseFloat(pointXY[1]) - zondy_DrawExtend.cicleRadius;
            var xx2 = parseFloat(pointXY[0]) + zondy_DrawExtend.cicleRadius;
            var yy2 = parseFloat(pointXY[1]) + zondy_DrawExtend.cicleRadius;
            var p = xx1 + "," + yy1 + ";" + xx2 + "," + yy2;
            var pointXY2, x2, y2, x21, y21, p2, p21;
            ////////////////////判断是什么类型的图形///////////////////////
            if (zondy_DrawExtend.loc_graphicType == 0 || zondy_DrawExtend.loc_graphicType == 2) {
                zondy_DrawExtend.pointId[k] = globe.addGraphic(p, zondy_DrawExtend.editDragDrawInfo); //在每个顶点处添加控制点
                if (i < pointsArr.length - 1) {
                    pointXY2 = pointsArr[i + 1].split(',');
                } else {
                    if (parseInt(zondy_DrawExtend.loc_graphicType) == 0) {
                        pointXY2 = null;
                    } else {
                        pointXY2 = pointsArr[0].split(',');
                    }
                }
                if (pointXY2 != null) {
                    x2 = (parseFloat(pointXY2[0]) + parseFloat(pointXY[0])) / 2.0 - zondy_DrawExtend.cicleRadius;
                    y2 = (parseFloat(pointXY2[1]) + parseFloat(pointXY[1])) / 2.0 - zondy_DrawExtend.cicleRadius;
                    x21 = x2 + zondy_DrawExtend.centerCircleRadius;
                    y21 = y2 + zondy_DrawExtend.centerCircleRadius;
                    p2 = x2 + "," + y2 + ";" + x21 + "," + y21;
                    p21 = (parseFloat(pointXY2[0]) + parseFloat(pointXY[0])) / 2.0 + "," + (parseFloat(pointXY2[1]) + parseFloat(pointXY[1])) / 2.0;
                    zondy_DrawExtend.pointId[k + 1] = globe.addGraphic(p2, zondy_DrawExtend.editDragDrawInfo); //在两个顶点的中间位置添加控制点
                    pnts += pointsArr[i] + ";" + p21 + ";";
                } else {
                    pnts += pointsArr[i] + ";";
                }
            } else {
                zondy_DrawExtend.pointId[i] = globe.addGraphic(p, zondy_DrawExtend.editDragDrawInfo); //在每个顶点处添加控制点
                pnts += pointsArr[i] + ";";
            }
        }
        pnts = pnts.substring(0, pnts.length - 1);
        if (zondy_DrawExtend.loc_graphicType == 0 || zondy_DrawExtend.loc_graphicType == 2) {
            zondy_DrawExtend.tempPoints = pnts;
        } else {
            ///当绘制的是箭头时
            zondy_DrawExtend.tempPoints = zondy_DrawExtend.points;
        }

    };

    ///<summary>
    ///鼠标移动事件的回调函数
    ///</summary>
    ///<param name="flag" type="">
    ///1:flag-标志符，无意义
    ///</param>
    ///<param name"x" type="">
    ///2:x-鼠标当前位置的坐标
    ///</param>
    ///<param name="y" type="">
    ///3:y-鼠标当前位置的坐标
    ///</param>
    ///<param name="dx" type="">
    ///4:dx-鼠标当前位置的坐标
    ///</param>
    ///<param name="dy" type="">
    ///5:dy-鼠标当前位置的坐标
    ///</param>
    ///<param name="dz" type="">
    ///6:dz-鼠标当前位置的坐标
    ///</param>
    this.MouseMoveOper = function (flag, x, y, dx, dy, dz) {
        if (zondy_DrawExtend.oper === "move") { //移动图形
            if (zondy_DrawExtend.isDragElement == "draw") {
                //最开始删除之前绘制的
                if (zondy_DrawExtend.tempElement != -1) {
                    globe.removeGraphicByName(zondy_DrawExtend.tempElement);
                }
                var pnts = "";
                //分别计算x、y的偏移量
                var dxScreenOff = x - zondy_DrawExtend.clientScreenX
                var dyScreenOff = y - zondy_DrawExtend.clientScreenY;
                var pointsArr = zondy_DrawExtend.points.split(';');
                //计算新的图形的位置
                for (var i = 0; i < pointsArr.length; i++) {
                    var pointXY = pointsArr[i].split(',');
                    var screenPntXY = globe.convertLpToWp(parseFloat(pointXY[0]), parseFloat(pointXY[1]), 0);
                    var logicPntXY = globe.convertWpToLp(parseFloat(screenPntXY.split(",")[0]) + dxScreenOff, parseFloat(screenPntXY.split(",")[1]) + dyScreenOff, 0);
                    pnts += logicPntXY.split(",")[0] + "," + logicPntXY.split(",")[1] + ";";
                }
                pnts = pnts.substring(0, pnts.length - 1);
                zondy_DrawExtend.movePoints = pnts;
                //绘制参数设置可以参考ClassLib.js中的DrawInfo类
                if (zondy_DrawExtend.loc_graphicType >= 0 && zondy_DrawExtend.loc_graphicType <= 3) {
                    zondy_DrawExtend.tempElement = globe.addGraphic(pnts, zondy_DrawExtend.loc_drawInfo);
                } else {
                    var arrowPntArr = zondy_DrawExtend.strToPoint2DArray(pnts);
                    zondy_DrawExtend.tempElement = zondy_DrawExtend.addArrowByDots(arrowPntArr, zondy_DrawExtend.loc_graphicType, zondy_DrawExtend.loc_drawInfo);
                }
            } else if (zondy_DrawExtend.isDragElement == "drawLabel") {
                //删除指定标注
                globe.removeLabelByName(labelId);
                var strObj = new LabelIcon();
                strObj.text = "";
                strObj.x = dx;
                strObj.y = dy;
                strObj.attribute = "作为该标注的id";
                strObj.iconUrl = "D:/Data/Visual Studio 2010/GraphicalEdit/GraphicalEdit/imgs/label.png";
                labelId = globe.addLabelIcon(strObj);
            }
        } else if (zondy_DrawExtend.oper === "update" && zondy_DrawExtend.operEnd === "updateEnd") { //修改图形
            if (zondy_DrawExtend.isDragElement == "draw") {

                //最开始删除之前绘制的
                if (zondy_DrawExtend.tempElement != -1)
                    globe.removeGraphicByName(zondy_DrawExtend.tempElement);
                var pointsArr = zondy_DrawExtend.tempPoints.split(';');
                //计算新的图形的位置
                var pnts = "";
                //判断修改时是什么类型的图形
                if (zondy_DrawExtend.loc_graphicType == 0 || zondy_DrawExtend.loc_graphicType == 2) {
                    //计算新的点
                    for (var i = 0; i < pointsArr.length; i++) {
                        var pointXY = pointsArr[i].split(',');
                        if (zondy_DrawExtend.minKey === i) {
                            pnts += dx + "," + dy + ";"; //得到最近的一个点，并将此点添加到顶点中，进行绘制
                        } else if (i % 2 === 0) {
                            pnts += pointXY[0] + "," + pointXY[1] + ";"; //当前点不是最近的点，但是是原有图形的顶点
                        }
                    }
                    pnts = pnts.substring(0, pnts.length - 1); //pnts包括最近的一个控制点和原有图形的所有顶点
                    zondy_DrawExtend.tempElement = globe.addGraphic(pnts, zondy_DrawExtend.loc_drawInfo);
                } else {
                    //计算新的点
                    for (var i = 0; i < pointsArr.length; i++) {
                        var pointXY = pointsArr[i].split(',');
                        if (zondy_DrawExtend.minKey === i) {
                            pnts += dx + "," + dy + ";"; //得到最近的一个点，并将此点添加到顶点中，进行绘制
                        } else {
                            pnts += pointXY[0] + "," + pointXY[1] + ";"; //当前点不是最近的点，但是是原有图形的顶点
                        }
                    }
                    pnts = pnts.substring(0, pnts.length - 1); //pnts包括最近的一个控制点和原有图形的所有顶点
                    if (zondy_DrawExtend.loc_graphicType >= 4) {
                        var arrowPntArr = zondy_DrawExtend.strToPoint2DArray(pnts);
                        zondy_DrawExtend.tempElement = zondy_DrawExtend.addArrowByDots(arrowPntArr, zondy_DrawExtend.loc_graphicType, zondy_DrawExtend.loc_drawInfo);
                    } else {
                        zondy_DrawExtend.tempElement = globe.addGraphic(pnts, zondy_DrawExtend.loc_drawInfo);
                    }
                }
                zondy_DrawExtend.points = pnts;
            } else if (zondy_DrawExtend.isDragElement == "end") {
                // zondy_DrawExtend.minDistance = 99999;
                //  zondy_DrawExtend.isDragElement = "startPoint";
                //确定新的中间点

            }
        }
    };

    ///<summary>
    ///绘制图形
    ///</summary>
    this.startGraphical = function (locdrawInfo, type) {
        //开始先停止绘制图形，并保存图形到数组中
        zondy_DrawExtend.stopUpdate();
        //开始监听回执结束事件
        globe.currentElePnts = "";
        if (parseInt(type) >= 0 && parseInt(type) <= 3) {
            if (globe != null && zondy_DrawExtend != null) {
                globe.removeEventListener(EventType.FinishedDraw, zondy_DrawExtend.finishDrawGraphical);
                globe.addEventListener(EventType.FinishedDraw, zondy_DrawExtend.finishDrawGraphical);
            }
            var drawResult = globe.stopDrawTool();
            if (drawResult != "") {
                var ele = {
                    id: drawResult,
                    pnts: globe.currentElePnts,
                    drawInfo: zondy_DrawExtend.loc_drawInfo,
                    graphicType: zondy_DrawExtend.loc_graphicType
                };
                globe._drawElements.push(ele);
            }
            //绘制参数设置可以参考ClassLib.js中的DrawInfo类
            globe.startDrawTool(locdrawInfo);
        } else {
            zondy_DrawExtend.startDrawArrow(locdrawInfo);
        }
        zondy_DrawExtend.loc_drawInfo = locdrawInfo;
        zondy_DrawExtend.loc_graphicType = type;

    };
    ///<summary>
    ///右键结束图形绘制 
    ///</summary>
    this.finishDrawGraphical = function (flag, x, y, dx, dy, dz) {
        if (zondy_DrawExtend) {
            if (globe != null && zondy_DrawExtend != null) {
                globe.removeEventListener(EventType.FinishedDraw, zondy_DrawExtend.finishDrawGraphical);
              
            }
              zondy_DrawExtend.stopGraphical();
            //var drawResult = globe.stopDrawTool();
        }
    };
    ///<summary>
    ///停止绘制图形
    ///</summary>
    this.stopGraphical = function () {
        var drawResult = globe.stopDrawTool();
        if (drawResult != "") {
            var ele = {
                id: drawResult,
                pnts: globe.currentElePnts,
                drawInfo: zondy_DrawExtend.loc_drawInfo,
                graphicType: zondy_DrawExtend.loc_graphicType
            };
            globe._drawElements.push(ele);
        }
       // globe.stopDrawTool();
        zondy_DrawExtend.stopUpdate();
    };
    ///<summary>
    ///删除绘制的图形
    ///</summary>
    this.deleteGraphical = function () {
        zondy_DrawExtend.stopGraphical();
        if (globe._drawElements.length > 0) {
            for (var i = globe._drawElements.length - 1; i >= 0; i--) {
                if (globe._drawElements[i] != null) {
                    globe.removeGraphicByName(globe._drawElements[i].id);
                }
            }
        }
        zondy_DrawExtend.tempElement = -1;
        zondy_DrawExtend.isDragElement = "end";
        zondy_DrawExtend.points = "";
        zondy_DrawExtend.tempPoints = "";
        zondy_DrawExtend.pointId = new Array();

    };
    ///<summary>
    ///移动图形
    ///</summary>
    this.moveGraphical = function () {
        zondy_DrawExtend.stopGraphical();
        zondy_DrawExtend.stopUpdate();
        zondy_DrawExtend.loadDrawEventListener();
        zondy_DrawExtend.oper = "move";
        globe.startPickTool();
    };
    ///<summary>
    ///移动图形
    ///</summary>
    this.stopMoveGraphical = function () {
        zondy_DrawExtend.stopGraphical();
        zondy_DrawExtend.stopUpdate();
    };
    ///<summary>
    ///修改绘制的图形
    ///</summary>
    this.updateGraphical = function () {
        //结束绘制
        zondy_DrawExtend.stopDrawGraphic();
        //监听鼠标事件
        zondy_DrawExtend.loadDrawEventListener();
        //设置类型为当前是修改类型
        zondy_DrawExtend.oper = "update";
        //开始拾取二维图形
        globe.startPickTool();
    };
    ///<summary>
    ///清除当前鼠标操作的所有状态,包括绘制图形、图形移动和修改
    ///</summary>
    this.stopDrawGraphic = function () {
        zondy_DrawExtend.stopGraphical();
        zondy_DrawExtend.stopUpdate();
        zondy_DrawExtend.tempElement = -1;
        zondy_DrawExtend.isDragElement = "end";
        zondy_DrawExtend.points = "";
        zondy_DrawExtend.tempPoints = "";
        zondy_DrawExtend.loc_drawInfo = null
        zondy_DrawExtend
        zondy_DrawExtend.pointId = new Array();
    };
    ///<summary>
    ///停止修改
    ///</summary>
    this.stopUpdate = function () {
        zondy_DrawExtend.removeDrawEventListener();
        zondy_DrawExtend.removeArrowEventLisener();
        //已经选好了最后的位置
        zondy_DrawExtend.isDragElement = "end";
        zondy_DrawExtend.first = true;
        //zondy_DrawExtend.minDistance = 99999;
        zondy_DrawExtend.minKey = -1;
        zondy_DrawExtend.oper = "";
        zondy_DrawExtend.operEnd = "";
        if (zondy_DrawExtend.tempPoints != "" || zondy_DrawExtend.tempPoints != null) {
            var pointsArr = zondy_DrawExtend.tempPoints.split(';');
            for (var i = 0; i < pointsArr.length; i++) {
                globe.removeGraphicByName(zondy_DrawExtend.pointId[i]);
            }
        }
        zondy_DrawExtend.loc_drawInfo = null;
    };
    ///<summary>
    ///添加图片，实质上带图片的标注
    ///</summary>
    this.addPicture = function () {
        if (labelId != "") //在添加图片之前删除原有的图片
            globe.removeLabelByName(labelId);
        var strObj = new LabelIcon();
        strObj.text = "";
        strObj.x = 110;
        strObj.y = 19;
        strObj.attribute = "作为该标注的id";
        strObj.iconUrl = "D:/Data/Visual Studio 2010/GraphicalEdit/GraphicalEdit/imgs/label.png";
        labelId = globe.addLabelIcon(strObj);
    };
    ///<summary>
    ///删除添加的图片
    ///</summary>
    this.deletePicture = function () {
        globe.removeLabelByName(labelId);
    };
    ///<summary>
    ///移动添加的图片
    ///</summary>
    this.movePicture = function () {
        zondy_DrawExtend.oper = "move";
        globe.startPickLabel();
    };
    //***************************************标绘**********************************
    this.drawArrowPnts = null;

    ///<summary>
    ///开始绘制标绘
    ///</summary>
    this.startDrawArrow = function (drawInfo) {
        if (zondy_DrawExtend.drawArrowPnts != null && zondy_DrawExtend.tempElement != -1) {
            globe.removeGraphicByName(zondy_DrawExtend.tempElement);
        }
        zondy_DrawExtend.stopDrawGraphic();
        //移除鼠标左键弹起、鼠标移动和鼠标右键弹起事件
        zondy_DrawExtend.removeArrowEventLisener();
        //监听鼠标左键弹起事件
        globe.addEventListener(EventType.LButtonUp, zondy_DrawExtend.ArrowLButtonUpOper);
        //监听鼠标右键弹起事件
        globe.addEventListener(EventType.RButtonUp, zondy_DrawExtend.ArrowRButtonUpOper);
        //记录当前添加在地图上的图形id
        zondy_DrawExtend.tempElement = -1;
        //存储图形绘制的关键点
        zondy_DrawExtend.drawArrowPnts = null;
    };
    ///<summary>
    ///清除绘制标绘的方法
    ///</summary>
    this.stopDrawArrow = function () {
        if (zondy_DrawExtend.drawArrowPnts != null && zondy_DrawExtend.tempElement != -1) {
            globe.removeGraphicByName(zondy_DrawExtend.tempElement);
        }
        zondy_DrawExtend.removeArrowEventLisener();
        zondy_DrawExtend.tempElement = -1;
        zondy_DrawExtend.drawArrowPnts = null;
    };
    ///<summary>
    ///清除绘制标绘所有的事件
    ///</summary>
    this.removeArrowEventLisener = function () {
        if (zondy_DrawExtend) {
            globe.removeEventListener(EventType.LButtonUp, zondy_DrawExtend.ArrowLButtonUpOper);
            globe.removeEventListener(EventType.RButtonUp, zondy_DrawExtend.ArrowRButtonUpOper);
            globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
        }
    };
    /// <summary>
    /// 鼠标左键添加绘制标绘的关键点
    /// </summary>
    this.ArrowLButtonUpOper = function (flag, x, y, dx, dy, dz) {
        if (zondy_DrawExtend.drawArrowPnts == null) {
            zondy_DrawExtend.drawArrowPnts = new Array();
        }
        var pnt = new Point2D(parseFloat(dx), parseFloat(dy));
        //记录当前鼠标左键点击的点坐标
        zondy_DrawExtend.drawArrowPnts.push(pnt);
        //绘制的图形是双箭头时
        if (zondy_DrawExtend.loc_graphicType == 6) {
            //点击的点有两个时开始监听鼠标移动事件
            if (zondy_DrawExtend.drawArrowPnts.length == 2) {
                globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
                globe.addEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
            } else if (zondy_DrawExtend.drawArrowPnts.length == 4) {
                //点击的点有四个时结束当前双箭头的绘制
                var ele = {
                    id: zondy_DrawExtend.tempElement,
                    pnts: zondy_DrawExtend.ConvertArrayToStr(zondy_DrawExtend.drawArrowPnts),
                    drawInfo: zondy_DrawExtend.loc_drawInfo,
                    graphicType: zondy_DrawExtend.loc_graphicType
                };
                globe._drawElements.push(ele);
                zondy_DrawExtend.removeArrowEventLisener();
                zondy_DrawExtend.tempElement = -1;
                zondy_DrawExtend.drawArrowPnts = null;
            }
        } else if (zondy_DrawExtend.loc_graphicType >= 4 && zondy_DrawExtend.loc_graphicType <= 5) {
            //绘制的图形是简单箭头和直箭头
            //判断当前点击的点只有一个时开始监听鼠标移动事件
            if (zondy_DrawExtend.drawArrowPnts.length <= 1) {
                globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
                globe.addEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
            }
        } else {
            //绘制的图形是两个点就能确定的自定义图形，如集结区域、曲线旗标等
            //判断当前点击的点只有一个时开始监听鼠标移动事件
            if (zondy_DrawExtend.drawArrowPnts.length <= 1) {
                globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
                globe.addEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
            }
            //判断点击了第二次时就结束当前图形的绘制
            if (zondy_DrawExtend.drawArrowPnts.length == 2) {
                var ele = {
                    id: zondy_DrawExtend.tempElement,
                    pnts: zondy_DrawExtend.ConvertArrayToStr(zondy_DrawExtend.drawArrowPnts),
                    drawInfo: zondy_DrawExtend.loc_drawInfo,
                    graphicType: zondy_DrawExtend.loc_graphicType
                };
                globe._drawElements.push(ele);
                zondy_DrawExtend.removeArrowEventLisener();
                zondy_DrawExtend.tempElement = -1;
                zondy_DrawExtend.drawArrowPnts = null;
            }
        }
    };
    /// <summary>
    /// 鼠标移动时实时绘制标绘的事件
    /// </summary>
    this.ArrowMouseMoveOper = function (flag, x, y, dx, dy, dz) {
        if (zondy_DrawExtend.drawArrowPnts.length > 0) {
            if (zondy_DrawExtend.tempElement != -1) {
                globe.removeGraphicByName(zondy_DrawExtend.tempElement);
            }
            var orgPntArr = null;
            orgPntArr = new Array();
            for (var i = 0; i < zondy_DrawExtend.drawArrowPnts.length; i++) {
                orgPntArr.push(zondy_DrawExtend.drawArrowPnts[i]);
            }
            orgPntArr.push(new Point2D(parseFloat(dx), parseFloat(dy)));
            zondy_DrawExtend.tempElement = zondy_DrawExtend.addArrowByDots(orgPntArr, zondy_DrawExtend.loc_graphicType, zondy_DrawExtend.loc_drawInfo);
        }
    };
    /// <summary>
    /// 鼠标右键结束绘制标绘的事件
    /// </summary>
    this.ArrowRButtonUpOper = function (flag, x, y, dx, dy, dz) {
        globe.removeEventListener(EventType.MouseMove, zondy_DrawExtend.ArrowMouseMoveOper);
        if (zondy_DrawExtend.drawArrowPnts != null) {
            ///双箭头时
            if (zondy_DrawExtend.loc_graphicType == 6) {
                if (zondy_DrawExtend.drawArrowPnts.length == 2) {
                    ///添加当前右键结束的点为第三个点
                    zondy_DrawExtend.drawArrowPnts.push(new Point2D(parseFloat(dx), parseFloat(dy)));
                    ///根据前三个点计算出第四个点
                    var doubleArrowPnt4 = zondyArrowCommon.getTempPnt4(zondy_DrawExtend.drawArrowPnts[0], zondy_DrawExtend.drawArrowPnts[1], zondy_DrawExtend.drawArrowPnts[2]);
                    zondy_DrawExtend.drawArrowPnts.push(doubleArrowPnt4);
                } else if (zondy_DrawExtend.drawArrowPnts.length == 3) {
                    var doubleArrowPnt4 = zondyArrowCommon.getTempPnt4(zondy_DrawExtend.drawArrowPnts[0], zondy_DrawExtend.drawArrowPnts[1], zondy_DrawExtend.drawArrowPnts[2]);
                    zondy_DrawExtend.drawArrowPnts.push(doubleArrowPnt4);
                }
            } else if (zondy_DrawExtend.loc_graphicType >= 4 && zondy_DrawExtend.loc_graphicType <= 5) {
                //判断最后一个点与当前右键结束的点是否是相同的
                var isSamePoint = zondy_DrawExtend.GeoEqual(zondy_DrawExtend.drawArrowPnts[zondy_DrawExtend.drawArrowPnts.length - 1], new Point2D(dx, dy));
                if (isSamePoint == false) {
                    zondy_DrawExtend.drawArrowPnts.push(new Point2D(parseFloat(dx), parseFloat(dy)));
                }
            } else {
                zondy_DrawExtend.drawArrowPnts.push(new Point2D(parseFloat(dx), parseFloat(dy)));
            }
            var ele = {
                id: zondy_DrawExtend.tempElement,
                pnts: zondy_DrawExtend.ConvertArrayToStr(zondy_DrawExtend.drawArrowPnts),
                drawInfo: zondy_DrawExtend.loc_drawInfo,
                graphicType: zondy_DrawExtend.loc_graphicType
            };
            globe._drawElements.push(ele);
        }
        zondy_DrawExtend.removeArrowEventLisener();
        zondy_DrawExtend.tempElement = -1;
        zondy_DrawExtend.drawArrowPnts = null;
    };
    /// <summary>
    /// 根据坐标点添加标绘
    /// </summary>
    ///Param
    ///pnts:传入的坐标数组,Array,如[Point2D，Point2D，...]
    ///type:当前自定义图形的类型
    ///drawInof：设置区信息
    this.addArrowByDots = function (pnts, type, drawInfo) {
        //根据算法求的最后的边界点
        var loc_pnts = zondy_DrawExtend.getArrowDotsByHandle(pnts, type);
        var resGraphicID = globe.addGraphic(loc_pnts, drawInfo);
        return resGraphicID;
    }
    /// <summary>
    /// 调用ArrowHandle.js里的算法获取箭头的所有点
    /// </summary>
    /// <param name="loc1">原始的坐标数组</param>
    /// 返回箭头所有点的字符串
    this.getArrowDotsByHandle = function (loc1, type) {
        var resArr = null;
        switch (type.toString()) {
            case "4":
                resArr = zondyArrowCommon.getArrowPlot(loc1, true, 0.5, "curveFitMethod", 0.15, 0.4, 0.75, 0.1, 0.1);
                break;
            case "5":
                resArr = zondyArrowCommon.getArrowPlot(loc1, false, 0, "curveFitMethod", 0.1, 1.3, 1.0, 0.7, 0.07);
                break;
            case "6":
                resArr = zondyArrowCommon.getDoubleArrowPnts(loc1, 0.15, 0.8, 0.7, 0.4)
                break;
            case "7":
                resArr = zondyArrowCommon.createAssemblyAreaPlots(loc1)
                break;
            case "8":
                resArr = zondyArrowCommon.createcurveFlagPlots(loc1)
                break;
        }
        var resDotStr = zondy_DrawExtend.ConvertArrayToStr(resArr);
        return resDotStr;
    }

    /// <summary>
    /// 将数据库中得到的二维点序列转换为坐标数组
    /// </summary>
    /// <param name="pntStr">原始的坐标序列：x1,y1,x2,y2,...</param>
    /// 返回坐标数组{array(OpenLayers.Geometry.Point(x1,y1))...}
    this.ConvertControl2DotsToArray = function (dotsArr) {
        var pntarr = [];
        if (dotsArr != null) {
            for (var i = 0; i < dotsArr.length; i = i + 1) {
                pntarr.push(new OpenLayers.Geometry.Point(dotsArr[i].x, dotsArr[i].y));
            }
        }
        return pntarr;
    }

    /// <summary>
    /// 为字符串转换数组
    /// </summary>
    /// <param name="pntStr">x1,y1;x2,y2;...</param>
    /// 返回坐标数组{array(Point2D(x1,y1))...}
    this.strToPoint2DArray = function (pntStr) {
        var pntArr = null;
        if (pntStr != "") {
            var arr = pntStr.split(";");
            if (arr) {
                pntArr = new Array();
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != null && arr[i] != "") {
                        var dotsArr = arr[i].split(",");
                        if (dotsArr != null && dotsArr != "") {
                            pntArr.push(new Point2D(parseFloat(dotsArr[0]), parseFloat(dotsArr[1])));
                        }
                    }
                }
            }
        }
        return pntArr;
    };
    /// <summary>
    /// 数组转换为字符串
    /// </summary>
    /// <param name="pntarr">坐标数组{array(OpenLayers.Geometry.Point(x1,y1))...}</param>
    /// 返回坐标序列：x1,y1;x2,y2;...
    this.ConvertArrayToStr = function (pntarr) {
        var resStr = "";
        if (pntarr) {
            for (var i = 0; i < pntarr.length; i++) {
                if (i == pntarr.length - 1) {
                    resStr = resStr + pntarr[i].x + "," + pntarr[i].y;
                } else {
                    resStr = resStr + pntarr[i].x + "," + pntarr[i].y + ";";
                }
            }
        }
        return resStr;
    }

    /// <summary>
    /// 判断两个2维点是否相等或为同一个点
    /// </summary>
    /// <param name="dot1"></param>
    /// <param name="dot2"></param>
    /// <returns></returns>
    this.GeoEqual = function (dot1, dot2) {
        var len = Math.sqrt(Math.pow((dot1.x - dot2.x), 2) + Math.pow((dot1.y - dot2.y), 2));
        if (len <= Math.exp(-8)) {
            return true;
        }
        else {
            return false;
        }

    }
}

//赋值的必须是ZondyDrawExtend的类型
var zondy_DrawExtend = new ZondyDrawExtend();
zondy_DrawExtend.init();


