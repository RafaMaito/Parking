const spacesParking = [
  (a1 = null),
  (a2 = null),
  (b1 = null),
  (b2 = null),
  (c1 = null),
  (c2 = null),
];
let ticket = 0,
  newTicket = 0;
let clients = JSON.parse(localStorage.getItem('clients')) || [];
// let vagas = [];
const a1Place = document.getElementById('a1Place');
const a2Place = document.getElementById('a2Place');
const b1Place = document.getElementById('b1Place');
const b2Place = document.getElementById('b2Place');
const c1Place = document.getElementById('c1Place');
const c2Place = document.getElementById('c2Place');
const informationPainel = document.getElementById('informationPainel');

console.log(clients);

function savaLocalStorage() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function verifyIfIsClient(car) {
  const verifyClient = clients.find((veicle) => {
    if (veicle.plate === car.plate) {
      return true;
    }
    return false;
  });
  console.log('teste');
  if (!verifyClient) {
    console.log('entrou');
    clients.push(car);
  }
}

function verifyIfIsNow(car) {
  let nao;
  for (veicle of spacesParking) {
    if (veicle === null) {
      nao = false;
      return nao;
    } else if (veicle.plate === car.plate) {
      alert(`O carro com a placa ${car.plate} ja está no estacionamento`);
      nao = true;
      return nao;
    }
  }
  return nao;
}

function createCar() {
  const modelInput = document.getElementById('modelInput');
  if (modelInput.value.length < 2 || modelInput.length > 15) {
    alert('Modelo não existe');
    return;
  }
  const colorInput = document.getElementById('colorInput');
  if (colorInput.value === 'noColor') {
    alert('Escolha uma cor');
    return;
  }
  const plateInput = document.getElementById('plateInput');
  if (plateInput.value.length !== 6) {
    alert('Placa errada');
    return;
  }
  const yearInput = document.getElementById('yearInput');
  if (yearInput.value.length !== 4) {
    alert('Ano não existe');
    return;
  }
  const veicle = {
    model: modelInput.value.toLowerCase(),
    color: colorInput.value,
    plate: plateInput.value.toLowerCase(),
    year: yearInput.value,
  };
  addCar(veicle);
  savaLocalStorage();
  modelInput.value = '';
  colorInput.value = 'noColor';
  plateInput.value = '';
  yearInput.value = '';
}

function addCar(car) {
  const verifySpace = spacesParking.findIndex((space) => space === null);
  verifyIfIsClient(car);
  if (!verifyIfIsNow(car)) {
    if (verifySpace != -1) {
      spacesParking[verifySpace] = car;
      localStorage.setItem('clients', JSON.stringify(clients));

      switch (verifySpace) {
        case 0:
          a1Place.classList.add('bg-danger');
          a1Place.classList.remove('bg-success');
          informationPainel.innerHTML += `<p class="text-white">O Carro do modelo ${car.model} entrou na vaga A1</p>`;

          break;
        case 1:
          a2Place.classList.add('bg-danger');
          a2Place.classList.remove('bg-success');
          informationPainel.innerHTML += `<p class="text-white">O Carro do modelo ${car.model} entrou na vaga A2</p>`;
          break;
        case 2:
          b1Place.classList.add('bg-danger');
          b1Place.classList.remove('bg-success');
          informationPainel.innerHTML += `<p class="text-white">O Carro do modelo ${car.model} entrou na vaga B1</p>`;
          break;
        case 3:
          b2Place.classList.add('bg-danger');
          b2Place.classList.remove('bg-success');
          informationPainel.innerHTML += `<p class="text-white">O Carro do modelo ${car.model} entrou na vaga B2</p>`;
          break;
        case 4:
          c1Place.classList.add('bg-danger');
          c1Place.classList.remove('bg-success');
          informationPainel.innerHTML += `<p class="text-white">O Carro do modelo ${car.model} entrou na vaga C1</p>`;
          break;
        case 5:
          c2Place.classList.add('bg-danger');
          c2Place.classList.remove('bg-success');
          informationPainel.innerHTML += `<p class="text-white">O Carro do modelo ${car.model} entrou na vaga C2</p>`;
          break;
      }
    } else {
      alert('Vagas lotadas');
      return;
    }
  }
  return;
  console.log('Aqui 2');
}

