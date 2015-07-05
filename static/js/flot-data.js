//Flot Line Chart
$(document).ready(function() {
    console.log("document ready");
    var offset = 0;
    //plot();

    function plot() {
        var sin = [],
            cos = [];
        for (var i = 0; i < 12; i += 0.2) {
            sin.push([i, Math.sin(i + offset)]);
            cos.push([i, Math.cos(i + offset)]);
        }

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            grid: {
                hoverable: true //IMPORTANT! this is needed for tooltip to work
            },
            yaxis: {
                min: -1.2,
                max: 1.2
            },
            tooltip: true,
            tooltipOpts: {
                content: "'%s' of %x.1 is %y.4",
                shifts: {
                    x: -60,
                    y: 25
                }
            }
        };

    }

    for (var i = 1; i < 59; i++)
    {
        plot_answers(i);
    }
    
});


function plot_answers(number) {
    //variables that represent the answeres
    var tick1, tick2, tick3, tick4, tick5, lab;
    var count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;
    var tick6 = 'Do Not Know';
    //increment counter for each statement
    for (var f = 0; f < all_data.length; f++) {
        if (all_data[f][number] == 1){
            count1++;
        }
        else if (all_data[f][number] == 2){
            count2++;
        }
        else if (all_data[f][number] == 3) {
            count3++;
        }
        else if (all_data[f][number] == 4) {
            count4++;
        }
        else if (all_data[f][number] == 5) {
            count5++;
        }
        else if (all_data[f][number] == 6) {
            count6++;
        }
    }

    //determine correct label for answers
    if (number <= 10) {
        lab = '  Information acquisition in <i>Organizational learning</i>';
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
    }
    if (number <= 15) {
        lab = '  Information distribution in <i>Organizational learning</i>';
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
    }
    else if (number <= 26) {
        lab = '  Information interpretation in <i>Organizational learning</i> ';
        tick1 = 'Not important at all';
        tick2 = 'Not important';
        tick3 = 'Neutral ';
        tick4 = 'Important';
        tick5 = 'Very important';
    }
    else if (number <= 34) {
        lab = '  Behavioral and cognitive changes in <i>Organizational learning</i>';
        tick1 = 'Substantial decline';
        tick2 = 'Moderate decline';
        tick3 = 'No change ';
        tick4 = 'Moderate improvement';
        tick5 = 'Substantial improvement ';
    }
    else if (number <= 37) {
        lab = '  Product and service (technical) innovations in <i>Innovativeness</i>';
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
    }
    else if (number <= 40) {
        lab = '  Process (administrative) innovations in <i>Innovativeness</i>';
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
    }
    else if (number <= 43) {
        lab = '  Process (administrative) innovations in <i>Innovativeness</i>';
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
    }
    else if (number <= 44) {
        lab = '  Financial performance in <i>Organizational performance </i>';
        tick1 = 'Strongly Agree (A)';
        tick2 = 'Agree (A)';
        tick3 = 'Neutral ';
        tick4 = 'Agree (B)';
        tick5 = 'Strongly Agree (B)';
    }
    else if (number <= 56) {
        lab = '  Non-financial performance (employees) in <i>Organizational performance </i>';
        tick1 = 'Strongly Agree (A)';
        tick2 = 'Agree (A)';
        tick3 = 'Neutral ';
        tick4 = 'Agree (B)';
        tick5 = 'Strongly Agree (B)';
    }
    else if (number <= 58) {
        lab = '  Non-financial performance (customers) in <i>Organizational performance </i>';
        tick1 = 'Strongly Agree (A)';
        tick2 = 'Agree (A)';
        tick3 = 'Neutral ';
        tick4 = 'Agree (B)';
        tick5 = 'Strongly Agree (B)';
    }

    var barOptions = {
        series: {
            bars: {
                show: true,
                barWidth: 0.5,
                align: "center"
            }
        },
        xaxis: {
            ticks: [[0, tick1], [1, tick2], [2, tick3], [3, tick4], [4, tick5], [5, tick6]],
            axisLabel: "Responses",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        yaxis: {
            axisLabel: "Participents",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 3,
            tickSize: 1,
            minTickSize: 1
        },
        legend: {
            noColumns: 0,
            labelBoxBorderColor: "#000000",
            position: "nw"
        },
        grid: {
            hoverable: true,
            borderWidth: 2,
            backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
        },
        tooltip: true
    };
    //
    var barData = {
        label: lab,
        data: [
            [0, count1],
            [1, count2],
            [2, count3],
            [3, count4],
            [4, count5],
            [5, count6]
        ],
        color: "#5482FF"
    };
    
    $.plot($("#statement-"+number), [barData], barOptions);
}

var previousPoint = null, previousLabel = null;

//alert(number_of_responses)
//for (var i = 0; i < number_of_responses ; i++) {
//    barData[i] = {
//        label: i,
//        data: [
//            [1, all_data[i][0]],
//            [2, all_data[i][0]],
//            [3, all_data[i][0]],
//            [4, all_data[i][0]],
//            [5, all_data[i][0]],
//            [6, all_data[i][0]],
//            [7, all_data[i][0]],

//        ]
//    }
//}

//alert(barData[0])
//    [
//    {
//        label: "P1",
//        data: [
//            [1, all_data[0][0]],
//            [2, all_data[0][1]],
//            [3, all_data[0][2]],
//            [4, all_data[0][3]],
//            [5, all_data[0][4]],
//            [6, all_data[0][5]]
//    ]
//    },
//    {
//        label: "P2",
//        data: [
//            [1, all_data[1][0]],
//            [2, all_data[1][1]],
//            [3, all_data[1][2]],
//            [4, all_data[1][3]],
//            [5, all_data[1][4]],
//            [6, all_data[1][5]]
//        ]
//    }
//];
//barOptions

//var yVal1 = all_data[0][0];
//var yVal2 = all_data[0][1];
//var dataum1 = [xVal, yVal1];
//var dataum2 = [xVal, yVal2];
//barData[0].push(dataum1);
//barData[1].push(dataum2);
//xVal++;
//plot.setData(barData);
// plot.setupGrid();
// plot.draw();


//t = all_data.length;
//alert(all_data)
//barData = []
//count = 1
//while (t >= 0) {
//    for (var i = 1; i <= 116; i++) {
//        if (i % 2 == 0) {
//            barData = barData.push([all_data[t][i - 1], all_data[t][i]]);
//        }
//    }
//    t--;
//}
////alert(barData);
////alert(all_data);
//var plot = $.plot($("#flot-bar-chart"), [barData]);
//var number_of_responses = all_data.length;

//xVal = 0
//for (var i = 0; i < number_of_responses ; i++) {
//    for (var r = 0; r < 56; r++) {
//        var yVal1 = all_data[i][r];
//        xVal = i;
//        var dataum1 = [xVal, yVal1];
//        alert(dataum1);
//        barData[i].push(dataum1);
//        alert(barData[i]);
//        plot.setData(barData);
//        plot.setupGrid();
//        plot.draw();
//    }
//}