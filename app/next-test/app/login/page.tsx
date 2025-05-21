"use client";

const Page = () => {
  const login = () => {
    document.cookie = "auth-token=sample; path=/";
    window.location.href = "/admin";
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={login}>로그인하고 /admin으로 가기</button>
    </div>
  );
};

export default Page;
