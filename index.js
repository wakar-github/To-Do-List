const addbtn = document.querySelector('.add-btn');
const inputEl = document.querySelector('.input');
const taskContainer = document.querySelector('.task-container');

let id = 0;
let tasks = [];


addbtn.addEventListener('click', ()=>{

    const text = inputEl.value.trim();
    if(text === "") return 

    let task ={
        taskid: id,
        taskName:text
    }

    tasks.push(task);
    id++;
    saveTolocalStorage();
    renderTask();
    inputEl.value = "";
})

taskContainer.addEventListener('click', (e)=>{

    if (!e.target.classList.contains("del-btn")) return;

    const id = Number(e.target.dataset.id);

    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].taskid === id){
            tasks.splice(i,1);
            break;
        }
    }
    renderTask();
    saveTolocalStorage();
})

function renderTask(){

    taskContainer.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const todo = tasks[i];

        const div = document.createElement('div');
        div.className = 'tasks';

        const span = document.createElement('span');
        span.className = 'task';
        span.textContent = todo.taskName;

        const delbtn = document.createElement('button');
        delbtn.className = 'del-btn'
        delbtn.setAttribute('data-id', todo.taskid);
        delbtn.textContent = "Delete";

        taskContainer.appendChild(div);
        div.appendChild(span);
        div.appendChild(delbtn);
    }
}

function saveTolocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('id', id)
}

function loadFromLocalStorage(){
    const savedTask = JSON.parse(localStorage.getItem('tasks'));
    const savedId = localStorage.getItem('id');
    
    if(savedTask){
      tasks = savedTask;
    }
    if(savedId){
        id = Number(savedId);
    }
}

loadFromLocalStorage();
renderTask();
