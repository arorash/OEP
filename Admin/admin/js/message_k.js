var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#mess_ko')[0]);

});

var user_id;
var mess_head = '<div class="card-header msg_head">' +
    '<div class="d-flex bd-highlight">' +
    '<div class="img_cont">' +
    '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">' +
    '</div>' +
    '<div class="user_info">' +
    '<span>Chat with';
var mess_head_end = '</span></div></div></div><div class="card-body msg_card_body" id="admin_message">';
var mess_user = '<div class="d-flex justify-content-start mb-4">' +
    '<div class="img_cont_msg">' +
    '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">' +
    '</div>' +
    '<div class="msg_cotainer">';
var mess_user_end = '</div></div >';
var mess_admin = '<div class="d-flex justify-content-end mb-4">' +
    '<div class="msg_cotainer_send">';
var mess_admin_end = '</div >' +
    '<div class="img_cont_msg">' +
    '<img src="images/me1.png" class="rounded-circle user_img_msg">' +
    '</div>' +
    '</div>';
var footer = '</div>' +
    '<div class="card-footer">' +
    '<div class="input-group">' +
    '<div class="input-group-append">' +
    '<span class="input-group-text attach_btn"></span>' +
    '</div>' +
    '<textarea name="" class="form-control type_msg" id="mess_admin" placeholder="Type your message..."></textarea>' +
    '<div class="input-group-append">' +
    '<button class="input-group-text send_btn" onclick="save_message()"><i class="fas fa-location-arrow"></i></button>' +
    '</div>' +
    '</div>' +
    '</div >';


function ClassViewModel() {
    var self = this;
    self.users = ko.observableArray([]);
    
    var all_mess;
    
    

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
                    url: "message_c.aspx/get_users",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        for (var i = 0; i < msg.d.length; i++) {
                            if (msg.d[i].msg_from != "admin") {
                                self.users.push({
                                    user_ids: msg.d[i].msg_from, user_name: msg.d[i].msg_from, show_chat: function (idd) {
                                        user_id = idd;

                                        $.ajax({
                                            type: "POST",
                                            url: "message_c.aspx/get_all_chat",
                                            data: {},
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            success: function (msg) {
                                                all_mess = msg.d;
                                                var mess_content = "";
                                                mess_content = mess_content + mess_head + " " + idd + mess_head_end;
                                                for (var j = 0; j < all_mess.length; j++) {
                                                    if (all_mess[j].msg_from == idd) {
                                                        mess_content = mess_content + mess_user + all_mess[j].message + mess_user_end;
                                                    }
                                                    else if (all_mess[j].msg_to == idd) {
                                                        mess_content = mess_content + mess_admin + all_mess[j].message + mess_admin_end;
                                                    }
                                                }
                                                mess_content = mess_content + footer;
                                                document.getElementById("message_content").innerHTML = mess_content;
                                            },
                                            error: function (msg) {
                                                alert("ero");
                                            }
                                        });

                                    }
                                });
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

function save_message() {
    var mess_admin1 = document.getElementById("mess_admin").value;
    if (mess_admin1 == "" || mess_admin1 == null) { }
    else {
        $.ajax({
            type: "POST",
            url: "message_c.aspx/save_message",
            data: "{'message':'" + mess_admin1 + "','user_name':'" + user_id + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                document.getElementById("admin_message").innerHTML += mess_admin + mess_admin1 + mess_admin_end;

            },
            error: function (msg) {
                alert("ero");
            }
        });
    }
    
}