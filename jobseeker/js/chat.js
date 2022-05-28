var mainVM;
$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#chat')[0]);

});



function ClassViewModel() {
    var self = this;
    var user_email;
    var email_msg;
    self.message = ko.observable("");
    self.image_ss = ko.observable("");
    self.image_s = ko.observable("");
    self.name_user = ko.observable("");

    $.ajax({
        type: "POST",
        url: "message_c.aspx/profile_info",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d.email == null) {
                window.location = "../login.aspx";
            }
            else {
                self.name_user(msg.d.fullname);
                user_email = msg.d.session_token;
                email_msg = msg.d.email;
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
                    url: "message_c.aspx/msg_read",
                    data: "{'user_email':'" + msg.d.email + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {


                        for (var i = 0; i < msg.d.length; i++) {

                            if (msg.d[i].msg_from == email_msg) {
                                $('#chat_tab').append('	 <div class="d-flex justify-content-end mb-4">' +


                                    '<div class="msg_cotainer">' +
                                    msg.d[i].message +

                                    '</div>' +
                                    '</div >');

                            }
                            else if (msg.d[i].msg_to == email_msg) {

                                $('#chat_tab').append('	 <div class="d-flex justify-content-start mb-4">' +


                                    '<div class="msg_cotainer_send">' +
                                    msg.d[i].message +

                                    '</div>' +
                                    '</div >');

                            }

                        }
                    },
                    error: function (msg) {
                        
                    }
                });

                $.ajax({
                    type: "POST",
                    url: "message_c.aspx/msg_seen",
                    data: "{'user_email':'" + msg.d.email + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {

                    },
                    error: function (msg) {
                        
                    }
                });
            }
        },
        error: function (msg) { }
    });

    self.send = function () {
        var dd = new Date();
        var d = dd.toLocaleDateString();
        $.ajax({
            type: "POST",
            url: "message_c.aspx/msg_add",
            data: "{'message':'" + self.message() + "','from_m':'" + user_email + "','dd':'" + d + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

            },
            error: function (msg) {
                
            }
        });
        $('#chat_tab').append('	  <div class="d-flex justify-content-end mb-4">   <div class="msg_cotainer">' + self.message() + '   </div>  </div >');
        self.message('');

    }

    self.logout = function () {
        $.ajax({
            type: "POST",
            url: "message_c.aspx/logout",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                window.location.replace('../login.aspx');
            },
            error: function (msg) {
                
            }
        });

    }
}