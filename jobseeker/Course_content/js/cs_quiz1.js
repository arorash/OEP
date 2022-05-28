var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#cs_quiz1')[0]);

});

var q;
var n = 0;
var value = [];
var ans = 0;
var user;

function ClassViewModel() {
    var self = this;
    self.mess = ko.observable('');
    self.name = ko.observable('');
    self.image_s = ko.observable('');
    self.image_ss = ko.observable('');

    $.ajax({
        type: "POST",
        url: "../profile.aspx/profile_info",
        data: "{'user_email':'" + "" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.email == null) {
                window.location = "../../login.aspx";
            }
            else {
                user = msg.d.session_token;
                sessionStorage.setItem("user__id", user);
                self.name(msg.d.fullname);
                var path;

                if (msg.d.profile_pic == null) {
                    if (msg.d.gender.toString().toLowerCase() == "male") {
                        path = '../img/' + 'me1.png';
                    }
                    else {
                        path = '../img/' + 'female1.png';
                    }
                }
                else {
                    path = '../../upload/' + msg.d.profile_pic.toString();
                }


                self.image_s(path);
                self.image_ss(path);



                $.ajax({
                    type: "POST",
                    url: "../profile.aspx/message",
                    data: "{'user_id':'" + msg.d.session_token + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                        var count = 0;
                        for (var i = 0; i < msg.d.length; i++) {
                            if (parseInt(msg.d[i].seen) == 0) {
                                count++;
                            }
                        }
                        if (count != 0) {
                            var m = '(' + count.toString() + ')';
                            self.mess(m);
                        }

                    },
                    error: function (msg) { }
                });

                $.ajax({
                    type: "POST",
                    url: "../courses_c.aspx/check_registration",
                    data: "{'user_id':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        if (msg.d.registered == 0) {
                            location.href = "../courses.html";
                        }
                        else if (msg.d.registered == 1) {
                            if (msg.d.generated_token == msg.d.token && msg.d.generated_token != null) {
                                if (msg.d.count1 == 53) {
                                    $.ajax({
                                        type: "POST",
                                        url: "set_quiz.aspx/get_ques",
                                        data: {},
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (msg) {
                                            q = msg.d;
                                            document.getElementById("no_ques").innerHTML = q.length;
                                            $("#instruction").modal('show');
                                            document.getElementById("ques").innerHTML = (n + 1).toString() + ". " + q[0].question;
                                            document.getElementById("choice1").innerHTML = q[0].choice1;
                                            document.getElementById("choice2").innerHTML = q[0].choice2;
                                            document.getElementById("choice3").innerHTML = q[0].choice3;
                                            document.getElementById("choice4").innerHTML = q[0].choice4;
                                        },
                                        error: function (msg) {
                                            alert("error");
                                        }
                                    });

                                }
                                else {
                                    location.href = "../cyber_security_basic.html";
                                }
                            }
                            else {
                                location.href = "../cyber_security_basic.html";

                            }
                        }

                    },
                    error: function (msg) {
                        alert("error");
                    }
                });

            }
        },
        error: function (msg) { }
    });

    self.logout = function () {
        $.ajax({
            type: "POST",
            url: "../profile.aspx/logout",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                window.location.replace('../../login.aspx');
            },
            error: function (msg) {
                alert("error");
            }
        });
    }



}


function next() {
    var selected = "0";
    var ele = document.getElementsByName('choices');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            selected = ele[i].value;
    }
    if (n == value.length) {
        value.push(selected);
        if (selected == "0") {

        }
        else {
            ans = ans + 1;
        }
    }
    else {
        if (value[n] == "0" && selected != "0") {
            ans++;
        }
        value[n] = selected;
    }

    n = n + 1;
    if (n < q.length) {
        document.getElementById("ques").innerHTML = (n + 1).toString() + ". " + q[n].question;
        document.getElementById("choice1").innerHTML = q[n].choice1;
        document.getElementById("choice2").innerHTML = q[n].choice2;
        document.getElementById("choice3").innerHTML = q[n].choice3;
        document.getElementById("choice4").innerHTML = q[n].choice4;
        if (n < value.length) {
            if (value[n] == "0") {
                if (selected == "0") { }
                else {
                    document.getElementById(selected).checked = false;
                }
            }
            else {
                document.getElementById(value[n]).checked = true;
            }
        }
        else {
            if (selected == "0") { }
            else {
                document.getElementById(selected).checked = false;
            }
        }
        if (n == q.length - 1) {
            document.getElementById("next_btn").innerHTML = "Finish";
        }
        else {
            document.getElementById("next_btn").innerHTML = "Next";
        }
    }
    else {
        n = n - 1;
        
        document.getElementById("base_ans").innerHTML = ans.toString();
        document.getElementById("base_notans").innerHTML = (q.length - ans).toString();
        $("#confirm").modal('show');
    }
}

function previous() {
    var selected = "0";
    var ele = document.getElementsByName('choices');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            selected = ele[i].value;
    }
    if (n == value.length) {
        value.push(selected);
        if (selected == "0") {

        }
        else {
            ans = ans + 1;
        }
    }
    else {
        if (value[n] == "0" && selected != "0") {
            ans++;
        }
        value[n] = selected;
    }
    n = n - 1;
    if (n >= 0) {

        document.getElementById("ques").innerHTML = (n + 1).toString() + ". " + q[n].question;
        document.getElementById("choice1").innerHTML = q[n].choice1;
        document.getElementById("choice2").innerHTML = q[n].choice2;
        document.getElementById("choice3").innerHTML = q[n].choice3;
        document.getElementById("choice4").innerHTML = q[n].choice4;
        if (value[n] == "0") {
            if (value[n + 1] == "0") { }
            else {
                document.getElementById(value[n + 1]).checked = false;
            }
        }
        else {
            document.getElementById(value[n]).checked = true;
        }

        if (n == q.length - 1) {
            document.getElementById("next_btn").innerHTML = "Finish";
        }
        else {
            document.getElementById("next_btn").innerHTML = "Next";
        }
    }
    else {
        n = n + 1;
    }
}

function submit() {
    var correct = 0;
    for (i = 0; i < q.length; i++) {
        if (value[i] == q[i].answer) {
            correct++;
        }
    }
    var corr1 = parseInt(((correct * 100) / q.length).toString().split(".")[0])
    ajax_submit(corr1);

}

function percentageToDegrees(percentage) {

    return percentage / 100 * 360

}

function ajax_submit(corr) {
    $.ajax({
        type: "POST",
        url: "set_quiz.aspx/submit_score",
        data: "{'user_id':'" + user + "','correct':'" + corr + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var val = corr;
            $("#score_prog").each(function () {

                var left = $(this).find('.progress-left .progress-bar');
                var right = $(this).find('.progress-right .progress-bar');

                if (val > 0) {
                    if (val <= 50) {
                        right.css('transform', 'rotate(' + percentageToDegrees(val) + 'deg)')
                    } else {
                        right.css('transform', 'rotate(180deg)')
                        left.css('transform', 'rotate(' + percentageToDegrees(val - 50) + 'deg)')
                    }
                }

            });
            document.getElementById("percentage").innerHTML = val.toString() + '<sup class="small">%</sup>';
            if (val >= 50) {
                document.getElementById("scr_rslt").innerHTML = "Pass";
            }
            else {
                document.getElementById("scr_rslt").innerHTML = "Fail";
            }
            $("#result").modal('show');
        },
        error: function (msg) {
            alert("error");
        }
    });
}


