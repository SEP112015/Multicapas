document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleSubmit);
});

async function loadContacts() {
    try {
        const response = await fetch('http://www.raydelto.org/agenda.php');
        const contacts = await response.json();
        displayContacts(contacts);
    } catch (error) {
        console.error('Error loading contacts:', error);
        alert('Error al cargar los contactos');
    }
}

function displayContacts(contacts) {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';
    
    contacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-card';
        contactElement.innerHTML = `
            <strong>Nombre:</strong> ${contact.nombre} ${contact.apellido}<br>
            <strong>Teléfono:</strong> ${contact.telefono}
        `;
        contactsList.appendChild(contactElement);
    });
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    
    const newContact = {
        nombre,
        apellido,
        telefono
    };
    
    try {
        const response = await fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            body: JSON.stringify(newContact)
        });
        
        if (response.ok) {
            alert('Contacto agregado exitosamente');
            document.getElementById('contactForm').reset();
            loadContacts(); // Reload the contacts list
        } else {
            throw new Error('Error al agregar el contacto');
        }
    } catch (error) {
        console.error('Error saving contact:', error);
        alert('Error al guardar el contacto');
    }
}
