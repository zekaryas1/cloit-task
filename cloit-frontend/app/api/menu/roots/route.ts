import {API_URL} from "@/utils/variables";

//get root menus
export async function GET() {
    const response = await fetch(`${API_URL}/menu/roots`);
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
