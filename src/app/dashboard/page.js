import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LogoutButton } from "@/components/logout-button";
import { ProfileForm } from "@/components/profile-form";
import { LinksManager } from "@/components/links-manager";
import { ProfilePreview } from "@/components/profile-preview";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // Primeiro, verificar se o usuário existe
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  });

  if (!user) {
    console.log('User not found, creating...');
    // Se o usuário não existir, criar primeiro
    await prisma.user.create({
      data: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        password: '' // Você pode definir uma senha padrão ou deixar vazio
      }
    });
  }

  // Agora buscar ou criar o perfil
  let profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id
    },
    include: {
      links: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  });

  console.log('Profile data:', profile);

  if (!profile) {
    console.log('Profile not found, creating...');
    profile = await prisma.profile.create({
      data: {
        userId: session.user.id,
        username: session.user.name.toLowerCase().replace(/\s+/g, ''),
        theme: 'light',
        viewMode: 'text'
      },
      include: {
        links: true
      }
    });
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Editar Perfil</h2>
            <ProfileForm initialData={profile} userId={session.user.id} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <LinksManager initialLinks={profile?.links || []} profileId={profile?.id} />
          </div>
        </div>

        <div className="sticky top-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-center">Preview</h2>
            <ProfilePreview profile={profile} links={profile?.links || []} />
          </div>
        </div>
      </div>
    </div>
  );
} 