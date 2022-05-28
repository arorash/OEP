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
                    url: "UserData.aspx/Get_Token",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                        for (var i = 0; i < msg.d.length; i++) {
                            

                            self.usersinfo.push({
                                Username: msg.d[i].fullname, Useremail: msg.d[i].email, token: msg.d[i].token_type, initial_time: msg.d[i].initial_time, process_time: msg.d[i].processing_time });
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