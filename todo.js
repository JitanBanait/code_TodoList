let inputArea = document.getElementById("inputArea");
let parentList = document.getElementById("parentList");
let rightContainer = document.getElementById("rightContainer");

let todoTasks = [];
let idCount = 0;
inputArea.value = "";
let editFlag = 0;
let editPencilFlag = 0;

// --------------------- Function of Create LI Element ------------------//
function createLiElement(task,id,checked){
     let liElement = document.createElement("li");
        liElement.setAttribute("id",id);
        let p = document.createElement("p");
        p.setAttribute("class","textPara");
        p.id=id+"txt";

        p.innerText = task;
        if(checked){
             p.style.textDecoration = "line-through"
        }
        liElement.appendChild(p);

        let crossTag = document.createElement("i");
        crossTag.setAttribute("class","bi bi-x-lg");
    
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("class","checkbox");
        checkBox.checked = checked;

        let EditPencil = document.createElement("i");
        EditPencil.setAttribute("class","bi bi-pencil-fill");

        let divFeature = document.createElement("div");
        divFeature.setAttribute("class","divFeature");
        divFeature.appendChild(EditPencil);
        divFeature.appendChild(checkBox);
        divFeature.appendChild(crossTag);
        liElement.appendChild(divFeature);
        parentList.appendChild(liElement);
        let singleTaskObj = new Object()
        singleTaskObj.task = task;
        singleTaskObj.id = id;
        singleTaskObj.checked = checked;
        idCount = id;
        todoTasks.push(singleTaskObj);

        crossTag.addEventListener("click",function(event){
         //   console.log(id);
              parentList.removeChild(liElement) ;
              let parseLocalStorageTask = getData();
              let afterDelete = parseLocalStorageTask.filter((task)=>{
                  return task.id !== Number(id);
              })
              toStoreData(afterDelete);
          })

        checkBox.addEventListener("click",function(event){
            let parseLocalStorageTask = getData();
            parseLocalStorageTask.forEach((task)=>{
                if(task.id === Number(id)){
                    task.checked = event.target.checked;
                    if(task.checked){
                        p.style.textDecoration = "line-through"
                    }else{
                        p.style.textDecoration = "none"
                    }
                 }
            })
            toStoreData(parseLocalStorageTask);
        })
        
        EditPencil.addEventListener("click",function(event){
            //rightContainer.removeChild(rightContainer.lastChild);
            let editElement = document.getElementById(id)
            let editElementId = id;
            let tempText = editElement.innerText;
            let textArea = document.createElement("textArea");
            textArea.setAttribute("class","editArea");
            let allPencil = document.querySelectorAll(".bi-pencil-fill")
            allPencil.forEach(function(element) {
                element.style.display = 'none';
            });
            inputArea.style.display = 'none';
            rightContainer.appendChild(textArea);
            textArea.innerText = editElement.innerText;
            let temp = document.getElementById(editElementId+"txt");
            textArea.addEventListener("keydown",function(event){
                if(event.keyCode === 13){
                    event.preventDefault();
                   if(textArea.value.trim() != ""){
                       
                       temp.innerText = textArea.value.trim();
                       let parseLocalStorageTask = getData();
                       parseLocalStorageTask.forEach((task)=>{
                           if(task.id === Number(editElementId)){
                               task.task = textArea.value;
                           }
                       })
                       toStoreData(parseLocalStorageTask);
                      
                       inputArea.style.display = "block";
                       allPencil.forEach(function(element) {
                        element.style.display = 'block';
                    });
                       rightContainer.removeChild(event.target);
                   }else{
                     alert("Enter valid Data");
                     console.log( textArea);
                     textArea.value = tempText;
                   }
                    }
            })
        })
        
}


// -------------------- Function to Get Data From Local Storage -----------------------//

function getData(){
    let localStorageTask = localStorage.getItem("todoTasks");
    let parseLocalStorageTask = JSON.parse(localStorageTask) || [];
    return parseLocalStorageTask;
}

// ---------------------- Function to store Data in Local Storage ------------------//

function toStoreData(obj){
    localStorage.setItem("todoTasks",JSON.stringify(obj));
}

// --------------------GET LOCAL STORAGE ------------------

function appendLiFromLocalStorage(){
    let parseLocalStorageTask = getData();

    if(parseLocalStorageTask.length){
        parseLocalStorageTask.forEach((task)=>{
            createLiElement(task.task,task.id,task.checked);
        })
    
    }

}
appendLiFromLocalStorage();

// ---------------------INSERT -----------------------




inputArea.addEventListener("keydown",function(event){
    if(event.keyCode === 13){
        if(inputArea.value.trim() != ""){
            
            console.log(inputArea.value);
            event.preventDefault();
            idCount++;
            createLiElement(inputArea.value.trim(),idCount,false);
              toStoreData(todoTasks);
              inputArea.value = "";
        }else{
            alert("Enter valid Data");
            event.preventDefault();
            inputArea.value = "";
        }
        }
    
});