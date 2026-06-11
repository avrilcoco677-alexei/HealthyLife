/**
 * Lógica Funcional de Calculadoras - HealthyLife
 */

function calcularIMC() {
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const resultadoDiv = document.getElementById("resultado");

    let peso = parseFloat(pesoInput.value);
    let altura = parseFloat(alturaInput.value);

    // Validación de entrada vacía o incorrecta
    if (!peso || !altura || peso <= 0 || altura <= 0) {
        resultadoDiv.style.display = "block";
        resultadoDiv.style.backgroundColor = "#ffebee";
        resultadoDiv.style.color = "#c62828";
        resultadoDiv.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Por favor completa ambos campos con valores correctos.";
        return;
    }

    let imc = peso / (altura * altura);
    let categoria = "";
    let colorBg = "";
    let colorTexto = "";

    // Clasificación de IMC con asignación de color visual dinámico
    if (imc < 18.5) {
        categoria = "Bajo peso";
        colorBg = "#e3f2fd"; // Azul informativo
        colorTexto = "#1565c0";
    } else if (imc < 25) {
        categoria = "Peso saludable 🌿";
        colorBg = "#e8f5e9"; // Verde éxito
        colorTexto = "#2e7d32";
    } else if (imc < 30) {
        categoria = "Sobrepeso";
        colorBg = "#fff3e0"; // Naranja preventivo
        colorTexto = "#ef6c00";
    } else {
        categoria = "Obesidad ⚠️";
        colorBg = "#ffebee"; // Rojo alerta
        colorTexto = "#c62828";
    }

    // Renderizado del resultado moderno en el UI
    resultadoDiv.style.display = "block";
    resultadoDiv.style.backgroundColor = colorBg;
    resultadoDiv.style.color = colorTexto;
    resultadoDiv.innerHTML = `<i class="fa-solid fa-square-poll-vertical"></i> Tu IMC es <strong>${imc.toFixed(2)}</strong> - Categoría: <strong>${categoria}</strong>`;
}

function calcularAgua() {
    const pesoAguaInput = document.getElementById("pesoAgua");
    const resultadoAguaDiv = document.getElementById("resultadoAgua");

    let peso = parseFloat(pesoAguaInput.value);

    if (!peso || peso <= 0) {
        resultadoAguaDiv.style.display = "block";
        resultadoAguaDiv.style.backgroundColor = "#ffebee";
        resultadoAguaDiv.style.color = "#c62828";
        resultadoAguaDiv.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Por favor, ingresa un peso válido.";
        return;
    }

    // Fórmula estándar recomendada por OMS: 35ml por cada kilogramo corporal
    let litrosRecomendados = (peso * 35) / 1000;

    resultadoAguaDiv.style.display = "block";
    resultadoAguaDiv.style.backgroundColor = "#e1f5fe"; // Celeste hidratación
    resultadoAguaDiv.style.color = "#0277bd";
    resultadoAguaDiv.innerHTML = `<i class="fa-solid fa-glass-water"></i> Debes consumir aproximadamente <strong>${litrosRecomendados.toFixed(1)} litros</strong> de agua al día.`;
}

// ==========================================
// PREPARACIÓN PARA FASE 4 Y 5 (PHP - TELEGRAM - SHEETS)
// ==========================================
document.getElementById("formCita").addEventListener("submit", function(e) {
    // Nota del programador: prevenimos el envío por defecto para cuando usemos AJAX/Fetch en PHP
    // De momento lo dejamos listo para interceptar datos corporativos.
    console.log("Formulario de cita enviado correctamente, esperando backend PHP...");
});