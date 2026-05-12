const properties = [
  {
    id: "1",
    title: "Ático de lujo en el corazón de la ciudad",
    description:
      "Impresionante ático con vistas panorámicas, acabados de primera calidad y terraza privada. Ideal para los amantes del diseño y la comodidad. Dispone de amplios espacios, cocina equipada y un salón luminoso.",
    type: "venta",
    price: 850000,
    currency: "USD",
    surface: 180,
    rooms: 4,
    bathrooms: 3,
    address: {
      street: "Gran Vía 45",
      city: "Madrid",
      zip: "28013"
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    features: ["Terraza", "Piscina comunitaria", "Garaje", "Trastero", "Ascensor"],
    featured: true
  },
  {
    id: "2",
    title: "Chalet moderno con jardín y piscina privada",
    description:
      "Magnífico chalet independiente de reciente construcción, con amplio jardín, piscina y zona de barbacoa. Perfecto para familias que buscan tranquilidad a pocos minutos de la ciudad.",
    type: "venta",
    price: 1250000,
    currency: "USD",
    surface: 320,
    rooms: 5,
    bathrooms: 4,
    address: {
      street: "Av. de la Naturaleza 12",
      city: "Barcelona",
      zip: "08035"
    },
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    features: ["Jardín", "Piscina privada", "Garaje para 3 coches", "Sótano", "Chimenea"],
    featured: true
  },
  {
    id: "3",
    title: "Apartamento renovado en zona exclusiva",
    description:
      "Acogedor apartamento completamente reformado con materiales de alta gama. Ubicado en una de las mejores zonas de la ciudad, rodeado de servicios y transporte público.",
    type: "alquiler",
    price: 2800,
    currency: "USD",
    surface: 95,
    rooms: 2,
    bathrooms: 2,
    address: {
      street: "Calle Serrano 78",
      city: "Madrid",
      zip: "28006"
    },
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18f6b0058?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    features: ["Amueblado", "Aire acondicionado", "Calefacción central", "Portero automático"],
    featured: false
  },
  {
    id: "4",
    title: "Estudio moderno cerca de la playa",
    description:
      "Estudio diáfano ideal para parejas o teletrabajo, situado a solo 5 minutos andando de la playa. Totalmente equipado y con una pequeña terraza.",
    type: "alquiler",
    price: 1200,
    currency: "USD",
    surface: 45,
    rooms: 1,
    bathrooms: 1,
    address: {
      street: "Paseo Marítimo 23",
      city: "Valencia",
      zip: "46011"
    },
    images: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    features: ["Terraza", "Vistas al mar", "Cocina americana", "Armarios empotrados"],
    featured: false
  }
];

export default properties;