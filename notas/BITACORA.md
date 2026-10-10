# Bitacora de JavaScript interactivo
Laboratorio 08: JavaScript Interactivo DOM, Eventos y Objetos.
Navegador usado: (escribe aquí cuál usaste)

## Ejercicio 2: Seleccionar y modificar el DOM
| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
|-------------|---------------------------|---------------------------------|
| textContent desde la consola | El título cambia temporalmente a "Hola desde la consola". | No |
| textContent desde app.js | El título cambia a "Hola TECSUP". | Si |
| style.color | El texto del título cambia a color azul. | Si |
| classList.add | El párrafo del mensaje se resalta con un fondo amarillo. | Si |
| createElement + appendChild | Se agrega un nuevo elemento a la lista que dice "JavaScript". | Si |
## Ejercicio 3: Evento click
| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
|----------------|-----------------------|------------------------|
| click | Hacer un clic sencillo con el botón izquierdo sobre el botón "Sumar 1". | Suma +1 por cada clic. |
| dblclick | Hacer un doble clic rápido sobre el botón "Sumar 1". | Suma +1 solo por el evento de doble clic. |
| mouseover | Pasar el puntero del mouse sobre la superficie del botón "Sumar 1". | Suma +1 cada vez que el cursor entra al área del botón. |
## Ejercicio 4: Eventos input y submit
| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
|--------|-------------------------|------------------------------|
| Escribir en el campo nombre | El texto del párrafo cambia dinámicamente ("Hola, ...") letra por letra según lo que se escribe. | No |
| Enviar sin preventDefault | El texto "Enviado: ..." aparece solo un instante y desaparece porque la pantalla parpadea. | Si |
| Enviar con preventDefault, correo sin @ | Muestra en rojo el mensaje "Correo no valido: falta @" usando la clase CSS de error. | No |
| Enviar con preventDefault, correo con @ | Muestra el mensaje "Enviado: " seguido del correo ingresado y remueve el estilo de error. | No |
## Ejercicio 5: Clases y objetos
| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
|--------|--------|--------|---------------|--------------------|
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510 |
## Ejercicio 6: DOM, eventos y objetos juntos
| Prueba | Total que muestra la pagina | Correcto (Si/No) |
|--------|-----------------------------|------------------|
| Cuaderno 12.50 | 12.50 | Si |
| + Lapicero 3.20 | 15.70 | Si |
| + Mochila 89.90 | 105.60 | Si |
| Sin Number() | No calcula el total / Error en consola (`this.precio.toFixed is not a function`) | No |

| Pieza | Linea de tu codigo donde aparece | Para que sirve |
|-------|----------------------------------|----------------|
| DOM | `const listaCarrito = document.querySelector("#carrito");` | Selecciona el elemento de la lista HTML para poder agregar nuevos nodos (`<li>`) dinámicamente con `appendChild`. |
| Evento | `formProducto.addEventListener("submit", (evento) => { ... });` | Escucha la acción del usuario cuando presiona el botón de agregar formulario para procesar los datos sin recargar la página. |
| Objeto | `const producto = new Producto(prodNombre.value, Number(prodPrecio.value));` | Crea una instancia de la clase `Producto` estructurando el nombre y precio en un modelo de datos reutilizable con sus propios métodos. |