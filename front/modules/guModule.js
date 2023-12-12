// guModule.js
const createdGuButtons = new Set();

export function handleGuButtonClick(data, area, guDiv, createdGuButtons, map, marker) {
    const guNames = Object.keys(data);
  
    guNames.forEach((guName) => {
      const guButton = createGuButton(guDiv, guName, () => {
        const guData = data[guName];
        updateLocationList(guDiv, guData, map, marker);
      });
  
      if (!createdGuButtons.has(guButton)) {
        createdGuButtons.add(guButton);
      }
    });
  }
  
  function createGuButton(parentElement, guName, onClickHandler) {
    const guButton = document.createElement('button');
    guButton.textContent = guName;
    guButton.style.color = 'white';
    guButton.style.display = 'none';
    guButton.addEventListener('click', onClickHandler);
    parentElement.appendChild(guButton);
  
    return guButton;
  }
  
  function updateLocationList(guDiv, guData, map, marker) {
    guDiv.innerHTML = '';
  
    const locationList = document.createElement('ul');
    locationList.className = 'location-list';
  
    guData.locations.forEach((location) => {
      const listItem = document.createElement('li');
  
      const image = document.createElement('img');
      image.src = location.image;
      image.alt = location.name;
      image.style.width = '15vw';
      listItem.appendChild(image);
  
      const name = document.createElement('p');
      name.textContent = `이름: ${location.name}`;
      listItem.appendChild(name);
  
      const address = document.createElement('p');
      address.textContent = `주소: ${location.address}`;
      listItem.appendChild(address);
  
      listItem.addEventListener('click', function () {
        const latitude = location.latitude;
        const longitude = location.longitude;
  
        const locationLatLng = new naver.maps.LatLng(latitude, longitude);
        map.setCenter(locationLatLng);
        marker.setPosition(locationLatLng);
      });
  
      const description = document.createElement('p');
      description.textContent = `설명: ${location.description}`;
      listItem.appendChild(description);
  
      const storeNumber = document.createElement('p');
      storeNumber.textContent = `전화번호: ${location.storeNumber}`;
      listItem.appendChild(storeNumber);
  
      locationList.appendChild(listItem);
      listItem.style.width = '20vw';
    });
  
    guDiv.appendChild(locationList);
    locationList.style.overflowY = 'auto';
    locationList.style.maxHeight = '600px';
    locationList.style.width = '25vw';
  }
  