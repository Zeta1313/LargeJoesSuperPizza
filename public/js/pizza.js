document.getElementById('pizza-form').onsubmit = () => {
    clearErrors();
    let isvalid = true;

    let fname = document.getElementById('fname').value.trim();
    if(fname=="") {
        document.getElementById("er-fname").style.display="block";
        isvalid = false;
    }

    let lname = document.getElementById('lname').value.trim();
    if(lname=="") {
        document.getElementById("er-lname").style.display="block";
        isvalid = false;
    }

    let email = document.getElementById('pnum').value.trim();
    if (pnum = "") {
        document.getElementById("er-email").style.display="block";
        isvalid=false;
    }

    let size = document.getElementById('size').value;
    if (size === "none") {
            document.getElementById("err-size").style.display = "block";
            isvalid = false;
    }

    return isvalid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display="none";
    }
}