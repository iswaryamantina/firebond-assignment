const addBtn = document.getElementById("addArg");
const divContainer = document.getElementById("arguments");
const mainContainer = document.getElementById("mainContainer");
const divInput = document.querySelector(".inputsArg").innerHTML;
const selectInput = document.querySelector(".operationContainer");

let left = 0;
let count = 1;
let argumentObject = { "My Arg": false };
const constant = [false, true];

const h1e1 = () => {
  const div = document.createElement("div");
  div.className = "inputsArg";

  let input = document.createElement("input");
  input.type = "text";
  input.value = "My Arg";
  input.onchange = h7e9;

  div.appendChild(input);

  let select = document.createElement("select");
  let option1 = document.createElement("option");
  option1.value = "f";
  option1.text = "false";
  let option2 = document.createElement("option");
  option2.value = "t";
  option2.text = "true";
  select.add(option1);
  select.add(option2);
  select.className = "ArgValue";
  select.onchange = h7e9;
  div.appendChild(select);

  divContainer.appendChild(div);
};

const h7e9 = () => {
  var inputs = document.querySelectorAll('input[type="text"]');
  var selects = document.querySelectorAll(".ArgValue");

  var keyValuePairs = {};

  for (var i = 0; i < inputs.length; i++) {
    var key = inputs[i].value;
    var value = selects[i].value;
    keyValuePairs[key] = value;
  }

  argumentObject = keyValuePairs;
};

const h2o3 = (operation) => {
  let selectBox = document.getElementById(operation);
  let selectedValue = selectBox.value;
  console.log(selectedValue);

  if (selectedValue == "and" || selectedValue == "or") {
    selectBox.innerHTML = `<option value=${
      selectedValue == "and" ? "and" : "or"
    }>${selectedValue == "and" ? "and" : "or"}</option><option value=${
      selectedValue == "and" ? "or" : "and"
    }>${selectedValue == "and" ? "or" : "and"}</option>`;
    selectBox.classList = "andOr";
    console.log(selectBox);
    selectBox.onchange = null;

    left = left + 5;

    for (let i = 1; i <= 2; i++) {
      count++;
      const operationId = `operation${count}`;
      const div = document.createElement("div");
      div.className = "operationContainer";
      div.setAttribute("id", `container${left + i}`);

      let select = document.createElement("select");
      select.innerHTML =
        '<option selected disabled>Select...</option><option value="c">constant</option><option value="a">Argument</option><option value="and">and</option><option value="or">or</option>';
      select.id = operationId;

      select.addEventListener("change", () => h2o3(operationId));
      let btn = document.createElement("button");
      btn.innerText = "x";
      btn.addEventListener("click", () => h5e1(operationId));
      div.appendChild(select);
      div.appendChild(btn);

      div.style.marginLeft = `${left}px`;
      mainContainer.appendChild(div);
    }

    let btnAddop = document.createElement("button");
    btnAddop.innerText = "+add op";
    btnAddop.addEventListener("click", addOperation);

    const main = document.getElementById("mainBox");
    main.appendChild(btnAddop);
  } else if (selectedValue === "c") {
    selectBox.innerHTML =
      '<option value="t">true</option><option value="f">false</option>';
    selectBox.classList = "result";
  } else if (selectedValue === "a") {
    selectBox.innerHTML = "";

    for (var key in argumentObject) {
      var option = document.createElement("option");
      option.value = argumentObject[key];
      option.text = key;
      selectBox.add(option);
    }
    selectBox.classList = "result";
  }

  h3d7();
};

function addOperation() {
  count++;
  const operationId = `operation${count}`;
  const div = document.createElement("div");
  div.className = "operationContainer";

  let select = document.createElement("select");
  select.innerHTML =
    '<option selected disabled>Select...</option><option value="c">constant</option><option value="a">Argument</option><option value="and">and</option><option value="or">or</option>';
  select.id = operationId;

  select.addEventListener("change", () => h2o3(operationId));
  let btn = document.createElement("button");
  btn.innerText = "x";
  btn.addEventListener("click", () => h5e1(operationId));
  div.appendChild(select);
  div.appendChild(btn);

  div.style.marginLeft = `${left}px`;
  mainContainer.appendChild(div);
}

function h5e1(selectId) {
  let select = document.getElementById(selectId);
  select.innerHTML =
    '<option selected diabled>Select...</option><option value="constant">constant</option><option value="Argument">Argument </option><option value="and">and</option><option value="or">or</option> ';
}

const h3d7 = () => {
  let divs = document.querySelectorAll(".operationContainer");
  let expression = "";

  divs.forEach((div) => {
    let select = div.querySelector("select");
    let selectedValue = select.value;

    if (selectedValue === "c" || selectedValue === "a") {
      expression +=
        selectedValue === "c"
          ? select.options[select.selectedIndex].text
          : argumentObject[select.options[select.selectedIndex].text];
    } else {
      expression += selectedValue;
    }
  });

  let result = eval(expression);
  document.getElementById("result").innerHTML = "result: " + result;
};
