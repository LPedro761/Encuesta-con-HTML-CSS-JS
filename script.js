document.addEventListener('DOMContentLoaded', function() {
    const encuestaForm = document.getElementById('encuestaForm');
    const encuestasGrid = document.getElementById('encuestasGrid');
    const encuestas = JSON.parse(localStorage.getItem('encuestas')) || [];

    cargarEncuestas();

    encuestaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const pregunta1 = document.getElementById('pregunta1').value.trim();
        const pregunta2 = document.getElementById('pregunta2').value.trim();
        const pregunta3 = document.getElementById('pregunta3').value.trim();

        if (pregunta1 && pregunta2 && pregunta3) {
            const encuesta = {
                pregunta1,
                pregunta2,
                pregunta3
            };

            mostrarEncuesta(encuesta);

            encuestas.push(encuesta);
            localStorage.setItem('encuestas', JSON.stringify(encuestas));

            encuestaForm.reset();
        } else {
            alert('Por favor, responde todas las preguntas.');
        }
    });

    function mostrarEncuesta(encuesta) {
        const encuestaItem = document.createElement('div');
        encuestaItem.classList.add('encuesta-item');
        encuestaItem.innerHTML = `
            <div class="pregunta">Pregunta 1: ${encuesta.pregunta1}</div>
            <div class="pregunta">Pregunta 2: ${encuesta.pregunta2}</div>
            <div class="pregunta">Pregunta 3: ${encuesta.pregunta3}</div>
            <button class="eliminar">Eliminar</button>
        `;
        encuestasGrid.appendChild(encuestaItem);

        encuestaItem.querySelector('.eliminar').addEventListener('click', function() {
            encuestas.splice(encuestas.indexOf(encuesta), 1);
            localStorage.setItem('encuestas', JSON.stringify(encuestas));
            encuestasGrid.removeChild(encuestaItem);
        });
    }

    function cargarEncuestas() {
        encuestas.forEach(function(encuesta) {
            mostrarEncuesta(encuesta);
        });
    }
});

