import { NextRequest, NextResponse } from "next/server";

// 미들웨어 체이닝 함수
type Middleware = (
  req: NextRequest,
  ev: any,
  next: () => Promise<NextResponse>
) => Promise<NextResponse>;

const withLogging: Middleware = async (req, ev, next) => {
  console.log(`[LOG] ${req.nextUrl.pathname}`);
  return await next();
};

const withAuth: Middleware = async (req, ev, next) => {
  const isAuthRoute = req.nextUrl.pathname.startsWith("/admin");
  const hasAuthCookie = req.cookies.get("auth-token");

  if (isAuthRoute && !hasAuthCookie) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return await next();
};

// 미들웨어 체인 실행기
// 미들웨어 함수를 만들어서 리턴해줌
const applyMiddleware = (middlewares: Middleware[]) => {
  return async (req: NextRequest, ev: any): Promise<NextResponse> => {
    let index = -1;
    const runner = async (): Promise<NextResponse> => {
      index++;
      const middleware = middlewares[index];
      // "더 이상 미들웨어가 없으니 이제 Next.js가 라우팅 및 페이지 렌더링을 진행해라"는 의미
      if (!middleware) return NextResponse.next();
      return middleware(req, ev, runner);
    };
    return await runner();
  };
};

export const middleware = applyMiddleware([withLogging, withAuth]);

// 미들웨어가 적용될 경로
export const config = {
  matcher: ["/admin/:path*"],
};
