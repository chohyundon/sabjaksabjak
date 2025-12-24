import GoogleIcon from "@/app/assets/images/GoogleLogo.svg";

export default function SocialLogin() {
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope =
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "token";

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full border border-[var(--placeholder-color)] bg-[#FFFFFF] text-black rounded-[10px]  cursor-pointer relative"
    >
      <GoogleIcon className="absolute left-6 top-1/2 -translate-y-1/2" />
      <p className="text-[var(--gray-color-light)] text-center py-4 text-[18px] font-[600]">
        Google로 로그인
      </p>
    </button>
  );
}
