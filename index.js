const { createClient } = window.supabase

// 👇 Usa la clave anónima correcta (el JWT largo)
const client = createClient(
    'https://awgtrkchonoambjvqnxw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3Z3Rya2Nob25vYW1ianZxbnh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODA5MjMsImV4cCI6MjA5Mzc1NjkyM30.8mRqCgdMUjikAwoqpTU9wMnUyTBXvxY4J75iw3dnujo'
)

// Extraer tokens de la URL (hash)
const hashParams = new URLSearchParams(window.location.hash.substring(1))
const accessToken = hashParams.get('access_token')
const refreshToken = hashParams.get('refresh_token')

// Función asíncrona para establecer sesión ANTES de cambiar contraseña
async function initSession() {
    if (accessToken && refreshToken) {
        const { error } = await client.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
        })
        if (error) {
            console.error('Error al establecer sesión:', error)
            document.getElementById('mensaje').innerHTML =
                '<div class="alert alert-danger">No se pudo iniciar sesión. Reabre el enlace desde tu correo.</div>'
        } else {
            console.log('Sesión iniciada correctamente')
        }
    } else {
        console.warn('No hay tokens en la URL')
    }
}

// Ejecutar al cargar
initSession()

async function cambiar() {
    const password = document.getElementById('password').value
    const btn = document.getElementById('btn')
    const mensaje = document.getElementById('mensaje')

    if (password.length < 6) {
        mensaje.innerHTML = '<div class="alert alert-warning">La contraseña debe tener al menos 6 caracteres.</div>'
        return
    }

    btn.disabled = true
    btn.textContent = 'Cambiando...'
    mensaje.innerHTML = ''

    // Esperar un momento a que la sesión esté completamente lista
    await new Promise(r => setTimeout(r, 500))

    const { error } = await client.auth.updateUser({ password })

    if (error) {
        console.error('Error updateUser:', error)
        mensaje.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`
        btn.disabled = false
        btn.textContent = 'Cambiar contraseña'
    } else {
        mensaje.innerHTML = '<div class="alert alert-success">✓ Contraseña cambiada exitosamente. Ya puedes cerrar esta página.</div>'
        btn.disabled = true
        btn.textContent = 'Listo'
    }
}

function toggleVer() {
    const input = document.getElementById('password')
    input.type = input.type === 'password' ? 'text' : 'password'
}