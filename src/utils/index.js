export function mergeSort(array) {
  if (array.length <= 1) {
    return array
  }
  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const array = [];

  while (left.length && right.length) {
    if (left[0][1].totalPoints > right[0][1].totalPoints) {
      array.push(left.shift());
    } else {
      array.push(right.shift())
    }
  }

  return array.concat(left.slice()).concat(right.slice());
}

export function countSelected(queensList, category) {
  let count = 0;
  queensList.forEach((queen) => {
    if (queen.selected[category]) {
      count++;
    }
  })
  return count;
}

export function isAlreadySelected(queen) {
  const numSelected = Object.values(queen.selected).filter(Boolean).length;
  if (numSelected > 0) {
    return true;
  }
  return false;
}