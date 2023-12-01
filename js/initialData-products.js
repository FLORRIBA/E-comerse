const productStart = [
  {
    producto: " Box dia especial ",
    precio: 8000,
    id: 1,
    active: true,
    descripcion:
      "<strong> Tratamiento de fangoterapia</strong> realizado con ingredientes orgánicos; importante prepararlo en cuencos de materiales nobles. Nada mejor que acompañar este momento con un rico té y una Vela de soja que acompaña con su perfume floral.",
    fecha: new Date("2023-09-25").getTime(),
    image: "../../assets/images/cards/box.jpg",
  },
  {
    producto: " Box niños ",
    precio: 8000,
    id: 2,
    active: true,
    descripcion:
      "<strong>Shampoo sólido y jabon vegetal </strong>  de avena y almendras. <strong>Pasta</strong> dental natural: tiene todo lo necesario para la correcta limpieza bucal de un niño. <strong>Cepillo </strong>de dientes de bambú: packaging de cartón y mango de bambú moso.",
    fecha: new Date("2023-08-01").getTime(),
    image: "../../assets/images/cards/box_niños.jpg",
  },
  {
    producto: "Box mate",
    precio: 5000,
    id: 3,
    active: true,
    descripcion:
      "<strong> Mate</strong> de cerámica,artesanal y unico. Mix de <strong>yuyos </strong>sanadores exquisitos y orgánicos (no contienen agrotóxicos.) Pensados para regalarte un momento de relax y desconexión.. con esta hermosa pieza realizada con materiales nobles.",
    fecha: new Date("2023-10-05").getTime(),
    image: "../../assets/images/cards/mate_yerba2.jpg",
  },
  {
    producto: "Jabones vegetales",
    precio: 2000,
    id: 4,
    active: true,
    descripcion:
      "Hechos a base de <strong>aceite vegetal</strong>, desprenden un olor suave del aceite de oliva mezclandose con el de los aceites esenciales y las plantas utilizadas en macerados. Tienen aromas frescos y contienen el poder sanador del Sauce Blanco.",
    fecha: new Date("2023-03-21").getTime(),
    image: "../../assets/images/cards/jabones.jpg",
  },
  {
    producto: "Shampoo solido",
    precio: 2000,
    id: 5,
    active: true,
    descripcion:
      "La cosmética sólida utiza tensioactivos de origen natural, formulados a partir de aceites esenciales, glicerinas y extractos de plantas. Gracias a la ausencia de ingredientes agresivos, <strong> limpia el cuero cabelludo</strong> recuperando su equilibrio.",
    fecha: new Date("2023-04-15").getTime(),
    image: "../../assets/images/cards/shampoo.jpg",
  },
  {
    producto: "Detergente",
    precio: 2000,
    id: 6,
    active: true,
    descripcion:
      "Está elaborado con materias primas que tienen la capacidad de biodegradarse en la naturaleza en muy poco tiempo. Desengrasa igual o mejor que muchos de los productos convencionales. <strong> Cuida tu piel y el medio ambiente.</strong>",
    fecha: new Date("2023-04-15").getTime(),
    image: "../../assets/images/cards/detergente.jpg",
  },
  {
    producto: "Hidrolatos",
    precio: 3000,
    id: 7,
    active: true,
    descripcion:
      "Contiene aguas esenciales para brindarle a la piel la más sincera <strong>humectación </strong>. Su aroma a campo silvestre y herbal nos transporta a la más profunda naturaleza. Es un tónico facial, levemente astringente, antibacterial, desinflamatorio, calmante y fortalecedor.",
    fecha: new Date("2023-21-05").getTime(),
    image: "../../assets/images/cards/hidrolatos.jpg",
  },
  {
    producto: "Pasta dental",
    precio: 1500,
    id: 8,
    active: true,
    descripcion:
      "Elaborada con aceite de coco, extracto de caléndula, glicerina vegetal y sodium cocoamphoacetate, un tensioactivo derivado del coco, que favorece la <strong> limpieza de los dientes </strong> y toda la boca de manera suave, cremosa y natural. Sabor menta dulce.",
    fecha: new Date("2023-06-15").getTime(),
    image: "../../assets/images/cards/pasta-dental2.jpg",
  },
];

if (localStorage.getItem("product") === null) {

  localStorage.setItem("product", JSON.stringify([]));

  localStorage.setItem("product", JSON.stringify(productStart)); 
}
