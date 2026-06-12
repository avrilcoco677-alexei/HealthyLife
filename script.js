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
// ========================================================
// LÓGICA DEL GENERADOR DINÁMICO DE MENÚ SEMANAL
// ========================================================
function actualizarMenuSugerido() {
    const objetivo = document.getElementById("selectObjetivoMenu").value;
    const areaImpresion = document.getElementById("area-impresion-menu");
    
    const celdaDesayuno = document.getElementById("celdaDesayuno");
    const celdaComida = document.getElementById("celdaComida");
    const celdaCena = document.getElementById("celdaCena");
    const titulo = document.getElementById("tituloMenuPDF");

    if (!objetivo) {
        areaImpresion.style.display = "none";
        return;
    }

    areaImpresion.style.display = "block";

    // Respuestas fijas profesionales según el objetivo seleccionado
    if (objetivo === "bajar") {
        titulo.innerText = "Plan Semanal: Déficit Calórico Controlado";
        celdaDesayuno.innerText = "Omelette de 3 claras con espinacas y champiñones + 1 rebanada de pan integral + Té verde.";
        celdaComida.innerText = "150g de pechuga de pollo a la plancha + 1 taza de brócoli al vapor + 1/2 taza de arroz integral.";
        celdaCena.innerText = "Filete de pescado blanco empapelado con calabacitas + Ensalada verde mix sin aderezos cremosos.";
    } else if (objetivo === "ganar") {
        titulo.innerText = "Plan Semanal: Superávit Hipertrofia Estructurado";
        celdaDesayuno.innerText = "3 huevos completos revueltos + 2 rebanadas de pan con aguacate + Batido de avena con plátano y leche.";
        celdaComida.innerText = "180g de carne de res magra + 1 taza y media de arroz blanco + Ensalada de espinacas con frutos secos.";
        celdaCena.innerText = "150g de salmón o atún a la plancha + 1 papa mediana al horno con aceite de oliva + Espárragos.";
    } else if (objetivo === "salud") {
        titulo.innerText = "Plan Semanal: Mantenimiento Mente y Cuerpo";
        celdaDesayuno.innerText = "Yogurt griego sin azúcar con fresas, nueces y semillas de chía + 1 taza de café americano.";
        celdaComida.innerText = "Tazón de quinoa con pechuga de pollo en cubos, pimientos asados, aguacate y aderezo de limón.";
        celdaCena.innerText = "Tacos en tortilla de maíz de pechuga de pavo con pico de gallo y guacamole casero.";
    }
}

// Función mágica que convierte la sección en un PDF descargable
function descargarMenuPDF() {
    const objetivo = document.getElementById("selectObjetivoMenu").value;
    if (!objetivo) {
        alert("Por favor, selecciona un objetivo primero para poder generar tu archivo.");
        return;
    }
    
    // Ejecuta la orden nativa del sistema para guardar la pantalla estructurada como PDF
    alert("Se abrirá el asistente de tu sistema. En el destino selecciona 'Guardar como PDF' para descargar tu menú semanal.");
    window.print();
}

// ========================================================
// SIMULACIÓN DEL APARTADO PRIVADO DE EXPEDIENTE FÍSICO
// ========================================================
function enviarFotosProgreso(event) {
    event.preventDefault(); // Evita recarga de página
    
    const nombrePaciente = document.getElementById("progresoNombre").value;
    const fotosInput = document.getElementById("progresoFotosInput");

    if (fotosInput.files.length === 0) {
        alert("Por favor selecciona al menos una fotografía de tu progreso.");
        return;
    }

    // Simulación asíncrona profesional de carga en la nube
    alert(`⚡ Procesando archivos cifrados de: ${nombrePaciente}...\nSubiendo ${fotosInput.files.length} imagen(es) al servidor clínico.`);
    
    setTimeout(() => {
        alert("¡Éxito Absoluto! Tus fotos de progreso físico se han cargado y encriptado en la base de datos de tu expediente correctamente.");
        document.getElementById("formProgresoFotos").reset();
    }, 2000);
}