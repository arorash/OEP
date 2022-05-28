var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#User_ko')[0]);

});


function ClassViewModel() {
    var self = this;
    self.usersinfo = ko.observableArray([]);
    var User_det;
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
                    url: "UserData.aspx/UserDetails",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                        for (var i = 0; i < msg.d.length; i++) {
                            var d = msg.d[i].dob.toString().split(" ");
                            var dd = d[0].split("/");
                            var user_dob = dd[1] + "-" + dd[0] + "-" + dd[2];

                            self.usersinfo.push({
                                Username: msg.d[i].name, Useremail: msg.d[i].email, mobileno: msg.d[i].phone, dob: user_dob, address: msg.d[i].address, gender: msg.d[i].gender, coll_name: msg.d[i].college_name, ref_by: msg.d[i].referred_by, user_id: msg.d[i].id, moredetail: function (User) {
                                    sessionStorage.setItem("userIds", User);
                                    location.href = "userdata.html";
                                }
                            });
                        }
                        $('#table_paging').DataTable();
                        $('.dataTables_length').addClass('bs-select');

                    },
                    error: function (msg) {

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