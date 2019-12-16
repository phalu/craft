import React from 'react'

// helper function to create react elements
function createElement(layer:any, list?: any): any {
	let children: string | any[] = layer.type

	// calls transformer function recursively for children
	if (layer.type == 'SymbolInstance' || layer.type == 'Group') {
		children = transformer(list[1])
	}
	return React.createElement('div',{}, children)
}


//transforms sketch layers to HTML
export default function transformer(list:any[]):any[] {
	let newList: any[] = []

	// base case
	if(list.length === 0) {
		return newList
	}

	let currentLayer:any = list[0]

	// check for groups
	if (currentLayer.type == 'SymbolInstance' || currentLayer.type == 'Group') {
		newList.push(createElement(currentLayer,list))

		// slicing out the group and its children layers
		newList = newList.concat(transformer(list.slice(2)))
	} else {
		newList.push(createElement(currentLayer))

		// concat and return list
		newList = newList.concat(transformer(list.slice(1)))
	}
	return newList
}
