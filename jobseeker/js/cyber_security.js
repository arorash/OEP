var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#cyber_ko')[0]);

});

var user;
var quiz_score;

function ClassViewModel() {
    var self = this;
    self.mess = ko.observable('');
    self.name = ko.observable('');
    self.image_s = ko.observable('');
    self.image_ss = ko.observable('');
    self.perc = ko.observable('');
    
    $.ajax({
        type: "POST",
        url: "profile.aspx/profile_info",
        data: "{'user_email':'" + "" + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.email == null) {
                window.location = "../login.aspx";
            }
            else {
                user = msg.d.session_token;
                self.name(msg.d.fullname);
                var path;

                if (msg.d.profile_pic == null) {
                    if (msg.d.gender.toString().toLowerCase() == "male") {
                        path = 'img/' + 'me1.png';
                    }
                    else {
                        path = 'img/' + 'female1.png';
                    }
                }
                else {
                    path = '../upload/' + msg.d.profile_pic.toString();
                }


                self.image_s(path);
                self.image_ss(path);



                $.ajax({
                    type: "POST",
                    url: "profile.aspx/message",
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
                    url: "courses_c.aspx/check_registration",
                    data: "{'user_id':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        var score1 = msg.d.score1;
                        if (msg.d.registered == 0) {
                            location.href = "courses.html";
                        }
                        else if (msg.d.registered == 1) {
                            if (msg.d.count1 == 1) {
                                self.perc("0%");
                            }
                            else {
                                var percentage = (msg.d.count1 * 100) / 53;
                                var perc1 = percentage.toString().split('.')[0] + "%";
                                self.perc(perc1);
                            }

                            if (msg.d.count1 == 53) {
                                document.getElementById("cybersecurity_quiz1").style.color = "blue";
                            }
                            if (msg.d.score1 != null) {

                                quiz_score = msg.d.score1;
                                document.getElementById("quiz_scr").innerHTML = msg.d.score1 + "%";
                                if (parseInt(msg.d.score1) >= 50) {
                                    document.getElementById("result").innerHTML = "Pass";
                                    document.getElementById("certificate").style.color = "blue";
                                }
                                else {
                                    document.getElementById("result").innerHTML = "Fail";
                                }
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
            url: "profile.aspx/logout",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                window.location.replace('../login.aspx');
            },
            error: function (msg) {
                alert("error");
            }
        });
    }

    

    self.access = function (ids) {
        
        $.ajax({
            type: "POST",
            url: "courses_c.aspx/check_code",
            data: "{'user_id':'" + user + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var code = document.getElementById("code").value;
                if ((msg.d == code) && (msg.d != null)) {
                    $.ajax({
                        type: "POST",
                        url: "courses_c.aspx/save_token",
                        data: "{'user_id':'" + user + "','code':'" + code + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            $("#token_model").modal('hide');
                            
                        },
                        error: function (msg) {
                            alert("error");
                        }
                    });
                    
                }
                else {
                    alert("Wrong code....");
                }
            },
            error: function (msg) {
                alert("error");
            }
        });
    }
    
}

function link_click(ids) {
    $.ajax({
        type: "POST",
        url: "courses_c.aspx/check_registration",
        data: "{'user_id':'" + user + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            if (msg.d.registered == 1) {
                if (msg.d.generated_token == msg.d.token && msg.d.generated_token != null) {
                    var u = "Course_content/" + ids + ".html";
                    if (ids == "cybersecurity_quiz1") {
                        if (msg.d.count1 == 53) {
                            location.href = u;
                        }
                        else {
                            alert("First complete your course.");
                        }
                    }
                    else if (ids == "certificate") {
                        if (msg.d.score1 == null) {
                            alert("First attempt the quiz.")
                        }
                        else {
                            if (parseInt(quiz_score) >= 50) {
                                location.href = "Certificate.aspx";
                            }
                            else {
                                alert("You can't download certificate because your score is too low.");
                            }
                        }
                    }
                    else {
                        location.href = u;
                    }
                    
                    
                }
                else {
                    $("#token_model").modal('show');

                }

            }
        },
        error: function (msg) {
            alert("error");
        }
    });
}