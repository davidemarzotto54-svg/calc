const display = document.getElementById("display");
const bottoni = document.querySelectorAll(".btn");

let espressione = "";

function aggiornaDisplay(testo) {
  display.textContent = testo === "" ? "0" : testo;
}

function calcolaCatena(esp) {
  const numeri = [];
  const operatori = [];
  let numeroAttuale = "";

  for (const c of esp) {
    if ((c >= "0" && c <= "9") || c === ".") {
      numeroAttuale += c;
    } else if ("+-*:".includes(c)) {
      if (numeroAttuale === "") return "Errore";
      numeri.push(parseFloat(numeroAttuale));
      numeroAttuale = "";
      operatori.push(c);
    } else if (c === " ") {
      // ignora gli spazi
    }
  }

  if (numeroAttuale === "") return "Errore";
  numeri.push(parseFloat(numeroAttuale));

  let risultato = numeri[0];

  for (let i = 0; i < operatori.length; i++) {
    const op = operatori[i];
    const prossimo = numeri[i + 1];

    if (op === "+") {
      risultato += prossimo;
    } else if (op === "-") {
      risultato -= prossimo;
    } else if (op === "*") {
      risultato *= prossimo;
    } else if (op === ":") {
      if (prossimo === 0) return "impossibile";
      risultato /= prossimo;
    }
  }

  return risultato;
}

bottoni.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.val;

    if (val === "C") {
      espressione = "";
      aggiornaDisplay("0");
    } else if (val === "=") {
      const res = calcolaCatena(espressione);
      aggiornaDisplay(String(res));
      espressione = typeof res === "number" ? String(res) : "";
    } else {
      espressione += val;
      aggiornaDisplay(espressione);
    }
  });
});