"use client";

import { HeaderData } from "@/app/data/HeaderData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import SearchIcon from "@/app/assets/Logo/Search_icon.svg";

export const HeaderClickEvent = ({
  headerData,
  isLogin,
}: {
  isLogin: boolean;
  headerData: HeaderData;
}) => {
  const pathname = usePathname();

  const visibleItems = isLogin
    ? headerData
    : headerData.filter(
        (item) => item.title !== "알림" && item.title !== "메세지"
      );

  return visibleItems.map(({ id, title, href }, idx) => (
    <Fragment key={id}>
      {idx === 3 && (
        <div className="relative ml-auto">
          <input
            type="text"
            placeholder=""
            className="h-[36px] rounded-[30px] border border-[var(--border-color)] shadow-[0_5px_11px_2px_#F2F2F7] px-6"
          />
          <SearchIcon className="absolute right-6 top-1/2 -translate-y-1/2" />
        </div>
      )}
      <Link href={href}>
        <p
          className={`${
            title === "회원가입"
              ? "py-2 px-4 bg-[var(--primary-MediumGreen)] text-white rounded-full hover:opacity-70"
              : "py-6"
          } ${
            title !== "회원가입"
              ? pathname === href
                ? "text-[var(--primary-MediumGreen)] font-bold"
                : "text-[var(--text-primary-color)]"
              : ""
          }`}
        >
          {title}
        </p>
      </Link>
    </Fragment>
  ));
};
