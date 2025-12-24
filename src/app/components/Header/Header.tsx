import Logo from "@/app/assets/Logo/logo.svg";
import { HeaderData } from "@/app/data/HeaderData";
import { HeaderClickEvent } from "@/app/components/Header/ClickEvent/HeaderLink";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <header className="w-full">
      <div className="mx-auto flex flex-row items-center justify-between">
        <div className="flex items-center gap-6 w-full">
          <Logo />
          <HeaderClickEvent headerData={HeaderData} isLogin={isLogin} />
        </div>
      </div>
    </header>
  );
}
