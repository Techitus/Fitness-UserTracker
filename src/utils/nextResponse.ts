/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

const createResponse = (
  statusNumber: number,
  message: string,
  data?: any
): NextResponse => {
  return NextResponse.json(
    {
      message,
      data: data && (Array.isArray(data) ? (data.length > 0 ? data : null) : data),
    },
    { status: statusNumber }
  );
};

export default createResponse;
