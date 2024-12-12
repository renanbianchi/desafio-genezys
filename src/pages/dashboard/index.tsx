import ProtectedRoute from '@/components/shared/protectedRoute';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/dataTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleX } from 'lucide-react';
import { UserInputs } from '@/components/dashboard/UserInputs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAlert } from '@/hooks/useAlert';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { columns } from '../../components/dashboard/columns';

type User = {
  id: string;
  name: string;
  email: string;
  address: string;
};

type DashBoardProps = {
  userList: User[];
};

export default function Dashboard({
  userList: initialUserList,
}: DashBoardProps) {
  const { showAlert } = useAlert();
  const [userList, setUserList] = useState<User[]>(initialUserList);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditingSheetOpen, setIsEditingSheetOpen] = useState(false);
  const [user, setUser] = useState<User>({
    id: crypto.randomUUID(),
    name: '',
    email: '',
    address: '',
  });

  const handleAddUser = async () => {
    setUserList((prevList) => [user, ...prevList]);

    setUser({
      id: crypto.randomUUID(),
      name: '',
      email: '',
      address: '',
    });

    setIsPopoverOpen(false);
    showAlert('success', 'Usuário adicionado com sucesso!');
  };

  const handleDeleteUser = (id: string) => {
    setUserList((prevList) => prevList.filter((user) => user.id !== id));
  };

  const handleEditUser = async () => {
    setUserList((prevList) =>
      prevList.map((u) => (u.id === user.id ? { ...u, ...user } : u)),
    );

    setIsEditingSheetOpen(false);
    showAlert('success', 'Usuário editado com sucesso!');
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center w-full sm:w-auto">
        <div className="max-w-fit">
          <div className="flex flex-col justify-center items-center gap-[31px] sm:flex-row sm:justify-between rounded-md w-full pt-4 mb-5">
            <span className="text-xl font-bold">Informações de usuários</span>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="border-[#0F172A] text-sm max-w-40 sm:max-w-max"
                  variant="outline"
                >
                  <PlusIcon />
                  Adicionar usuário
                </Button>
              </PopoverTrigger>

              <Sheet open={isEditingSheetOpen}>
                <SheetTrigger asChild></SheetTrigger>
                <SheetContent className="w-80 bg-white">
                  <SheetHeader onClick={() => setIsEditingSheetOpen(false)}>
                    <CircleX
                      className="absolute right-4 top-4 bg-white cursor-pointer"
                      onClick={() => setIsEditingSheetOpen(false)}
                    />
                    <SheetTitle>Editar Usuário</SheetTitle>
                    <SheetDescription>
                      Altere os dados do usuário aqui
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    {UserInputs.map((field, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 items-center gap-4"
                      >
                        <Label htmlFor={field.input} className="text-left">
                          {field.label}
                        </Label>
                        <Input
                          id={field.input}
                          placeholder={field.placeholder}
                          className="col-span-3"
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              [field.input]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button onClick={handleEditUser}>
                        Salvar alterações
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <PopoverContent className="w-80 z-50">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dados</h4>
                    <p className="text-sm text-muted-foreground">
                      Insira os dados do usuário.
                    </p>
                  </div>
                  <div className="grid gap-2 ">
                    {UserInputs.map((field, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 items-center gap-0"
                      >
                        <Label htmlFor={field.input} className="text-left">
                          {field.label}
                        </Label>
                        <Input
                          id={field.input}
                          placeholder={field.placeholder}
                          className="col-span-2"
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              [field.input]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-1 items-center gap-0 mt-5">
                      <Button onClick={handleAddUser}>Salvar</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <DataTable
            columns={columns(handleDeleteUser, setIsEditingSheetOpen, setUser)}
            data={userList}
          />
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
