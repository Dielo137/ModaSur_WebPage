document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('formMessages');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío tradicional del formulario

            // Limpiar mensajes anteriores
            formMessages.innerHTML = '';
            formMessages.className = 'mt-3'; // Resetear clases
            clearErrors();

            // Obtener los valores de los campos
            const nombreInput = document.getElementById('nombre');
            const emailInput = document.getElementById('email');
            const asuntoInput = document.getElementById('asunto');
            const mensajeInput = document.getElementById('mensaje');

            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            const asunto = asuntoInput.value.trim(); // Asunto es opcional según tu HTML
            const mensaje = mensajeInput.value.trim();

            let isValid = true;

            // Validación simple
            if (nombre === '') {
                isValid = false;
                showError(nombreInput, 'Por favor, ingresa tu nombre.');
            }

            if (email === '') {
                isValid = false;
                showError(emailInput, 'Por favor, ingresa tu email.');
            } else if (!isValidEmail(email)) {
                isValid = false;
                showError(emailInput, 'Por favor, ingresa un email válido.');
            }

            if (mensaje === '') {
                isValid = false;
                showError(mensajeInput, 'Por favor, escribe tu mensaje.');
            }
            
            if (isValid) {
                // Simular envío de datos
                formMessages.textContent = 'Enviando tu mensaje...';
                formMessages.classList.add('alert', 'alert-info');

                // Crear un objeto con los datos (como pide la Unidad 2)
                const formData = {
                    nombre: nombre,
                    email: email,
                    asunto: asunto,
                    mensaje: mensaje
                };
                console.log("Datos del formulario a enviar:", formData);

                // Simular una pequeña demora de red
                setTimeout(() => {
                    formMessages.textContent = '¡Mensaje enviado con éxito! Gracias por contactarnos.';
                    formMessages.className = 'mt-3 alert alert-success'; // Cambiar clases para feedback
                    contactForm.reset(); // Limpiar el formulario

                    // Opcional: Guardar en Local Storage (de Unidad 3, pero un guiño)
                    try {
                        let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
                        submissions.push(formData);
                        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                        console.log("Formulario guardado en Local Storage.");
                    } catch (e) {
                        console.warn("No se pudo guardar en Local Storage:", e);
                    }

                }, 1500);

            } else {
                formMessages.textContent = 'Por favor, corrige los errores en el formulario.';
                formMessages.classList.add('alert', 'alert-danger');
            }
        });
    }

    function isValidEmail(email) {
        // Expresión regular simple para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(inputElement, message) {
        // Podrías añadir el mensaje de error debajo del input
        inputElement.classList.add('is-invalid'); // Clase de Bootstrap para error
        let errorDiv = inputElement.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        errorDiv.textContent = message;
    }

    function clearErrors() {
        const invalidInputs = contactForm.querySelectorAll('.is-invalid');
        invalidInputs.forEach(input => {
            input.classList.remove('is-invalid');
            let errorDiv = input.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
               // errorDiv.textContent = ''; // Podrías optar por remover el div también
               errorDiv.remove();
            }
        });
    }
});