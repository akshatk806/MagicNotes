// If user add a note, add it to local storage

showNotes();

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(event){
    let addTxt=document.getElementById('addTxt');
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];    // Empty array
    } 
    else{
        notesObj=JSON.parse(notes);   // convert the string to Array
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));  // only string is added into localStorage
    addTxt.value=""; 
    // console.log(notesObj);

    showNotes(); 
});


// Function to show elements from local storage
function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];    // Empty array
    } 
    else{
        notesObj=JSON.parse(notes);   // convert the string to Array
    }
    let html="";
    notesObj.forEach(function(element,index){
        html+=`<div class="noteCard card m-2" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Notes ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    }); 

    let notesElem=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes. `;
    }
}



// Function to delete a note
function deleteNote(index){
    // console.log("I am deleting",index);
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];    
    } 
    else{
        notesObj=JSON.parse(notes);   
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}



let search=document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputVal=search.value.toLowerCase();
    // console.log("Input event fired",inputVal);
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display='block';
        }
        else{
            element.style.display='none';
        }
        // console.log(cardTxt);
    });
});
