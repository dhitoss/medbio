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
    await prisma.user.create({
      data: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        password: '' 
      }
    });
  }

  // Buscar o perfil do usuário
  let profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id
    },
    include: {
      links: true
    }
  });

  // Se não existir perfil, criar um com username único
  if (!profile) {
    console.log('Profile not found, creating...');
    
    // Função para gerar username único
    const generateUniqueUsername = async (baseName) => {
      let username = baseName.toLowerCase().replace(/\s+/g, '');
      let counter = 1;
      let isUnique = false;
      let finalUsername = username;

      while (!isUnique) {
        const exists = await prisma.profile.findUnique({
          where: { username: finalUsername }
        });

        if (!exists) {
          isUnique = true;
        } else {
          finalUsername = `${username}${counter}`;
          counter++;
        }
      }

      return finalUsername;
    };

    const uniqueUsername = await generateUniqueUsername(session.user.name);

    profile = await prisma.profile.create({
      data: {
        userId: session.user.id,
        username: uniqueUsername,
        displayName: session.user.name, // Usar o nome do usuário como displayName inicial
        theme: 'light',
        viewMode: 'text'
      },
      include: {
        links: true
      }
    });
  }

  console.log('Profile data:', profile);

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