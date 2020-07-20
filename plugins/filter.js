//删除某一项
export const DeleteEle = (arr, ele) => {
  let index = arr.indexOf(ele);
  arr.splice(index, 1)
}
