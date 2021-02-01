function TaskService(){
    this.getAllTask = function(){
        return axios({
            url: 'https://6006de003698a80017de21f8.mockapi.io/api/ToDoList',
            method: 'GET',
            responseType: 'json',
        })
    }
    this.addTask = function(task){
        return axios({
            url: 'https://6006de003698a80017de21f8.mockapi.io/api/ToDoList',
            method: "POST",
            data: task,
        })
    }
    this.deleteTask = function(id){
        return axios({
            url: `https://6006de003698a80017de21f8.mockapi.io/api/ToDoList/${id}`,
            method: 'DELETE',
        })
    }
    this.getTaskById = function(id){
        return axios({
            url: `https://6006de003698a80017de21f8.mockapi.io/api/ToDoList/${id}`,
            method: 'GET',
        })
    }
    this.updateTask = function(id, task){
        return axios({
            url: `https://6006de003698a80017de21f8.mockapi.io/api/ToDoList/${id}`,
            method: 'PUT',
            data: task,
        })
    }
}