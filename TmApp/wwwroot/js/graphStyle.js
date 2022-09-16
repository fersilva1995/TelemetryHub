﻿function ReturnCssGraphs() {

    var string =
        ".sonDivHistory {" +
        "display: grid;" +
        "grid-template-columns: repeat(1, 100%);" +
        "justify-content: center;" +
        "margin-bottom: 10px;" +
        "}" +
        ".historyContainerDiv {" +
        "border-radius: 3px;" +
        "border: 3px solid #007bff75;" +
        "margin-top: 5px;" +
        "width: 100%;" +
        "}" +
        ".nameAndVariablesForGraph {" +
        "display: none;" +
        "}" +
        ".sliderDiv {" +
        "border-top: 3px solid #007bff75;" +
        "height: 120px;" +
        "}" +
        ".divDateInputLocalLeft {" +
        "float: left;" +
        "border: 2px solid #bbccee;" +
        "background-color: #f4f6f9;" +
        "margin-left: 20px;" +
        "height: 31px;" +
        "margin: 10px;" +
        "}" +
        ".divDateInputLocalRight {" +
        "float: right;" +
        "border: 2px solid #bbccee;" +
        "background-color: #f4f6f9;" +
        "margin-left: 20px;" +
        "height: 31px;" +
        "margin: 10px;" +
        "}" +
        ".parent-slider-container {" +
        "margin-left: auto;" +
        "margin-right: auto;" +
        "width: 96 %;" +
        "margin-top: 50px;" +
        "}" +
        ".localSliderDiv {" +
        "height: 20px;" +
        "margin-top: 10px;" +
        "width: 100 %;" +
        "}" +
        ".slider-container {" +
        "position: relative;" +
        "height: 20px;" +
        "background-color: #f2f2f9;" +
        "}" +
        ".dateLocalStyle {" +
        "display: flex;" +
        "justify-content: space-between;" +
        "margin: 20px 10px 14px 10px;" +
        "}" +
        ".inputSelectedDateLocal {" +
        "border: 2px solid #92aee4;" +
        "text-align: center;" +
        "font-size: smaller;" +
        "margin-top: -12px;" +
        "border-radius: 4px;" +
        "}" +
        ".historyContainerTable {" +
        "display: flex;" +
        "flex-direction: column;" +
        "justify-content: center;" +
        "}" +
        ".historyTitle {" +
        "align-self: center;" +
        "display: flex;" +
        "justify-content: center;" +
        "}" +
        ".mainDivhistoryData {" +
        "display: flex;" +
        "justify-content: space-between;" +
        "border-top: 3px solid #7fbbfb;" +
        "}" +
        ".historyYMaxValue {" +
        "position: relative;" +
        "left: 20px;" +
        "top: 14px;" +
        "}" +
        ".historyYMinValue {" +
        "position: relative;" +
        "top: 15px;" +
        "left: 20px;" +
        "}" +
        ".historyYaxisTop {" +
        "position: relative;" +
        "margin-top: -185px;" +
        "left: 20px;" +
        "margin-right: 30px;" +
        "}" +
        ".historyYaxisMiddle {" +
        "position: relative;" +
        "margin-top: 42px;" +
        "left: 20px;" +
        "}" +
        ".historyYaxisBottom {" +
        "position: relative;" +
        "margin-top: 44px;" +
        "left: 20px;" +
        "}" +
        ".historyYMaxFixed {" +
        "display: none;" +
        "}" +
        ".historyYMinFixed {" +
        "display: none;" +
        "}"
        ;

    return string;
}

function ReturnCssBars() {
    var link = '<link rel="stylesheet" href="https://rawgit.com/MasterMaps/d3-slider/master/d3.slider.css">';
    return link;
}

function returnJsBars() {
    var linkJs = '<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>';
    return linkJs;
}

