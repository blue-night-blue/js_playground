const array = ["猫1,猫2,猫3," , "猫1,猫3,猫4," , "猫1,猫2,猫5," , "猫2,猫3,猫4," , "猫1,猫4,猫5,"];

window.onload = ()=> {
    const containerAnd = document.querySelector('.container_complex_and');
    const containerOr = document.querySelector('.container_complex_or');
    const clearButton = document.querySelector('.button_clear');
    const searchButton = document.querySelector('.button_search');

    const andTags = containerAnd.querySelectorAll('.tag');
    const orTags = containerOr.querySelectorAll('.tag');
    const andSelectedTagInputted = containerAnd.querySelector('.selected_tag_inputted');
    const orSelectedTagInputted = containerOr.querySelector('.selected_tag_inputted');

    andTags.forEach((tag) => {
        tag.addEventListener('click', () => selectTagToggleComplex(tag, andSelectedTagInputted, searchButton) );
    });
    orTags.forEach((tag) => {
        tag.addEventListener('click', () => selectTagToggleComplex(tag, orSelectedTagInputted, searchButton) );
    });

    clearButton.addEventListener('click', () => { 
        clearSelectedTags(andTags, andSelectedTagInputted, searchButton);
        clearSelectedTags(orTags, orSelectedTagInputted, searchButton);
    });

    // ブラウザバックした際に隠れinputをクリアする
    window.addEventListener('pageshow', ()=> {
        andSelectedTagInputted.value = "";
        orSelectedTagInputted.value = "";
    });    
};

// タグの選択状態を切り替え、リンクをセットする関数
function selectTagToggleComplex(tag, inputField, searchButton) {
    const tagValue = encodeURIComponent(tag.value);
    const selectedTags = inputField.value.split('+');

    if (!selectedTags.includes(tagValue)) {
        inputField.value += tagValue + "+";
    } else {
        inputField.value = inputField.value.replace(`${tagValue}+`, "");
    };

    tag.classList.toggle('select_tag');

    const setLinkAnd = document.querySelector('.container_complex_and').querySelector('.selected_tag_inputted').value.replace(/\+$/, "");
    const setLinkOr = document.querySelector('.container_complex_or').querySelector('.selected_tag_inputted').value.replace(/\+$/, "");

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
    });
    inputField.value = "";
    searchButton.removeAttribute('href');
};
