import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
//import { selectArray } from './select';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}


export default function TransferList() {
  //  console.log(selectArray);
  const arrayA = ["a","b","c"];
  const arrayB = ["d","e"];
  const correctA = ["b","a","c"];
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(arrayA);
  const [right, setRight] = React.useState([]);
  const [judge,setJudge] = React.useState(false);
  const correctArray = correctA;
  const [judgeMes,setJudgeMes] = React.useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const isCorrect = (array,correctArray)=>{
    const filteredArray = array.filter((currentValue, index) =>{
        return currentValue === correctArray[index];
    });
    console.log(array);
    console.log(correctArray);
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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    //もし、right配列と正解配列の中身が等しいならば正解と表示
    if(isCorrect(right.concat(left),correctArray)){
        setJudge(true);
        setJudgeMes("正解！");
    }else{
        setJudge(false);
        setJudgeMes("不正解！");
    }
    //console.log(right.concat(left));
   // console.log(isCorrect(right.concat(left),correctArray));
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

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
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
    <><>
    
          <p>{judge ? "" :"左の枠に正しい順で並べ、一気に右の枠に回答を送ってね"}</p>
          <p><strong>{judgeMes}</strong></p>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
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
                  </Grid>
              </Grid>
              <Grid item>{customList(right)}</Grid>
          </Grid></>
          </>
  );
}

//export {judge};