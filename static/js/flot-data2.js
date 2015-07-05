//Flot Line Chart
$(document).ready(function() {
    console.log("document ready");
    var offset = 0;

    for (var i = 1; i < 11; i++)
    {
        plot_answers(i);
        $("#index-" + i).showMemo(i);
    }
    
});



// Flot Pie Chart with Tooltips
function plot_answers(number) {
    //variables that represent the answeres
    var tick1, tick2, tick3, tick4, tick5, lab;
    var count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;
    var tick6 = 'Do Not Know';
    var end_qs_in_index = 0, start_qs_in_index = 0;

    //determine correct index for answers
    if (number == 1) {
        $("#s1").html('Index 1.1: Information acquisition');
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
        start_qs_in_index = 1;
        end_qs_in_index = 10;
    }
    if (number == 2) {
        $("#s2").html('Index 1.2: Information distribution');
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
        start_qs_in_index = 11;
        end_qs_in_index = 15;
    }
    else if (number == 3) {
        $("#s3").html('Index 1.3: Information interpretation');
        tick1 = 'Not important at all';
        tick2 = 'Not important';
        tick3 = 'Neutral ';
        tick4 = 'Important';
        tick5 = 'Very important';
        start_qs_in_index = 16;
        end_qs_in_index = 26;
    }
    else if (number == 4) {
        $("#s4").html('Index 1.4: Behavioral and cognitive changes');
        tick1 = 'Substantial decline';
        tick2 = 'Moderate decline';
        tick3 = 'No change ';
        tick4 = 'Moderate improvement';
        tick5 = 'Substantial improvement ';
        start_qs_in_index = 27;
        end_qs_in_index = 34;
    }
    else if (number == 5) {
        $("#s5").html('Index 2.1: Product and service (technical) innovations');
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
        start_qs_in_index = 35;
        end_qs_in_index = 37;
    }
    else if (number == 6) {
        $("#s6").html('Index 2.2: Process (administrative) innovations');
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
        start_qs_in_index = 38;
        end_qs_in_index = 40;
    }
    else if (number == 7) {
        $("#s7").html('Index 2.3: Innovativeness (innovative culture)');
        tick1 = 'Strongly Disagree';
        tick2 = 'Disagree';
        tick3 = 'Neutral ';
        tick4 = 'Agree';
        tick5 = 'Strongly Agree';
        start_qs_in_index = 41;
        end_qs_in_index = 43;
    }
    else if (number == 8) {
        $("#s8").html('Index 3.1: Financial performance');
        tick1 = 'Strongly Agree (A)';
        tick2 = 'Agree (A)';
        tick3 = 'Neutral ';
        tick4 = 'Agree (B)';
        tick5 = 'Strongly Agree (B)';
        start_qs_in_index = 44;
        end_qs_in_index = 44;
    }
    else if (number == 9) {
        $("#s9").html('Index 3.2: Non-financial performance (employees)');
        tick1 = 'Strongly Agree (A)';
        tick2 = 'Agree (A)';
        tick3 = 'Neutral ';
        tick4 = 'Agree (B)';
        tick5 = 'Strongly Agree (B)';
        start_qs_in_index = 45;
        end_qs_in_index = 56;
    }
    else if (number == 10) {
        $("#s10").html('Index 3.3: Non-financial performance (customers)');
        tick1 = 'Strongly Agree (A)';
        tick2 = 'Agree (A)';
        tick3 = 'Neutral ';
        tick4 = 'Agree (B)';
        tick5 = 'Strongly Agree (B)';
        start_qs_in_index = 57;
        end_qs_in_index = 58;
    }

    //increment counter for each index

    for (var f = 0; f < all_data.length; f++) {
        for (var y = start_qs_in_index; y <= end_qs_in_index; y++) {
            if (all_data[f][y] == 1) {
                count1++;
            }
            else if (all_data[f][y] == 2) {
                count2++;
            }
            else if (all_data[f][y] == 3) {
                count3++;
            }
            else if (all_data[f][y] == 4) {
                count4++;
            }
            else if (all_data[f][y] == 5) {
                count5++;
            }
            else if (all_data[f][y] == 6) {
                count6++;
            }
        }
    }

    var pieOptions = {
        series: {
            pie: {
                show: true,
                label: {
                    show: true,
                    radius: .8,
                    formatter: function (label, series) {
                        return '<div style="border:1px solid grey;font-size:8pt;text-align:center;padding:5px;color:white;">' +
                        label + ' : ' +
                        Math.round(series.percent) +
                        '%</div>';
                    },
                    background: {
                        opacity: 0.8,
                        color: '#000'
                    }
                },
                grid: {
                    hoverable: true
                }
            }
        },
        tooltip: true
    };
    //
    var dataSet = [
    { label: tick1, data: count1, color: "#005CDE" },
    { label: tick2, data: count2, color: "#00A36A" },
    { label: tick3, data: count3, color: "#7D0096" },
    { label: tick4, data: count4, color: "#992B00" },
    { label: tick5, data: count5, color: "#DE000F" },
    { label: tick6, data: count6, color: "#ED7B00" }
    ];

    //var pieData = {
    //    label: lab,
    //    data: [
    //        [tick1, count1],
    //        [tick2, count2],
    //        [tick3, count3],
    //        [tick4, count4],
    //        [tick5, count5],
    //        [tick6, count6]
    //    ]
    //    //color: "#5482FF"
    //};
    
    $.plot($("#index-"+number), dataSet, pieOptions);
}

$.fn.showMemo = function (i) {
    $(this).bind("plothover", function (event, pos, item) {
        if (!item) { return; }

        var html = [];
        var percent = parseFloat(item.series.percent).toFixed(2);

        html.push("<div style=\"border:1px solid grey;background-color:",
             item.series.color,
             "\">",
             "<span style=\"color:white\">",
             item.series.label,
             " : ",
             $.formatNumber(item.series.data[0][1], { format: "#,###", locale: "us" }),
             " (", percent, "%)",
             "</span>",
             "</div>");
        $("#memo-"+i).html(html.join(''));
    });
}