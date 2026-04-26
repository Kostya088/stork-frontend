import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/app/api/_utils/utils";
import { nextServer } from "@/lib/api/api";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await nextServer.get("/weeks/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