function removeCar() {
  const exitInput = document.getElementById('exitInput');
  const timeInput = document.getElementById('timeInput');
  const valueInput = document.getElementById('valueInput');
  for (index in spacesParking) {
    if (spacesParking[index] !== null) {
      if (spacesParking[index].plate === exitInput.value.toLowerCase()) {
        console.log(index);
        switch (index) {
          case '0':
            a1Place.classList.remove('bg-danger');
            a1Place.classList.add('bg-success');
            ticket = timeInput.value * 100;
            discountByYear(spacesParking[index]);
            informationPainel.innerHTML += `<p class="text-white">O Carro da placa ${spacesParking[index].plate} saiu da vaga A1 com o valor a pagar de ${newTicket}</p>`;
            valueInput.value = valueInput.value * 1 + newTicket;
            exitInput.value = '';
            timeInput.value = '';
            break;
          case '1':
            a2Place.classList.remove('bg-danger');
            a2Place.classList.add('bg-success');
            ticket = timeInput.value * 100;
            discountByYear(spacesParking[index]);
            informationPainel.innerHTML += `<p class="text-white">O Carro da placa ${spacesParking[index].plate} saiu da vaga A2 com o valor a pagar de ${newTicket}</p>`;
            valueInput.value = valueInput.value * 1 + newTicket;
            exitInput.value = '';
            timeInput.value = '';
            break;
          case '2':
            b1Place.classList.remove('bg-danger');
            b1Place.classList.add('bg-success');
            ticket = timeInput.value * 100;
            discountByYear(spacesParking[index]);
            informationPainel.innerHTML += `<p class="text-white">O Carro da placa ${spacesParking[index].plate} saiu da vaga B1 com o valor a pagar de ${newTicket}</p>`;
            valueInput.value = valueInput.value * 1 + newTicket;
            exitInput.value = '';
            timeInput.value = '';
            break;
          case '3':
            b2Place.classList.remove('bg-danger');
            b2Place.classList.add('bg-success');
            ticket = timeInput.value * 100;
            discountByYear(spacesParking[index]);
            informationPainel.innerHTML += `<p class="text-white">O Carro da placa ${spacesParking[index].plate} saiu da vaga B2 com o valor a pagar de ${newTicket}</p>`;
            valueInput.value = valueInput.value * 1 + newTicket;
            exitInput.value = '';
            timeInput.value = '';
            break;
          case '4':
            c1Place.classList.remove('bg-danger');
            c1Place.classList.add('bg-success');
            ticket = timeInput.value * 100;
            discountByYear(spacesParking[index]);
            informationPainel.innerHTML += `<p class="text-white">O Carro da placa ${spacesParking[index].plate} saiu da vaga C1 com o valor a pagar de ${newTicket}</p>`;
            valueInput.value = valueInput.value * 1 + newTicket;
            exitInput.value = '';
            timeInput.value = '';
            break;
          case '5':
            c2Place.classList.remove('bg-danger');
            c2Place.classList.add('bg-success');
            ticket = timeInput.value * 100;
            discountByYear(spacesParking[index]);
            informationPainel.innerHTML += `<p class="text-white">O Carro da placa ${spacesParking[index].plate} saiu da vaga C2 com o valor a pagar de ${newTicket}</p>`;
            valueInput.value = valueInput.value * 1 + newTicket;
            exitInput.value = '';
            timeInput.value = '';
            break;
        }

        spacesParking[index] = null;
        return;
      } else {
        alert('Não existe nenhum carro com essa placa');
      }
    }
  }
}

function verifyByNameSpace(nameSpace) {
  switch (nameSpace) {
    case 'a1':
    case 0:
      if (spacesParking[0] !== null) {
        informationPainel.innerHTML += `<p class="text-white">O carro da placa ${spacesParking[0].plate} esta na vaga A1</p>`;
        break;
      } else {
        alert('Vaga Vazia');
        break;
      }
    case 'a2':
    case 1:
      if (spacesParking[1] !== null) {
        informationPainel.innerHTML += `<p class="text-white">O carro da placa ${spacesParking[1].plate} esta na vaga A2</p>`;
        break;
      } else {
        alert('Vaga Vazia');
        break;
      }
    case 'b1':
    case 2:
      if (spacesParking[2] !== null) {
        informationPainel.innerHTML += `<p class="text-white">O carro da placa ${spacesParking[2].plate} esta na vaga B1</p>`;
        break;
      } else {
        alert('Vaga Vazia');
        break;
      }
    case 'b2':
    case 3:
      if (spacesParking[3] !== null) {
        informationPainel.innerHTML += `<p class="text-white">O carro da placa ${spacesParking[3].plate} esta na vaga B2</p>`;
        break;
      } else {
        alert('Vaga Vazia');
        break;
      }
    case 'c1':
    case 4:
      if (spacesParking[4] !== null) {
        informationPainel.innerHTML += `<p class="text-white">O carro da placa ${spacesParking[4].plate} esta na vaga C1</p>`;
        break;
      } else {
        alert('Vaga Vazia');
        break;
      }
    case 'c2':
    case 5:
      if (spacesParking[5] !== null) {
        informationPainel.innerHTML += `<p class="text-white">O carro da placa ${spacesParking[5].plate} esta na vaga C2</p>`;
        break;
      } else {
        alert('Vaga Vazia');
        break;
      }
    default:
      alert('Vaga Não Existe');
      break;
  }
}
function verifyIfSpaceIsNull() {
  let isNull = 0;
  for (index in spacesParking) {
    if (spacesParking[index] === null) {
      isNull++;
    }
  }
  if (isNull === 6) {
    return true;
  } else {
    return false;
  }
}
function searchSpaceByPlate(plate) {
  if (!verifyIfSpaceIsNull()) {
    const verifyIndexCarPlate = spacesParking.findIndex((car) => {
      if (car != null) {
        return car.plate === plate;
      }
    });
    console.log(verifyIndexCarPlate);
    if (verifyIndexCarPlate < 0) {
      alert('Não temos um carro com essa placa');
    } else {
      console.log(verifyIndexCarPlate);
      verifyByNameSpace(verifyIndexCarPlate);
    }
  } else {
    alert('Não temos um carro com essa placa');
  }
}

