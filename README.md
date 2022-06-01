# Backend - Segunda Entrega Parcial Proyecto - EZEQUIEL PETRONE

(Al final de este doc hay ejemplos de los body que acepta cada endpoint)

Gracias tanto a los comentarios del código como a los errores que devuelve cada endpoint es fácil entender el funcionamiento, de todos modos algunas notas:


## Segunda Entrega:

-El .env no lo agregué al .gitignore sólo por una cuestión práctica a la hora de la corrección. Obviamente no debería subirse a git en realidad.

-En src/daos/daos.js se exportan los DAOS según lo especificado en el .env dónde se puede elegir si se quiere operar utilizando contenedores de archivo, de MongoDB o de Firebase.

-Para el seteo del contenedor Firebase me pareció más práctico que el contenido del json de auth sea directamente una variable de entorno y no tener que andar importando files externos. Aunque es un esquema que puede modificarse llegado el caso.

-Los json que devuelve cada router (API rest) siempre son iguales, independientemente del tipo de contenedor seleccionado.

-Me hubiese encantado tener tiempo para hacer el FrontEnd también. Hasta me parece más divertido testearlo así. Pero bueno me até a lo obligatorio y dejé de lado lo opcional por razones de fuerza mayor.


## Primera Entrega:

-La variable que maneja el boolean de ADMIN está en routerCarrito.js

-Reutilicé la clase Contenedor que había desarrollado en las primeras entregas ya que estaba bastante completa, es por eso que las clases que extiendan de la misma me quedaron tan simples.

-Se valida tanto al momento de dar de alta un producto como al editarlo que la estructura del req.body recibido sea la correcta.

-Cuando se quiere eliminar un producto del file, primero se valida que ese producto no esté en algún carrito. En dicho caso se solicita primero eliminarlo de cada carrito y luego eliminarlo del file de productos.

-Cuando se agrega un producto a un carrito sólo se necesita id del producto y qty deseada (esa qty es el stock del producto dentro del array productos del carrito). Si el producto no existe aún en dicho carrito lo agrega pero si ya existe suma la qty actual a la original.

-Cuando se agrega un producto a un carrito se descuenta la qty seleccionada del stock del producto en el file de productos. SE VALIDA QUE HAYA STOCK SUFICIENTE ANTES DE HACER DICHA OPERACIÓN.

-Cuando se elimina un producto de un carrito se devuelve la qty que poseía al stock del file de productos. Si se elimina un carrito entero, devuelve stock por cada uno de los productos incluídos.

# ejemplo body POST / PUT de productos (router productos)

{
    "nombre": "Remera Vintage",
    "descripcion": "Es una Remera Clasic Style",
    "codigo": "RV123",
    "thumbnail": "www.misimagenes.com/remeravintage",
    "precio": 1900,
    "stock": 50
}

# ejemplo body POST un producto dentro de un carrito (router carritos)

{
    "idProd": "18siW1imNGyOlkoa2vCq",
    "qty": 10
}