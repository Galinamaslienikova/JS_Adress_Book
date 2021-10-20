window.onload = function () {
  function $(elem) {
    return document.getElementById(elem);
  }
  function CreateForm(y) {
    this.CreateForm = document.createElement("form");
    $("adressBook").appendChild(this.CreateForm);
    for (let j = 0; j < client.length + 3; j++) {
      let input = document.createElement("input");
      input.setAttribute("readonly", "readonly");
      input.style.borderTop = "none";
      this.CreateForm.appendChild(input);
      if (y) {
        if (j < client.length) {
          this.CreateForm.childNodes[j].value = client[j].value;
        }
      }
    }
  }
  CreateForm.prototype.addLocalValue = function (z, valueAdds) {
    this.CreateForm.childNodes[z].value = valueAdds;
  };
  CreateForm.prototype.addValue = function (z) {
    return this.CreateForm.childNodes[z].value;
  };
  CreateForm.prototype.addDisplay = function (z, displayValue) {
    this.CreateForm.childNodes[z].style.display = displayValue;
  };
  CreateForm.prototype.editSave = function (objCustomer) {
    this.CreateForm.childNodes[4].onclick = function () {
      if (this.value == "Edit |") {
        this.value = "Save |";
        for (let k = 0; k < client.length; k++) {
          this.parentElement.childNodes[k].removeAttribute(
            "readonly",
            "readonly"
          );
          this.parentElement.childNodes[k].style.backgroundColor =
            "rgb(226, 220, 220)";
        }
      } else {
        for (let v = 0; v < localStorage.length; v++) {
          let key = localStorage.key(v);
          value = JSON.parse(localStorage.getItem(key));
          if (this.parentElement.childNodes[6].value == key) {
            localStorage.removeItem(key);
            objCustomer.id = key;
            objCustomer.phone = this.parentElement.childNodes[0].value;
            objCustomer.name = this.parentElement.childNodes[1].value;
            objCustomer.email = this.parentElement.childNodes[2].value;
            objCustomer.adress = this.parentElement.childNodes[3].value;
            objCustomer.data = new Date();
            localStorage.setItem(objCustomer.id, JSON.stringify(objCustomer));
          }
        }
        this.value = "Edit |";
        for (let k = 0; k < client.length; k++) {
          this.parentElement.childNodes[k].setAttribute("readonly", "readonly");
          this.parentElement.childNodes[k].style.backgroundColor =
            "transparent";
          this.parentElement.childNodes[k].style.color = "black";
        }
      }
    };
  };
  CreateForm.prototype.delVal = function () {
    this.CreateForm.childNodes[5].onclick = function () {
      this.parentElement.remove();
      for (let m = 0; m < localStorage.length; m++) {
        let keyD = localStorage.key(m);
        values = JSON.parse(localStorage.getItem(keyD));
        if (this.parentElement.childNodes[6].value == keyD) {
          localStorage.removeItem(keyD);
        }
      }
    };
  };
  //loading from lacalStorage
  for (let g = 0; g < localStorage.length; g++) {
    let key = localStorage.key(g);
    let pattern = /[AB]\d+/;
    let answ = key.search(pattern);
    if (answ == 1) {
      value = JSON.parse(localStorage.getItem(key));
      let form = new CreateForm();
      let newCustomer = {};
      form.addLocalValue(0, value.phone);
      form.addLocalValue(1, value.name);
      form.addLocalValue(2, value.email);
      form.addLocalValue(3, value.adress);
      form.addLocalValue(4, "Edit |");
      form.addLocalValue(5, " Delete");
      form.addLocalValue(6, value.id);
      form.addDisplay(6, "none");
      form.editSave(newCustomer);
      form.delVal();
    }
  }
  //add to table
  let count = Math.floor(Math.random() * 1000);
  function addClient() {
    let form = new CreateForm(1);
    let newCustomer = {};
    newCustomer.id = "AB" + count;
    newCustomer.phone = form.addValue(0);
    newCustomer.name = form.addValue(1);
    newCustomer.email = form.addValue(2);
    newCustomer.adress = form.addValue(3);
    newCustomer.data = new Date();
    localStorage.setItem(newCustomer.id, JSON.stringify(newCustomer));
    form.addLocalValue(4, "Edit |");
    form.addLocalValue(5, " Delete");
    form.addLocalValue(6, newCustomer.id);
    form.addDisplay(6, "none");
    form.editSave(newCustomer);
    form.delVal();
    ++count;
  }
  //validation
  let res;
  function validate(elem, patternValue, idHelp) {
    res = elem.value.search(patternValue);
    if (res == -1) {
      elem.style.backgroundColor = "red";
      if (idHelp) {
        $(idHelp).style.visibility = "visible";
      }
    } else {
      elem.style.backgroundColor = "transparent";
      if (idHelp) {
        $(idHelp).style.visibility = "hidden";
      }
    }
  }
  client[0].oninput = function () {
    validate(client[0], /^0\d\d-\d\d\d-\d\d-\d\d$/, "helpTel");
  };
  client[1].oninput = function () {
    validate(client[1], /\S+[ ]*/);
  };
  client[2].oninput = function () {
    validate(
      client[2],
      /\b[a-zA-Z0-9._]+@[a-z0-9.-]+[.][a-z]{2,4}\b/,
      "helpMail"
    );
  };
  client[3].oninput = function () {
    validate(client[3], /\S+[ ]*/);
  };
  // input validation
  let res2;
  function heckInput() {
    for (let q = 0; q < client.length; q++) {
      if (client[q].value == "") {
        res2 = -1;
        return (client[q].style.backgroundColor = "rgb(236, 145, 145)");
      } else {
        res2 = 0;
        client[q].style.backgroundColor = "transparent";
      }
    }
  }
  //input cleaning
  function clean() {
    for (let i = 0; i < client.length; i++) {
      client[i].value = "";
    }
  }
  // add button
  $("save").onclick = function () {
    heckInput();
    if (res == -1 || res2 == -1) {
      $("helpForm").style.visibility = "visible";
      return false;
    } else {
      $("helpForm").style.visibility = "hidden";
    }
    addClient();
    clean();
  };
  //search
  $("serchValue").onclick = function () {
    let arrForm = document.getElementsByTagName("form");
    let finder = 0;
    for (let r = 0; r < arrForm.length - 2; r++) {
      for (let o = 0; o < arrForm[r].length; o++) {
        if (searching[0].value == arrForm[r][o].value) {
          finder = arrForm[r][o];
          arrForm[r][o].style.backgroundColor = " rgb(49, 49, 49)";
          arrForm[r][o].style.color = "white";
          searching[0].value = "";
        }
      }
    }
    finder.onblur = function () {
      finder.style.backgroundColor = " transparent";
      finder.style.color = " black";
    };
  };
  //sort
  $("sortUp").onclick = function () {
    let arrSort = new Array();
    for (let f = 0; f < $("adressBook").childNodes.length; f++) {
      if (f > 2) {
        arrSort.push($("adressBook").childNodes[f]);
      }
    }
    arrSort.sort(function (a, b) {
      if (a[1].value.toLowerCase() > b[1].value.toLowerCase()) {
        return 1;
      }
      if (a[1].value.toLowerCase() < b[1].value.toLowerCase()) {
        return -1;
      }
      if (a[1].value.toLowerCase() == b[1].value.toLowerCase()) return 0;
    });
    for (let a = 0; a < arrSort.length; a++) {
      $("adressBook").appendChild(arrSort[a]);
    }
  };
  $("sortDown").onclick = function () {
    let arrSort = new Array();
    for (let f = 0; f < $("adressBook").childNodes.length; f++) {
      if (f > 2) {
        arrSort.push($("adressBook").childNodes[f]);
      }
    }
    arrSort.sort(function (a, b) {
      if (a[1].value.toLowerCase() > b[1].value.toLowerCase()) {
        return -1;
      }
      if (a[1].value.toLowerCase() < b[1].value.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    for (let a = 0; a < arrSort.length; a++) {
      $("adressBook").appendChild(arrSort[a]);
    }
  };
};
