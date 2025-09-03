import { type NextRequest, NextResponse } from 'next/server';

const X_API_KEY = 'secret1';
const API_BASE_URL = process.env.API_BASE_URL;

function rewriteUrl(url: string) {
  const removedDomainUrl = url.replace(/^https?:\/\/[^\/]+(:d+)?\/api/, '');
  return `${API_BASE_URL}/${removedDomainUrl}`;
}

const allowedOrigins = [
  'http://localhost:3000'
];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const publicPaths = ['/api/login'];

const proxyRequest = async (req: NextRequest): Promise<Response> => {
  // const publicKey = getPublicKey();
  // const verifyToken = createVerifier({
  //   key: publicKey,
  //   algorithms: ['RS512'], // SST Auth using this algorithms
  // });

  let tokenPayload;
  // try {
  //   const token = req.cookies.get('authorization')?.value || '';
  //   tokenPayload = verifyToken(token) as {
  //     type: string;
  //     properties: {
  //       id: string;
  //       displayName: string;
  //       email: string;
  //     };
  //   };
  // } catch (error) {
  //   const response = NextResponse.json(
  //     { code: 'UNAUTHORIZED' },
  //     { status: 401 },
  //   );
  //   response.cookies.delete('authorization');
  //
  //   return response;
  // }

  let body;
  try {
    body = JSON.stringify(await req.json());
  } catch (err) {}

  const reqHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (['content-length'].includes(key)) {
      // skip forwarding headers to backend
      return;
    }

    reqHeaders[key] = value;
  });

  // try {
  //   if (isProdOrDev(process.env.NEXT_PUBLIC_ENVIRONMENT as string)) {
  //     fetch(`${API_BASE_URL}/analytic/event`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //         'x-api-key': X_API_KEY,
  //       },
  //       body: JSON.stringify({
  //         source: 'backoffice',
  //         method: req.method,
  //         path: req.url,
  //         auth: tokenPayload,
  //         headers: {
  //           ...reqHeaders,
  //           // remove creds
  //           cookie: undefined,
  //           Cookie: undefined,
  //         },
  //         body,
  //         requestedAt: new Date().toISOString(),
  //       }),
  //     });
  //   }
  // } catch (error) {
  //   console.error({
  //     msg: 'Error sending analytic event from Backoffice',
  //     error,
  //   });
  // }

  const [resp] = await Promise.allSettled([
    fetch(rewriteUrl(req.url), {
      method: req.method,
      body,
      headers: {
        ...reqHeaders,
        // 'account-type': tokenPayload.type,
        // 'account-id': tokenPayload.properties.id,
        'x-api-key': X_API_KEY,
      },
      cache: 'no-store',
    }),
  ]);

  if (resp.status === 'rejected') {
    throw resp.reason;
  }

  return resp.value;
};

export async function GET(req: NextRequest) {
  const resp = await proxyRequest(req);
  return resp;
}

export async function POST(req: NextRequest) {
  const resp = await proxyRequest(req);
  return resp;
}

export async function PUT(req: NextRequest) {
  const resp = await proxyRequest(req);
  return resp;
}

export async function PATCH(req: NextRequest) {
  const resp = await proxyRequest(req);
  return resp;
}

export async function DELETE(req: NextRequest) {
  const resp = await proxyRequest(req);
  return resp;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  const isAllowedOrigin =
    allowedOrigins.includes(origin) || /^https?:\/\/localhost/.test(origin);
  const isPrivatePath = !publicPaths.includes(req.nextUrl.pathname);

  const preflightHeaders = {
    ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
    ...(isPrivatePath && { 'Access-Control-Allow-Credentials': 'true' }),
    ...corsOptions,
  };
  return NextResponse.json({}, { headers: preflightHeaders });
}
