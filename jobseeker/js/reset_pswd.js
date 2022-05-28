var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#reset_pass')[0]);

});

function ClassViewModel() {
    var self = this;
    self.mess = ko.observable('');
    self.name = ko.observable('');
    self.image_s = ko.observable('');
    self.image_ss = ko.observable('');
    var user;

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
                    url: "reset.aspx/reset_token",
                    data: "{'user_id':'" + msg.d.session_token + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        alert("Token is send to your email.");

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

    self.submit = function () {
        var pswd = document.getElementById("new_pswd").value;
        var pswd1 = document.getElementById("conf_pswd").value;
        var enter_token = document.getElementById("token").value;
        if (pswd.length < 8) {
            alert("Enter the password of length greater than or equal to 8");
        }
        else if (pswd == pswd1) {
            $.ajax({
                type: "POST",
                url: "reset.aspx/get_token",
                data: "{'user_id':'" + user + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d.reset_pswd_token == enter_token) {
                        $.ajax({
                            type: "POST",
                            url: "reset.aspx/reset_pswd",
                            data: "{'user_id':'" + user + "','pass':'" + pswd + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                alert("Password reset successfully!");
                                location.href = "profile.html";
                            },
                            error: function (msg) {
                                alert("error");
                            }
                        });
                    }
                    else {
                        alert("enter the correct token");
                    }
                },
                error: function (msg) {
                    alert("error");
                }
            });
            
        }
        else {
            alert("Enter the same password in both input.")
        }
    }

    
}