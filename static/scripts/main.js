$(document).ready(function () {
    console.log("ready");
    var current_question = 1
    $("form").on("submit", function () {
        ////Store the submitted answer////
        //get the question number
        var current_q_number = current_question
        //get the checked radio button OR Text Area which represents the answer
        var current_answer = ""
        if (current_question < 59)
        {
            current_answer = $("input[name='answer']:checked").val()
        }
        else
        {
            if (current_question == 59) {
                current_answer = $("input[id='ti1']").val()
            }
            else if (current_question == 60) {
                current_answer = $("input[id='ti2']").val()
            }
            else if (current_question == 61) {
                current_answer = $("#ti3 option:selected").text();
            }
            else if (current_question == 62) {
                current_answer = $("#ti4 option:selected").text();
            }
            else if (current_question == 63) {
                current_answer = $("#ti5 option:selected").text();
            }
        }
            
        //get the session
        var ongoingsession = $("input[name='session']").val()
        //compund the results as such: session:question_number_answer
        var submittedanswer = ongoingsession + ':' + current_q_number
        //send it back to flask or in case the participant is done redirect to thank you page.
        if (current_question <= 62)
        {
            $.get(
            url = "storeresponse",
            data = { key: submittedanswer, value: current_answer, os: ongoingsession, sc: 'no' }
            //success = function (data) {
            //alert('page content: ' + data);
            //}
            );
        } else if (current_question == 63)
        {
            $.get(
            url = "storeresponse",
            data = { key: submittedanswer, value: current_answer, os: ongoingsession, sc: 'yes' }
            );
        }

        ////Move to the next question////


        //hide the current question if it is NOT two statements
        if (!(current_question >= 44 && current_question <= 58)) {
            $("div[id='" + current_question + "']").prop("hidden", true)
        }
        else {
            //If it is two statements, hide the b statement as well
            $("div[id='" + current_question + "']").prop("hidden", true)
            $("div[id='" + (current_question + 20) + "']").prop("hidden", true)
        }


        //Increment questions count and progress bar
        current_question = current_question + 1
        var percentage = (current_question / 63) * 100
        $('.progress-bar').css('width', percentage + '%').attr('aria-valuenow', current_question);
        //$("#prog-row .progress-bar").prop("aria-valuenow", percentage)
        //$("#prog-row .progress-bar").prop("style", "width:" + percentage + "%;")


        //show the next question and clear selection
        if (!(current_question >= 44 && current_question <= 58))
        {
            $("div[id='" + current_question + "']").prop("hidden", false)
        }
        else {
            //also display statement b for two statements questions
            $("div[id='" + current_question + "']").prop("hidden", false)
            $("div[id='" + (current_question + 20) + "']").prop("hidden", false)
        }
        $("input[name='answer']:checked").prop("checked", false)
        //display relevant answer choices/categories depending on the question range
        if (current_question <= 10)
        {
            $("#category-" + current_question).html('Information acquisition in <i>Organizational learning</i>');
        }
        if (current_question <= 15)
        {
            $("#category-" + current_question).html('Information distribution in <i>Organizational learning</i>');
        }
        else if (current_question <= 26)
        {
            if (current_question == 16)
            {
                $("div[id='alert1']").prop("hidden", false)
            }
            $("#category-" + current_question).html('Information interpretation in <i>Organizational learning</i> ');
            $("#a1").html('Not important at all');
            $("#a2").html('Not important');
            $("#a3").html('Neutral ');
            $("#a4").html('Important');
            $("#a5").html('Very important');
        }
        else if (current_question <= 34)
        {
            if (current_question == 27)
            {
                $("div[id='alert2']").prop("hidden", false)
            }
            $("#category-" + current_question).html('Behavioral and cognitive changes in <i>Organizational learning</i>');
            $("#a1").html('Substantial decline');
            $("#a2").html('Moderate decline');
            $("#a3").html('No change ');
            $("#a4").html('Moderate improvement');
            $("#a5").html('Substantial improvement ');
        }
        else if (current_question <= 37)
        {
            $("#category-" + current_question).html('Product and service (technical) innovations in <i>Innovativeness</i>');
            $("#a1").html('Strongly Disagree');
            $("#a2").html('Disagree');
            $("#a3").html('Neutral ');
            $("#a4").html('Agree');
            $("#a5").html('Strongly Agree');
        }
        else if (current_question <= 40)
        {
            $("#category-" + current_question).html('Process (administrative) innovations in <i>Innovativeness</i>');
            $("#a1").html('Strongly Disagree');
            $("#a2").html('Disagree');
            $("#a3").html('Neutral ');
            $("#a4").html('Agree');
            $("#a5").html('Strongly Agree');
        }
        else if (current_question <= 43)
        {
            $("#category-" + current_question).html('Innovativeness (innovative culture)  in <i>Innovativeness</i>');
            $("#a1").html('Strongly Disagree');
            $("#a2").html('Disagree');
            $("#a3").html('Neutral ');
            $("#a4").html('Agree');
            $("#a5").html('Strongly Agree');
        }
        else if (current_question <= 44)
        {
            $("div[id='twostatements']").prop("hidden", false)
            if (current_question == 44)
            {
                $("div[id='alert3']").prop("hidden", false)
            }
            $('.category-' + (current_question + 20)).html('Financial performance in <i>Organizational performance </i>');
            //$("#category-" + current_question+20).html('Financial performance in <i>Organizational performance </i>');
            $("#a1").html('Strongly Agree (A)');
            $("#a2").html('Agree (A)');
            $("#a3").html('Neutral ');
            $("#a4").html('Agree (B)');
            $("#a5").html('Strongly Agree (B)');
        }
        else if (current_question <= 56)
        {
            $('.category-' + (current_question + 20)).html('Non-financial performance (employees) in <i>Organizational performance </i>');
            //$("#category-" + current_question+20).html('Non-financial performance (employees) in <i>Organizational performance </i>');
            $("#a1").html('Strongly Agree (A)');
            $("#a2").html('Agree (A)');
            $("#a3").html('Neutral ');
            $("#a4").html('Agree (B)');
            $("#a5").html('Strongly Agree (B)');
        }
        else if (current_question <= 58)
        {
            $('.category-' + (current_question + 20)).html('Non-financial performance (customers) in <i>Organizational performance </i>');
            //$("#category-" + current_question+20).html('Non-financial performance (customers) in <i>Organizational performance </i>');
            $("#a1").html('Strongly Agree (A)');
            $("#a2").html('Agree (A)');
            $("#a3").html('Neutral ');
            $("#a4").html('Agree (B)');
            $("#a5").html('Strongly Agree (B)');
        }
        else if (current_question <= 63)
        {
            $("div[id='mc']").prop("hidden", true)
            $("div[id='textinputs1']").prop("hidden", true)
            $("div[id='textinputs2']").prop("hidden", true)
            $("div[id='textinputs3']").prop("hidden", true)
            $("div[id='textinputs4']").prop("hidden", true)
            $("div[id='textinputs5']").prop("hidden", true)

            $("#category-" + current_question).html('<p >GENERAL INFORMATION</p>');
            if (current_question == 59)
            {
                $("div[id='textinputs1']").prop("hidden", false)
            }
            else if (current_question == 60)
            {
                $("div[id='textinputs2']").prop("hidden", false)
            }
            else if (current_question == 61)
            {
                $("div[id='textinputs3']").prop("hidden", false)
            }
            else if (current_question == 62) {
                $("div[id='textinputs4']").prop("hidden", false)
            }
            else if (current_question == 63) {
                $("div[id='textinputs5']").prop("hidden", false)
            }
        }
        else
        {
            $("#finish").prop("hidden", false)
            $("#next").prop("hidden", true)
            $("#toprow").prop("hidden", true)
            $("div[id='mc']").prop("hidden", true)
            $("div[id='textinputs1']").prop("hidden", true)
            $("div[id='textinputs2']").prop("hidden", true)
            $("div[id='textinputs3']").prop("hidden", true)
            $("div[id='textinputs4']").prop("hidden", true)
            $("div[id='textinputs5']").prop("hidden", true)
        }
    });
});
