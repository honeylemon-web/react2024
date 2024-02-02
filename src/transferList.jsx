import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { colors } from '@mui/material';


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function minIndex(a, b){//aはrightchecked、bはright
  let min = b.indexOf(a[0]);
  a.forEach((value) => {
    if(b.indexOf(value) < min){
      min = b.indexOf(value);
    }
  });
  return min;
}

function maxIndex(a, b){//aはrightchecked、bはright
  let max = b.indexOf(a[0]);
  a.forEach((value) => {
    if(b.indexOf(value) > max){
      max = b.indexOf(value);
    }
  });
  return max;
}


async function fetchFunc(name) {
  // console.log("function ")
  // const selectedArray = [];
   const url = `${name}.json`;
   const response = await fetch(url);
   return response.json();
}


export default function TransferList() {
  const [selectArray, setSelectArray] = React.useState([""]); 
  const [funcName,setFuncName] = React.useState("");


  //const [question,setQuestion] = React.useState(selectedArray);

  //const arrayA = ["return new_cell;","prev_cell->next = new_cell;","new_cell->prev = prev_cell;","if(new_cell->next != NULL){","CELL *new_cell;","new_cell = (CELL *)malloc(sizeof(CELL));","}","new_cell->next->prev = new_cell;","new_cell->value = new_value;","new_cell->next = prev_cell->next;"];
  const correctA = ["CELL *new_cell;","new_cell = (CELL *)malloc(sizeof(CELL));","new_cell->value = new_value;","new_cell->next = prev_cell->next;","new_cell->prev = prev_cell;","prev_cell->next = new_cell;","if(new_cell->next != NULL){","new_cell->next->prev = new_cell;","}","return new_cell;"];
  const correctB = ["a","b","c","d","e","f","g"];
  const correctPostOrder = ["if(p->left != NULL){","post_order(p->left);","printf(\"->\");\\\\1個目","}\\\\1個目","if(p->right != NULL){","post_order(p->right);","printf(\"->\");\\\\2個目","}\\\\2個目","printf(\"%d\",p->value);"];

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(selectArray);
  const [right, setRight] = React.useState([]);
  const [judge,setJudge] = React.useState(false);
  //const correctArrays = correctPostOrder;
  const [correctArrays,setCorrectArrays] = React.useState([]);
  const [judgeMes,setJudgeMes] = React.useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const isCorrect = (array,correctArray)=>{
    const filteredArray = array.filter((currentValue, index) =>{
        return currentValue === correctArray[index];
    });
    return filteredArray.length === correctArray.length;
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const answer = () =>{
    const TF = [];
    for(let i = 0;i < correctArrays.length;i++){
      TF.push(isCorrect(right, correctArrays[i]));
    }

    if(TF.indexOf(true) !== -1){
      setJudge(true);  
      setJudgeMes("正解！");
    }else{
      setJudge(false);
      setJudgeMes("不正解！");
    }

    
  }

  const uncheck = () =>{
    setChecked([]);
  }

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleCheckedDown = () => {
    const removeCheckedRight = not(right, rightChecked);
    setRight(removeCheckedRight.concat(rightChecked));
    setChecked(not(checked, rightChecked));//右の欄だけdown可能
  };

  const handleCheckedUp = () => {
    const removeCheckedRight = not(right, rightChecked);
    setRight(rightChecked.concat(removeCheckedRight));
    setChecked(not(checked,rightChecked));
  };

  const handleCheckedNext = () => {
    const nextIndex = minIndex(rightChecked, right) + 1;
    const removeCheckedRight = not(right, rightChecked);
    setRight(removeCheckedRight.toSpliced(nextIndex, 0, ...rightChecked));
    //setChecked(not(checked,rightChecked));
  };

  const handleCheckedBack = () => {
    const backIndex = minIndex(rightChecked, right) - 1;
    const removeCheckedRight = not(right, rightChecked);
    setRight(removeCheckedRight.toSpliced(backIndex, 0, ...rightChecked));
    //setChecked(not(checked,rightChecked));
  };

  const customList = (items) => (
    <Paper sx={{ width: 350, height: 300, overflow: 'auto', backgroundColor:'#eaedf2' }} className='paper' >
      <List dense component="div" role="list" className='list'> 
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          let cl = "#353535";

          if(value.indexOf("->") !== -1){
            cl = "#005af7"
          }

          if(value.indexOf("if") !== -1){
            cl = "chocolate"
          }

          if(value.indexOf("if") !== -1){
            cl = "chocolate"
          }

          if(value.indexOf("while") !== -1){
            cl = "#ce1417"
          }

          if(value.indexOf("while") !== -1){
            cl = "#ce1417"
          }

          

          if(value.indexOf("return") !== -1){
            cl = "mediumvioletred"
          }

          if(value.indexOf("malloc") !== -1 || value.indexOf("free") !== -1){
            cl = "olivedrab"
          }
                   
          if(value.indexOf("post_order") !== -1){
            cl = "#cea800"
          }

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
              className='listItem'
            >
              <ListItemIcon className='listItemIcon'>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  sx={{
                    /*color: "#1E90FF",*/
                    '&.Mui-checked': {
                      color: "#1E90FF",
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText
                 id={labelId} 
                 primary={`${value}`}
                 primaryTypographyProps={{
                  color: cl,
                  fontWeight: 'medium',
                  variant: 'body2',
                 }}
                 className='listItemText'/>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

 

return (
    
        <><form>
    <label htmlFor="function-choose"></label>
    <select id="function-choose" onChange={async (event) => {
      const name = event.target.value;
      setFuncName(name);
      const data = await fetchFunc(name);
      console.log(data);
      console.log(data.Q);
      setLeft(data.Q);
      setRight([]);
      setChecked([]);
      setCorrectArrays(data.A);
      setJudgeMes("");
      console.log(data.A);    
      setSelectArray(data);
      setJudge(false);
    } }>
      <option selected disabled>Select</option>
      <option value="tutorial">tutorial</option>
      <option value="insert">insert</option>
      <option value="concat_two_list">concat_two_list</option>
      <option value="print_post_order">print_post_order</option>
    </select>
  </form>
  <article className='balloon1'>
      <h1>{funcName}関数</h1>
      <p>
        
        {funcName === "insert" ? <span className='css-br'><span className='h'>アルゴリズム : </span><span className='s'>双方向リスト( 連結リスト )</span></span>: ""}
        {funcName === "insert" ? <span><span className='h'>内容 : </span><span className='s'>"prev_cellの次にnew_valueを値に持つ新しいノードを挿入する。</span></span> : ""} 
        {funcName === "tutorial" ? <span className='s'>アルファベット順に並べ、ANSWERを押して回答してみよう!</span>:""}
        {funcName === "print_post_order" ? <span className='css-br'><span className='h'>アルゴリズム : </span><span className='s'>二分木</span></span> : ""}
        {funcName === "print_post_order" ? <span><span className='h'>内容 : </span><span className='s'>引数pを根ノードとする二分木に対して帰りがけ順で走査をして値を出力する。</span></span> : ""}     
        {funcName === "concat_two_list" ? <span className='css-br'><span className='h'>アルゴリズム : </span><span className='s'>双方向リスト( 連結リスト )</span></span>: ""}
        {funcName === "concat_two_list" ? <span><span className='h'>内容 : </span><span className='s'>2つの連結リストが与えられたときに、1つ目の末尾に2つ目のリストの各ノードを順番に連結させる。各連結リストの先頭にはダミーノードがセットされている。</span></span> : ""}

        <span className='css-br'></span>
       
       
       {funcName === "insert" ? <span className='css-br'><span className='h'>条件 : </span><span className='c'>新たなセルを作り、値としてnew_valueを代入してからポインタの差し替えを行うこと。</span></span>: ""}
      </p>
      <span className='css-br'></span>

      <p className='define'>
          
          {funcName === "insert" ? "CELL *insert(CELL *prev_cell, int new_value)" : ""}
          {funcName === "print_post_order" ? "void post_order(BITREE_NODE *p)" : ""}
          {funcName === "concat_two_list" ? "void concat_two_list(CELL *head1, CELL *head2)" : ""}
       </p>
    </article>
    <p className='e'>{judge ? "" : "右の枠に正しい順で並べて「ANSWER」で回答を送ろう"}</p><p>
      <strong>{judgeMes}</strong>
      
    </p><Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedUp}
            disabled={rightChecked.length === 0}
            aria-label="up"
          >
            ↑↑
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedBack}
            disabled={rightChecked.length === 0 || minIndex(rightChecked, right) === 0}
            aria-label="back"
          >
            ↑
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedNext}
            disabled={rightChecked.length === 0 || maxIndex(rightChecked, right) === right.length-1}
            aria-label="next"
          >
            ↓
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedDown}
            disabled={rightChecked.length === 0}
            aria-label="down"
          >
            ↓↓
          </Button>         
        </Grid>
      </Grid>
      <Grid 
        item
        className='right-box'  
        
      >
        {customList(right)}
      </Grid>
    </Grid>
    <Grid item>
    <button href="#"
            onClick={uncheck}
            className="btn-square-uncheck" 
            disabled={checked.length === 0}
            aria-label="uncheck"
          >
            UNCHECK
    </button>
      <button href="#"
            onClick={answer}
            className="btn-square" 
            disabled={right.length === 0}
            aria-label="answer"
          >
            ANSWER
    </button>
    </Grid>
   </>

  );

} 
