var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#course1_ko')[0]);

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
                user = msg.d.id;
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
                    data: "{'user_id':'" + msg.d.email + "'}",
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
                        if (msg.d.registered == null) {

                        }
                        else if (msg.d.registered == 1) {
                            if (msg.d.approved == 0) {
                                var div_cont1 = '<div style="height:10px;background-color:#24a0ed"></div>' +
                                    '<div style="padding-left:40px; margin-bottom:50px;">' +
                                    '<p style="font-size:39px; ">Registration</p>' +
                                    '<br />' +
                                    '<h3>You have been registered.</h3>' +
                                    '<h5>Wait for admin approval</h5>' +
                                    '<br />' +
                                    '<a href="courses.html"><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Back.</a>' +
                                    '</div >';
                                document.getElementById('content_div').innerHTML = div_cont1;
                            }
                            else if (msg.d.approved == 1) {
                                var div_cont2 = '<div class="col-md-10 col-xl-11 chat">' +
                                    '<div class="card" style="padding:40px;">' +
                                    '<h1 style="font-size:40px;">Digital Marketing Essential</h1>' +
                                    '<hr />' +
                                    '<div>' +
                                    '<h2 style = "font-weight:lighter; font-size:25px;color:blue;" > Email Marketing</h2>' +
                                    '<div style="padding:5px 30px;">' +
                                    '<a href="#" style="font-weight:100; font-size:18px;padding-bottom:20px;"><i style="color:red;" class="fab fa-youtube"></i> Email Marketing</a>' +
                                    '<br />' +
                                    '<a href="#" style="font-weight:100; font-size:18px;"><i style="color:red;" class="fas fa-file-pdf"></i> Click here to read more</a>' +
                                    '</div>' +
                                    '</div >' +
                                    '<hr />' +
                                    '<div>' +
                                    '<h2 style="font-weight:lighter; font-size:25px;color:blue;">Search Engine</h2>' +
                                    '<div style="padding:5px 30px;">' +
                                    '<a href="#" style="font-weight:100; font-size:18px;padding-bottom:20px;"><i style="color:red;" class="fab fa-youtube"></i> Search Engine</a>' +
                                    '<br />' +
                                    '<a href="#" style="font-weight:100; font-size:18px;"><i style="color:red;" class="fas fa-file-pdf"></i> Click here to read more</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '<hr />' +
                                    '<div>' +
                                    '<h2 style="font-weight:lighter; font-size:25px;color:blue;">Search Engine Optimisation</h2>' +
                                    '<div style="padding:5px 30px;">' +
                                    '<a href="#" style="font-weight:100; font-size:18px;padding-bottom:20px;"><i style="color:red;" class="fab fa-youtube"></i> Search Engine Optimisation</a>' +
                                    '<br />' +
                                    '<a href="#" style="font-weight:100; font-size:18px;"><i style="color:red;" class="fas fa-file-pdf"></i> Click here to read more</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                                document.getElementById('cont_div').innerHTML = div_cont2;
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
    

    self.register = function () {
        var d = new Date();
        var yr = d.getFullYear();
        var fname = $('#full_name').val();
        var email = $('#email').val();
        var phone = $('#phone_no').val();
        var college = $('#coll_name').val();
        var pass_yr = $('#pass_yr').val();
        var depart = $('#depart').val();
        
        if (fname == "") {
            alert("Enter the name.");
        }
        else if (email == "") {
            alert("Enter the email.");
        }
        else if (phone == "") {
            alert("Enter the phone number.");
        }
        else if (phone.length < 10 || phone.length > 10) {
            alert("Enter the phone number of length 10.");
        }
        else if (college == "") {
            alert("Enter the college name.");
        }
        else if (pass_yr == "") {
            alert("Enter the passing year.");
        }
        else if (parseInt(pass_yr) < yr - 30 || parseInt(pass_yr) > yr + 10) {
            alert("Enter the valid passing year.");
        }
        else if (depart == "") {
            alert("Enter the department.");
        }
        else {
            $.ajax({
                type: "POST",
                url: "courses_c.aspx/Course_Register",
                data: "{'fullname':'" + fname + "','email':'" + email + "','phone':'" + phone + "','college':'" + college + "','pass_yr':'" + pass_yr + "','depart':'" + depart + "','user_id':'" + user + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d == 0) {
                        alert("This email is already exist.");
                    }
                    else {
                        var div_cont = '<div style="height:10px;background-color:#24a0ed"></div>' +
                            '<div style="padding-left:40px; margin-bottom:50px;">' +
                            
                            '<p style="font-size:39px; ">Registration</p>' +
                            '<br />' +
                            '<h3>You have been registered.</h3>' +
                            '<h5>Wait for admin approval</h5>' +
                            '<br />' +
                            '<a href="courses.html"><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Back.</a>' +
                            '</div >';
                        document.getElementById('content_div').innerHTML = div_cont;
                    }
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }
    }
}