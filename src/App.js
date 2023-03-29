import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import ItemCatalog from "./ItemCatalog";
import RenderSquare from "./RenderComponents/RenderSquare";
import Happy from "./happy.png";
import Cry from "./CRY.png";
import Cool from "./Cool.png";
import RenderGrid from "./RenderComponents/RenderGrid";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Items ophalen
  const getItems = () => {
    fetch('http://localhost:8080/api/Item/items')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setItems(data);
        }).catch((err) => {
      console.log(err.message);
    });
  }


  const addItems = async (name, description) => {
    await fetch('http://localhost:8080/api/Item/addItem', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((err) => {
          console.log(err.message);
        });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addItems(name, description);
  };

  const [showCatalog, isShowCatalog] = useState(false)

  const handleClick = (e) => {
    getItems()
    isShowCatalog(!showCatalog)
  }


  return (
      <div>
          <label>CI Commit</label>
        <form onSubmit={handleSubmit}>
          <input type="text" className="small-input" value={name}
                 onChange={(e) => setName(e.target.value)}
          />

          <textarea name="" className="small-input" id="" cols="10" rows="8"
                    value={description} onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Add Items</button>

        </form>

        <div className={"row"}>
          <div className={"column"}>
            {!showCatalog && <button className={"small-input"} onClick={handleClick}>Get all items</button>
               || <ItemCatalog items={items} /> }
          </div>
        </div>
        <br/><br/>
        <div className={"row"}>
          <div className={"column"}>
            <RenderGrid/>
          </div>
        </div>
      </div>
  );
}

export default App;
