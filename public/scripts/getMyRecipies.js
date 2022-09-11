$(document).ready(function() {
    $.getJSON('/recipe/getmyrecipies', async function(data) {
        let temp = 0
        let i = 0;
        while(data[i] != undefined) {
            let newPro = `
            <a href="/recipe/detail/${data[i]._id}">
                <div class="recipe" id="${data[i]._id}">
                    <div class="card_left">
                        <img class="card-img-top" src="data:image/png;base64,${data[i].image}" alt="Card image cap">
                    </div>
                    <div class="card_right">
                        <div class="card-body">
                            <h5 class="card-title">${data[i].name}</h5>
                            <div class="card-text" id="ingredients-${data[i]._id}"></div>
                        </div>
                        <div class="card-footer">
                            <div class="card-text" id="description-${data[i]._id}"></div>
                        </div>
                    </div>
                </div>
            </a>
            `
            data[i].description = data[i].description.split('\n')
            await $('#recipieContainer').append(newPro)
            for(let j=0; j<data[i].ingredients.length; j++) {
                $(`#ingredients-${data[i]._id}`).append(`<p>${data[i].ingredients[j]}</p>`)
            }
            for(let j=0; j<data[i].description.length; j++) {
                $(`#description-${data[i]._id}`).append(`<p>${data[i].description[j]}</p>`)
            }
            i++
        }
    })
});