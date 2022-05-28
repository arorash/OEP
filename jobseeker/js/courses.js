var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#courses_ko')[0]);

});

var user_sess;


function ClassViewModel() {
    var self = this;
    self.mess = ko.observable('');
    self.name = ko.observable('');
    self.image_s = ko.observable('');
    self.image_ss = ko.observable('');
    self.url = ko.observable('');
    self.csb = ko.observable('');
    var reg_done;

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
                user_sess = msg.d.session_token;
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
                    data: "{'user_id':'" + msg.d.session_token + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        reg_done = msg.d.registered;
                        if (msg.d.registered == 1) {
                            self.csb("Learn");
                            
                        }
                        else {
                            self.csb("Register");
                            
                        }

                    },
                    error: function (msg) { }
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

    self.registration = function () {
        if (reg_done == 1) {
            location.href = "cyber_security_basic.html";
        }
        else {
            $.ajax({
                type: "POST",
                url: "courses_c.aspx/cyber_Register",
                data: "{'user_id':'" + user_sess + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Registration Successfull.");
                    location.href = "cyber_security_basic.html";
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }
    }
}