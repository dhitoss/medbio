 O projeto consiste no desenvolvimento de uma plataforma similar ao Linktree, permitindo que usuários criem páginas personalizadas com múltiplos links para compartilhamento. O sistema será desenvolvido com Next.js, utilizando Prisma ORM e PostgreSQL como banco de dados.

-Configuração da instalação do NEXTJS já feita neste sistema
    ✔ What is your project named? … .
    ✔ Would you like to use TypeScript? … No 
    ✔ Would you like to use ESLint? …  Yes
    ✔ Would you like to use Tailwind CSS? …  Yes
    ✔ Would you like your code inside a `src/` directory?  Yes
    ✔ Would you like to use App Router? (recommended) …  Yes
    ✔ Would you like to use Turbopack for `next dev`? … No
    ✔ Would you like to customize the import alias (`@/*` by default)? … No 

Tecnologias que você vai usar
    Backend (API e Banco de Dados)
    Prisma ORM → Manipulação do PostgreSQL.
    PostgreSQL → Banco de dados SQL.
    NextAuth.js → Autenticação de usuários.
    Zod → Validação de dados do usuário.
    bcryptjs → Hash de senhas (se usar autenticação via e-mail/senha).
    Frontend (UI e Personalização)
    Tailwind CSS → Estilização rápida e customizável.
    ShadCN → Componentes prontos para UI moderna.
    React Hook Form → Gerenciamento de formulários.
    Framer Motion → Animações suaves.
    React Hot Toast → Notificações toast.


Modelo do Prisma (schema.prisma)
    O esquema do banco de dados precisa permitir:
    Usuários → Para autenticação.
    Perfis Personalizados → Para customizar a bio, foto, cor do tema, etc.
    Links → Para gerenciar os links do usuário.
    Aqui está um schema inicial do Prisma:

    generator client {
    provider = "prisma-client-js"
    }

    datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    }

    model User {
    id       String  @id @default(uuid())
    name     String
    email    String  @unique
    password String?
    image    String?
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    profile Profile?
    }

    model Profile {
    id       String  @id @default(uuid())
    userId   String  @unique
    user     User    @relation(fields: [userId], references: [id])

    username String  @unique
    bio      String?
    avatar   String?
    theme    String  @default("light") // "light", "dark", "custom"
    
    links    Link[]

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    }

    model Link {
    id        String  @id @default(uuid())
    profileId String
    profile   Profile @relation(fields: [profileId], references: [id])

    title     String
    url       String
    order     Int

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    }


Personalização do Perfil
    No frontend, você pode criar uma página /dashboard/profile onde o usuário pode editar:
    Nome de usuário (exemplo: meusite.com/@joao).
    Avatar.
    Bio.
    Opções de tema, ou seja, varios layout pro usuario escolher
    O usuário precisa adicionar/remover/ordenar seus links. Isso pode ser feito via drag-and-drop.
    Cada usuário terá um link próprio, por exemplo: meusite.com/@joao