const screenInput = document.getElementsByClassName("screen")[0];
// console.log(screen)
const buttons = Array.from(document.getElementsByClassName("btn"));
let isError = false;
let isScreenEmpty = true;

buttons.forEach((elem) => {
    elem.addEventListener("click", function (e) {
        if ([")", "%", "/", "x", "x²", "+"].includes(e.target.innerText)) {
            if (!screenInput.value) {
                screenInput.value = "";
                console.log("1")
            } else {
                if (e.target.innerText === "x") {
                    e.target.innerText = "*";
                    screenInput.value += e.target.innerText;
                    e.target.innerText = "x";
                } else if (e.target.innerText === "x²") {
                    console.log(e.target)
                    e.target.innerText = "**2";
                    screenInput.value += e.target.innerText;
                    screenInput.value = eval(screenInput.value)
                    e.target.innerHTML = `x²`
                }
                else {
                    screenInput.value += e.target.innerText;
                }
            }
        } else {
            if (isError) {
                screenInput.value = "";
                isError = false;
            }
            if (e.target.innerText !== "=") {
                if (e.target.innerText !== "x" && !isError && e.target.innerText !== 'x y') {
                    screenInput.value += e.target.innerText;
                }
            }
            switch (e.target.innerText) {
                case "AC":
                    screenInput.value = "";
                    break;
                case "←":
                    const screenValue = screenInput.value;
                    screenInput.value = screenValue.slice(0, -2)
                    break
                case "=":
                    if (screenInput.value) {
                        try {

                            const output = eval(screenInput.value);
                            if (output === Infinity || output === -Infinity) {
                                throw new Error('Error');
                            } else {
                                screenInput.value = output;
                            }
                        } catch {
                            screenInput.value = " Invalid Value 😜😢";
                            isError = true;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    })

})







