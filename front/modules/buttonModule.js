export function createButton(parentElement, buttonText, onClickHandler) {
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.addEventListener('click', onClickHandler);
    parentElement.appendChild(button);
  
    return button;
  }