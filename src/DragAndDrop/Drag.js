export default function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop
// https://www.ag-grid.com/react-data-grid/drag-and-drop/