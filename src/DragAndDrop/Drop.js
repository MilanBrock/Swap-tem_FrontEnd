export default function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
// https://www.ag-grid.com/react-data-grid/drag-and-drop/