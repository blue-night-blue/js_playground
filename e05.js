const array = JSON.parse(document.getElementById('json_string').getAttribute("data-array"));
let currentArray = [...array];

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
        clearinputTags(andTags, andSelectedTagInputted, searchButton);
        clearinputTags(orTags, orSelectedTagInputted, searchButton);
    });

    // ブラウザバックした際に隠れinputをクリアする
    window.addEventListener('pageshow', ()=> {
        andSelectedTagInputted.value = "";
        orSelectedTagInputted.value = "";
    });    
};

// タグの選択状態を切り替え、リンクをセットする関数
function selectTagToggleAnd(tag, inputField, searchButton) {
    if(tag.classList.contains('select_tag') ){
        tag.classList.remove('select_tag');
        tag.classList.add('select_tag_off');
        const selectTags=document.getElementById('container_and').querySelectorAll('.select_tag');
        if(selectTags.length!==0){
            currentArray = array.filter(item => {
                const selectValues = Array.from(selectTags, selectTag => selectTag.value);
                return selectValues.every(tag => item.includes(tag));
            });
        }else{
            currentArray = array;
        };
    }else if(tag.classList.contains('not_exist') ){
        return;
    }else{
        currentArray = currentArray.filter(item => item.includes(tag.value));
    };

    if(currentArray.length!==0){
        const otherAndTags = document.getElementById('container_and').querySelectorAll('.tag');
        otherAndTags.forEach((otherAndTag) => {
            if(!currentArray.some( (item)=>item.includes(otherAndTag.value) ) ){
                otherAndTag.classList.add('not_exist');
            }else{
                otherAndTag.classList.remove('not_exist');
            };
        });

        const tagValue = encodeURIComponent(tag.value);
        const inputTags = inputField.value.split('+');

        if (!inputTags.includes(tagValue)) {
            inputField.value += tagValue + "+";
        } else {
            inputField.value = inputField.value.replace(`${tagValue}+`, "");
        };

        if(tag.classList.contains('select_tag_off') ){
            tag.classList.remove('select_tag_off'); 
        }else{
            tag.classList.add('select_tag'); 
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
    const inputTags = inputField.value.split('+');

    if (!inputTags.includes(tagValue)) {
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
function clearinputTags(tags, inputField, searchButton) {
    tags.forEach((tag) => {
        tag.classList.remove('select_tag');
        tag.classList.remove('not_exist');
    });
    inputField.value = "";
    searchButton.removeAttribute('href');
    currentArray = array;
};