function modelCar(modelcar) {
  if (!verifyIfSpaceIsNull()) {
    const newSpaceParking = spacesParking.filter((car) => {
      if (car != null) {
        return car.model === modelcar;
      }
    });
    console.log(newSpaceParking);
    if (newSpaceParking.length === 0) {
      alert('Não temos carro nesse modelo');
    } else {
      informationPainel.innerHTML += `<p class="text-white">Nesse modelo ${modelcar} temos ${newSpaceParking.length}:</p>`;
      for (index in newSpaceParking) {
        informationPainel.innerHTML += `<p class="text-white"> O carro ${newSpaceParking[index].model} com a placa ${newSpaceParking[index].plate}</p>`;
      }
    }
  } else {
    alert('Não temo um carro com esse modelo');
  }
}

function colorCar(colorcar) {
  if (!verifyIfSpaceIsNull()) {
    const newSpaceParking = spacesParking.filter((teste) => {
      if (teste != null) {
        return teste.color === colorcar;
      }
    });
    if (newSpaceParking.length === 0) {
      alert('Não temo um carro com essa cor');
    } else {
      informationPainel.innerHTML += `<p class="text-white">Nessa cor ${colorcar} temos ${newSpaceParking.length}:</p>`;
      for (index in newSpaceParking) {
        informationPainel.innerHTML += `<p class="text-white"> O carro ${newSpaceParking[index].model} com a placa ${newSpaceParking[index].plate}</p>`;
      }
    }
  } else {
    alert('Não temo um carro com essa cor');
  }
}
function yearCar(yearcar) {
  if (!verifyIfSpaceIsNull()) {
    const newSpaceParking = spacesParking.filter((car) => {
      if (car != null) {
        return car.year === yearcar;
      }
    });
    if (newSpaceParking.length === 0) {
      alert('Não temo um carro com esse ano');
    } else {
      informationPainel.innerHTML += `<p class="text-white">Nesse ano ${yearcar} temos ${newSpaceParking.length}:</p>`;
      for (index in newSpaceParking) {
        informationPainel.innerHTML += `<p class="text-white"> O carro ${newSpaceParking[index].model} com a placa ${newSpaceParking[index].plate}</p>`;
      }
    }
  } else {
    alert('Não temo um carro com esse ano');
  }
}

function discountByYear(car) {
  if (car.year > '2010' && car.year <= '2015') {
    newTicket = ticket - ticket * 0.15;
    console.log(newTicket);
    newTicket = discountByColor(car, newTicket);
  } else if (car.year > '2000' && car.year <= '2010') {
    newTicket = ticket - ticket * 0.2;
    console.log(newTicket);
    newTicket = discountByColor(car, newTicket);
  } else if (car.year <= '2000') {
    newTicket = ticket - ticket * 0.3;
    console.log(newTicket);
    newTicket = discountByColor(car, newTicket);
  } else {
    newTicket = ticket;
    console.log(newTicket);
    newTicket = discountByColor(car, newTicket);
  }
  return newTicket;
}

function discountByColor(car, newTicket) {
  if (car.color === 'azul') {
    newTicket = newTicket - 10;
    console.log(newTicket);
    // newTicket = isClient(car, newTicket);
    return newTicket;
  }
  if (car.color === 'preto') {
    newTicket = newTicket - 20;
    console.log(newTicket);
    // newTicket = isClient(car, newTicket);
    return newTicket;
  }
  if (car.color === 'branco') {
    newTicket = newTicket - 15;
    console.log(newTicket);
    // newTicket = isClient(car, newTicket);
    return newTicket;
  } else {
    return newTicket;
  }
}
//ver no local storage se ja usou o estacionamento
// function isClient(car, newTicket) {
//   if (car.client) {
//     newTicket = newTicket * 0.5;
//     return newTicket;
//   } else {
//     return newTicket;
//   }
// }

function searchAtributes() {
  const searchByAtribute = document.getElementById('searchByAtribute').value;
  const searchInput = document
    .getElementById('searchInput')
    .value.toLowerCase();

  console.log(searchInput);
  switch (searchByAtribute) {
    case '1':
      console.log('teste1');
      searchSpaceByPlate(searchInput);
      break;
    case '2':
      console.log('teste2');
      colorCar(searchInput);
      break;
    case '3':
      console.log('teste3');
      modelCar(searchInput);
      break;
    case '4':
      console.log('teste4');
      yearCar(searchInput);
      break;
    case '5':
      console.log('teste5');
      verifyByNameSpace(searchInput);
      break;
  }
}
