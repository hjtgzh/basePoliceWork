
const storage = window.sessionStorage
const storageKey = "formValues"

export function setFormStorageItem(fields = {},key){
	const locationStr = getLocation()
	const keyStr = key || locationStr
	const formValues = JSON.parse(getFormValues())
	formValues[keyStr] = {...fields}
	insertToFormValues(formValues)
}

export function getFormStorageItem(key){
	const locationStr = getLocation()
	const keyStr = key || locationStr
	const formValues = JSON.parse(getFormValues())
	return formValues[keyStr] 
}

export function removeFormStorageItem(key){
	const locationStr = getLocation()
	const keyStr = key || locationStr
	const storage = getStorageObj()
	const formValues = JSON.parse(getFormValues())
	delete formValues[keyStr]
	insertToFormValues(formValues)
}

export function removeFormStorage(){
	const key = getStorageKey()
	const storage = getStorageObj()
	storage.removeItem(key)
}

export function getStorageKey(){
	return storageKey || "formValues"
}

function insertToFormValues(formValues){
	const key = getStorageKey()
	const storage = getStorageObj()
	storage.setItem(key,JSON.stringify(formValues))
}


function getFormValues(){
	const key = getStorageKey()
	const storage = getStorageObj()
	return storage.getItem(key) || {}
}

function getLocation(){
  return location.pathname || getLocationFormUrl()
}

function getLocationFormUrl(){
	const url = window.location.href
	return url.subString(url.indexOf("#")+1)
}

function getStorageObj(){
	return storage || window.sessionStorage
}

