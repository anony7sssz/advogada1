
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  FileText,
  Plus, 
  Eye, 
  Pencil, 
  Trash2 
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Note = {
  id: string;
  title: string;
  content: string;
  client_id: string | null;
  created_at: string;
  updated_at: string;
  client?: {
    name: string;
  };
};

type Client = {
  id: string;
  name: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    client_id: "" as string | null,
  });

  useEffect(() => {
    fetchNotes();
    fetchClients();
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select(`
          id,
          title,
          content,
          client_id,
          created_at,
          updated_at,
          client:client_id(name)
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao buscar anotações",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao buscar clientes",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  function openNewNoteDialog() {
    setEditingNote(null);
    setFormData({
      title: "",
      content: "",
      client_id: null,
    });
    setDialogOpen(true);
  }

  function openEditNoteDialog(note: Note) {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content || "",
      client_id: note.client_id,
    });
    setDialogOpen(true);
  }

  function openViewNoteDialog(note: Note) {
    setViewingNote(note);
    setViewDialogOpen(true);
  }

  function openDeleteDialog(note: Note) {
    setNoteToDelete(note);
    setDeleteDialogOpen(true);
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleClientChange(value: string) {
    setFormData((prev) => ({ 
      ...prev, 
      client_id: value === "none" ? null : value 
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (editingNote) {
        // Update existing note
        const { error } = await supabase
          .from('notes')
          .update(formData)
          .eq('id', editingNote.id);
        
        if (error) throw error;
        
        // Update in state with client information
        const updatedNote = {
          ...editingNote,
          ...formData,
          client: formData.client_id 
            ? clients.find(c => c.id === formData.client_id) 
            : undefined
        };
        
        setNotes(notes.map(n => 
          n.id === editingNote.id ? updatedNote : n
        ));
        
        toast({
          title: "Anotação atualizada",
          description: "A anotação foi atualizada com sucesso.",
        });
      } else {
        // Create new note
        const { data, error } = await supabase
          .from('notes')
          .insert(formData)
          .select(`
            id,
            title,
            content,
            client_id,
            created_at,
            updated_at,
            client:client_id(name)
          `)
          .single();
        
        if (error) throw error;
        
        setNotes([data, ...notes]);
        
        toast({
          title: "Anotação criada",
          description: "A nova anotação foi criada com sucesso.",
        });
      }
      
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao salvar anotação",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleDeleteNote() {
    if (!noteToDelete) return;
    
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteToDelete.id);
      
      if (error) throw error;
      
      setNotes(notes.filter(n => n.id !== noteToDelete.id));
      
      toast({
        title: "Anotação removida",
        description: "A anotação foi removida com sucesso.",
      });
      
      setDeleteDialogOpen(false);
      setNoteToDelete(null);
    } catch (error: any) {
      toast({
        title: "Erro ao remover anotação",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anotações</h1>
        <Button onClick={openNewNoteDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Anotação
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">Nenhuma anotação encontrada</h3>
          <p className="text-gray-500 mt-2">
            Adicione uma nova anotação para começar.
          </p>
          <Button className="mt-4" onClick={openNewNoteDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Anotação
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="font-medium">
                    {note.title}
                  </TableCell>
                  <TableCell>
                    {note.client ? note.client.name : "Sem cliente associado"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(note.updated_at), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openViewNoteDialog(note)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => openEditNoteDialog(note)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-destructive" onClick={() => openDeleteDialog(note)}>
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

      {/* Edit/Create Note Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingNote ? "Editar Anotação" : "Nova Anotação"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_id">Cliente (opcional)</Label>
                <Select 
                  value={formData.client_id || "none"} 
                  onValueChange={handleClientChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem cliente associado</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  rows={12}
                  className="resize-none"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingNote ? "Salvar Alterações" : "Criar Anotação"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Note Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{viewingNote?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            {viewingNote?.client && (
              <div className="text-sm">
                <span className="font-medium">Cliente:</span>{" "}
                {viewingNote.client.name}
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              Última atualização: {viewingNote && format(new Date(viewingNote.updated_at), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
            </div>
            
            <div className="border rounded-lg p-4 whitespace-pre-wrap min-h-[200px] bg-gray-50">
              {viewingNote?.content || <span className="text-gray-400">Sem conteúdo</span>}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" onClick={() => setViewDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>Tem certeza que deseja excluir a anotação <strong>{noteToDelete?.title}</strong>?</p>
            <p className="text-sm text-gray-500 mt-2">
              Esta ação não pode ser desfeita.
            </p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteNote}>
              Excluir Anotação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
