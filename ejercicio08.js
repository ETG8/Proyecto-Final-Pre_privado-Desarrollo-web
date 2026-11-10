const cuposMaximos = 20;
let inscritos = 20;

function hayCupo() {
  return inscritos < cuposMaximos;
}

if (hayCupo()) {
  inscritos++;
}

console.log("Personas inscritas:", inscritos);
console.log("¿Hay cupo disponible?", hayCupo());