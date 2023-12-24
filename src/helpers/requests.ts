export async function getDatabases() {
    const response = await fetch('http://localhost:5500/database', {
        method: 'GET',
        headers: {
        accept:
            'application.json',
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    })

    return response.json()
}

export async function makeBackup() {
    const response = await fetch(`http://localhost:5500/export?database=${localStorage.getItem('database')}` , {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    })

    if (!response.ok) alert(`Erro ao fazer backup do banco ${localStorage.getItem('database')}`)

    const url = window.URL.createObjectURL(await response.blob())

    const link = document.createElement('a')
    link.href = url
    link.download = `${localStorage.getItem('database')}.sql`
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}