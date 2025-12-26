"use client";

import LoginBg from "@/app/assets/images/LoginBg.svg";
import { LoginInputData } from "@/app/data/Login";
import { Fragment, useEffect, useState } from "react";
import EyeIcon from "@/app/components/Icon/EyeIcon";
import CheckIcon from "@/app/assets/images/CheckButton.svg";
import UnCheckedIcon from "@/app/assets/images/NoneCheckButton.svg";
import RedirectIcon from "@/app/assets/images/SearchPassUserInfo.svg";
import Link from "next/link";
import SocialLogin from "@/app/components/ui/Login/SocialLogin";

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");

  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const hash = window.location.hash.includes("#access_token=");
    if (hash) {
      const accessToken = window.location.hash
        .split("access_token=")[1]
        .split("&")[0];
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchGoogleLogin = async () => {
      const response = await fetch("/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: accessToken }),
      });
      if (response.ok) {
        window.location.replace("/");
      }
    };

    fetchGoogleLogin();
  }, [accessToken]);

  return (
    <div className="w-full h-screen relative">
      <LoginBg className="object-fill w-full h-full" />
      <main className="w-150 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[30px]">
        <p className="text-2xl font-bold text-center text-[32px] mt-14">
          로그인
        </p>
        <section className="flex flex-col items-center gap-8 mt-12 w-110 mx-auto">
          {LoginInputData.map(({ id, placeholder, type, name }) => (
            <Fragment key={id}>
              <div className="relative">
                <input
                  type={
                    type === "password"
                      ? isPasswordVisible
                        ? "text"
                        : "password"
                      : type
                  }
                  placeholder={placeholder}
                  name={name}
                  className="w-110 text-[17px] placeholder:text-[var(--placeholder-color)] color-[var(--black-color)]  rounded-[8px] border-[0.6px] border-[var(--placeholder-color)] py-4 px-6"
                />
                {type === "password" && (
                  <EyeIcon
                    className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
                    visible={isPasswordVisible}
                    onClick={handlePasswordVisible}
                  />
                )}
              </div>
            </Fragment>
          ))}
          <div className="w-110 flex flex-row justify-between">
            <div className="flex flex-row items-center gap-3">
              {isChecked ? (
                <CheckIcon className="cursor-pointer" onClick={handleChecked} />
              ) : (
                <UnCheckedIcon
                  className="cursor-pointer"
                  onClick={handleChecked}
                />
              )}
              <p className="text-[var(--text-secondary-color)]">
                로그인 상태 유지하기
              </p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <p className="text-[var(--text-secondary-color)]">
                아이디 비밀번호 찾기
              </p>
              <Link href="/find-password">
                <RedirectIcon />
              </Link>
            </div>
          </div>
          <button className="w-full bg-[var(--primary-LightestGreen)] text-white rounded-[10px] cursor-pointer">
            <p className="text-white text-center py-4 text-[18px] font-bold">
              로그인
            </p>
          </button>
          <div className="flex flex-row w-full items-center justify-center gap-4">
            <span className="w-1/2 h-[0.6px] bg-[var(--placeholder-color)]"></span>
            <p className="text-[var(--text-secondary-color)] whitespace-nowrap">
              또는
            </p>
            <span className="w-1/2 h-[0.6px] bg-[var(--placeholder-color)]"></span>
          </div>
          <SocialLogin />
          <div className="flex flex-row items-center gap-4 mb-10">
            <p className="text-[var(--text-secondary-color)]">
              아직 ‘사부작 사부작’에 처음이세요?
            </p>
            <Link href="/signup">
              <p className="text-[var(--text-secondary-color)] font-[600] cursor-pointer underline-offset-6 underline">
                회원가입 하기
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
