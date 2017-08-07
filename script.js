windowHeight = innerHeight;
windowWidth = innerWidth;
console.log(innerWidth);
var dataset = fillData(30, 10);

var svg = d3.select("body")
    .append("svg")
    .style("overflow", "visible");

var group = svg
    .selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(" + 0 + "," + i * (windowHeight / dataset.length - 1) + ")");

rect = group.selectAll("rect")
    .data(function (d) { return d })
    .enter().append("rect")
    .attr("x", function (d, i) { return i * windowWidth/30; })
    .attr("y", function (d, i) { return windowHeight / 10 - d; })
    .attr("width", windowWidth / 30 - 4)
    .attr("height", function (d, i) { return d; })
    .attr("fill", "teal");

rect.on("mouseenter", mouseEnterBehaviour);
rect.on("mouseleave", mouseLeaveBehaviour);

function mouseEnterBehaviour() {
    element = d3.select(this);
    groupTransform = d3.select(this.parentElement).attr("transform");
    groupY = groupTransform.substring(groupTransform.indexOf("(")+1, groupTransform.indexOf(")")).split(",")[1];
    element.attr("fill", d => "#" + ((1 << 24) * Math.random() | 0).toString(16))
        .transition()
        .delay(100)
        .duration(500)
        .style("color", "red")
        .attr("x", (Math.floor(Math.random() * ((windowWidth-100) - 1 + 1)) + 1))
        .attr("y", (Math.floor(Math.random() * ((windowHeight - groupY - element.attr("height") - 10) - (element.attr("y") - groupY) + 1)) + (element.attr("y") - groupY)));
}

function mouseLeaveBehaviour() {
    element = d3.select(this);
}

function fillData(columnQuantity, rowQuantity) {
    var array = new Array();
    for (var i = 0; i < rowQuantity; i++) {
        array[i] = new Array();
        for (var j = 0; j < columnQuantity; j++)
            array[i].push(Math.floor(Math.random() * (windowHeight / 10 - 1 + 1)) + 1);
    }
    return array;
}