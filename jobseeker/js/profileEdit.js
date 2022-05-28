


function edit_personal() {
    document.getElementById("input-username").disabled = false;
    document.getElementById("dobs").disabled = false;
    document.getElementById("gender").disabled = false;
    document.getElementById("save1").disabled = false;
    document.getElementById("referred").disabled = false;
    document.getElementById("edit1").disabled = true;

}

function save_personal() {
    document.getElementById("input-username").disabled = true;
    document.getElementById("dobs").disabled = true;
    document.getElementById("gender").disabled = true;
    document.getElementById("save1").disabled = true;
    document.getElementById("referred").disabled = true;
    document.getElementById("edit1").disabled = false;
    
}

function edit_contact() {
    document.getElementById("address").disabled = false;
    document.getElementById("mobileno").disabled = false;
    document.getElementById("altno").disabled = false;
    document.getElementById("whatsappno").disabled = false;
    document.getElementById("save2").disabled = false;

}

function save_contact() {
    document.getElementById("address").disabled = true;
    document.getElementById("mobileno").disabled = true;
    document.getElementById("altno").disabled = true;
    document.getElementById("whatsappno").disabled = true;
    document.getElementById("save2").disabled = true;

}


function edit_work() {
    var table_content1 = '<tr><td><input type="text" id="comp1" class="form-control form-control-alternative" placeholder="Company Name"></td >' +
        '<td><input type="text" id="desig1" class="form-control form-control-alternative" placeholder="Designation"></td>' +
        '<td><input type="date" id="from1" class="form-control form-control-alternative" placeholder="From"></td>' +
        '<td><input type="date" id="to1" class="form-control form-control-alternative" placeholder="To"></td>' +
        '<td><input type="text" id="team1" class="form-control form-control-alternative" placeholder="Team"></td>' +
        '<td><input type="text" id="discrip1" class="form-control form-control-alternative" placeholder="Discription"></td>' +
        '<td><input type="text" id="report1" class="form-control form-control-alternative" placeholder="Reporting To"></td>' +
        '<td><input type="number" id="contact1" class="form-control form-control-alternative" placeholder="Contact"></td></tr > ';

    document.getElementById('work_table').innerHTML += table_content1;

    document.getElementById('add_w_e').disabled = true;
    document.getElementById('add_w_e_s').disabled = false;
}

function adds_edu() {

    var table_content = '<tr><td><input type="text" id="qual1" class="form-control form-control-alternative" placeholder="Qualification"></td >' +
        '<td><input type="text" id="course1" class="form-control form-control-alternative" placeholder="Course"></td>' +
        '<td><input type="text" id="univ1" class="form-control form-control-alternative" placeholder="University"></td>' +
        '<td><input type="number" id="pyear1" class="form-control form-control-alternative" placeholder="Passing Year"></td>' +
        '<td><input type="number" id="percentage1" class="form-control form-control-alternative" placeholder="Score"></td>' +
        '<td></td></tr >';

    document.getElementById('edu_table').innerHTML += table_content;

    document.getElementById('add_edu').disabled = true;
    document.getElementById('add_edu_s').disabled = false;

}

function add_jo() {
    document.getElementById("add_job").disabled = true;
    document.getElementById("job_name").style.display = "block";
}


