var mainVM;
$(document).ready(function () {
    mainVM = new ClassViewModel();

    ko.applyBindings(mainVM, $('#contact_frm')[0]);

});



function ClassViewModel() {
    var self = this;
    self.name = ko.observable('');
    self.email = ko.observable('');
    self.phone = ko.observable('');
    self.message = ko.observable('');
    self.send = function () {
        var ind = self.email().indexOf("@");
        if (self.name() == "") {
            alert("Enter the name!!!");
        }
        else if (self.email() == "" || ind == -1) {
            alert("Enter a valid email!!");
        }
        else if (self.phone() != "" && (self.phone().length < 10 || self.phone().length > 10)) {
            alert("Enter the phone number of length 10");
        }
        else {
            $.ajax({
                type: "POST",
                url: "contact_form.aspx/contact_enquiry",
                data: "{'name':'" + self.name() + "','email':'" + self.email() + "','phone':'" + self.phone() + "','message':'" + self.message() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alert(msg.d);
                },
                error: function (msg) {
                    alert("error");
                }
            });
        }
    }




}