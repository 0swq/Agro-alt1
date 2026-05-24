const { createClient } = window.supabase
const client = createClient(
    'https://awgtrkchonoambjvqnxw.supabase.co',
    'TU_ANON_KEY'
)

// Leer token del hash que Supabase agrega al redirigir
const hashParams = new URLSearchParams(window.location.hash.substring(1))
const accessToken = hashParams.get('access_token')
const refreshToken = hashParams.get('refresh_token')

if (accessToken) {
    client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
}

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

    const { error } = await client.auth.updateUser({ password })

    if (error) {
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