function returnBarJsMinifyBard() {
    var string = '<script>!function(t,e){"function"==typeof define&&define.amd?define(["d3"],e):"object"==typeof exports?(process.browser&&require("./d3.slider.css"),module.exports=e(require("d3"))):t.d3.slider=e(t.d3)}(this,function(t){return function(){"use strict";var e,n,r,a,i,o,l=0,s=100,d=.01,c=!0,f="horizontal",h=!1,u=50,v=1,g=!1,p=t.dispatch("slide","slideend"),y=t.format(".2%"),m=t.format(".0"),x=null;function b(d){d.each(function(){n||(n=t.scale.linear().domain([l,s])),e=e||n.domain()[0];var d=t.select(this).classed("d3-slider d3-slider-"+f,!0),c=t.behavior.drag();if(c.on("dragend",function(){p.slideend(t.event,e)}),"array"==z(e)&&2==e.length?(a=d.append("a").classed("d3-slider-handle",!0).attr("xlink:href","#").attr("id","handle-one").on("click",q).call(c),x=d.append("a").classed("d3-slider-handle",!0).attr("id","handle-two").attr("xlink:href","#").on("click",q).call(c)):a=d.append("a").classed("d3-slider-handle",!0).attr("xlink:href","#").attr("id","handle-one").on("click",q).call(c),"horizontal"===f){if(d.on("click",function(){if("array"!=z(e)){var r=Math.max(0,Math.min(o,t.event.offsetX||t.event.layerX));k(n.invert?M(n.invert(r/o)):w(r/o))}}),"array"==z(e)&&2==e.length){i=t.select(this).append("div").classed("d3-slider-range",!0),a.style("left",y(n(e[0]))),i.style("left",y(n(e[0]))),c.on("drag",E);var g=100-parseFloat(y(n(e[1])));x.style("left",y(n(e[1]))),i.style("right",g+"%"),c.on("drag",E)}else a.style("left",y(n(e))),c.on("drag",E);o=parseInt(d.style("width"),10)}else{if(d.on("click",function(){if("array"!=z(e)){var r=o-Math.max(0,Math.min(o,t.event.offsetY||t.event.layerY));k(n.invert?M(n.invert(r/o)):w(r/o))}}),c.on("drag",F),"array"==z(e)&&2==e.length){i=t.select(this).append("div").classed("d3-slider-range-vertical",!0),a.style("bottom",y(n(e[0]))),i.style("bottom",y(n(e[0]))),c.on("drag",F);var b=100-parseFloat(y(n(e[1])));x.style("bottom",y(n(e[1]))),i.style("top",b+"%"),c.on("drag",F)}else a.style("bottom",y(n(e))),c.on("drag",F);o=parseInt(d.style("height"),10)}function E(){"handle-one"===t.event.sourceEvent.target.id?v=1:"handle-two"==t.event.sourceEvent.target.id&&(v=2);var e=Math.max(0,Math.min(o,t.event.x));k(n.invert?M(n.invert(e/o)):w(e/o))}function F(){"handle-one"===t.event.sourceEvent.target.id?v=1:"handle-two"==t.event.sourceEvent.target.id&&(v=2);var e=o-Math.max(0,Math.min(o,t.event.y));k(n.invert?M(n.invert(e/o)):w(e/o))}function q(){t.event.stopPropagation()}h&&function(e){"boolean"==typeof h&&(h=t.svg.axis().ticks(Math.round(o/100)).tickFormat(m).orient("horizontal"===f?"bottom":"right"));r=n.ticks?n.copy().range([0,o]):n.copy().rangePoints([0,o],.5),h.scale(r);var a=e.append("svg").classed("d3-slider-axis d3-slider-axis-"+h.orient(),!0).on("click",q),i=a.append("g");"horizontal"===f?(a.style("margin-left",-u+"px"),a.attr({width:o+2*u,height:u}),"top"===h.orient()?(a.style("top",-u+"px"),i.attr("transform","translate("+u+","+u+")")):i.attr("transform","translate("+u+",0)")):(a.style("top",-u+"px"),a.attr({width:u,height:o+2*u}),"left"===h.orient()?(a.style("left",-u+"px"),i.attr("transform","translate("+u+","+u+")")):i.attr("transform","translate(0,"+u+")"));i.call(h)}(d)})}function k(r){var o="array"==z(e)&&2==e.length?e[v-1]:e,l=y(n(M(o))),s=y(n(M(r))),d="horizontal"===f?"left":"bottom";if(l!==s){if("array"==z(e)&&2==e.length?(e[v-1]=r,t.event&&p.slide(t.event,e)):t.event&&p.slide(t.event.sourceEvent||t.event,e=r),e[0]>=e[1])return;if(1===v)"array"==z(e)&&2==e.length&&("left"===d?i.style("left",s):i.style("bottom",s)),c?a.transition().styleTween(d,function(){return t.interpolate(l,s)}).duration("number"==typeof c?c:250):a.style(d,s);else{var h=100-parseFloat(s),u=100-parseFloat(s);"left"===d?i.style("right",h+"%"):i.style("top",u+"%"),c?x.transition().styleTween(d,function(){return t.interpolate(l,s)}).duration("number"==typeof c?c:250):x.style(d,s)}}}function M(t){if(t===n.domain()[0]||t===n.domain()[1])return t;var e=t;if(g)e=w(n(t));else{var r=(t-n.domain()[0])%d;e=t-r,2*Math.abs(r)>=d&&(e+=r>0?d:-d)}return e}function w(t){var e=n.ticks?n.ticks():n.domain(),r=e.map(function(e){return t-n(e)}),a=-1,i=0,o=n.ticks?n.range()[1]:n.rangeExtent()[1];do{a++,Math.abs(r[a])<o&&(o=Math.abs(r[a]),i=a)}while(r[a]>0&&a<r.length-1);return e[i]}function z(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}return b.min=function(t){return arguments.length?(l=t,b):l},b.max=function(t){return arguments.length?(s=t,b):s},b.step=function(t){return arguments.length?(d=t,b):d},b.animate=function(t){return arguments.length?(c=t,b):c},b.orientation=function(t){return arguments.length?(f=t,b):f},b.axis=function(t){return arguments.length?(h=t,b):h},b.margin=function(t){return arguments.length?(u=t,b):u},b.value=function(t){return arguments.length?(e&&k(M(t)),e=t,b):e},b.snap=function(t){return arguments.length?(g=t,b):g},b.scale=function(t){return arguments.length?(n=t,b):n},t.rebind(b,p,"on"),b}});' +
        '</script>';

    return string;
}
