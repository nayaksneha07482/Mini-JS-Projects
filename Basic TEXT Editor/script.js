//Declaring Variables

let buttons = document.getElementsByClassName("btn");
buttons = [...buttons];
const textArea = document.getElementsByClassName("textArea")[0];
const preview = document.getElementsByClassName("preview")[0];
const searchText = document.getElementById('search');
const chars = document.getElementsByClassName("chars")[0];
const words = document.getElementsByClassName("words")[0];
const time = document.getElementsByClassName("time")[0];
function btnStatus(status1, status2) {
    buttons.forEach(btn => {
        btn.classList.add(status1);
        btn.classList.remove(status2);
    })
}
btnStatus("btn_inactive", null)

function textInfo() {
    chars.innerText = `Characters : ${textArea.value === "" ? 0 : textArea.value.length}`
    words.innerText = `Words : ${(textArea.value === "" ? 0 : textArea.value.split(" ").length)}`;
    time.innerText = `Approx time to read : ${Math.round(((textArea.value).split(" ").length) / 3)}`
}

textArea.addEventListener("input", () => {
    preview.innerText = textArea.value;
    if (textArea.value) {
        btnStatus("btn_active", "btn_inactive")
        buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                if (e.target.hasAttribute("data-upper")) {
                    textArea.value = textArea.value.toUpperCase();

                } else if (e.target.hasAttribute("data-lower")) {
                    textArea.value = textArea.value.toLowerCase();

                } else if (e.target.hasAttribute("data-title")) {
                    const arr = textArea.value.split(" ");
                    console.log(arr)
                    const titleCase = arr.reduce((acc, curr) => {
                        if (curr) {
                            acc = acc + curr[0].toUpperCase() + curr.slice(1).toLowerCase() + " ";
                        }

                        return acc;

                    }, "");
                    textArea.value = titleCase;
                    console.log(titleCase)

                } else if (e.target.hasAttribute("data-remove-space")) {
                    const arr = textArea.value.split(" ");
                    const removeExtraSpaces = arr.reduce((acc, curr) => {
                        if (curr) {
                            acc = acc + curr + " ";
                        }
                        return acc;

                    }, "");
                    textArea.value = removeExtraSpaces;
                } else if (e.target.hasAttribute("data-copy")) {
                    navigator.clipboard.writeText(textArea.value);
                } else if (e.target.hasAttribute("data-clear")) {
                    textArea.value = "";
                }

                preview.innerText = textArea.value;

            })
        })

        textInfo();
        searchText.addEventListener("input", () => {
            const search = searchText.value;
            const previewText = preview.innerText;
            preview.innerHTML = previewText.replace(new RegExp(search, 'gi'), "<mark>" + search + "</mark>")
        })
    } else {
        btnStatus("btn_inactive", "btn_active")
        textInfo();
    }
})
