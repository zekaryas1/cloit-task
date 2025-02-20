//create new menu

import {API_URL} from "@/utils/variables";

export async function POST(request: Request) {
    const {name, parentId} = await request.json()

    const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, parentId: parentId}),
    });

    if (response.ok) {
        return Response.json({
            success: true,
            result: await response.json()
        })
    }

    return Response.json({
        success: false
    });
}
