//使用严格模式
'use strict';
// 测量长度工具
var measureLengthTool,
    measureLengthToolFlag = false;

// 测量面积工具
var measureAreaTool,
    measureAreaToolFlag = false;

// 三角测量工具
var triangulationTool,
    triangulationToolFlag = false;

// 测量坡度工具
var measureSlopeTool,
    measureSlopeToolFlag = false;



/*距离测量*/
function lengthMeasure() {
    if (measureLengthTool == undefined) {
        measureLengthTool = new Cesium.MeasureLengthTool(webGlobe.viewer);
        measureLengthToolFlag = true
    }
    measureLengthTool.startTool();
}

/*停止距离测量*/
function stopLengthMeasure() {
    if (measureLengthTool != undefined) {
        measureLengthTool.stopTool();
        measureLengthToolFlag = false;
        measureLengthTool = undefined;
    }
}


/*面积测量*/
function areaMeasure() {
    if (measureAreaTool == undefined) {
        measureAreaTool = new Cesium.MeasureAreaTool(webGlobe.viewer);
        measureAreaToolFlag = true
    }
    measureAreaTool.startTool();
}

/*停止面积测量*/
function stopAreaMeasure() {
    if (measureAreaTool != undefined) {
        measureAreaTool.stopTool();
        measureAreaToolFlag = false;
        measureAreaTool = undefined;
    }
}


/*三角测量*/
function triangulationMeasure() {
    if (triangulationTool == undefined) {

        triangulationTool = new Cesium.TriangulationTool(webGlobe.viewer);
        triangulationToolFlag = true;
    }
    triangulationTool.startTool();
}


/*停止三角测量*/
function stopTriangulationMeasure() {
    if (triangulationTool != undefined) {
        triangulationTool.stopTool();
        triangulationToolFlag = false;
        triangulationTool = undefined;
    }
}

/*坡度测量*/
function measureSlope() {
    if (measureSlopeTool == undefined) {
        measureSlopeTool = new Cesium.MeasureSlopeTool(webGlobe.viewer);
        measureSlopeToolFlag = true;
    }
    measureSlopeTool.startTool();
}

/*停止坡度测量*/
function stopMeasureslope() {
    if (measureSlopeTool != undefined) {
        measureSlopeTool.stopTool();
        measureSlopeToolFlag = false;
        measureSlopeTool = undefined;
    }
}

function stopAllCalc() {
    stopMeasureslope()
    stopTriangulationMeasure()
    stopAreaMeasure()
    stopLengthMeasure()
}