import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { nextServer } from "@/lib/api/api";
import { logErrorResponse } from "@/app/api/_utils/utils";

export async function GET({ params }: { params: Promise<{ week: string }> }) {
  try {
    const { week } = await params;

    const res = await nextServer.get(`/weeks/mom/${week}`);

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
