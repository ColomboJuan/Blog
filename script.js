

$(document).ready(function(){
$("#formShare input").keyup(function() {
        var form = $(this).parents("#formShare");
        var check = checkCampos(form);
        if(check) {
            $("#addStudentButton").prop("disabled", false);
        }
        else {
            $("#addStudentButton").prop("disabled", true);
        }
    });


//Función para comprobar los campos de texto
function checkCampos(obj) {
    var camposRellenados = true;
    obj.find("input").each(function() {
    var $this = $(this);
            if( $this.val().length <= 0 ) {
                camposRellenados = false;
                return false;
            }
    });
    if(camposRellenados == false) {
        return false;
    }
    else {
        return true;
    }
}
})
// Globales

var LOCAL_KEY = 'postList'

// Carga inicial

var postList = getLocalList(LOCAL_KEY)

console.log('Fuente de verdad inicial ', postList)

var mainListNode = document.getElementById('mainList')

var colors =["bg-primary","bg-success","bg-danger"]

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
  
  

  var post = {
    name: nameValue,
    postContent: postValue,
    id:1
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

var color= randomColor()

  // Le setteo el id al nodo
  liNode.id = idPost

  // Le setteo la clase al nodo
  liNode.className = 'list-group-item'

  // Le agrego el contenido al nodo
  liNode.innerHTML =
      
    ' <div class="d-inline"> <button type="button" class="d-inline btn btn-default btn-circle btn-lg '+colors[color]+'"><i class="glyphicon glyphicon-ok "></i></button></div>'+
    '<h3 class="d-inline"> ' +
    newPost.name +
    '</h3><div  class="flex-row-reverse" style="display: inline; float:right"> <button type="button" class="btn bg-danger text-white"  id="DeletePostButton" >Borrar</button>  </div>' +
    '<h3> ' +
    newPost.postContent +
    '</h3></div>'
    

  // Devuelvo solo el nodo con todos sus datos
  return liNode
}
function deletePost(event){
    var inputNode = event.target 
    console.log(inputNode.parentElement.parentElement)
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

 function randomColor(){
        var x= Math.floor(Math.random() * 3)
        return x
    }

 



