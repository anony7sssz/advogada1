
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FinancialRecord = {
  id: string;
  description: string;
  amount: number;
  record_type: 'receita' | 'despesa';
  category: string;
  record_date: string;
};

export function FinancialTable() {
  const { toast } = useToast();
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<FinancialRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('financial_records')
        .select('*')
        .order('record_date', { ascending: false });
        
      if (error) throw error;
      setRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar registros",
        description: error.message || "Ocorreu um erro ao carregar os registros financeiros.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('financial_records_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'financial_records' }, 
        () => {
          fetchRecords();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleEditClick = (record: FinancialRecord) => {
    setRecordToEdit({...record});
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setRecordToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = async () => {
    if (!recordToEdit) return;
    
    try {
      const { error } = await supabase
        .from('financial_records')
        .update({
          description: recordToEdit.description,
          amount: recordToEdit.amount,
          record_type: recordToEdit.record_type,
          category: recordToEdit.category,
          record_date: recordToEdit.record_date
        })
        .eq('id', recordToEdit.id);
        
      if (error) throw error;
      
      toast({
        title: "Registro atualizado",
        description: "O registro financeiro foi atualizado com sucesso."
      });
      
      setIsEditDialogOpen(false);
      fetchRecords();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Ocorreu um erro ao atualizar o registro.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;
    
    try {
      const { error } = await supabase
        .from('financial_records')
        .delete()
        .eq('id', recordToDelete);
        
      if (error) throw error;
      
      toast({
        title: "Registro excluído",
        description: "O registro financeiro foi excluído com sucesso."
      });
      
      setIsDeleteDialogOpen(false);
      fetchRecords();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message || "Ocorreu um erro ao excluir o registro.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: keyof FinancialRecord, value: string | number) => {
    if (!recordToEdit) return;
    
    setRecordToEdit(prev => ({
      ...prev,
      [field]: field === 'amount' && typeof value === 'string' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-400">
          <div className="animate-spin h-8 w-8 border-2 border-lawyer-purple-light border-t-transparent rounded-full mr-3"></div>
          Carregando dados financeiros...
        </div>
      ) : records.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400 p-6">
          <p className="mb-2">Nenhum registro financeiro encontrado.</p>
          <p className="text-sm">Adicione um novo registro financeiro para começar.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-lawyer-black/70">
              <TableRow className="border-b border-white/10">
                <TableHead className="text-gray-300 font-medium">Descrição</TableHead>
                <TableHead className="text-gray-300 font-medium">Valor</TableHead>
                <TableHead className="text-gray-300 font-medium">Tipo</TableHead>
                <TableHead className="text-gray-300 font-medium">Categoria</TableHead>
                <TableHead className="text-gray-300 font-medium">Data</TableHead>
                <TableHead className="text-gray-300 font-medium text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-lawyer-black/30">
              {records.map((record) => (
                <TableRow key={record.id} className="border-b border-white/10 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{record.description}</TableCell>
                  <TableCell className={`${record.record_type === 'receita' ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(record.amount)}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.record_type === 'receita' 
                        ? 'bg-green-400/20 text-green-300' 
                        : 'bg-red-400/20 text-red-300'
                    }`}>
                      {record.record_type === 'receita' ? 'Receita' : 'Despesa'}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300">{record.category || '-'}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(record.record_date)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditClick(record)}
                      className="hover:bg-white/10 text-gray-300 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteClick(record.id)}
                      className="hover:bg-white/10 text-gray-300 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      {recordToEdit && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-lawyer-black/90 border border-white/10 backdrop-blur-lg text-white">
            <DialogHeader>
              <DialogTitle className="gradient-text">Editar Registro</DialogTitle>
              <DialogDescription className="text-gray-300">
                Edite os dados do registro financeiro.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-gray-200">Descrição</Label>
                <Input
                  id="edit-description"
                  value={recordToEdit.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-amount" className="text-gray-200">Valor (R$)</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={recordToEdit.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type" className="text-gray-200">Tipo</Label>
                  <Select
                    value={recordToEdit.record_type}
                    onValueChange={(value) => handleChange('record_type', value as 'receita' | 'despesa')}
                  >
                    <SelectTrigger className="bg-white/10 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-lawyer-black border-gray-700 text-white">
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-category" className="text-gray-200">Categoria</Label>
                  <Input
                    id="edit-category"
                    value={recordToEdit.category || ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="bg-white/10 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-date" className="text-gray-200">Data</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={recordToEdit.record_date}
                  onChange={(e) => handleChange('record_date', e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleEdit}
                className="bg-gradient-to-r from-lawyer-purple to-lawyer-blue"
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-lawyer-black/90 border border-white/10 backdrop-blur-lg text-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-gray-300">
              Tem certeza que deseja excluir este registro financeiro? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-white/20 hover:bg-white/5 hover:text-white"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDelete}
              variant="destructive"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
