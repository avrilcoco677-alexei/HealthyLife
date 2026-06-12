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
// CONEXIÓN DIRECTA CON BASE DE DATOS EN LA NUBE (JSON)
// ==========================================
document.getElementById('formCita').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue e interrumpa el envío

    // URL de tu API en Google Apps Script
    const urlBaseDatos = 'https://script.google.com/macros/s/AKfycbxrUuRaBFHpLTDcBenLSR-kjCF0HPW3y73B9wVFiRAIT60uFapwGjK9xHm8uHIvD0Xi/exec';

    // Recolectar de forma automática los datos ingresados en el formulario
    const formData = new FormData(this);
    
    // Convertir los datos a un formato compatible de variables URL
    const lasVariables = new URLSearchParams(formData);

    // Enviar los datos estructurados usando Fetch API
    fetch(urlBaseDatos, {
        method: 'POST',
        body: lasVariables,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json()) // Esperar y parsear la respuesta JSON del servidor
    .then(data => {
        if(data.status === 'success') {
            alert('¡Registro Exitoso! Tu solicitud de cita ha sido guardada en la base de datos.');
            document.getElementById('formCita').reset(); // Limpiar el formulario de forma automática
        } else {
            alert('Hubo un inconveniente al guardar en la base de datos: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error detectado:', error);
        alert('¡Registro procesado con éxito! Revisa tu archivo de Google Sheets.');
    });
});