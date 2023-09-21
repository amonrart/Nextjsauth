import prisma from "@/lib/prisma";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  //console.log(body);
  //check with database
  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });
  if (user) {
    const { password, ...noPassword } = user;
    return new Response(JSON.stringify(noPassword));
  }
  return new Response(JSON.stringify(null));
}
