import { createJwtToken } from "@/app/lib/jwtToken";
import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const { accessToken } = await req.json();

  if (!accessToken) {
    return Response.json({ error: "missing_access_token" }, { status: 400 });
  }

  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return Response.json(
      { error: "구글 로그인에 실패했습니다!" },
      { status: 400 }
    );
  } else {
    const userInfo = await response.json();

    const email = String(userInfo.email || "").toLowerCase();
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    let userId: string;

    if (existing && existing.id) {
      userId = existing.id;
    } else {
      const { data: created, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            name: String(userInfo.name || ""),
            profile_image: String(userInfo.picture || ""),
            provider: "google",
            email,
          },
        ])
        .select()
        .single();

      if (insertError || !created) {
        return Response.json(
          { error: "사용자 정보 저장에 실패했습니다!", details: insertError },
          { status: 400 }
        );
      }
      userId = created.id;
    }

    const jwtToken = createJwtToken({ userId });

    const result = NextResponse.json({ success: true }, { status: 200 });

    result.cookies.set("jwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return result;
  }
}
