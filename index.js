
const client = window.supabase.createClient(
    'https://awgtrkchonoambjvqnxw.supabase.co',
    'TU_ANON_KEY'
)
async function cambiar() {
    const password = document.getElementById('password').value
    const btn = document.getElementById('btn')
    const mensaje = document.getElementById('mensaje')

    if (password.length < 6) {
        mensaje.className = 'mensaje error'
        mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres.'
        return
    }

    btn.disabled = true
    btn.textContent = 'Cambiando...'
    mensaje.className = 'mensaje'

    const { error } = await client.auth.updateUser({ password })

    if (error) {
        mensaje.className = 'mensaje error'
        mensaje.textContent = 'Error: ' + error.message
        btn.disabled = false
        btn.textContent = 'Cambiar contraseña'
    } else {
        mensaje.className = 'mensaje exito'
        mensaje.textContent = '✓ Contraseña cambiada exitosamente. Ya puedes cerrar esta página.'
        btn.disabled = true
        btn.textContent = 'Listo'
    }
}