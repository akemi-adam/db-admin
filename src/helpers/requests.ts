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