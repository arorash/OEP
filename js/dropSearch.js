function fun() {
    var e = document.getElementById("exampleFormControlSelect1");
    var countrySelect = e.options[e.selectedIndex].value;
    let selectState = document.getElementById('exampleFormControlSelect2').innerHTML;
    let selectStateChange = selectState + "<option value='1'>Gujarat</option><option value='2'>Madya Pradesh</option>";
    if (countrySelect == '1') {
        document.getElementById('exampleFormControlSelect2').innerHTML = selectStateChange;
    }
    if (countrySelect == '0') {
        document.getElementById('exampleFormControlSelect2').innerHTML = "<option value='0'>Select State</option>";
        document.getElementById('exampleFormControlSelect3').innerHTML = "<option value='0'>Select City</option>";
    }
}

function fun2() {
    var state = document.getElementById("exampleFormControlSelect2");
    var stateSelect = state.options[state.selectedIndex].value;

    let city = ["<option value='0'>Select City</option>", "<option value='1'>SURAT</option>", "<option value='2'>VALSAD</option>", "<option value='3'>BHARUCH</option>",
        "<option value='4'>VADODARA</option>", "<option value='5'>AHMEDABAD</option>", "<option value='6'>BHAVNAGAR</option>", "<option value='7'>MEHSANA</option>"
    ];
    if (stateSelect == '0') {
        document.getElementById('exampleFormControlSelect3').innerHTML = "<option value='0'>Select City</option>";
    }
    if (stateSelect == '1') {
        document.getElementById('exampleFormControlSelect3').innerHTML = "";
        for (let i = 0; i < city.length; i++) {
            document.getElementById('exampleFormControlSelect3').innerHTML += city[i];
        }
    }
    if (stateSelect == '2') {
        document.getElementById('exampleFormControlSelect3').innerHTML = "<option value='0'>Select City</option><option value='8'>MADSAUR</option>";
    }
}

var centent = document.getElementById('centerContent').innerHTML;

function fun3() {

    let cityContent = ["", "<div class='list-group-item list-group-item-action '><div class='justify-content-between'><h5>SURAT CENTER</h5><p>Address: Soham nagar PART -2, OPP. SARATHI DR. HOUSE, HIRABAGH, VARACHHA ROAD, SURAT, GUJARAT - 395006</p></div></div><br>",
        "<div class='list-group-item list-group-item-action '><div class='justify-content-between '><h5>VALSAD CENTER</h5><p>Address: Decent Comm. Skills, 107 Aditya Chamber, Nr KalyanBang, Valsad, Gujarat, 396001</p></div></div><br>",
        "<div class='list-group-item list-group-item-action '><div class='justify-content-between '><h5>BHARUCH CENTER</h5><p>Address: 29,1st Floor,Moon Residency,Kanthariya Road,Bharuch,GUJARAT - 392001</p></div></div><br>",
        "<div class='list-group-item list-group-item-action '><div class='justify-content-between '><h5>VADODARA CENTER</h5><p>Address: 701, A, WINDSORPLAZA,R.C.DUTT ROAD, ALKAPURI, VADODARA - 390007,GUJARAT</p></div></div><br>",
        '<div class="list-group-item list-group-item-action "><div class=" justify-content-between "><h5>AHMEDABAD CENTER</h5><p>Address: 105, Sarita Complex, BH Samudra Complex, NR Girish Colddrink, CG Road, Ahmedabad-380009</p></div></div><br>',
        '<div class="list-group-item list-group-item-action "><div class=" justify-content-between "><h5>BHAVNAGAR CENTER</h5><p>Address: F-3, Shree Krishna Complex, NR Desia Nagar Petrol Pump, Bhavnagar - 364003</p></div></div><br>',
        '<div class="list-group-item list-group-item-action "><div class=" justify-content-between "><h5>MEHSANA CENTER</h5><p>Address: 69-70, Golden Square Complex, 2nd Floor, OPP. Domino Pizza, Radhanpur Road, Mehsana - 384002</p></div></div><br>',
        '<div class="list-group-item list-group-item-action "><div class=" justify-content-between "><h5>MADSAUR CENTER</h5><p>Address: Vision Infotech, Road No 2, BH DadhpurKunj, OPP. DR. Majhar Hussain Clinic, Mandsaur - 458001</p></div></div><br>'
    ];
    let city = document.getElementById('exampleFormControlSelect3');
    var citySelect = city.options[city.selectedIndex].value;
    let changeContent = window.centent + cityContent[parseInt(citySelect)];
    document.getElementById('centerContent').innerHTML = changeContent;
}

