!function(){"use strict";angular.module("nvd3",[]).directive("nvd3",["nvd3Utils",function(nvd3Utils){return{restrict:"AE",scope:{data:"=",options:"=",api:"=?",events:"=?",config:"=?"},link:function(scope,element,attrs){function configure(chart,options,chartType){chart&&options&&angular.forEach(chart,function(value,key){"_"===key[0]||("dispatch"===key?((void 0===options[key]||null===options[key])&&scope._config.extended&&(options[key]={}),configureEvents(value,options[key])):-1===["axis","clearHighlights","defined","highlightPoint","nvPointerEventsClass","options","rangeBand","rangeBands","scatter"].indexOf(key)&&(void 0===options[key]||null===options[key]?scope._config.extended&&(options[key]=value()):chart[key](options[key])))})}function configureEvents(dispatch,options){dispatch&&options&&angular.forEach(dispatch,function(value,key){void 0===options[key]||null===options[key]?scope._config.extended&&(options[key]=value.on):dispatch.on(key+"._",options[key])})}function configureWrapper(name){var _=nvd3Utils.deepExtend(defaultWrapper(name),scope.options[name]||{});scope._config.extended&&(scope.options[name]=_);var wrapElement=angular.element("<div></div>").html(_.html||"").addClass(name).addClass(_.className).removeAttr("style").css(_.css);_.html||wrapElement.text(_.text),_.enable&&("title"===name?element.prepend(wrapElement):"subtitle"===name?element.find(".title").after(wrapElement):"caption"===name&&element.append(wrapElement))}function configureStyles(){var _=nvd3Utils.deepExtend(defaultStyles(),scope.options.styles||{});scope._config.extended&&(scope.options.styles=_),angular.forEach(_.classes,function(value,key){value?element.addClass(key):element.removeClass(key)}),element.removeAttr("style").css(_.css)}function defaultWrapper(_){switch(_){case"title":return{enable:!1,text:"Write Your Title",className:"h4",css:{width:scope.options.chart.width+"px",textAlign:"center"}};case"subtitle":return{enable:!1,text:"Write Your Subtitle",css:{width:scope.options.chart.width+"px",textAlign:"center"}};case"caption":return{enable:!1,text:"Figure 1. Write Your Caption text.",css:{width:scope.options.chart.width+"px",textAlign:"center"}}}}function defaultStyles(){return{classes:{"with-3d-shadow":!0,"with-transitions":!0,gallery:!1},css:{}}}var defaultConfig={extended:!1,visible:!0,disabled:!1,autorefresh:!0,refreshDataOnly:!1,deepWatchData:!0,debounce:10};scope._config=angular.extend(defaultConfig,scope.config),scope.api={refresh:function(){scope.api.updateWithOptions(scope.options)},update:function(){scope.chart.update()},updateWithOptions:function(options){scope.api.clearElement(),angular.isDefined(options)!==!1&&scope._config.visible&&(scope.chart=nv.models[options.chart.type](),scope.chart.id=Math.random().toString(36).substr(2,15),angular.forEach(scope.chart,function(value,key){"_"===key[0]||["clearHighlights","highlightPoint","id","options","resizeHandler","state"].indexOf(key)>=0||("dispatch"===key?((void 0===options.chart[key]||null===options.chart[key])&&scope._config.extended&&(options.chart[key]={}),configureEvents(scope.chart[key],options.chart[key])):["bars","bars1","bars2","boxplot","bullet","controls","discretebar","distX","distY","interactiveLayer","legend","lines","lines1","lines2","multibar","pie","scatter","sparkline","stack1","stack2","sunburst","tooltip","x2Axis","xAxis","y1Axis","y2Axis","y3Axis","y4Axis","yAxis","yAxis1","yAxis2"].indexOf(key)>=0||"stacked"===key&&"stackedAreaChart"===options.chart.type?((void 0===options.chart[key]||null===options.chart[key])&&scope._config.extended&&(options.chart[key]={}),configure(scope.chart[key],options.chart[key],options.chart.type)):("xTickFormat"!==key&&"yTickFormat"!==key||"lineWithFocusChart"!==options.chart.type)&&(void 0===options.chart[key]||null===options.chart[key]?scope._config.extended&&(options.chart[key]=value()):scope.chart[key](options.chart[key])))}),scope.api.updateWithData(scope.data),(options.title||scope._config.extended)&&configureWrapper("title"),(options.subtitle||scope._config.extended)&&configureWrapper("subtitle"),(options.caption||scope._config.extended)&&configureWrapper("caption"),(options.styles||scope._config.extended)&&configureStyles(),nv.addGraph(function(){return scope.chart.resizeHandler&&scope.chart.resizeHandler.clear(),scope.chart.resizeHandler=nv.utils.windowResize(function(){scope.chart.update&&scope.chart.update()}),scope.chart},options.chart.callback))},updateWithData:function(data){data&&(scope.options.chart.transitionDuration=+scope.options.chart.transitionDuration||250,d3.select(element[0]).select("svg").remove(),d3.select(element[0]).append("svg").attr("height",scope.options.chart.height).attr("width",scope.options.chart.width||"100%").datum(data).transition().duration(scope.options.chart.transitionDuration).call(scope.chart))},clearElement:function(){if(element.find(".title").remove(),element.find(".subtitle").remove(),element.find(".caption").remove(),element.empty(),nv.graphs&&scope.chart)for(var i=nv.graphs.length-1;i>=0;i--)nv.graphs[i].id===scope.chart.id&&nv.graphs.splice(i,1);nv.tooltip&&nv.tooltip.cleanup&&nv.tooltip.cleanup(),scope.chart=null},getScope:function(){return scope}},scope.$watch("options",nvd3Utils.debounce(function(newOptions){!scope._config.disabled&&scope._config.autorefresh&&scope.api.refresh()},scope._config.debounce,!0),!0),scope.$watch("data",function(newData,oldData){newData!==oldData&&scope.chart&&!scope._config.disabled&&scope._config.autorefresh&&(scope._config.refreshDataOnly&&scope.chart.update?scope.chart.update():scope.api.refresh())},scope._config.deepWatchData),scope.$watch("config",function(newConfig,oldConfig){newConfig!==oldConfig&&(scope._config=angular.extend(defaultConfig,newConfig),scope.api.refresh())},!0),angular.forEach(scope.events,function(eventHandler,event){scope.$on(event,function(e){return eventHandler(e,scope)})}),element.on("$destroy",function(){scope.api.clearElement()})}}}]).factory("nvd3Utils",function(){return{debounce:function(func,wait,immediate){var timeout;return function(){var context=this,args=arguments,later=function(){timeout=null,immediate||func.apply(context,args)},callNow=immediate&&!timeout;clearTimeout(timeout),timeout=setTimeout(later,wait),callNow&&func.apply(context,args)}},deepExtend:function(dst){var me=this;return angular.forEach(arguments,function(obj){obj!==dst&&angular.forEach(obj,function(value,key){dst[key]&&dst[key].constructor&&dst[key].constructor===Object?me.deepExtend(dst[key],value):dst[key]=value})}),dst}}})}();