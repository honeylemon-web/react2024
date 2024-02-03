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

      const btn = document.querySelector('.share');
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
              <h1>C++コード並び替えクイズ</h1>
              <div className="guide">
                <h2>ルール説明</h2>
                <p>最初に「Select」から好きな関数を選ぼう。すると、選んだ関数の説明が現れ、その下に処理が1行ずつ表示されるため、右の欄に正しい順で並べて回答しよう。右の欄では、ひとつ上（または下）に移動、一番上（または下）に移動するボタンで選択した処理を並び替えることができる。また、処理を複数選択することができ、UNCHECKボタンですべての選択を解除することができる。回答する際は、ANSWERボタンを押そう。回答が正しいかどうかは上に表示される。何度も回答できるため正解するまで挑戦してみよう。</p>
              </div>
          </header>


          <main>
             <TransferList />

          </main>

          </>
          
          <Footer /></>
        

  );
}





