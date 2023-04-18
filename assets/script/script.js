let inputFaild = document.querySelector(`input[type="text"]`);
let Btn = document.querySelector(`.Add-Task`);
let divTasks = document.querySelector(`.tasks`);
let ClearBtn = document.querySelector(".Clear");

// Build New Array Of Tasks
let arrayOfTasks = [];
ClearBtn.onclick = () => {
    localStorage.clear();
    divTasks.innerHTML = "";
    arrayOfTasks = [];
}
if (localStorage.getItem("Tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
    addElemToDivTasks(arrayOfTasks);
}

Btn.onclick = () => {
    if(inputFaild.value != "") {
        addNewElementToArray(inputFaild.value);
        inputFaild.value = "";
    }
};

function addNewElementToArray(task) {
    const Task = {
        id : Date.now(),
        title : task ,
        completed : false
    }
    arrayOfTasks.push(Task);

    //Add Array Elements To The Div Tasks
    addElemToDivTasks(arrayOfTasks);


    //Add Array To Local Storage
    addArrTolocalStorage(arrayOfTasks);
}


function addElemToDivTasks(arrayOfTasks) {
    divTasks.innerHTML = '';
    arrayOfTasks.forEach(element => {
        let DivTask = document.createElement("div");
        DivTask.setAttribute("data-id", element.id);
        DivTask.classList.add("task");
        DivTask.append(element.title);
        let Span = document.createElement("span");
        Span.appendChild(document.createTextNode("Delete"));
        Span.classList.add('delete');
        if (element.completed) {
            DivTask.classList.add("done");
        }
        else {
            DivTask.classList.remove("done");
        }
        DivTask.appendChild(Span);
        
        divTasks.appendChild(DivTask);
    });
}

function addArrTolocalStorage(arrayOfTasks) {
    localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

document.addEventListener ("click", (element) => {
    if(element.target.classList.contains("delete")) {
        element.target.parentElement.remove();
        DeleteElementById(element.target.parentElement.dataset.id);
    }
    if(element.target.classList.contains("task")) {
        element.target.classList.toggle("done");
        changeStatusElementForCompleted(element.target.dataset.id);
    }
});

function DeleteElementById(taskId) {
    arrayOfTasks = arrayOfTasks.filter(function (el) {
        return el.id != taskId;
    });
    addArrTolocalStorage(arrayOfTasks);
}



function changeStatusElementForCompleted(taskId) {
    for (let i=0;i<arrayOfTasks.length;i++) {
        if(arrayOfTasks[i].id == taskId ) {
            if(arrayOfTasks[i].completed ==false) {
                arrayOfTasks[i].completed = true;
            }
            else {
                arrayOfTasks[i].completed = false;
            }
        }
        addArrTolocalStorage(arrayOfTasks);
    }
}