async function MyFunction(event)
{
    event.preventDefault();

    // bring in the word
    word = document.getElementById("word").value;

    // check if word is empty
    if(word === "")
    {
        alert("its empty");
    }
    else
    {
        let JsonData = await api(word);
        console.log(JsonData);
        if(JsonData.title === "No Definitions Found")
        {
            let HtmlContent = `<h2>Sorry, i don't know that word yet!`;
            document.getElementById("meaning").innerHTML = HtmlContent;
        }
        else
        {
            let HtmlContent = `<h2><b>${JsonData[0].word}</b>, (${JsonData[0].meanings[0].partOfSpeech})
                                <audio controls>
                                <source src="${JsonData[0].phonetics[0].audio}" type="audio/mpeg">
                                </audio></h2>
                                <p><b>Meaning - </b>${JsonData[0].meanings[0].definitions[0].definition}</p>
                                <p><b>Eg - </b>${JsonData[0].meanings[0].definitions[0].example}</p>`
            document.getElementById("meaning").innerHTML = HtmlContent;
        }
    }
}

async function api(word)
{
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("submit").addEventListener("click", MyFunction);