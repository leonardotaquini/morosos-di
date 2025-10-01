export type Debtor = {
  id: string
  name: string
  role: string
  team: string
  owedSince: string
  lastReminder: string
  favoriteCake: string
  photo: string
  notes: string
}

export const debtors: Debtor[] = [
  {
    id: "ana-lopez",
    name: "Ana López",
    role: "Staff Backend Engineer",
    team: "Plataforma",
    owedSince: "2023-11-24",
    lastReminder: "2024-09-02",
    favoriteCake: "Red velvet con frutos rojos",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
    notes:
      "Coordinó la migración de servicios y prometió celebrar al cerrar el Q1 sin incidentes.",
  },
  {
    id: "diego-martinez",
    name: "Diego Martínez",
    role: "Tech Lead Frontend",
    team: "Experiencia Digital",
    owedSince: "2024-01-16",
    lastReminder: "2024-10-05",
    favoriteCake: "Tres leches con maracuyá",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb599a0c2c4?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
    notes:
      "Debe la torta del despliegue del nuevo portal y dejó vouchers de coffee cards como promesa temporal.",
  },
  {
    id: "valeria-rios",
    name: "Valeria Ríos",
    role: "Product Engineer",
    team: "Integraciones",
    owedSince: "2022-12-09",
    lastReminder: "2024-08-19",
    favoriteCake: "Cheesecake de guayaba",
    photo:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
    notes:
      "Acumula dos retrospectivas prometiendo torta regional para el equipo de integraciones.",
  },
  {
    id: "hector-zambrano",
    name: "Héctor Zambrano",
    role: "QA Automation Specialist",
    team: "Calidad Continua",
    owedSince: "2024-03-28",
    lastReminder: "2024-09-25",
    favoriteCake: "Selva negra",
    photo:
      "https://images.unsplash.com/photo-1544723795-432537f4b6f5?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
    notes:
      "Argumenta que aún espera la certificación sin bugs para llevar la torta temática de testing.",
  },
  {
    id: "carla-mendez",
    name: "Carla Méndez",
    role: "Lead Data Scientist",
    team: "Inteligencia de Datos",
    owedSince: "2023-07-05",
    lastReminder: "2024-11-04",
    favoriteCake: "Tiramisú con cacao amargo",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fbec1c77ff5?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
    notes:
      "Prometió un tiramisú con métricas impresas en chocolate para el demo de analítica avanzada.",
  },
  {
    id: "luis-paredes",
    name: "Luis Fernando Paredes",
    role: "Site Reliability Engineer",
    team: "Confiabilidad",
    owedSince: "2022-04-17",
    lastReminder: "2024-10-30",
    favoriteCake: "Pastel de chocolate amargo",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fbf76ef8e9f?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
    notes:
      "La leyenda dice que traerá una torta de triple chocolate en cuanto cerremos 12 meses sin incidentes P0.",
  },
]
