//map中的图层数组
var layer = new Array();
//图层名称数组
var layerName = new Array();
//图层可见属性数组
var layerVisibility = new Array();

/**
 * 加载图层列表数据
 * @param {ol.Map} map 地图对象
 * @param {string} id 图层列表容器ID
 */
function loadLayersControl(map, id) {
    //图层目录容器
    var treeContent = document.getElementById(id);
    treeContent.innerHTML = ''
        //获取地图中所有图层
    var layers = map.getLayers();
    for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        layer[i] = layers.item(i);
        layerName[i] = layer[i].get('lNameDisplay');
        layerVisibility[i] = layer[i].getVisible();
        //新增li元素，用来承载图层项
        var elementLi = document.createElement('li');
        // 添加子节点
        treeContent.appendChild(elementLi);
        //创建复选框元素
        var elementInput = document.createElement('input');
        elementInput.type = "checkbox";
        elementInput.name = "layers";
        elementLi.appendChild(elementInput);
        //创建label元素
        var elementLable = document.createElement('label');
        elementLable.className = "layer";
        //设置图层名称
        setInnerText(elementLable, layerName[i]);
        elementLi.appendChild(elementLable);
        //设置图层默认显示状态
        if (layerVisibility[i]) {
            elementInput.checked = true;
        }
        //为checkbox添加变更事件
        addChangeEvent(elementInput, i);
    }
}
/**
 * 为checkbox元素绑定变更事件
 * @param {input} element checkbox元素
 * @param {ol.layer.Layer} layer 图层对象
 */
function addChangeEvent(element, index) {
    element.onclick = function() {
        console.log(layerName[index])
        if (element.checked) {
            //显示图层
            layerVisibility[index] = true
            layer[index].setVisible(true);

            if (layerName[index] == 'grid50') queryClickData != null ? queryClickData = true : ''

        } else {
            //不显示图层
            layerVisibility[index] = false
            layer[index].setVisible(false);
            if (layerName[index] == 'grid50') queryClickData != null ? queryClickData = false : ''
        }
    };
}