function calcularIMC(){

    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if(!peso || !altura){
        document.getElementById("resultado").innerHTML =
        "Por favor completa todos los campos.";
        return;
    }

    let imc = peso / (altura * altura);

    let categoria = "";

    if(imc < 18.5){
        categoria = "Bajo peso";
    }
    else if(imc < 25){
        categoria = "Peso saludable";
    }
    else if(imc < 30){
        categoria = "Sobrepeso";
    }
    else{
        categoria = "Obesidad";
    }

    document.getElementById("resultado").innerHTML =
    `Tu IMC es ${imc.toFixed(2)} - ${categoria}`;
}