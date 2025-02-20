//get a single menu
import {API_URL} from "@/utils/variables";

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const response = await fetch(`${API_URL}/menu/${id}`);

    if (response.ok) {
        const data = await response.json();
        return Response.json({
            success: true,
            result: data
        })
    }

    return Response.json({
        success: false
    });
}

//delete a single menu and it children
export async function DELETE(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        return Response.json({
            success: true,
            result: data
        })
    }

    return Response.json({
        success: false
    });
}


//update a menu
export async function PATCH(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const {name, parentId} = await request.json()

    const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, parentId: parentId}),
    });

    if (response.ok) {
        const data = await response.json();
        return Response.json({
            success: true,
            result: data
        })
    }

    return Response.json({
        success: false
    });
}

