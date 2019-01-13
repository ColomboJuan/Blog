console.log('Init app')

// Globales

var LOCAL_KEY = 'postList'

// Carga inicial

var postList = getLocalList(LOCAL_KEY)

console.log('Fuente de verdad inicial ', postList)

var mainListNode = document.getElementById('mainList')

var post

for (var i = 0; i < postList.length; i++) {
  post = createPostNode(postList[i])

  mainListNode.appendChild(post)
}

// Campos
var postNode
var nameNode =document.getElementById('name')
var contentNode =document.getElementById('post')


// Agregar el estudiante

var addStudentButtonNode = document.getElementById('addStudentButton')

var deletePostButtonNode = document.getElementById('DeletePostButton')


addStudentButtonNode.onclick = addPost
deletePostButtonNode.onclick =deletePost



function addPost () {
  
  
  var nameValue = nameNode.value
  var postValue = contentNode.value
  var idValue = idPost
  

  var post = {
    name: nameValue,
    postContent: postValue,
    id:idPost  
    }

  postList.push(post)

  setLocalList(LOCAL_KEY, postList)

  var postNode = createPostNode(post)

  mainListNode.appendChild(postNode)

  nameNode.value = ''
  contentNode.value = ''
  


  console.log('Fuente de verdad luego de agregar ', postList)
}

// Funciones auxiliares


  var idPost=0
function createPostNode (newPost) {
  // Creo el nodo li
  var liNode = document.createElement('li')



  // Le setteo el id al nodo
  liNode.id = idPost

  // Le setteo la clase al nodo
  liNode.className = 'list-group-item'

  // Le agrego el contenido al nodo
  liNode.innerHTML =
      
    ' <div class="flex-row-reverse" style="display: flex; flex-direction: column-reverse">  <button type="button" class="btn btn-danger"  id="DeletePostButton" >Borrar</button>  </div>'+
    '<h4>' +
    newPost.name +
    '</h4>' +
    '<h3>' +
    newPost.postContent +
    '</h3>'

  // Devuelvo solo el nodo con todos sus datos
  return liNode
}
function deletePost(event){
    var inputNode = event.target
    console.log(inputNode.parentElement.parentElement.id)
}

function setLocalList (key, list) {
  // Verifico los parámetros recibidos
  if (typeof key === 'string' && Array.isArray(list)) {
    // Convierto a JSON el array
    var strList = JSON.stringify(list)
    // Guardo en el localStorage pisando la key
    localStorage.setItem(key, strList)
  }
}

function getLocalList (key) {
  // Valido que reciba un string
  if (typeof key === 'string') {
    // Trato de recuperar la lista del localStorage
    var localList = localStorage.getItem(key)
    if (localList) {
      // Si la lista existía la tranformo en JavaScript y la devuelvo
      var parsedList = JSON.parse(localList)
      return parsedList
    } else {
      // Sino existía devuelvo un array vacío
      return []
    }
  }
}





