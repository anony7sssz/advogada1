
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Pencil, Plus, Trash2, Users } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');

      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao buscar clientes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function openNewClientDialog() {
    setEditingClient(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setDialogOpen(true);
  }

  function openEditClientDialog(client: Client) {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
    });
    setDialogOpen(true);
  }

  function openDeleteDialog(client: Client) {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (!formData.name) {
        toast({
          title: "Nome obrigatório",
          description: "Por favor, informe o nome do cliente.",
          variant: "destructive",
        });
        return;
      }
      
      if (editingClient) {
        // Update existing client
        const { data, error } = await supabase
          .from('clients')
          .update({
            name: formData.name,
            email: formData.email || null,
            phone: formData.phone || null,
            address: formData.address || null
          })
          .eq('id', editingClient.id)
          .select()
          .single();
        
        if (error) throw error;
        
        setClients(clients.map(c => 
          c.id === editingClient.id ? { ...c, ...data } : c
        ));
        
        toast({
          title: "Cliente atualizado",
          description: "Os dados do cliente foram atualizados com sucesso.",
        });
      } else {
        // Create new client
        const { data, error } = await supabase
          .from('clients')
          .insert({
            name: formData.name,
            email: formData.email || null,
            phone: formData.phone || null,
            address: formData.address || null
          })
          .select()
          .single();
        
        if (error) throw error;
        
        setClients([...clients, data]);
        
        toast({
          title: "Cliente adicionado",
          description: "O novo cliente foi adicionado com sucesso.",
        });
      }
      
      setDialogOpen(false);
    } catch (error: any) {
      console.error("Erro ao salvar cliente:", error);
      toast({
        title: "Erro ao salvar cliente",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleDeleteClient() {
    if (!clientToDelete) return;
    
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientToDelete.id);
      
      if (error) throw error;
      
      setClients(clients.filter(c => c.id !== clientToDelete.id));
      
      toast({
        title: "Cliente removido",
        description: "O cliente foi removido com sucesso.",
      });
      
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    } catch (error: any) {
      toast({
        title: "Erro ao remover cliente",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={openNewClientDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">Nenhum cliente encontrado</h3>
          <p className="text-gray-500 mt-2">
            Adicione um novo cliente para começar.
          </p>
          <Button className="mt-4" onClick={openNewClientDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email || "-"}</TableCell>
                  <TableCell>{client.phone || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate">{client.address || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditClientDialog(client)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-destructive" onClick={() => openDeleteDialog(client)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit/Create Client Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingClient ? "Editar Cliente" : "Novo Cliente"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingClient ? "Salvar Alterações" : "Adicionar Cliente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Tem certeza que deseja excluir o cliente <strong>{clientToDelete?.name}</strong>?</p>
            <p className="text-sm text-gray-500 mt-2">
              Esta ação não pode ser desfeita e removerá todas as consultas e anotações associadas a este cliente.
            </p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteClient}>
              Excluir Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
