//let selectArray;

export default function selectFunc(){


 /*   async function fetchFunc(name) {
        const url = `${name}.json`;
        const response = await fetch(url);
        return response.json().then((value)=>value);
      }
      */

      let selectArray = [];

    
    return(
        <form>
            <label htmlFor="function-choose">Choose a function<br></br></label>
            <select id="function-choose" onChange={(event)=>{
            const name = event.target.value;
            if(name === "A"){
                selectArray = ["a","b","c"];
            }else if(name === "B"){
                selectArray = ["d","e"];
            }
           // setContent(text);
          }}>
              <option value="insert">insert</option>
              <option value="B">BBB</option>
             
            </select>
        </form>
    );
}

//export {selectArray};