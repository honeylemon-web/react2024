import * as React from "react";
import TransferList from "./transferList";
import Footer from "./footer";
//import WebShare from "./WebShare";



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
/* Web Share API 
License

By obtaining and/or copying this work, you (the licensee) agree that you have read, understood, and will comply with the following terms and conditions.
Permission to copy, modify, and distribute this work, with or without modification, for any purpose and without fee or royalty is hereby granted, provided that you include the following on ALL copies of the work or portions thereof, including modifications:
•	The full text of this NOTICE in a location viewable to users of the redistributed or derivative work.
•	Any pre-existing intellectual property disclaimers, notices, or terms and conditions. If none exist, the W3C software and document short notice should be included.
•	Notice of any changes or modifications, through a copyright statement on the new code or document such as "This software or document includes material copied from or derived from [title and URI of the W3C document]. Copyright © [$year-of-document] World Wide Web Consortium. https://www.w3.org/copyright/software-license-2023/"

*/
      

  return (
    <><>
          <header>
              <h1>コード並び替えクイズ</h1>
              <h2>このページの使い方</h2>
              <p>最初にオプションから好きな関数を選ぶ。処理が1行ずつ表示されるため、左の欄に正しい順序で処理が並ぶように移動させ、左の欄の選択肢全てを右の欄に移動させる（移動ボタンの一番上を押す）ことで回答できる。回答が正しいかどうかは上に表示される。何度も回答することが可能である。</p>
          </header>


          <main>
             <TransferList />

          </main>

          </>
          
          <Footer /></>
        

  );
}

//export { default as TransferList } from "./transferList.jsx";




