import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ProfileForm } from "@/components/profile-form";
import { LinksManager } from "@/components/links-manager";
import { ProfilePreview } from "@/components/profile-preview";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // Buscar o perfil do usuário com seus dados
  const profile = await prisma.profile.findUnique({
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

  // Se não existir perfil, criar um
  if (!profile) {
    await prisma.profile.create({
      data: {
        userId: session.user.id,
        username: session.user.name.toLowerCase().replace(/\s+/g, ''),
      }
    });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Seu Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna da Esquerda - Formulários */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Editar Perfil</h2>
            <ProfileForm initialData={profile} userId={session.user.id} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <LinksManager initialLinks={profile?.links || []} profileId={profile?.id} />
          </div>
        </div>

        {/* Coluna da Direita - Preview */}
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