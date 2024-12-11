import { DataTable } from '@/components/ui/dataTable';
import { columns } from '../../components/dashboard/columns';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import ProtectedRoute from '@/components/shared/protectedRoute';

type User = {
  id: string;
  name: string;
  email: string;
  address: string;
};

type DashBoardProps = {
  userList: User[];
};

export default function Dashboard({ userList }: DashBoardProps) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-full h-screen sm:w-auto sm:h-svh">
        <div className="max-w-fit">
          <div className="flex flex-col justify-center items-center gap-[31px] sm:flex-row sm:justify-between rounded-md w-full pt-4 mb-5">
            <span className="text-xl font-bold">Informações de usuários</span>
            <Button
              className="border-[#0F172A] text-sm max-w-40 sm:max-w-max"
              variant="outline"
            >
              <PlusIcon />
              Adicionar usuário
            </Button>
          </div>
          <DataTable columns={columns} data={userList} />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const getStaticProps = async () => {
  const userList = [
    {
      id: crypto.randomUUID(),
      name: 'João Carlos de Andrade Gomes',
      email: 'carljohnson@gmail.com',
      address: 'Rua Calopsita, 123',
    },
    {
      id: crypto.randomUUID(),
      name: 'Maria Aparecida da Silva',
      email: 'maria.aparecida@gmail.com',
      address: 'Avenida Brasil, 4500, Apt. 302',
    },
    {
      id: crypto.randomUUID(),
      name: 'Pedro Henrique Alves',
      email: 'pedro.henrique@hotmail.com',
      address: 'Rua das Palmeiras, 77',
    },
    {
      id: crypto.randomUUID(),
      name: 'Ana Luiza Ramos',
      email: 'ana.ramos@gmail.com',
      address: 'Travessa Florianópolis, 35, Bloco B',
    },
    {
      id: crypto.randomUUID(),
      name: 'Carlos Eduardo Pereira',
      email: 'carlosedu@gmail.com',
      address: 'Estrada Velha do Aeroporto, 1021',
    },
    {
      id: crypto.randomUUID(),
      name: 'Fernanda Almeida Santos',
      email: 'fernanda.santos@gmail.com',
      address: 'Rua das Flores, 120',
    },
    {
      id: crypto.randomUUID(),
      name: 'Lucas Henrique Oliveira',
      email: 'lucas.oliveira@hotmail.com',
      address: 'Avenida Paulista, 1500, Apt. 702',
    },
    {
      id: crypto.randomUUID(),
      name: 'Mariana Rodrigues Silva',
      email: 'mariana.silva@gmail.com',
      address: 'Praça das Águas, 30, Bloco A',
    },
    {
      id: crypto.randomUUID(),
      name: 'Gabriel Costa Ferreira',
      email: 'gabriel.ferreira@yahoo.com',
      address: 'Rua do Sol, 45',
    },
    {
      id: crypto.randomUUID(),
      name: 'Aline Cristina Mendes',
      email: 'aline.mendes@gmail.com',
      address: 'Travessa do Ouro, 88, Casa 3',
    },
    {
      id: crypto.randomUUID(),
      name: 'Rafael Augusto Lima',
      email: 'rafael.lima@hotmail.com',
      address: 'Alameda das Palmeiras, 1001',
    },
    {
      id: crypto.randomUUID(),
      name: 'Juliana Aparecida Borges',
      email: 'juliana.borges@gmail.com',
      address: 'Rua Nova Esperança, 250',
    },
    {
      id: crypto.randomUUID(),
      name: 'Diego Nascimento Costa',
      email: 'diego.costa@gmail.com',
      address: 'Estrada Real, 400, Bloco C',
    },
    {
      id: crypto.randomUUID(),
      name: 'Paula Regina Duarte',
      email: 'paula.duarte@gmail.com',
      address: 'Rua Bela Vista, 75',
    },
    {
      id: crypto.randomUUID(),
      name: 'Thiago Matheus Pereira',
      email: 'thiago.pereira@gmail.com',
      address: 'Avenida Getúlio Vargas, 900',
    },
  ];

  return {
    props: { userList },
  };
};