function check1() {
    var e = document.getElementById("exampleFormControlSelect1");
    var countrySelect = e.options[e.selectedIndex].value;
    if (countrySelect == '0') {
        alert("Please, First Select The Country!!");
    }
}

function check2() {
    var country = document.getElementById("exampleFormControlSelect1");
    var countrySelect = country.options[country.selectedIndex].value;
    var state = document.getElementById("exampleFormControlSelect2");
    var stateSelect = state.options[state.selectedIndex].value;
    if (countrySelect == '0') {
        alert("Please, First Select The Country!!");
    } else if (stateSelect == '0') {
        alert("Please, First Select The State!!");
    }
}

function fun4() {
    var e = document.getElementById("exampleFormControlSelect4");
    var countrySelect = e.options[e.selectedIndex].value;
    let selectState = document.getElementById('exampleFormControlSelect5').innerHTML;
    let selectStateChange = selectState + "<option value='1'>Haryana</option>";
    if (countrySelect == '1') {
        document.getElementById('exampleFormControlSelect5').innerHTML = selectStateChange;
    }
    if (countrySelect == '0') {
        document.getElementById('exampleFormControlSelect5').innerHTML = "<option value='0'>Select State</option>";
        document.getElementById('exampleFormControlSelect6').innerHTML = "<option value='0'>Select City</option>";
    }
}

function fun5() {
    var state = document.getElementById("exampleFormControlSelect5");
    var stateSelect = state.options[state.selectedIndex].value;

    let city = ["<option value='0'>Select City</option>", "<option value='1'>GURGOAN</option>"];
    if (stateSelect == '0') {
        document.getElementById('exampleFormControlSelect6').innerHTML = "<option value='0'>Select City</option>";
    }
    if (stateSelect == '1') {
        document.getElementById('exampleFormControlSelect6').innerHTML = "";
        for (let i = 0; i < city.length; i++) {
            document.getElementById('exampleFormControlSelect6').innerHTML += city[i];
        }
    }
    if (stateSelect == '2') {
        document.getElementById('exampleFormControlSelect6').innerHTML = "<option value='0'>Select City</option><option value='8'>MADSAUR</option>";
    }
}

var centent1 = document.getElementById('branchContent').innerHTML;

function fun6() {

    let cityContent = ["", '<div class="list-group-item list-group-item-action "><div class=" justify-content-between "><h5>GURGOAN BRANCH</h5><p>Email: info@employmentexpress.net </p><p>Contact Number: (+91)7905044451 </p><p>Address: ROOM NO. 15, PLOT NO. 22, Near MUNICIPAL SCHOOL, KHERWADI, BANDRA (E), Mumbai, Maharashtra, India 400051. </p></div></div><br>'];
    let city = document.getElementById('exampleFormControlSelect6');
    // let countryContent = document.getElementById('exampleFormControlSelect4').innerHTML;
    // let stateContent = document.getElementById('exampleFormControlSelect5').innerHTML;
    // let cityContent = document.getElementById('exampleFormControlSelect6').innerHTML;

    var citySelect = city.options[city.selectedIndex].value;
    let changeContent = window.centent1 + cityContent[parseInt(citySelect)];
    document.getElementById('branchContent').innerHTML = changeContent;
    // document.getElementById('exampleFormControlSelect4').innerHTML = countryContent;
    // document.getElementById('exampleFormControlSelect5').innerHTML = stateContent;
    // document.getElementById('exampleFormControlSelect6').innerHTML = cityContent;
}

function check3() {
    var e = document.getElementById("exampleFormControlSelect4");
    var countrySelect = e.options[e.selectedIndex].value;
    if (countrySelect == '0') {
        alert("Please, First Select The Country!!");
    }
}

function check4() {
    var country = document.getElementById("exampleFormControlSelect4");
    var countrySelect = country.options[country.selectedIndex].value;
    var state = document.getElementById("exampleFormControlSelect5");
    var stateSelect = state.options[state.selectedIndex].value;
    if (countrySelect == '0') {
        alert("Please, First Select The Country!!");
    } else if (stateSelect == '0') {
        alert("Please, First Select The State!!");
    }
}