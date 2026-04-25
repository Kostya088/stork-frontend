import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { nextServer } from "@/lib/api/api";
import { logErrorResponse } from "../_utils/utils";

export async function GET() {
  try {
    const res = await nextServer.get("/weeks");

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
