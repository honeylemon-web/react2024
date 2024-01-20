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
  //const correctArray = correctPostOrder;
  const [correctArray,setCorrectArray] = React.useState("");
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
    if(isCorrect(right,correctArray)){
      setJudge(true);  
      setJudgeMes("正解！");
    }else{
      setJudge(false);
      setJudgeMes("不正解！");
    }
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

  const customList = (items) => (
    <Paper sx={{ width: 350, height: 300, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
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
      setCorrectArray(data.A);
      setJudgeMes("");
      console.log(data.A);    
      setSelectArray(data);
    } }>
      <option selected disabled>Select</option>
      <option value="insert">insert</option>
      <option value="tutorial">tutorial</option>
      <option value="print_post_order">print_post_order</option> 
    </select>
  </form>
  <article className='balloon1'>
      <h1>{funcName}関数</h1>
      <p>
        {funcName === "insert" ? <span className='css-br'>アルゴリズム : 双方向リスト( 連結リスト )</span>: ""}
        {funcName === "insert" ? "内容 : prev_cellの次に新しいノードを挿入する関数である。" : ""} 
        {funcName === "tutorial" ? "アルファベット順に並べ、ANSWERを押して回答してみよう!":""}
        {funcName === "print_post_order" ? <span className='css-br'>アルゴリズム : 二分木</span> : ""}
        {funcName === "print_post_order" ? "内容 : pを根ノードとする二分木に対して帰りがけ順で走査をする関数である。" : ""}
        <span className='css-br'></span>
        <span className='css-br'></span>
        <p className='define'>
          
          {funcName === "insert" ? "CELL *insert(CELL *prev_cell, int new_value)" : ""}
          {funcName === "print_post_order" ? "void post_order(BITREE_NODE *p)" : ""}
       </p>
      </p>
    </article>
    <p>{judge ? "" : "右の枠に正しい順で並べて「ANSWER」で回答を送ろう"}</p><p>
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
            onClick={handleCheckedDown}
            disabled={rightChecked.length === 0}
            aria-label="down"
          >
            ↓↓
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={answer}
            disabled={right.length === 0}
            aria-label="answer"
          >
            Answer
          </Button>
        </Grid>
      </Grid>
    </Grid>
      </>

  );

} 
