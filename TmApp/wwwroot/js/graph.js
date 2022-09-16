function call_graph() {
    // create data
    var data = [
        ["January", 60],
        ["February", 18],
        ["March", 18],
        ["April", 90],
        ["May", 50],
        ["yes", 60],
        ["troi", 18],
        ["oui", 18],
        ["23", 90],
        ["24", 45],
        ["43", 22],
        ["47", 36],
        ["28", 87]
    ];

    // create a chart
    var chart = anychart.area();

    // create an area series and set the data
    var series = chart.area(data);

    // set scale mode
    chart.xScale().mode('continuous');


    // set the titles of the axes
    chart.xAxis().labels(false);
    chart.yAxis().labels(false);

    
    series.normal().fill("#333333", 1);
    series.normal().stroke("#FFFAF0", 0.4);

    // set the container id
    chart.container("container");

    chart.yScale().minimum(0)
    chart.yScale().maximum(100);
    // initiate drawing the chart
    chart.draw();
}