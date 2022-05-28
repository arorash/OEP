var user_id;

function ajax_call() {
    $.ajax({
        type: "POST",
        url: "sign_frm.aspx/domains",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
         
        },
        error: function (msg) {

        }
    });
}

ajax_call();

$(function () {
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: false,
        forceMoveForward: true,
        //autoFocus: true,
        transitionEffectSpeed: 500,
        titleTemplate: '<div class="title">#title#</div>',
        labels: {
            previous: '',
            next: 'Next Step',
            finish: 'Submit',
            current: ''
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            var fullname = $('#full_name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var password = $('#password').val();
            var address = $('#address').val();
            var refer_by = $('#refer_by').val();
            var dob = $('#dob').val();
            var course = $('#course').val();
            var university = $('#university').val();
            var pyear = $('#year').val();
            var score = $('#percentage').val();
            var company = $('#company').val();
            var designation = $('#designation').val();
            var from = $('#from').val();
            var to = $('#to').val();
            var team = $('#team').val();
            var discription = $('#discription').val();
            var reporting_to = $('#reporting_to').val();
            var contact = $('#contact').val();
            
            var gender = "";
            var ele = document.getElementsByName('gender');

            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    gender = ele[i].value;
            }

            var now_dt = Date.now();
            var enter_dob = new Date(dob);

            if (currentIndex == 0) {
                if (fullname == '') {
                    alert('please enter the full name');
                    return false;
                }
                else if (email == '') {
                    alert('please enter the email');
                    return false;
                }
                else if (email.indexOf('@') <= -1) {
                    alert("please enter the valid email");
                    return false;
                }
                else if (phone.toString() == '') {
                    alert('please enter the  phone number');
                    return false;
                }
                else if (phone.length < 10 || phone.length > 10) {
                    alert('please enter the  phone number of length 10');
                    return false;
                }
                else if (password == '' || password.length < 8) {
                    alert('please enter the  password of length 8 or more');
                    return false;
                }
                else if (address == '') {
                    alert('please enter the address');
                    return false;
                }
                else if (dob == '') {
                    alert('please enter the Date Of Birth');
                    return false;
                }
                else if (enter_dob > now_dt) {
                    alert("you enter the future dob");
                    return false;
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "sign_frm.aspx/sign_personal",
                        data: "{'fullname':'" + fullname + "','email':'" + email + "','phone':'" + phone + "','password':'" + password + "','address':'" + address + "','gender':'" + gender + "','dob':'" + dob + "','refer_by':'" + refer_by + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            window.user_id = msg.d;
                            if (window.user_id == 0) {
                                alert("Email/Phone Number is already exists!!");
                                window.location.reload();
                            }
                            else {
                               
                            }
                            //alert("success");
                        },
                        error: function (msg) {
                            //alert("error");
                        }
                    });
                    return true; 
                    }
                
                
            }
            else if (currentIndex == 1) {
                var e = document.getElementById("qualification");
                var strUser = e.options[e.selectedIndex].value;

                var d = new Date();
                var yr = d.getFullYear();
                
                if (strUser == '0' || course == "" || university == "" || pyear == "" || score == "") {
                    alert("fill all the fields");
                    return false;
                }
                else if (parseInt(pyear) < yr - 30 || parseInt(pyear) > yr + 10) {
                    alert("enter the valid year");
                    return false;
                }
                else if (parseFloat(score) > 100 || parseFloat(score) <= 0) {
                    alert("enter the valid percentage");
                    return false;
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "sign_frm.aspx/sign_education",
                        data: "{'qualification':'" + strUser + "','course':'" + course + "','university':'" + university + "','pyear':'" + pyear + "','score':'" + score + "','user':'" + window.user_id + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            //alert("success");
                        },
                        error: function (msg) {
                            //alert("error");
                        }
                    });

                    return true;
                }
            }
            else if (currentIndex == 2) {
                if (company == "" || designation == "" || from == "" || to == "" || team == "" || discription == "" || reporting_to == "" || contact == "") {
                    return true;
                }
                else if (company == "") {
                    alert("Enter the company name");
                    return false;   
                }
                else if (designation == "") {
                    alert("enter the designation");
                    return false;
                }
                else if (from == "" || to == "") {
                    alert("enter the accurate duration");
                    return false;
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "sign_frm.aspx/sign_work",
                        data: "{'company':'" + company + "','designation':'" + designation + "','from':'" + from + "','to':'" + to + "','team':'" + team + "','discription':'" + discription + "','reporting_to':'" + reporting_to + "','contact':'" + contact + "','user':'" + window.user_id + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            //alert("success");
                        },
                        error: function (msg) {
                            //alert("success");
                        }
                    });

                    return true;
                }
            }
            
            
        },
        onFinished: function (event, currentIndex) {
            var loc_select_a = $('#locates_a').val();
            if (loc_select_a.includes('other')) {
                loc_select_a.pop('other');
            }
            var loc_other = $('#other_loc_a').val();
            if (loc_other == "") { }
            else if (loc_other == undefined) { }
            else {
                var loc = loc_other.split(',');
                for (var i = 0; i < loc.length; i++) {
                    loc_select_a.push(loc[i]);
                }
            }

            
            var domain_sel = $('#domain_sel').val();
            if (domain_sel.includes('other')) {
                domain_sel.pop('other');
            }
            var dom_other = $('#other_dom').val();
            if (dom_other == "") { }
            else if (dom_other == undefined) {}
            else {
                var dom = dom_other.split(',');
                for (var i = 0; i < dom.length; i++) {
                    domain_sel.push(dom[i]);
                }
            }

            var skill_sel = $('#skill_sel').val();
            if (skill_sel.includes('other')) {
                skill_sel.pop('other');
            }
            var skill_other = $('#other_skill').val();
            if (skill_other == "") { }
            else if (skill_other == undefined) {}
            else {
                var skill = skill_other.split(',');
                for (var i = 0; i < skill.length; i++) {
                    skill_sel.push(skill[i]);
                }
            }

            if (loc_select_a.length < 3) {
                alert("Select atleast 3 States.");
            }
            else if (domain_sel.length < 1) {
                alert("Select atleast 1 Domain.");
            }
            else if (skill_sel.length < 1) {
                alert("Select atleast 1 Skill.");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "sign_frm.aspx/sign_job_loc",
                    data: "{'catagory1':'" + loc_select_a + "','domain':'" + domain_sel + "','skills':'" + skill_sel + "','user':'" + window.user_id + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        alert("Account Created Successfully!!");
                        window.location.replace("login.aspx");
                    },
                    error: function (msg) {
                        //alert("error");
                    }
                });
            }
        }
    });
    
});

