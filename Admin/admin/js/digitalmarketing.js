var mainVM;

$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#dig_mark_ko')[0]);

});

function ClassViewModel() {
    var self = this;
    self.digitalmark_info = ko.observableArray([]);

    $.ajax({
        type: "POST",
        url: "Courses.aspx/get_digitalmarket",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (var i = 0; i < msg.d.length; i++) {
                if (msg.d[i].approved == 0) {
                    self.digitalmark_info.push({ Username: msg.d[i].name, Useremail: msg.d[i].email, mobileno: msg.d[i].phone, coll_name: msg.d[i].collegename, pass_yr: msg.d[i].passing_year, depart: msg.d[i].department, user_id: msg.d[i].user_id, action: '<button type="button" id="' + msg.d[i].user_id + '" onclick=approve(this.id) class="btn btn-success">Approve</button><button type="button" class="btn btn-danger">Disapprove</button>' });
                }
            }
            $('#table_paging').DataTable();
            $('.dataTables_length').addClass('bs-select');

        },
        error: function (msg) {

        }
    });

    

}

function approve(idds) {
    $.ajax({
        type: "POST",
        url: "Courses.aspx/approve",
        data: "{'user_id':'" + idds + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            document.getElementById(idds).innerHTML = '<p style="color:green;"><i class="fa fa-check" aria-hidden="true"></i>Approve</p>';

        },
        error: function (msg) {

        }
    });

    
}