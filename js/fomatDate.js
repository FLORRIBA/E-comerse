//Devolver una fecha en forma correcta
//Este objeto se utiliza para lo que se conoce como ECMAScript Internationalization API. Los constructores para los objetos Collator, NumberFormat, y DateTimeFormat son propiedades de Intl.
function formatDate(fecha) {
    //nueva instancia (objeto)
    const collator = new Intl.DateTimeFormat("es-Ar", { // Intl se instancia pasándole como argumento una cadena de texto en formato: el nombre abreviado internacional del idioma  y la abreviatura del país/cultura en mayúscula 
    //que tipo de fecha quiero que me formatee.
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    const fechaFormateada = collator.format(fecha);//la variable collactor tiene predeterminada la funcion .format
    // console.log(fechaFormateada);
  
    //Devolver fecha en formato correcto
    return fechaFormateada;
    
  }

  //Seteamos la fecha required format, "yyyy-MM-dd"
function formatInputDate(fechaInput) {
  const fecha = new Date(fechaInput); //new OBJETO fecha
  const year = fecha.getFullYear(); //
  let month = fecha.getMonth() + 1;//Enero comienza con el 0 (+1)
  if (month < 10) {
    month = "0" + month;
  }
  let day = fecha.getDate(); //getDate(fecha) dia del mes , getDay(dia) dia de la semana
  if (day < 10) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}
  