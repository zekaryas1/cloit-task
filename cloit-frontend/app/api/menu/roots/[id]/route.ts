import {API_URL} from "@/utils/variables";

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    if (!id) {
        return Response.error();
    }

    const response = await fetch(`${API_URL}/menu/roots/${id}`);
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