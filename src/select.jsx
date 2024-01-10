//let selectArray;

export default function selectFunc(){


    async function fetchFunc(name) {
        const selectedArray = [];
        //const url = `${name}.json`;
        const url = 'functions.json'
        const response = await fetch('users.json');
        return response.json();
    
              //  selectedArray.push(response);

      }
      

      let selectArray = [];

    
    return(
        <form>
            <label htmlFor="function-choose">Choose a function<br></br></label>
            <select id="function-choose" onChange={async (event)=>{
            const name = event.target.value;
            if(name === "insert"){
                const data = await fetchFunc(name);
               // const data = await request.json();
                console.log(data);
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