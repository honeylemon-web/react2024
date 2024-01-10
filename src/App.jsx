import * as React from "react";
import { Button } from "@mui/material";
import TransferList from "./transferList";
import SelectFunc from "./select";



export default function ButtonUsage() {
   let shareData = {
        title: 'Function Sort Quiz(FSQ)',
        text: 'Learn Function quickly and easily!',
        url: 'https://main--frolicking-daffodil-4842d9.netlify.app/',
      }

      const btn = document.querySelector('button');
      const resultPara = document.querySelector('.result');

      btn.addEventListener('click', () => {
        navigator.share(shareData)
          .then(() =>
            resultPara.textContent = 'FSQ shared successfully'
          )
          .catch((e) =>
            resultPara.textContent = 'Error: ' + e
          )
      });
      

  return (
    <>
    <header>
      <h1>insert関数</h1>
      <h2>CELL *insert(CELL *prev_cell, int new_value)</h2>
    </header>
    

    <main>
        <>
        
        </>
    
    
        <SelectFunc />
        <TransferList />
        
        </main></>
        

  );
}

//export { default as TransferList } from "./transferList.jsx";




