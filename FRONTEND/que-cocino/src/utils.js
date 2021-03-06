
const ListOfIngredientsToString = (list) => {
  let result = ''
  for (let i=0; i < list.length; i++) result = result + list[i].name + ' '
  return result
}

const ListOfIngredientsToList = (list) => {
  let result = Array(0)
  for (let i=0; i < list.length; i++) result.push(list[i].name)
  return result
}

export {ListOfIngredientsToString, ListOfIngredientsToList}
