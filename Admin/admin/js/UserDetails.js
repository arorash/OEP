var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#user_details_k')[0]);

});

function ClassViewModel() {
    var self = this;
    var user = sessionStorage.getItem('userIds');
    self.basicdetail = ko.observableArray([]);
    self.otherdetails = ko.observableArray([]);
    self.education = ko.observableArray([]);
    self.otherdetails2 = ko.observableArray([]);
    self.work_exp = ko.observableArray([]);

    $.ajax({
        type: "POST",
        url: "UserData.aspx/admin_profile",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.id == 0) {
                location.href = "login.aspx";
            }
            else {
                if (user == null) {
                    location.href = "userprofile.html";
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "UserData.aspx/UserInfo",
                        data: "{'user_id':'" + user + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            var dd = msg.d.dob;
                            var i1 = dd.indexOf('(');
                            var i2 = dd.indexOf(')');
                            var d = new Date(parseInt(dd.slice(i1 + 1, i2 + 1)));
                            var d_d = d.toLocaleDateString().split('/');
                            if (parseInt(d_d[0]) < 10 && d_d[0].length < 2) {
                                d_d[0] = '0' + d_d[0];
                            }
                            if (parseInt(d_d[1]) < 10 && d_d[1].length < 2) {
                                d_d[1] = '0' + d_d[1];
                            }
                            var user_dob = d_d[1] + '-' + d_d[0] + '-' + d_d[2];

                            var job_loc = "";
                            var skills = "";
                            var domains = "";
                            var refer = "";
                            if (msg.d.job_a == null) {

                            }
                            else {
                                job_loc = msg.d.job_a.join();
                            }
                            if (msg.d.skill == null) {

                            }
                            else {
                                skills = msg.d.skill.join();
                            }
                            if (msg.d.domain == null) {

                            }
                            else {
                                domains = msg.d.domain.join();
                            }
                            if (msg.d.referred_by == null) {

                            }
                            else {
                                refer = msg.d.referred_by;
                            }

                            self.basicdetail.push({ name: msg.d.fullname, email: msg.d.email, phone: msg.d.phone });
                            self.otherdetails.push({ dob: user_dob, address: msg.d.address, gender: msg.d.gender });
                            self.otherdetails2.push({ job: job_loc, skill: skills, domain: domains, ref_by: refer });
                        },
                        error: function (msg) {

                        }
                    });

                    $.ajax({
                        type: "POST",
                        url: "UserData.aspx/Education",
                        data: "{'user_id':'" + user + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            for (var i = 0; i < msg.d.length; i++) {
                                self.education.push({ qual: msg.d[i].qualification, course: msg.d[i].course, univ: msg.d[i].university, pass: msg.d[i].pass_year, score: msg.d[i].score });
                            }
                        },
                        error: function (msg) {

                        }
                    });

                    $.ajax({
                        type: "POST",
                        url: "UserData.aspx/WorkExperience",
                        data: "{'user_id':'" + user + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            for (var i = 0; i < msg.d.length; i++) {
                                var fd = msg.d[i].from_date;
                                var i3 = fd.indexOf('(');
                                var i4 = fd.indexOf(')');
                                var f_d = new Date(parseInt(fd.slice(i3 + 1, i4 + 1)));
                                var fd_d = f_d.toLocaleDateString().split('/');
                                if (parseInt(fd_d[0]) < 10 && fd_d[0].length < 2) {
                                    fd_d[0] = '0' + fd_d[0];
                                }
                                if (parseInt(fd_d[1]) < 10 && fd_d[1].length < 2) {
                                    fd_d[1] = '0' + fd_d[1];
                                }
                                var f_date = fd_d[1] + '-' + fd_d[0] + '-' + fd_d[2];

                                var td = msg.d[i].to_date;
                                var i5 = td.indexOf('(');
                                var i6 = td.indexOf(')');
                                var t_d = new Date(parseInt(td.slice(i5 + 1, i6 + 1)));
                                var td_d = t_d.toLocaleDateString().split('/');
                                if (parseInt(td_d[0]) < 10 && td_d[0].length < 2) {
                                    td_d[0] = '0' + td_d[0];
                                }
                                if (parseInt(td_d[1]) < 10 && td_d[1].length < 2) {
                                    td_d[1] = '0' + td_d[1];
                                }
                                var t_date = td_d[1] + '-' + td_d[0] + '-' + td_d[2];

                                self.work_exp.push({ comp: msg.d[i].company_name, des: msg.d[i].disignation, from: f_date, to: t_date, team: msg.d[i].team, dis: msg.d[i].description, rep_to: msg.d[i].reporting_to, cont: msg.d[i].contact })
                            }
                        },
                        error: function (msg) {

                        }
                    });
                }


            }
        },
        error: function (msg) {

        }
    });

    self.logout = function () {
        $.ajax({
            type: "POST",
            url: "UserData.aspx/logout",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                window.location.replace('login.aspx');
            },
            error: function (msg) {
                alert("error");
            }
        });
    }
}