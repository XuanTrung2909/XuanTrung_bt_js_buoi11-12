
var taskList = new TaskService();

var valid = new Validation();

var taskArr = [];




function getAllTask() {
    var promise = taskList.getAllTask();

    promise.then(function (result) {
        taskArr = result.data;
        console.log(taskArr);
        createTable(result.data);
    })
    promise.catch(function (error) {
        console.log(error);
    })
}

getAllTask();



function createTable(arr) {
    var contentToDo = ``;
    var contentDone = ``;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].status === "todo") {
            contentToDo += `
                <li>
                    <span>${arr[i].taskName}</span>
                    <div>
                        <button style="border:none" onclick="deleteTask(${arr[i].id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button style="border:none" onclick = "changeStatusTask(${arr[i].id})">
                            <i class="far fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `
        } else {
            contentDone += `
                <li>
                    <span style="color:green">${arr[i].taskName}</span>
                    <div>
                        <button style="border:none; color:green" onclick="deleteTask(${arr[i].id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button style="border:none; color:green" onclick = "changeStatusTask(${arr[i].id})">
                            <i class="fas fa-undo-alt"></i>
                        </button>
                    </div>
                </li>
            `
        }
    }

    getEle("todo").innerHTML = contentToDo;
    getEle("completed").innerHTML = contentDone;
}

getEle("addItem").addEventListener("click", function () {
    var task = getTaskDetail();
    if (task) {
        var promise = taskList.addTask(task);
        promise.then(function () {
            getAllTask();
            alert("Add Task Success");
        })
        promise.catch(function (error) {
            console.log(error);
        })
        getEle("newTask").value = "";
    }

})

function deleteTask(id) {

    var promise = taskList.deleteTask(id);
    promise.then(function () {
        getAllTask();
        alert("Delete Task Success");
    })
    promise.catch(function (error) {
        console.log(error);
    })
}

function changeStatusTask(id){
    var promise = taskList.getTaskById(id);
    promise.then(function(result){
        if(result.data.status === "todo"){
            result.data.status = "complete";
        }else{
            result.data.status = "todo";
        }
        updateTask(id, result.data);
        alert("Change Task Success");
    })
    promise.catch(function(error){
        console.log(error);
    })
}
function updateTask(id, task){
    var promise = taskList.updateTask(id, task);
    promise.then(function(result){
        getAllTask();
    })
    promise.catch(function(error){
        console.log(error);
    })
}






function getTaskDetail() {
    var id = '';
    var taskName = getEle("newTask").value;
    var status = "todo";

    var isvalid = true;

    isvalid = valid.checkNull(taskName, "spanErr", "(*) Phải nhập giá trị vào") && valid.checkDuplicate(taskName, "spanErr", "(*) taskname bị trùng", taskArr);
    if (isvalid) {
        var task = new Task(id, status, taskName);
        return task;
    }
}

// function updateTask(id, task) {
//     var promise = taskListService.updateTask(id, task);
//     promise.then(function () {
//         getAllTask();
//     })
//     promise.catch(function (error) {
//         console.log(error);
//     })
// }

function getEle(id) {
    return document.getElementById(id);
}