document.querySelector('#CD_data').addEventListener('submit', (e) => {
    e.preventDefault();

    const authorData = e.target.author.value
    const titleData = e.target.title.value
    const yearData = e.target.year.value

    const newTr = document.querySelector('template').content.cloneNode(true);
    newTr.querySelector('#add_author').innerText = authorData;
    newTr.querySelector('#add_title').innerText = titleData;
    newTr.querySelector('#add_year').innerText = yearData;
    document.querySelector('tbody').appendChild(newTr);

    e.target.reset();

    let itemArray = JSON.parse(localStorage.getItem('cd_information'));
    itemArray.push({
        author: authorData,
        title: titleData,
        year: yearData
    });

    // save updated array back to localStorage
    localStorage.setItem('cd_information', JSON.stringify(itemArray));
    console.log('CDs in localStorage:', itemArray);
});

// delete
document.querySelector('tbody').addEventListener('click', (e) => {
    document.querySelector('#delete'); { 
        const row = e.target.closest('tr');
        const author = row.querySelector('#add_author').innerText;
        const title = row.querySelector('#add_title').innerText;
        const year = row.querySelector('#add_year').innerText;
        row.remove();

        let itemArray = JSON.parse(localStorage.getItem('cd_information')) || [];
        localStorage.setItem('cd_information', JSON.stringify(
            itemArray.filter(item => item.author !== author || item.title !== title || item.year !== year)
        ));
    }
});

// get the data from the local storage and render it into the page
window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('cd_information'));
    const tbody = document.querySelector('tbody');
    const template = document.querySelector('template');

    savedData.forEach(element => {
        const newTr = template.content.cloneNode(true);
        newTr.querySelector('#add_author').innerText = element.author;
        newTr.querySelector('#add_title').innerText = element.title;
        newTr.querySelector('#add_year').innerText = element.year;
        tbody.appendChild(newTr);
    });
})