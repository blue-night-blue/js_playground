const array = JSON.parse(document.getElementById('json_string').getAttribute("data-array"));
let currentArray = [...array];
console.log(currentArray);

window.onload = ()=> {
    const containerAnd = document.getElementById('container_and');
    const containerOr = document.getElementById('container_or');
    const clearButton = document.querySelector('.button_clear');
    const searchButton = document.querySelector('.button_search');

    const andTags = containerAnd.querySelectorAll('.tag');
    const orTags = containerOr.querySelectorAll('.tag');
    const andSelectedTagInputted = containerAnd.querySelector('.selected_tag_inputted');
    const orSelectedTagInputted = containerOr.querySelector('.selected_tag_inputted');

    andTags.forEach((tag) => {
        tag.addEventListener('click', () => selectTagToggleAnd(tag, andSelectedTagInputted, searchButton) );
    });
    orTags.forEach((tag) => {
        tag.addEventListener('click', () => selectTagToggleOr(tag, orSelectedTagInputted, searchButton) );
    });

    clearButton.addEventListener('click', () => { 
        clearSelectedTags(andTags, andSelectedTagInputted, searchButton);
        clearSelectedTags(orTags, orSelectedTagInputted, searchButton);
        console.log(currentArray);
    });

    // ブラウザバックした際に隠れinputをクリアする
    window.addEventListener('pageshow', ()=> {
        andSelectedTagInputted.value = "";
        orSelectedTagInputted.value = "";
    });    
};

// タグの選択状態を切り替え、リンクをセットする関数
function selectTagToggleAnd(tag, inputField, searchButton) {
    if(tag.classList.contains('select_tag') || tag.classList.contains('not_exist') ){
        return;
    }

    currentArray = currentArray.filter(item => item.includes(tag.value));

    if(currentArray.length!==0){
        tag.classList.add('select_tag'); 
        const otherAndTags = document.getElementById('container_and').querySelectorAll('.tag');
        console.log(currentArray);
 
        otherAndTags.forEach((otherAndTag) => {
            if(!currentArray.some( (item)=>item.includes(otherAndTag.value) ) ){
                otherAndTag.classList.add('not_exist');
            };
        });

        const tagValue = encodeURIComponent(tag.value);
        const selectedTags = inputField.value.split('+');

        if (!selectedTags.includes(tagValue)) {
            inputField.value += tagValue + "+";
        } else {
            inputField.value = inputField.value.replace(`${tagValue}+`, "");
        };

        const setLinkAnd = document.getElementById('container_and').querySelector('.selected_tag_inputted').value.replace(/\+$/, "");
        const setLinkOr = document.getElementById('container_or').querySelector('.selected_tag_inputted').value.replace(/\+$/, "");

        if (setLinkAnd !== "" && setLinkOr === ""){
            searchButton.setAttribute('href', `results?and=${setLinkAnd}`)
        } else if (setLinkAnd === "" && setLinkOr !== ""){
            searchButton.setAttribute('href', `results?or=${setLinkOr}`)
        } else if (setLinkAnd === "" && setLinkOr === ""){
            searchButton.setAttribute('href', '')
        } else{
            searchButton.setAttribute('href', `results?and=${setLinkAnd}&or=${setLinkOr}`)
        }; 
    };
};

function selectTagToggleOr(tag, inputField, searchButton) {
    const tagValue = encodeURIComponent(tag.value);
    const selectedTags = inputField.value.split('+');

    if (!selectedTags.includes(tagValue)) {
        inputField.value += tagValue + "+";
    } else {
        inputField.value = inputField.value.replace(`${tagValue}+`, "");
    };

    tag.classList.toggle('select_tag');

    const setLinkAnd = document.getElementById('container_and').querySelector('.selected_tag_inputted').value.replace(/\+$/, "");
    const setLinkOr = document.getElementById('container_or').querySelector('.selected_tag_inputted').value.replace(/\+$/, "");

    if (setLinkAnd !== "" && setLinkOr === ""){
        searchButton.setAttribute('href', `results?and=${setLinkAnd}`)
    } else if (setLinkAnd === "" && setLinkOr !== ""){
        searchButton.setAttribute('href', `results?or=${setLinkOr}`)
    } else if (setLinkAnd === "" && setLinkOr === ""){
        searchButton.setAttribute('href', '')
    } else{
        searchButton.setAttribute('href', `results?and=${setLinkAnd}&or=${setLinkOr}`)
    };
};

// 選択されたタグ、リンクをクリアする関数
function clearSelectedTags(tags, inputField, searchButton) {
    tags.forEach((tag) => {
        tag.classList.remove('select_tag');
        tag.classList.remove('not_exist');
    });
    inputField.value = "";
    searchButton.removeAttribute('href');
    currentArray = array;
};