function edu_open() {
    var e = document.getElementById("qualification");
    var strUser = e.options[e.selectedIndex].value;
    
    if (strUser == '0') {
        document.getElementById("course").disabled = true;
        document.getElementById("university").disabled = true;
        document.getElementById("year").disabled = true;
        document.getElementById("percentage").disabled = true;
    }
    else {
        document.getElementById("course").disabled = false;
        document.getElementById("university").disabled = false;
        document.getElementById("year").disabled = false;
        document.getElementById("percentage").disabled = false;
    }
}


var other_selected = 0;
function s_loc_a() {
    var loc_sel = $('#locates_a').val();
    if (loc_sel.includes('other')) {
        if (window.other_selected == 0) {
            var other_cont = '<br><div class="form-row col-lg-12">' +
                '<div class="form-holder form-holder-2">' +
                '<label class="form-row-inner" style="width: 100%;">' +
                '<input type="text" class="form-control" style="margin-top:0%" id="other_loc_a" name="other_loc_a" required>' +
                '<span class="label">Others(Enter using comma seperation)</span>' +
                '<span class="border"></span>' +
                '</label>' +
                '</div>' +
                '</div>';
            document.getElementById("oth_loc_a").innerHTML += other_cont;
            window.other_selected = 1;
        }        
    }
    else {
        document.getElementById("oth_loc_a").innerHTML = "";
        window.other_selected = 0;
    }
}


var other_selected2 = 0;
function s_domain() {
    var dom_sel = $('#domain_sel').val();
    if (dom_sel.includes('other')) {
        if (window.other_selected2 == 0) {
            var other_cont = '<br><div class="form-row">' +
                '<div class="form-holder form-holder-2">' +
                '<label class="form-row-inner" style="width: 100%;">' +
                '<input type="text" class="form-control" style="margin-top:0%" id="other_dom" name="other_dom" required>' +
                '<span class="label">Others(Enter using comma seperation)</span>' +
                '<span class="border"></span>' +
                '</label>' +
                '</div>' +
                '</div>';
            document.getElementById("dom_other").innerHTML += other_cont;
            window.other_selected2 = 1;
        }        
    }
    else {
        document.getElementById("dom_other").innerHTML = "";
        window.other_selected2 = 0;
    }
}

var other_selected3 = 0;
function s_skill() {
    var skill_sel = $('#skill_sel').val();
    if (skill_sel.includes('other')) {
        if (window.other_selected3 == 0) {
            var other_cont = '<br><div class="form-row">' +
                '<div class="form-holder form-holder-2">' +
                '<label class="form-row-inner" style="width: 100%;">' +
                '<input type="text" class="form-control" style="margin-top:0%" id="other_skill" name="other_skill" required>' +
                '<span class="label">Others(Enter using comma seperation)</span>' +
                '<span class="border"></span>' +
                '</label>' +
                '</div>' +
                '</div>';
            document.getElementById("skill_other").innerHTML += other_cont;
            window.other_selected3 = 1;
        }
    }
    else {
        document.getElementById("skill_other").innerHTML = "";
        window.other_selected3 = 0;
    }
}



