
var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();
    
    ko.applyBindings(mainVM, $('#profile_page')[0]);
    
});

function uploadFiles(formdata) {

    $.ajax({
        url: "/api/FileUpload/uploadFiles",
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (msg) {
            alert("Update Successfully!!!");
            window.location.reload();
        },
        error: function (msg) {
            alert("error");
        }
    })
   
}


var img;


function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        
        reader.onload = function (e) {

            $('.file-upload-image').attr('src', e.target.result);
            window.img = e.target.result;
            
        };

        document.getElementById("upd_pic").disabled = false;
        reader.readAsDataURL(input.files[0]);
    }
}

function ClassViewModel() {
    var self = this;
    var user,user_email;
    var ed_index;
    var education,work;

    self.name = ko.observable('');
    self.add = ko.observable('');
    self.nav_name = ko.observable('');
    self.hello_name = ko.observable('');

    self.fullname = ko.observable('');
    self.email = ko.observable('');
    self.dob = ko.observable('');
    self.gender = ko.observable('');
    self.referred = ko.observable('');
    self.useraddress = ko.observable('');
    self.mobileno = ko.observable('');
    self.altno = ko.observable('');
    self.whatsappno = ko.observable('');
    self.education = ko.observableArray([]);
    self.work_exp = ko.observableArray([]);
    self.job_list = ko.observableArray([]);
    self.skill_list = ko.observableArray([]);
    self.qualif = ko.observable('');
    self.crs = ko.observable('');
    self.uni = ko.observable('');
    self.pyr = ko.observable('');
    self.scr = ko.observable('');
    self.imagePath = ko.observable('');
    self.imagePath_s = ko.observable('');
    self.imagePath_ss = ko.observable('');
    self.more_job_loc = ko.observable('');
    self.more_skill_loc = ko.observable('');
    self.domain_list = ko.observableArray([]);
    self.more_domain_loc = ko.observable('');
    self.Cname = ko.observable('');
    self.des = ko.observable('');
    self.fr = ko.observable('');
    self.too = ko.observable('');
    self.tm = ko.observable('');
    self.dis = ko.observable('');
    self.rep_to = ko.observable('');
    self.con = ko.observable('');
    self.mess = ko.observable('');
    self.higher_edu = ko.observable('');

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
                user_email = msg.d.email;
                self.name(msg.d.fullname);
                self.add(msg.d.address);
                self.hello_name(msg.d.fullname);
                self.nav_name(msg.d.fullname);

                self.fullname(msg.d.fullname);
                self.email(msg.d.email);

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
                self.dob(d_d[2] + '-' + d_d[0] + '-' + d_d[1]);

                
                self.gender(msg.d.gender);
                self.useraddress(msg.d.address);
                self.mobileno(msg.d.phone);
                self.altno(msg.d.alternate_no);
                self.whatsappno(msg.d.whatsapp_no);
                self.referred(msg.d.referred_by);
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

                self.imagePath(path);
                self.imagePath_s(path);
                self.imagePath_ss(path);



                var job_loc = msg.d.job_a;
                if (job_loc == null) { }
                else {
                    for (var k = 0; k < job_loc.length; k++) {
                        self.job_list.push({ job_list_c: job_loc[k] });
                    }
                }
                var skill_s = msg.d.skill;
                if (skill_s == null) { }
                else {
                    for (var k = 0; k < skill_s.length; k++) {
                        self.skill_list.push({ skill_list_c: skill_s[k] });
                    }
                }
                var domain_s = msg.d.domain;
                if (domain_s == null) { }
                else {
                    for (var k = 0; k < domain_s.length; k++) {
                        self.domain_list.push({ domain_list_c: domain_s[k] });
                    }
                }

                $.ajax({
                    type: "POST",
                    url: "profile.aspx/message",
                    data: "{'user_id':'" + user + "'}",
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
                    url: "profile.aspx/profile_info_ed",
                    data: "{'user_id':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        education = msg.d;
                        for (var i = 0; i < education.length; i++) {
                            var ed_id = "education_" + i.toString();

                            self.education.push({
                                qual: education[i].qualification, course: education[i].course, univ: education[i].university, pyear: education[i].pass_year, percentage: education[i].score, edit_act1: '<i class="fas fa-edit"></i>', edu_ids: ed_id, edit_edu: function (s) {
                                    var str = s.slice(10);
                                    ed_index = parseInt(str);
                                    self.qualif(education[ed_index].qualification);
                                    self.uni(education[ed_index].university);
                                    self.crs(education[ed_index].course);
                                    self.pyr(education[ed_index].pass_year);
                                    self.scr(education[ed_index].score);
                                }
                            });
                        }
                        var high_ed = education[0].course.toUpperCase() + ", " + education[0].university.toUpperCase();
                        self.higher_edu(high_ed);

                    },
                    error: function (msg) { }
                });
                $.ajax({
                    type: "POST",
                    url: "profile.aspx/profile_info_work",
                    data: "{'user_id':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        work = msg.d;
                        for (var j = 0; j < work.length; j++) {
                            var we_id = "work_experience_" + j.toString();
                            var f_d = work[j].from_date;
                            var i3 = f_d.indexOf('(');
                            var i4 = f_d.indexOf(')');
                            var fd = new Date(parseInt(f_d.slice(i3 + 1, i4 + 1)));
                            var fd_d = fd.toLocaleDateString().split('/');
                            if (parseInt(fd_d[0]) < 10 && fd_d[0].length < 2) {
                                fd_d[0] = '0' + fd_d[0];
                            }
                            if (parseInt(fd_d[1]) < 10 && fd_d[1].length < 2) {
                                fd_d[1] = '0' + fd_d[1];
                            }

                            var t_d = work[j].to_date;
                            var i5 = t_d.indexOf('(');
                            var i6 = t_d.indexOf(')');
                            var td = new Date(parseInt(t_d.slice(i5 + 1, i6 + 1)));
                            var td_d = td.toLocaleDateString().split('/');
                            if (parseInt(td_d[0]) < 10 && td_d[0].length < 2) {
                                td_d[0] = '0' + td_d[0];
                            }
                            if (parseInt(td_d[1]) < 10 && td_d[1].length < 2) {
                                td_d[1] = '0' + td_d[1];
                            }


                            self.work_exp.push({
                                company: work[j].company_name, desig: work[j].disignation, from: fd_d[1] + '-' + fd_d[0] + '-' + fd_d[2], to: td_d[1] + '-' + td_d[0] + '-' + td_d[2], team: work[j].team, disc: work[j].description, report: work[j].reporting_to, contact: work[j].contact, edit_act2: '<i class="fas fa-edit"></i>', work_ids: we_id, edit_we: function (s) {
                                    var str = s.slice(16);
                                    we_index = parseInt(str);

                                    var f_d1 = work[we_index].from_date;
                                    var i6 = f_d1.indexOf('(');
                                    var i7 = f_d1.indexOf(')');
                                    var fd1 = new Date(parseInt(f_d1.slice(i6 + 1, i7 + 1)));
                                    var fd_d1 = fd1.toLocaleDateString().split('/');
                                    if (parseInt(fd_d1[0]) < 10) {
                                        fd_d1[0] = '0' + fd_d1[0];
                                    }
                                    if (parseInt(fd_d1[1]) < 10) {
                                        fd_d1[1] = '0' + fd_d1[1];
                                    }

                                    var t_d1 = work[we_index].to_date;
                                    var i8 = t_d.indexOf('(');
                                    var i9 = t_d.indexOf(')');
                                    var td1 = new Date(parseInt(t_d1.slice(i8 + 1, i9 + 1)));
                                    var td_d1 = td1.toLocaleDateString().split('/');
                                    if (parseInt(td_d1[0]) < 10) {
                                        td_d1[0] = '0' + td_d1[0];
                                    }
                                    if (parseInt(td_d1[1]) < 10) {
                                        td_d1[1] = '0' + td_d1[1];
                                    }

                                    self.Cname(work[we_index].company_name);
                                    self.des(work[we_index].disignation);
                                    self.fr(fd_d1[2] + '-' + fd_d1[0] + '-' + fd_d1[1]);
                                    self.too(td_d1[2] + '-' + td_d1[0] + '-' + td_d1[1]);
                                    self.tm(work[we_index].team);
                                    self.dis(work[we_index].description);
                                    self.rep_to(work[we_index].reporting_to);
                                    self.con(work[we_index].contact);
                                }
                            });
                        }
                    },
                    error: function (msg) { }
                });
            }
        },
        error: function (msg) {}
    });

    self.update_edu = function () {
        var qul = $('#qul').val();
        var crs = $('#crs').val();
        var uni = $('#uni').val();
        var pyr = $('#pyr').val();
        var scr = $('#scr').val();
        var d = new Date();
        var yr = d.getFullYear();
        if (qul == "" || crs == "" || uni == "" || pyr == "" || scr == "") {
            alert("enter all the fields");
        }
        else if (parseInt(pyr) < yr - 30 || parseInt(pyr) > yr + 10) {
            alert("enter the valid year");

        }
        else if (parseFloat(scr) > 100 || parseFloat(scr)<=0) {
            alert("enter the valid percentage");

        }
        else {
            $.ajax({
                type: "POST",
                url: "profile.aspx/update_education",
                data: "{'qualification':'" + qul + "','course':'" + crs + "','university':'" + uni + "','pyear':'" + pyr + "','score':'" + scr + "','user':'" + education[ed_index].id + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Update Successfully!!!");
                    window.location.reload();
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }
    }

    self.update_we = function () {
        var Cname = $('#Cname').val();
        var des = $('#des').val();
        var fr = $('#fr').val();
        var too = $('#too').val();
        var tm = $('#tm').val();
        var dis = $('#dis').val();
        var rep_to = $('#rep_to').val();
        var con = $('#con').val();

        if (Cname == "") {
            alert("Enter the company name");
            
        }
        else if (des == "") {
            alert("enter the designation");
            
        }
        else if (fr == "" || too == "") {
            alert("enter the accurate duration");
           
        }
        else if (con.length > 10) {
            
                alert('please enter the contact number of length 10');
            
        }
        else {
            $.ajax({
                type: "POST",
                url: "profile.aspx/update_work_exp",
                data: "{'Cname':'" + Cname + "','des':'" + des + "','fr':'" + fr + "','too':'" + too + "','tm':'" + tm + "','dis':'" + dis + "','rep_to':'" + rep_to + "','con':'" + con + "','user':'" + work[we_index].id + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Update Successfully!!!");
                    window.location.reload();
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }
    }


    self.save_per = function () {
        var now_dt = Date.now();
        var enter_dob = new Date(self.dob());
        
        if (self.dob() == "") {
            alert("Enter the valid DOB ");
        }
        else if (self.fullname() == "") {
            alert("Enter the fullname");
        }
        else if (self.gender() == "") {
            alert("Enter the gender");
        }
        else if (enter_dob > now_dt) {
            alert("you enter the future dob");
            
        }
        else {
            $.ajax({
                type: "POST",
                url: "profile.aspx/personal_info",
                data: "{'fullname':'" + self.fullname() + "','dob':'" + self.dob() + "','gender':'" + self.gender() + "','referred':'" + self.referred() + "','user':'" + user + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Update Successfully!!!");
                    window.location.reload();
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }

    }

    self.save_cont = function () {
        
        if (self.useraddress() == "") {
            alert("Enter the valid address");
        }
        else if (self.mobileno() == "" ) {
            alert("Enter the valid phone no ");
        }
        else if (self.mobileno().length < 10 || self.mobileno().length > 10) {
            alert("Enter the valid phone no ");
        }
        else if (self.altno() != null) {
            if (self.altno().length < 10 || self.altno().length > 10) {
                alert("Enter the valid alternate no. ");
            }
            
        }
        else if (self.whatsappno() != null) {
            if (self.whatsappno().length < 10 || self.whatsappno().length > 10) {
                alert("Enter the valid whatsapp no. ");
            }
            
        }
        else {
            $.ajax({
                type: "POST",
                url: "profile.aspx/update_contact",
                data: "{'address':'" + self.useraddress() + "','mobileno':'" + self.mobileno() + "','altno':'" + self.altno() + "','whatsappno':'" + self.whatsappno() + "','user':'" + user + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Update Successfully!!!");
                    window.location.reload();
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }

    }
    
    self.save_educ = function () {
        var qual1 = $('#qual1').val();
        var course1 = $('#course1').val();
        var univ1 = $('#univ1').val();
        var pyear1 = $('#pyear1').val();
        var percentage1 = $('#percentage1').val();
        var d = new Date();
        var yr = d.getFullYear();

        if (qual1 == "" && course1 == "" && univ1 == "" && pyear1 == "" && percentage1 == "") {
            window.location.reload();
        }
        else if (qual1 == "" || course1 == "" || univ1 == "" || pyear1 == "" || percentage1 == "") {
            alert("enter all the fields");
        }
        else if (parseInt(pyear1) < yr - 30 || parseInt(pyear1) > yr + 10) {
            alert("enter the valid year");
            
        }
        else if (parseFloat(percentage1) > 100 || parseFloat(percentage1) <= 0) {
            alert("enter the valid percentage");
            
        }
        else {
            $.ajax({
                type: "POST",
                url: "profile.aspx/sign_education",
                data: "{'qualification':'" + qual1 + "','course':'" + course1 + "','university':'" + univ1 + "','pyear':'" + pyear1 + "','score':'" + percentage1 + "','user':'" + user + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Update successfully!!!");
                    window.location.reload();
                },
                error: function (msg) {
                    alert("error");
                }
            });

            return true;
        }
    }

    self.save_pic = function () {
        var ind = user_email.indexOf('@');
        var img_name = user_email.slice(0, ind);
        var content = window.img.split(';');
        var datatype = content[0].split(':')[1];
        var file_name = img_name + '.' + datatype.split('/')[1];

        if (datatype.split('/')[1].toString().toLowerCase() == 'jpg' || datatype.split('/')[1].toString().toLowerCase() == 'jpeg' || datatype.split('/')[1].toString().toLowerCase() == 'png') {
            var files = $('#file_upl').get(0).files;
            if (files[0].size < 260000) {
                var formdata = new FormData();
                
                for (var k = 0; k < files.length; k++) {

                    formdata.append(file_name.toString(), files[k]);
                }

                

                $.ajax({
                    type: "POST",
                    url: "profile.aspx/update_pic",
                    data: "{'img_name':'" + img_name + "','data_type':'" + datatype.split('/')[1] + "','user':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        uploadFiles(formdata);
                    },
                    error: function (msg) {
                        alert("error");
                    }
                });
            }
            else {
                alert("Size: less than 250KB");
            }
        }
        else {
            alert("Image is in jpeg/jpg/png format.");
        }

    }

    self.save_we = function () {
        var comp1 = $('#comp1').val();
        var desig1 = $('#desig1').val();
        var from1 = $('#from1').val();
        var to1 = $('#to1').val();
        var team1 = $('#team1').val();
        var discrip1 = $('#discrip1').val();
        var report1 = $('#report1').val();
        var contact1 = $('#contact1').val();

        if (comp1 == "" && desig1 == "" && from1 == "" && to1 == "" && team1 == "" && discrip1 == "" && report1 == "" && contact1 == "") {
            window.location.reload();
        }
        else if (comp1 == "") {
            alert("enter all the company name");
        }
        else if (desig1 == "") {
            alert("enter all the designation");
        }
        else if (from1 == "" || to1 == "") {
            alert("enter all the correct duration");
        }
        else {
            $.ajax({
                type: "POST",
                url: "profile.aspx/add_work_exp",
                data: "{'Cname':'" + comp1 + "','des':'" + desig1 + "','fr':'" + from1 + "','too':'" + to1 + "','tm':'" + team1 + "','dis':'" + discrip1 + "','rep_to':'" + report1 + "','con':'" + contact1 + "','user':'" + user + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert("Update Successfully!!!");
                    window.location.reload();
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }
    }

    self.add_more_job = function () {
        self.job_list.push({ job_list_c: self.more_job_loc() });
        $.ajax({
            type: "POST",
            url: "profile.aspx/get_job",
            data: "{'more_job':'" + self.more_job_loc() + "','user':'" + user + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var get_job = msg.d.job_a;
                get_job.push(self.more_job_loc());
                $.ajax({
                    type: "POST",
                    url: "profile.aspx/update_job",
                    data: "{'more_job':'" + get_job + "','user':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        alert(msg.d);
                    },
                    error: function (msg) {
                        alert("error");
                    }
                });
                
            },
            error: function (msg) {
                alert("error");
            }
        });
        document.getElementById("job_name").style.display = "none";
        document.getElementById("add_job").disabled = false;
    }

    self.add_skill = function () {
        document.getElementById("skill_name").style.display = "block";
        document.getElementById("add_skill").disabled = true;
    }

    self.add_more_skill = function () {
        self.skill_list.push({ skill_list_c: self.more_skill_loc() });
        $.ajax({
            type: "POST",
            url: "profile.aspx/get_skill",
            data: "{'more_skill':'" + self.more_skill_loc() + "','user':'" + user + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var get_skill = msg.d.skill;
                get_skill.push(self.more_skill_loc());
                $.ajax({
                    type: "POST",
                    url: "profile.aspx/update_skill",
                    data: "{'more_skill':'" + get_skill + "','user':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        alert(msg.d);
                    },
                    error: function (msg) {
                        alert("error");
                    }
                });

            },
            error: function (msg) {
                alert("error");
            }
        });
        document.getElementById("skill_name").style.display = "none";
        document.getElementById("add_skill").disabled = false;
    }
    self.add_domain = function () {
        document.getElementById("domain_name").style.display = "block";
        document.getElementById("add_domain").disabled = true;
    }
    self.add_more_domain = function () {
        self.domain_list.push({ domain_list_c: self.more_domain_loc() });
        $.ajax({
            type: "POST",
            url: "profile.aspx/get_domain",
            data: "{'more_domain':'" + self.more_domain_loc() + "','user':'" + user + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var get_domain = msg.d.domain;
                get_domain.push(self.more_domain_loc());
                $.ajax({
                    type: "POST",
                    url: "profile.aspx/update_domain",
                    data: "{'more_domain':'" + get_domain + "','user':'" + user + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        alert(msg.d);
                    },
                    error: function (msg) {
                        alert("error");
                    }
                });

            },
            error: function (msg) {
                alert("error");
            }
        });
        document.getElementById("domain_name").style.display = "none";
        document.getElementById("add_domain").disabled = false;
    }

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

}