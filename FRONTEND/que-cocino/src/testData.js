
const pizzaTarradellas = {
	'name': 'Pizza',
	'description': 'Put it in the oven',
	'ingredients': [{'name': 'casa-tarradellas'}]
}

const pizzaClassica = {
	'name': 'Pizza',
	'description': 'Put it in the oven',
	'ingredients': [{'name': 'dough'}, {'name': 'cheese'}, {'name': 'tomato'}]
}

const curryBoar = {
        'name': 'Curry boar',
        'description': 'Make it into the fire',
        'ingredients': [
            {'name': 'Boar'},
            {'name': 'Curry!'}
        ]
    }

const lentejas = {
  'name': 'lentejas',
  'description': 'Buenisimas lentejas con chorizo con energia para todo el dia',
  'ingredients': [
    {'name': 'chorizo'},
    {'name': 'agua'},
    {'name': 'morcilla'},
    {'name': 'OPCIONAL: lentejas'}
  ]
}

const allRecipes = [pizzaClassica, pizzaTarradellas, curryBoar, lentejas]


export {pizzaClassica, pizzaTarradellas, curryBoar, lentejas, allRecipes}
