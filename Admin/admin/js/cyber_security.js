var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#cyb_sec_ko')[0]);

});

function percentageToDegrees(percentage) {

    return percentage / 100 * 360

}



function fill_perc(modu_id,value) {
    $(modu_id).each(function () {

        
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }

    })
}

function ClassViewModel() {
    var self = this;
    self.cyber_sec_info = ko.observableArray([]);

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
                
                
                $.ajax({
                    type: "POST",
                    url: "Courses.aspx/get_cyber_security",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                        for (var i = 0; i < msg.d.length; i++) {
                            var acc = "parent" + msg.d[i].user_id.toString();
                            var coll = "collapse" + msg.d[i].user_id.toString();
                            var module1 = "module1_" + msg.d[i].user_id.toString();
                            var percent_id = "percent_" + msg.d[i].user_id.toString();
                            var quiz1 = "quiz1_" + msg.d[i].user_id.toString();
                            var sc = "qscore_" + msg.d[i].user_id.toString();
                            var perc = 0;
                            self.cyber_sec_info.push({ acc_id: acc, coll_url: "#" + coll, Username: msg.d[i].name, Useremail: msg.d[i].email, mobileno: msg.d[i].phone, coll_name: msg.d[i].collegename, pass_yr: msg.d[i].passing_year, depart: msg.d[i].department, user_id: msg.d[i].user_id, coll_id: coll, modu: module1, percent: percent_id, quiz_id: quiz1, q_score: sc });

                            

                            if (msg.d[i].count1 == 1) {
                                document.getElementById(percent_id).innerHTML = perc.toString() + '<sup class="small">%</sup>';
                            }
                            else {
                                var perc1 = (msg.d[i].count1 * 100) / 53;
                                perc = parseInt(perc1.toString().split('.')[0]);
                                fill_perc("#" + module1, perc);
                                document.getElementById(percent_id).innerHTML = perc.toString() + '<sup class="small">%</sup>';
                            }

                            if (msg.d[i].score1 == null) {
                                document.getElementById(sc).innerHTML = '0<sup class="small">%</sup>';
                            }
                            else {

                                var quiz_score = parseInt(msg.d[i].score1);
                                fill_perc("#" + quiz1, quiz_score);
                                document.getElementById(sc).innerHTML = quiz_score.toString() + '<sup class="small">%</sup>';

                            }

                        }
                        

                    },
                    error: function (msg) {
                        alert("ero");
                    }
                });

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
