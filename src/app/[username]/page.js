import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PublicProfile({ params }) {
  const { username } = params;
  
  console.log('Fetching profile for username:', username);

  // Buscar o perfil pelo username
  const profile = await prisma.profile.findUnique({
    where: {
      username: username
    },
    include: {
      links: {
        orderBy: {
          order: 'asc'
        }
      },
      user: {
        select: {
          name: true
        }
      }
    }
  });

  console.log('Profile data:', profile);
  console.log('Links:', profile?.links);

  // Se o perfil não existir, redireciona para a home
  if (!profile) {
    console.log('Profile not found, redirecting...');
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header do Perfil */}
          <div className="text-center mb-8">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.username}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Sem foto</span>
              </div>
            )}
            <h1 className="text-2xl font-bold">@{profile.username}</h1>
            {profile.bio && (
              <p className="text-gray-600 mt-2">{profile.bio}</p>
            )}
          </div>

          {/* Lista de Links */}
          <div className="flex flex-col gap-4 w-full  mx-auto">
            {profile.links.map((link) => (
              profile.viewMode === 'image' ? (
                // Modo imagem
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  {link.image ? (
                    <div className="w-full max-w-[1024px] mx-auto">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">{link.title}</span>
                    </div>
                  )}
                </a>
              ) : (
                // Modo texto
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 text-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {link.title}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 