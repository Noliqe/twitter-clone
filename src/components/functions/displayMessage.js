const displayMessage = (id, timestamp, name, text, picUrl, imageUrl) => {
    console.log(id, timestamp, name, text, picUrl, imageUrl);
    const container = document.querySelector('.content-messages');
    container.textContent = text;
};

export default displayMessage;